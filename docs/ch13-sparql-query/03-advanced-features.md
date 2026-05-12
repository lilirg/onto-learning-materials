# 13.3 高级查询特性

> **本节要点**：掌握 UNION 联合查询、子查询（SUBQUERY）、聚合函数（COUNT/SUM/AVG/MIN/MAX/GROUP BY）、SERVICE 联邦查询（Federated Query）以及 SPARQL 更新操作（INSERT/DELETE/UPDATE）。

---

## 1. UNION 联合查询

**UNION** 允许在 `WHERE` 子句中匹配**多组图模式**中的任意一组，类似于 SQL 中的 `UNION`（但 SPARQL 中是模式并集而非集合去重）。

### 1.1 基本 UNION

```sparql
PREFIX ex: <http://example.org/ontology#>

# 查找所有名字或邮箱为 ?value 的个体
SELECT ?person ?value
WHERE {
    { ?person ex:name ?value }
    UNION
    { ?person ex:email ?value }
}
```

**与 OR 条件的区别**：

| 特性 | UNION | FILTER(?x = ?a || ?y = ?b) |
|------|-------|--------------------------|
| 模式结构 | 多组独立三元组模式 | 单个图模式 + 布尔条件 |
| 变量范围 | 各组内部独立 | 同一 WHERE 上下文中共享 |
| 性能 | 通常更优（提前过滤） | 可能扫描更多中间结果 |

### 1.2 复杂 UNION

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?name ?info
WHERE {
    {
        ?person a ex:Person ;
                ex:name ?name ;
                ex:age ?info .
    }
    UNION
    {
        ?person foaf:name ?name ;
                foaf:mbox ?info .
    }
}
```

### 1.3 UNION 与 OPTIONAL 结合

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?name ?contact
WHERE {
    ?person a ex:Person ;
            ex:name ?name .
    OPTIONAL {
        { ?person ex:email ?contact }
        UNION
        { ?person ex:phone ?contact }
    }
}
```

---

## 2. 子查询（Subquery）

**子查询**（Subquery）是指嵌套在另一查询 `WHERE` 块内部的完整 SPARQL 查询，提供类似 SQL 子查询的能力。

### 2.1 IN 子查询

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?name
WHERE {
    ?person ex:name ?name ;
            ex:city ?city .
    # 仅保留城市在子查询结果集中的记录
    FILTER(?city IN (
        SELECT ?targetCity
        WHERE {
            ?targetCity ex:isCapitalOf "China" .
        }
    ))
}
```

### 2.2 EXISTS 子查询

```sparql
PREFIX ex: <http://example.org/ontology#>

# 查询所有有关联电影（通过 hasMovie 属性）的导演
SELECT ?directorName
WHERE {
    ?director ex:name ?directorName .
    FILTER EXISTS {
        ?director ex:hasMovie ?movie .
    }
}
```

**NOT EXISTS 反选**：

```sparql
# 查询没有关联任何电影的导演
SELECT ?directorName
WHERE {
    ?director ex:name ?directorName .
    FILTER NOT EXISTS {
        ?director ex:hasMovie ?movie .
    }
}
```

---

## 3. 聚合函数（Aggregate Functions）

SPARQL 1.1 提供了**六种核心聚合函数**，配合 `GROUP BY` 可以实现强大的统计分组查询。

| 聚合函数 | 对应 SQL | 说明 |
|----------|----------|------|
| `COUNT(?x)` | `COUNT(?x)` | 统计非 NULL 值数量 |
| `SUM(?x)` | `SUM(?x)` | 数值总和（数字类型） |
| `AVG(?x)` | `AVG(?x)` | 数值平均数 |
| `MIN(?x)` | `MIN(?x)` | 最小值 |
| `MAX(?x)` | `MAX(?x)` | 最大值 |
| `GROUP_CONCAT(?x; separator="")` | 无直接对应 | 字符串连接聚合 |

### 3.1 基础聚合：COUNT

```sparql
PREFIX ex: <http://example.org/ontology#>

# 统计总共有多少个电影个体
SELECT (COUNT(?movie) AS ?movieCount)
WHERE {
    ?movie a ex:Movie .
}
```

### 3.2 GROUP BY 聚合

```sparql
PREFIX ex: <http://example.org/ontology#>

