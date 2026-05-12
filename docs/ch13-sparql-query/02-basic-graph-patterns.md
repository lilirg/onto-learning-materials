# 13.2 基本图模式查询

> **本节要点**：掌握三元组模式（Triple Pattern）与基本图模式（BGP）的组合机制，理解变量匹配、OPTIONAL 空值处理、FILTER 过滤以及 LIMIT/OFFSET/ORDER BY 排序分页操作。

---

## 1. 三元组模式（Triple Pattern）

**三元组模式**是 SPARQL 图模式中最小的匹配单元，形式为 `<主体 谓词 客体>`。其中主体、谓词或客体可以是：

| 元素类型 | 语法 | 示例 |
|----------|------|------|
| IRI 常量 | `<IRI>` 或 `前缀:局部名` | `<http://xmlns.com/foaf/0.1/name>` 或 `foaf:name` |
| RDF 字面量 | `"字符串"` 或 `"字符串"^^类型` | `"张三"`, `"35"^^xsd:integer` |
| 变量 | `?变量名` 或 `$变量名` | `?person`, `?title` |
| NULL | `rdf:nil` | 空列表 |

**基本三元组模式示例**：

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# 三元组模式 1：完整的 IRI
<http://example.org/person/alice> foaf:name "Alice" .

# 三元组模式 2：含变量（模式匹配）
?person foaf:name ?name .

# 三元组模式 3：变量谓词
?person ?predicate "Alice" .
```

---

## 2. 基本图模式（Basic Graph Pattern, BGP）

**基本图模式（Basic Graph Pattern, BGP）** 是多个三元组模式的**集合**，通过变量的共享实现隐式 JOIN。

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?name ?age
WHERE {
    # 三元组模式 1
    ?person a ex:Person ;
            ex:name ?name .
    # 三元组模式 2
    ?person ex:age ?age .
}
```

### 2.1 Turtle 数据 → SPARQL 查询对照

**示例 Turtle 数据**：

```turtle
@prefix ex: <http://example.org/ontology#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:alice a ex:Person ;
    ex:name "Alice" ;
    ex:age "30"^^xsd:integer ;
    ex:livesIn ex:Beijing .

ex:bob a ex:Person ;
    ex:name "Bob" ;
    ex:age "25"^^xsd:integer ;
    ex:livesIn ex:Beijing .

ex:charlie a ex:Person ;
    ex:name "Charlie" ;
    ex:age "35"^^xsd:integer ;
    ex:livesIn ex:Shanghai .
```

**查询：查找所有居住在某个城市的人**：

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?name ?age ?city
WHERE {
    ?person a ex:Person ;
            ex:name ?name ;
            ex:age ?age ;
            ex:livesIn ?city .
}
```

**查询结果**：

| ?name | ?age | ?city |
|-------|------|-------|
| "Alice" | 30 | <http://example.org/city/Beijing> |
| "Bob" | 25 | <http://example.org/city/Beijing> |
| "Charlie" | 35 | <http://example.org/city/Shanghai> |

---

### 2.2 BGP 匹配过程图解

```
┌───────────────────────────────────────────────────────┐
│                RDF 存储图 (Data Graph)                 │
│                                                       │
│  ex:alice ───► a ──────────► ex:Person               │
│       │                                                    │
│       ├──► ex:name ────────► "Alice"               │
│       │                                                    │
│       ├──► ex:age ─────────► "30"^^xsd:integer       │
│       │                                                    │
│       └──► ex:livesIn ───► ex:Beijing                 │
│                                                       │
│  ex:bob ───── a ───────────► ex:Person               │
│       │                                                    │
│       └──► ex:name ────────► "Bob"                   │
│                                                       │
│  ...                                                │
└───────────────────────────────────────────────────────┘

                          ▼ 匹配结果

