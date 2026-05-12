# 13.4 练习：DBPedia / Sesame 在线端点查询

> **本节要点**：掌握 DBpedia 和 W3C SPARQL Playground 等在线端点的使用方法，通过电影本体上的数据查询练习理解 SPARQL 实际应用，学会排查常见问题。

---

## 1. 在线 SPARQL 端点使用指引

### 1.1 常用在线端点

| 端点名称 | 地址 | 数据规模 | 无需注册 |
|----------|------|----------|----------|
| **W3C SPARQL Playground** | <https://www.w3.org/2013/04/w3c/sparql/> | W3C 内部数据集 | ✅ |
| **DBpedia SPARQL Endpoint** | <https://dbpedia.org/sparql> | DBpedia（~500 万实体） | ✅ |
| **Wikidata SPARQL Endpoint** | <https://query.wikidata.org/sparql> | Wikidata（~1 亿三元组） | ✅ |
| **LOD Cloud** | <https://lod-cloud.net/> | LOD 集合目录 — 提供各端点入口 | ✅ |

### 1.2 以 W3C SPARQL Playground 为例

**操作步骤**：

1. 打开 <https://www.w3.org/2013/04/w3c/sparql/> 
2. 在查询输入框中粘贴 SPARQL 代码
3. 选择响应格式（默认 `SPARQL Results JSON` 或 `SPARQL Results XML`）
4. 点击 **Execute** 按钮执行查询
5. 查看查询结果表格或 RDF 图

```
┌───────────────────────────────────────────────────────────┐
│  W3C SPARQL Playground                                    │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ PREFIX foaf: <http://xmlns.com/foaf/0.1/>               ││
│ │                                                         ││
│ │ SELECT ?name                                            ││
│ │ WHERE {                                                 ││
│ │   ?person foaf:name ?name .                             ││
│ │ }                                                       ││
│ └─────────────────────────────────────────────────────────┘│
│ [Execute]  ┌───────────────────────────────────┐           │
│            │ Response format:                   │           │
│            │ ● SPARQL Results JSON              │           │
│            │ ○ SPARQL Results XML               │           │
│            │ ○ Turtle                           │           │
│            └───────────────────────────────────┘           │
└───────────────────────────────────────────────────────────┘
```

**DBpedia SPARQL 端点**使用步骤相似，但其界面略有不同：

1. 打开 <https://dbpedia.org/sparql>
2. 粘贴 SPARQL 代码
3. 查询结果默认展示在**表格视图（Table View）**中
4. 可切换至 **可视化视图（Visual View）**查看 RDF 实体关系图
5. **高级设置（Advanced Settings）**：可调整超时时间、结果行数限制等

---

## 2. 场景练习一：电影本体查询

### 2.1 Turtle 示例数据

```turtle
@prefix ex: <http://example.org/ontology#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# ==================== 导演 ====================
ex:ChristopherNolan a ex:Director ;
    foaf:name "Christopher Nolan" ;
    birthYear "1970-07-30"^^xsd:date .

ex:ChristopherNolan ex:directed ex:Inception ;
                   ex:directed ex:Interstellar .

ex:ZhangYimou a ex:Director ;
    foaf:name "张艺谋" ;
    birthYear "1950-05-02"^^xsd:date .

ex:ZhangYimou ex:directed ex:Hero ;
             ex:directed ex:RaiseTheRedLantern .

# ==================== 电影 ====================
ex:Inception a ex:Movie ;
    rdfs:label "Inception"@en ;
    ex:releaseYear "2010"^^xsd:integer ;
    ex:duration 148 ;
    ex:rating 9.4 .

ex:Interstellar a ex:Movie ;
    rdfs:label "Interstellar"@en ;
    ex:releaseYear "2014"^^xsd:integer ;
    ex:duration 169 ;
    ex:rating 9.3 .

ex:Hero a ex:Movie ;
    rdfs:label "Hero"@en ;
    ex:releaseYear "2002"^^xsd:integer ;
    ex:duration 120 ;
    ex:rating 7.9 .

ex:RaiseTheRedLantern a ex:Movie ;
    rdfs:label "Raise the Red Lantern"@en ;
    ex:releaseYear "1991"^^xsd:integer ;
    ex:duration 103 ;
    ex:rating 8.1 .
```