# 按城市分组统计每个城市有多少人
SELECT ?city (COUNT(?person) AS ?personCount)
WHERE {
    ?person a ex:Person ;
            ex:livesIn ?city .
}
GROUP BY ?city
ORDER BY DESC(?personCount)
```

| ?city | ?personCount |
|-------|-------------|
| <ex:Beijing> | 1280 |
| <ex:Shanghai> | 960 |
| <ex:Guangzhou> | 735 |

### 3.3 多聚合函数组合

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

# 统计每个导演的电影数量、最高评分、最低评分、平均时长
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?directorName
       (COUNT(?movie) AS ?movieCount)
       (MAX(?rating) AS ?maxRating)
       (MIN(?rating) AS ?minRating)
       (AVG(?duration) AS ?avgDuration)
WHERE {
    ?movie ex:director ?director ;
           ex:rating ?rating ;
           ex:duration ?duration .
    ?director foaf:name ?directorName .
}
GROUP BY ?directorName
ORDER BY DESC(?movieCount)
```

| ?directorName | ?movieCount | ?maxRating | ?minRating | ?avgDuration |
|---------------|-------------|------------|------------|--------------|
| "Christopher Nolan" | 7 | 9.4 | 7.8 | 145.3 |
| "Zhang Yimou" | 28 | 8.9 | 5.2 | 132.1 |

---

### 3.4 HAVING 过滤聚合结果

**HAVING** 子句用于**过滤聚合后的结果**，类似于 SQL。

```sparql
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# 仅显示电影数量大于 5 的导演
SELECT ?directorName (COUNT(?movie) AS ?movieCount)
WHERE {
    ?movie ex:director ?director .
    ?director foaf:name ?directorName .
}
GROUP BY ?directorName
HAVING(COUNT(?movie) > 5)
ORDER BY DESC(?movieCount)
```

### 3.5 无 GROUP BY 的全图聚合

聚合函数可以不加 `GROUP BY`，此时对整个结果集进行单一聚合：

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT (COUNT(*) AS ?totalMovies)
       (AVG(?rating) AS ?averageRating)
WHERE {
    ?movie a ex:Movie ;
           ex:rating ?rating .
}
```

---

## 4. 远程端点查询 SERVICE（Federated Query）

**SERVICE** 是 SPARQL 1.1 的重要特性，允许从**多个远程 SPARQL 端点**获取数据进行联合查询，这是 DBpedia 端点推荐的核心用法。

### 4.1 SERVICE 语法

```sparql
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://dbpedia.org/property/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# 查询电影 <Inception> 的导演姓名
SELECT ?movieTitle ?directorName
WHERE {
    # 从本地（当前端点）查询
    <http://dbpedia.org/resource/Inception>
        a dbo:Film ;
        dbo:director ?director ;
        dbp:title ?movieTitle .

    # 从 DBpedia 远程端点获取导演详细信息
    SERVICE <http://dbpedia.org/sparql> {
        ?director foaf:name ?directorName .
    }
}
```

### 4.2 SERVICE 特性

| 特性 | 说明 |
|------|------|
| 数据源 | 远程 SPARQL Endpoint，指定 HTTP 端点 URL |
| 查询效率 | 仅检索与服务模式匹配的数据 |
| 结果合并 | 将远程端点结果与本地结果自然合并 |
| 变量约束 | SERVICE 内部的变量应通过本地 WHERE 预先约束 |

```
┌─────────────┐  SERVICE 查询     ┌──────────────────────────┐
│  本地端点    │ ───────────────► │  http://dbpedia.org/sparql │
│  (本地图)    │ ◄─────────────── │  (远程 DBpedia 图)         │
└─────────────┘   远程结果        └──────────────────────────┘
         │                         │
         └───────┬─────────────────┘
                 ▼
      合并为最终结果集
```

**性能建议**：在 `SERVICE` 前约束变量可以显著减少网络传输量和远程端点查询负载：

```sparql
# ✅ 推荐：先约束导演 ID，再查询
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?directorName
WHERE {
    ex:Nolan ex:directorNameEx "Christopher Nolan" .  # 先锁定个体
    SERVICE <http://dbpedia.org/sparql> {
        <http://dbpedia.org/resource/Christopher_Nolan>
            foaf:name ?directorName .
    }
}