┌───────────────────────────────────────┐
│       BGP 匹配结果表 (Result Set)        │
│                                       │
│ ?person             ?name    ?age  ?city              │
│ --------------------------------------------------- │
│ ex:alice        "Alice"     30   ex:Beijing            │
│ ex:bob            "Bob"     25   ex:Beijing            │
│ ex:charlie      "Charlie"   35   ex:Shanghai           │
└───────────────────────────────────────┘
```

---

## 3. 可选匹配 OPTIONAL

**OPTIONAL** 子句类似于 SQL 中的 `LEFT OUTER JOIN`，允许模式匹配失败时仍然保留结果行（变量绑定为 `NULL`）。

### 3.1 基础 OPTIONAL

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?name ?phone
WHERE {
    ?person a ex:Person ;
            ex:name ?name .
    OPTIONAL {
        ?person ex:hasPhone ?phone .
    }
}
```

**假设数据**：

| 个体 | name | hasPhone |
|------|------|----------|
| ex:alice | "Alice" | "010-12345678" |
| ex:bob | "Bob" | _（无此属性）_ |
| ex:charlie | "Charlie" | "021-87654321" |

**查询结果**：

| ?name | ?phone | 说明 |
|-------|--------|------|
| "Alice" | "010-12345678" | 匹配成功 |
| "Bob" | *(NULL)* | OPTIONAL 未匹配，变量为 NULL |
| "Charlie" | "021-87654321" | 匹配成功 |

### 3.2 多个 OPTIONAL 组合

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?name ?email ?website
WHERE {
    ?person a ex:Person ;
            ex:name ?name .
    OPTIONAL { ?person ex:email ?email . }
    OPTIONAL { ?person ex:hasWebsite ?website . }
}
```

**查询结果示例**：

| ?name | ?email | ?website |
|-------|--------|----------|
| "Alice" | "alice@example.com" | "https://alice.dev" |
| "Bob" | *(NULL)* | *(NULL)* |
| "Charlie" | "charlie@example.com" | *(NULL)* |

### 3.3 OPTIONAL 中使用图模式

OPTIONAL 括号内可以包含**多个三元组模式**：

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?movie ?director ?wikiPage
WHERE {
    ?movie a ex:Movie ;
           ex:director ?director .
    OPTIONAL {
        ?director foaf:isBasedIn ?wikiPage .
    }
}
```

> ⚠️ **最佳实践**：OPTIONAL 内包含多个模式时，只有当内部**所有**模式都匹配成功时，才将变量绑定为非 NULL 值；任意一个内部三元组未匹配成功，该 OPTIONAL 中的所有变量均为 NULL。

---

## 4. 路径表达式（Property Path）

SPARQL 允许使用**属性路径（Property Path）**来匹配具有多跳关系的 RDF 三元组。

### 4.1 简单路径语法

| 语法 | 说明 | 示例 |
|------|------|------|
| 谓词 | 简单谓词（原子路径） | `foaf:name` |
| `^` | 逆路径（Reverse） | `^ex:livesIn`（查找谁以该节点为目的地） |
| `/` | 顺序路径（Sequence） | `ex:friend/foaf:name` |
| `\|` | 并集路径（Union） | `ex:email \| ex:phone` |
| `*` | 零次或多次 | `ex:related*` |
| `+` | 一次或多次 | `ex:follow+` |

**逆路径（`^`）示例**：

```sparql
PREFIX ex: <http://example.org/ontology#>

# 查找谁住在 Beijing（即 Beijing 是某个人的 livesIn 目的地）
SELECT ?name
WHERE {
    ?person ex:name ?name .
    ^ex:livesIn ex:Beijing .
}

# 等效于：
# SELECT ?name WHERE {
#     ?person ex:name ?name ;
#             ex:livesIn ex:Beijing .
# }
```

**顺序路径（`/`）示例**：

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# 查找 "Alice" 的朋友的名字
SELECT ?friendName
WHERE {
    ?alice foaf:name "Alice" .
    ?alice foaf:friend/foaf:name ?friendName .
}
```

```
Alice ── foaf:friend ──► Bob ── foaf:name ──► "Bob"
                             │
                             └─► Charlie ── foaf:name ──► "Charlie"