### 2.2 练习 1：查询所有电影及其导演

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?movieLabel ?directorName
WHERE {
    ?movie a ex:Movie ;
           rdfs:label ?movieLabel ;
           ex:director ?director .
    ?director foaf:name ?directorName .
}
ORDER BY ?movieLabel
```

| ?movieLabel | ?directorName |
|-------------|---------------|
| "Inception"@en | "Christopher Nolan" |
| "Interstellar"@en | "Christopher Nolan" |
| "Hero"@en | "张艺谋" |
| "Raise the Red Lantern"@en | "张艺谋" |

### 2.3 练习 2：统计每位导演执导了多少部电影

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?directorName (COUNT(?movie) AS ?movieCount)
WHERE {
    ?movie a ex:Movie ;
           ex:director ?director .
    ?director foaf:name ?directorName .
}
GROUP BY ?directorName
ORDER BY DESC(?movieCount)
```

| ?directorName | ?movieCount |
|---------------|-------------|
| "张艺谋" | 2 |
| "Christopher Nolan" | 2 |

### 2.4 练习 3：查询 2005 年后发行、评分 8.0 以上的电影

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?movieLabel ?releaseYear ?rating ?director
WHERE {
    ?movie a ex:Movie ;
           rdfs:label ?movieLabel ;
           ex:releaseYear ?releaseYear ;
           ex:rating ?rating ;
           ex:director ?director .
    FILTER(?releaseYear > 2005 && ?rating >= 8.0)
}
ORDER BY DESC(?rating)
```

| ?movieLabel | ?releaseYear | ?rating | ?director |
|-------------|-------------|---------|-----------|
| "Interstellar"@en | 2014 | 9.3 | ex:ChristopherNolan |

---

## 3. 场景练习二：DBpedia 实战

下面使用 DBpedia 公开数据作为练习数据源，展示真实场景中的 SPARQL 查询。

### 3.1 查询 DBpedia 中的所有中国电影

```sparql
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?title ?releaseYear
WHERE {
    ?movie a dbo:Film ;
           rdfs:label ?title ;
           dbo:language <http://dbpedia.org/resource/Chinese_language> .
    OPTIONAL {
        ?movie dbp:releaseDate ?releaseYear .
    }
    FILTER(LANG(?title) = "zh" || LANG(?title) = "en")
}
ORDER BY DESC(?releaseYear)
LIMIT 20
```

**要点说明**：

| 技术点 | DBpedia 中的映射 |
|--------|-----------------|
| dbo:Film | DBpedia 中的电影本体类别 |
| dbp:language | 电影语言属性 |
| rdfs:label | DBpedia 的资源标签 |
| LANG 过滤 | DBpedia 资源标签有中英双语 |

### 3.2 DBpedia 联邦查询：使用 SERVICE 查询导演详细信息

```sparql
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# 查询 DBpedia 中"盗梦空间"的电影信息和导演详情
SELECT ?title ?directorName ?wikiAbstract
WHERE {
    <http://dbpedia.org/resource/Inception>
        dbo:director ?director ;
        rdfs:label ?title .
    # 远程端点查询：从 DBpedia 获取导演的 FOAF 名称和摘要
    SERVICE <http://dbpedia.org/sparql> {
        ?director foaf:name ?directorName ;
                  rdfs:comment ?wikiAbstract .
        FILTER(LANG(?directorName) = "en" && LANG(?wikiAbstract) = "en")
    }
}
```

**查询结果**：

| ?title | ?directorName | ?wikiAbstract |
|--------|--------------|---------------|
| "Inception"@en | "Christopher Nolan" | "British-American film director, producer, screenwriter and composer..." |

---

## 4. 场景练习三：聚合与统计分析

### 4.1 查询各年份发行电影数量的分布统计

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?decade (COUNT(?decade) AS ?movieCount)
WHERE {
    ?movie ex:releaseYear ?year .
    BIND(XSD:integer((?year / 10) * 10) AS ?decade)
}
GROUP BY ?decade
ORDER BY DESC(?decade)
```

### 4.2 计算电影的平均评分和平均时长

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT (AVG(?rating) AS ?avgRating)
        (AVG(?duration) AS ?avgDuration)
        (MIN(?rating) AS ?minRating)
        (MAX(?rating) AS ?maxRating)
WHERE {
    ?movie ex:rating ?rating ;
           ex:duration ?duration .
}
```

### 4.3 查找各导演的平均评分

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?directorName
       (AVG(?rating) AS ?avgRating)
       (COUNT(?movie) AS ?movieCount)
WHERE {
    ?movie a ex:Movie ;
           ex:director ?director ;
           ex:rating ?rating .
    ?director foaf:name ?directorName .
}
GROUP BY ?directorName
HAVING(COUNT(?movie) >= 1)
ORDER BY DESC(?avgRating)
```