# ⚠️ 不推荐：SERVICE 中变量不受约束，远程端点返回所有 foaf:name
# SELECT ?name WHERE { SERVICE <...> { ?s foaf:name ?name . } }
```

---

## 5. SPARQL 更新操作（SPARQL 1.1 Update）

SPARQL 1.1 不仅定义了查询语言，还定义了 **Update 语言**，支持数据的增删改操作。

### 5.1 INSERT DATA — 静态插入

一次性插入多条已知三元组：

```sparql
PREFIX ex: <http://example.org/ontology#>

INSERT DATA {
    ex:Inception a ex:Movie ;
        ex:title "盗梦空间"@zh ;
        ex:director ex:ChristopherNolan .

    ex:ChristopherNolan a ex:Director ;
        foaf:name "Christopher Nolan" .
}
```

### 5.2 INSERT INTO — 带模式插入

根据查询结果动态插入数据：

```sparql
PREFIX ex: <http://example.org/ontology#>

INSERT INTO ex:defaultGraph
WHERE {
    ?person ex:name ?name .
}
```

### 5.3 DELETE DATA — 静态删除

```sparql
PREFIX ex: <http://example.org/ontology#>

DELETE DATA {
    ex:Inception ex:releaseYear "2010"^^xsd:integer .
}
```

### 5.4 DELETE/WHERE — 模式匹配删除

```sparql
PREFIX ex: <http://example.org/ontology#>

DELETE WHERE {
    ?movie a ex:Movie .
    ?movie ex:tempLabel ?label .
}
```

### 5.5 组合 INSERT+DELETE

```sparql
PREFIX ex: <http://example.org/ontology#>

DELETE {
    ?movie ex:rating ?oldRating .
}
INSERT {
    ?movie ex:rating ?newRating .
}
WHERE {
    ?movie ex:rating ?oldRating .
    BIND(COALESCE(?newRating, ?oldRating) AS ?actualRating)
}
```

### 5.6 其他维护命令

| 命令 | 功能 |
|------|------|
| `CLEAR ALL` | 清空全部图 |
| `CLEAR GRAPH <uri>` | 清空指定命名图 |
| `DROP GRAPH <uri>` | 删除图 |
| `CREATE GRAPH <uri>` | 创建图 |
| `MOVE TO` | 移动图数据（DELETE + INSERT） |
| `COPY TO` | 复制图数据（仅 INSERT） |

---

## 6. 其他查询增强特性

### 6.1 FROM / FROM NAMED

`FROM` 和 `FROM NAMED` 显式指定要查询的 RDF 图：

| 子句 | 等价于 WHERE 中的 | 用途 |
|------|-----------------|------|
| `FROM <uri>` | `DEFAULT GRAPH` | 指定默认图 |
| `FROM NAMED <uri>` | `NAMED <uri>` | 指定命名图（通过 GRAPH 查询） |

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?name
FROM <http://example.org/data/persons.ttl>
WHERE {
    ?person ex:name ?name .
}
```

### 6.2 LIMIT 在子句中的行为

`LIMIT` 不仅可用于顶层查询，还可用于 **GROUP BY + ORDER BY** 场景：

```sparql
PREFIX ex: <http://example.org/ontology#>

# 返回每个部门年龄最大的人
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?department ?name ?age
WHERE {
    ?person ex:department ?department ;
            ex:name ?name ;
            ex:age ?age .
    FILTER NOT EXISTS {
        ?otherPerson ex:department ?department ;
                     ex:age ?higherAge .
        FILTER(?higherAge > ?age)
    }
}
LIMIT 10
```

---

## 7. 总结

| 特性 | 关键要点 |
|------|----------|
| UNION | 多组图模式匹配并集，等效于 SQL 多 SELECT UNION |
| 子查询 | IN, EXISTS, NOT EXISTS 支持嵌套过滤 |
| 聚合函数 | COUNT/SUM/AVG/MIN/MAX + GROUP BY/HAVING |
| SERVICE | 远程端点联邦查询，DBpedia 核心用法 |
| SPARQL Update | INSERT DATA, DELETE WHERE 等支持数据 CRUD |

---

> **下一章**：[13.4 练习：DBPedia / Sesame 在线端点查询](./04-practice-dbpedia-sesame.md) — 实操练习 DBpedia SPARQL 在线端点，结合电影本体完成一组从数据准备到结果验证的完整 SPARQL 查询场景。