```

---

## 5. 过滤与绑定

### 5.1 FILTER 过滤

**FILTER** 用于对 SPARQL 查询结果添加约束条件，支持函数表达式和布尔逻辑。

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?name ?age ?salary
WHERE {
    ?person a ex:Person ;
            ex:name ?name ;
            ex:age ?age ;
            ex:salary ?salary .
    FILTER(?age > 25 && ?age < 50)                  # 数字范围
    FILTER(?salary >= 10000)                        # 过滤薪资
    FILTER(REGEX(?name, "^张", "i"))                # 正则表达式（以"张"开头）
}
```

**常用 FILTER 内置函数**：

| 函数 | 描述 | 示例 |
|------|------|------|
| `STR(?x)` | 返回 ?x 的字符串 | `STR(?name)` |
| `LANG(?x)` | 返回 ?x 的语言标签 | `LANG("你好"@"zh")` → `"zh"` |
| `LANGMATCHES(lang, tag)` | 语言匹配 | `LANGMATCHES(LANG(?t), "zh")` |
| `REGEX(?x, pattern)` | 正则表达式匹配 | `REGEX(?name, "^张")` |
| `UCASE(?x)` / `LCASE(?x)` | 转为大写/小写 | `UCASE(?name)` |
| `COALESCE(?a, ?b)` | 返回首个非 NULL | `COALESCE(?phone, ?mobile)` |
| `BOUND(?x)` | 判断是否绑定 | `BOUND(?email)` |
| `IS NULL` / `IS NOT NULL` | NULL 判断 | `FILTER(IS NULL ?email)` |
| `IS BLANK(?x)` | 判断是否为 blank node | `IS BLANK(?n)` |
| `ABS()` / `ROUND()` / `CEIL()` / `FLOOR()` | 数值运算 | `ROUND(?age)` |

**BIND 绑定**：

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?name ?age ?category
WHERE {
    ?person a ex:Person ;
            ex:name ?name ;
            ex:age ?age .
    # 根据年龄自动分配年龄层
    BIND(IF(?age < 30, "青年", IF(?age < 50, "中年", "老年")) AS ?category)
}
```

---

### 5.2 处理空值 NULL

在 SPARQL 中，空值（未绑定的变量）可以通过以下方式识别和处理：

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX IF: <http://example.org/ontology#>

SELECT ?name ?email
WHERE {
    ?person a ex:Person ;
            ex:name ?name .
    OPTIONAL { ?person ex:email ?email . }
    # 仅检索有邮箱的人
    FILTER(BOUND(?email) && ?email != "")
}
```

---

## 6. 排序、限制与分页

### 6.1 ORDER BY 排序

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

# 按年龄降序排列
SELECT ?name ?age
WHERE {
    ?person a ex:Person ;
            ex:name ?name ;
            ex:age ?age .
}
ORDER BY DESC(?age)    # 降序；ASC(?age) 为升序
```

**多字段排序**：

```sparql
SELECT ?department ?name ?salary
WHERE {
    ...
}
ORDER BY ?department DESC(?salary)
```

### 6.2 LIMIT / OFFSET 分页

```sparql
# 每页 10 条，取第 2 页（OFFSET 10）
PREFIX ex: <http://example.org/ontology#>

SELECT ?name ?age
WHERE {
    ?person ex:name ?name ;
            ex:age ?age .
}
ORDER BY DESC(?age)
LIMIT 10 OFFSET 10
```

**排序、限制与过滤的组合**：

```sparql
SELECT ?name ?salary
WHERE {
    ?person a ex:Person ;
            ex:name ?name ;
            ex:salary ?salary .
    FILTER(?salary > 20000)
}
ORDER BY DESC(?salary)
LIMIT 20 OFFSET 0
```

---

## 7. 去重 DISTINCT 与 REDUCED

| 关键字 | 效果 | 性能影响 |
|--------|------|----------|
| `DISTINCT` | 去重，保证结果唯一 | 较高（需全量排序） |
| `REDUCED` | 部分去重，性能优于 DISTINCT | 较低（可能仍有重复） |

```sparql
# 列出所有出现的 City 名称
PREFIX ex: <http://example.org/ontology#>