| ?directorName | ?avgRating | ?movieCount |
|---------------|------------|-------------|
| "Christopher Nolan" | 9.35 | 2 |
| "张艺谋" | 8.0 | 2 |

---

## 5. 常见问题排查

在使用 SPARQL 查询 DBpedia / Sesame 端点时，会遇到以下常见问题：

### 5.1 超时（Timeout）

| 现象 | 提示"Query Timeout"或返回错误 |
|------|---------------------------|
| 原因 | 查询复杂度过高，超过端点设的超时时间（通常 30-60 秒） |
| 解决方案 | 使用 LIMIT 限制结果；使用 SERVICE 前先约束变量；减少 UNION/OPTIONAL 分支数 |

```sparql
# ❌ 可能超时的写法：全图扫描大量 OPTIONAL
SELECT ?movie ?director ?wikiPage
WHERE {
    ?movie a dbo:Film .                    # DBpedia 上有上百万电影
    OPTIONAL { ?movie dbo:director ?director . }
    OPTIONAL {
        SERVICE <http://dbpedia.org/sparql> {
            ?director foaf:page ?wikiPage .
        }
    }
}

# ✅ 改进：限定 + 提前约束
SELECT ?movie ?director
WHERE {
    ?movie a dbo:Film ;
           dbo:director ?director .       # 去掉 OPTIONAL 直接匹配
           rdfs:label ?label .
    FILTER(LANG(?label) = "en")
    FILTER(STRSTARTS(?label, "In"))        # 限定范围
    LIMIT 10
}
```

### 5.2 命名空间错误（Namespace Mismatch）

| 现象 | 无结果返回（结果表为空） |
|------|---------------------|
| 原因 | 使用了错误的 prefix 或 IRI |
| 排查方式 | 先用 ASK 验证实体是否存在 |

```sparql
# 先验证 DBpedia 中的 Inception 电影是否存在
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

ASK {
    <http://dbpedia.org/resource/Inception> a dbpedia-owl:Film .
}
```

### 5.3 编码问题

| 现象 | 中文结果返回 NULL |
|------|------------------|
| 原因 | 字符编码或语言标签不匹配 |
| 解决方案 | 使用 `FILTER(LANG(?var) = "zh")` 或 `LANGMATCHES` |

```sparql
# ✅ 匹配所有中文标签
FILTER(LANG(?label) = "zh" || LANGMATCHES(LANG(?label), "zh"))

# ✅ 匹配无语言标签的字符串
FILTER(!BOUND(LANG(?var)) || LANG(?var) = "")
```

### 5.4 空值（NULL）导致的意外结果

在 SPARQL 中进行数值比较时，如果变量绑定为 NULL，比较结果将**始终为 false**，导致数据被意外过滤掉：

```sparql
# ❌ 当 ?optionalRating 为空时，此 FILTER 会将所有 null 行移除
SELECT ?movie ?rating
WHERE {
    ?movie dbo:film ?rating .
    OPTIONAL { ?movie dbo:audienceScore ?optionalRating . }
    FILTER(?rating > 8.0 && ?optionalRating > 80)
}

# ✅ 正确做法：对 NULL 使用 COALESCE 或 BOUND
SELECT ?movie ?rating
WHERE {
    ?movie dbo:film ?rating .
    OPTIONAL { ?movie dbo:audienceScore ?optionalRating . }
    FILTER(?rating > 8.0)
    FILTER(!BOUND(?optionalRating) || ?optionalRating > 80)
}
```

---

## 6. 总结

| 工具/端点 | 关键要点 |
|-----------|----------|
| W3C SPARQL Playground | 快速测试 SPARQL 查询的在线工具 |
| DBpedia Endpoint | 最大开源结构化数据集（500 万实体），支持可视化 |
| Wikidata Endpoint | 支持复杂时间序列查询，自带编辑接口 |
| 超时排查 | 使用 LIMIT、约束变量、减少 OPTIONAL |
| 常见问题 | 命名空间、编码、空值处理是关键排查方向 |

---

> **下一章**：[14.1 SHACL 简介](../ch14-shacl-validation/01-shacl-introduction.md) — 了解 SHACL（Shapes Constraint Language）约束语言，它是 RDF 图的验证标准，定义了数据模式规则。