SELECT DISTINCT ?city
WHERE {
    ?person a ex:Person ;
            ex:livesIn ?city .
}

# City 结果表：仅去重后的城市列表
```

**查询结果**：

| ?city |
|-------|
| <http://example.org/city/Beijing> |
| <http://example.org/city/Shanghai> |
| <http://example.org/city/Guangzhou> |

---

## 8. 综合实战：豆瓣电影数据查询

以下是一个完整的 Turtle 数据示例及其对应的多个 SPARQL 查询。

### 8.1 示例 Turtle 数据

```turtle
@prefix ex: <http://example.org/ontology#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix dbo: <http://dbpedia.org/ontology/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:Inception a ex:Movie ;
    ex:title "盗梦空间"@zh ;
    ex:releaseYear "2010"^^xsd:integer ;
    ex:duration "148"^^xsd:integer ;
    ex:rating "9.4"^^xsd:decimal ;
    ex:director ex:ChristopherNolan .

ex:TheMatrix a ex:Movie ;
    ex:title "黑客帝国"@zh ;
    ex:releaseYear "1999"^^xsd:integer ;
    ex:duration "136"^^xsd:integer ;
    ex:rating "8.7"^^xsd:decimal ;
    ex:director ex:WachowskiSisters .

ex:Interstellar a ex:Movie ;
    ex:title "星际穿越"@zh ;
    ex:releaseYear "2014"^^xsd:integer ;
    ex:duration "169"^^xsd:integer ;
    ex:rating "9.3"^^xsd:decimal ;
    ex:director ex:ChristopherNolan ;
    ex:hasActor ex:MatthewMcConaughey .
```

### 8.2 练习 1 — 查询所有评分 9.0 以上的电影

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?title ?rating
WHERE {
    ?movie a ex:Movie ;
           ex:title ?title ;
           ex:rating ?rating .
    FILTER(?rating >= 9.0)
}
ORDER BY DESC(?rating)
```

| ?title | ?rating |
|--------|---------|
| "盗梦空间"@zh | 9.4 |
| "星际穿越"@zh | 9.3 |

### 8.3 练习 2 — 查找评分在 8 到 9 之间的电影（使用范围过滤）

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?title ?rating
WHERE {
    ?movie ex:title ?title ;
           ex:rating ?rating .
    FILTER(?rating >= 8.0 && ?rating < 9.0)
}
ORDER BY DESC(?rating)
```

### 8.4 练习 3 — 查找由 Christopher Nolan 导演的电影（包含 OPTIONAL 关联演员）

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?title ?directorName ?actor
WHERE {
    ?movie a ex:Movie ;
           ex:title ?title ;
           ex:director ex:Nolan .
    ex:Nolan foaf:name ?directorName .
    OPTIONAL { ?movie ex:hasActor ?actor . }
}
```

| ?title | ?directorName | ?actor |
|--------|--------------|--------|
| "盗梦空间"@zh | "Christopher Nolan" | *(NULL)* |
| "星际穿越"@zh | "Christopher Nolan" | <ex:MatthewMcConaughey> |

---

## 9. 小结

| 技术 | 要点 |
|------|------|
| 三元组模式 | 最小查询单位，可含变量、常量、IRI |
| BGP | 多个三元组模式的集合，变量共享隐式 JOIN |
| OPTIONAL | 类似 LEFT JOIN，允许空值 |
| 属性路径 | `^` 逆向、`/` 串联、`\|` 并集、`*` / `+` 重复 |
| FILTER / BIND | 值过滤、正则表达式、条件绑定 |
| ORDER BY / LIMIT / OFFSET | 排序、分页，提升查询效率 |
| DISTINCT | 去重（保证唯一） |

---

> **下一章**：[13.3 高级查询特性](./03-advanced-features.md) — 深入 UNION 联合查询、子查询、聚合函数（COUNT/SUM/AVG）、SERVICE 远程查询和 SPARQL 更新操作（INSERT/DELETE/UPDATE）。