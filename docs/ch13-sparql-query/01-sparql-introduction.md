# 13.1 SPARQL 简介

> **本节要点**：理解 SPARQL 协议的定义与标准化历程，掌握 SPARQL 与 SQL 的类比关系，了解四种基本查询结果类型（SELECT, CONSTRUCT, DESCRIBE, ASK）及应用场景。

---

### 🔗 前置知识

在继续学习本章之前，建议先阅读以下内容：

- [第 11 章：OWL 2 属性公理](../ch11-owl2-property-axioms/index.md) — 属性定义与约束
- [第 10 章：OWL 2 类建模](../ch10-owl2-class-modeling/index.md) — 类表达式与等价定义
- [第 4 章：RDF 数据模型](../ch04-rdf-data-model/index.md) — 三元组与资源

### ▶️ 继续阅读

学习完本章后，可继续探索：

- [第 13.2 节：基本图模式查询](./02-basic-graph-patterns.md) — 深入三元组模式（Triple Pattern）、基本图模式（BGP）等
- [第 14 章：SHACL 数据验证](../ch14-shacl-validation/index.md) — 如何使用 SHACL 验证 RDF 数据

## 1. SPARQL 的定义与历史

**SPARQL**（SPARQL Protocol and Query Language，SPARQL 协议与查询语言）是 W3C 推荐的**语义网（Semantic Web）** RDF 数据查询标准语言，被誉为"RDF 数据库上的 SQL"。

| 里程碑 | 日期 | 描述 |
|--------|------|------|
| SPARQL 1.0 | 2008 年 1 月 | 首个 W3C Recommendation（REC），包含 SELECT, CONSTRUCT, DESCRIBE, ASK 及基本图模式 |
| SPARQL 1.1 | 2013 年 3 月 | 新增 UNION, FILTER, subqueries, Aggregates, ORDER BY, LIMIT/OFFSET, OPTIONAL, INSERT/DELETE/UPDATE, Federated Query 等功能 |
| SPARQL 1.1 Update | 2013 年 3 月 | 定义数据修改操作（INSERT, DELETE, LOAD, CLEAR, CREATE, DROP, MOVE, COPY, ADD, ALIAS） |
| SPARQL 1.2（工作推进中） | — | 计划引入窗口函数、JSON-LD 原生支持、JSON 结果格式标准化、JSON Query 语言等新特性 |

**核心标准文档**：

| 标准 | URL |
|------|-----|
| SPARQL 1.1 Query | <https://www.w3.org/TR/sparql11-query/> |
| SPARQL 1.1 Update | <https://www.w3.org/TR/sparql11-update/> |
| SPARQL 1.1 Protocol | <https://www.w3.org/TR/sparql11-protocol/> |
| SPARQL 1.1 Federated Query | <https://www.w3.org/TR/sparql11-federated-query/> |

---

## 2. SPARQL vs SQL 类比

SPARQL 和 SQL 虽然作用于不同的数据模型，但在概念上存在清晰的映射关系：

| 概念 | SQL（关系型） | SPARQL（图数据库） |
|------|--------------|-------------------|
| 数据模型 | 表（Table） | 图模式 / RDF 图（RDF Graph） |
| 基本单元 | 行（Row / Record） | 三元组（Triple） |
| 列 | 属性（Column） | 谓词/属性（Predicate / Property） |
| 行值 | 元组（Tuple） | RDF 三元组 `<主体 Predicate 客体>` |
| 查询语言 | SELECT...FROM...WHERE | SELECT...WHERE |
| 连接 | JOIN | 基本图模式（Basic Graph Pattern, BGP） |
| 聚合函数 | GROUP BY + COUNT/SUM/AVG... | GROUP BY + COUNT/SUM/AVG... |
| 外连接 | LEFT JOIN | OPTIONAL 子句 |
| 子查询 | SELECT...WHERE...IN | subquery + EXISTS/NOT EXISTS |

```sparql
# SQL 示例（关系模型）
SELECT c.name, COUNT(o.id)
FROM Customer c
JOIN Order o ON c.id = o.customer_id
WHERE c.country = 'CN'
GROUP BY c.name
ORDER BY COUNT(o.id) DESC;

# ═══════════════════════════════════════════
# 对应 SPARQL 示例（图模型）
# ═══════════════════════════════════════════

PREFIX : <http://example.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?custName (COUNT(?order) AS ?orderCount)
WHERE {
    ?customer a :Customer ;
              :hasName ?custName ;
              :country "CN" ;
              :hasOrder ?order .
}
GROUP BY ?custName
ORDER BY DESC(?orderCount) ;
LIMIT 10
```

**关键差异总结**：

| 方面 | SQL | SPARQL |
|------|-----|--------|
|  schema 固定性 | 模式固定，列数确定 | **开放式世界**，无需预先定义模式 |
| 数据联合 | `JOIN` 操作需显式指定连接条件 | **图模式匹配**自动隐式联合匹配 |
| 查询灵活度 | 高（可定义多表复杂连接） | 更灵活（RDF 图中任意路径可查） |

---

## 3. 四种基本查询结果类型

SPARQL 1.1 定义了四种查询形式，各自对应不同的输出类型和使用场景。

### 3.1 SELECT — 结果集查询

**SELECT** 查询返回一个**二维结果表**，即变量名和变量值的映射表。这是最常用、使用频率最高的查询类型。

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?name ?mbox
WHERE {
    ?person a foaf:Person ;
            foaf:name ?name ;
            foaf:mbox ?mbox .
}
```

**结构说明**：

| 组成部分 | SPARQL | SQL 对应 |
|----------|--------|----------|
| 要检索的变量 | `SELECT ?name ?mbox` | `SELECT name, mbox` |
| 模式匹配 | `WHERE { ... }` | `FROM ... WHERE ...` |
| 排序与分页 | `ORDER BY ... LIMIT ... OFFSET ...` | 完全对应 |

**适用场景**：提取结构化数据列表、聚合统计分析、列表展示页面数据源。

---

### 3.2 CONSTRUCT — 三元组图构造

**CONSTRUCT** 查询使用 **模板（Template）**，根据 `WHERE` 子句中匹配到的变量值，构造出新的 RDF 图（三元组集合）。

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

CONSTRUCT {
    ?person a foaf:Person ;
            foaf:name ?name ;
            foaf:basedIn ?city .
}
WHERE {
    ?person foaf:name ?name ;
            foaf:knows[:bornIn / foaf:name] ?city .
}
```

**适用场景**：数据转换（如：将 FOAF 数据映射为自定义本体的 RDF 模型）、数据整合合并、生成新 RDF 图。

**结果示例（Turtle 格式）**：

```turtle
<http://example.org/person/alice>
    a foaf:Person ;
    foaf:name "Alice" ;
    foaf:basedIn <http://example.org/city/beijing> .
```

---

### 3.3 DESCRIBE — 资源描述

**DESCRIBE** 查询返回一个 RDF 图，该图描述了指定的资源（URI/IRI）。

> ⚠️ **DESCRIBE 的结果格式由实现（端点）自行定义**，标准未强制规定返回哪一组三元组。多数端点会返回与该资源相关的所有已知三元组。

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

DESCRIBE <http://example.org/person/alice>
```

**适用场景**：快速获取某资源的全部已知信息、浏览器中快速预览 RDF 资源、探索性数据查询。

**结果差异说明**：

| 端点实现 | 通常返回 |
|----------|----------|
| DBpedia | 该资源的描述三元组 + 链接的邻居节点数据 |
| GraphDB | 指定深度的邻居数据 |
| Apache Jena Fuseki | 该资源所有三元组 |

---

### 3.4 ASK — 布尔值查询

**ASK** 查询返回 `true` 或 `false` 布尔值，用于判断数据是否存在，或判断条件是否满足。

```sparql
PREFIX ex: <http://example.org/ontology#>

ASK {
    :ZhangYimowl a ex:Director ;
                 ex:directed ?movie .
}
```

**适用场景**：验证某信息是否存在、判断某条件是否成立、前后端数据存在性检查。

**与 SELECT 的等效表达**：

```sparql
# 等效于 ASK { :Alice foaf:name ?name . }
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT (COUNT(?name) > 0 AS ?hasName)
WHERE {
    :Alice foaf:name ?name .
}
```

**四种查询类型对比汇总**：

| 查询类型 | 返回值类型 | 典型场景 | 类似 SQL |
|----------|-----------|----------|----------|
| `SELECT` | 变量值表（二维表） | 提取列表、聚合计算 | `SELECT columns` |
| `CONSTRUCT` | RDF 图（三元组集合） | 数据转换/映射 | `SELECT * INTO new_table` |
| `DESCRIBE` | RDF 图（资源描述） | 探索数据、资源详情 | 无直接对应 |
| `ASK` | 布尔值（true/false） | 存在性检查 | `SELECT EXISTS(...)` |

---

## 4. SPARQL 基本查询结构

### 4.1 查询骨架

一个完整的 SPARQL 查询由以下核心元素构成：

```sparql
# 可选 — 使用短名称前缀简化 IRI
PREFIX ex: <http://example.org/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# 查询类型 + 变量声明或模板
SELECT ?name ?age
# WHERE 子句 — 图模式匹配
WHERE {
    ?person a ex:Person ;
            ex:name ?name ;
            ex:age ?age .
    FILTER(?age > 30)
}
# 可选 — 排序、限制
ORDER BY DESC(?age)
LIMIT 10
```

**SPARQL 查询核心组件**：

| 组件 | 必需性 | 说明 |
|------|--------|------|
| `PREFIX` | 可选 | 定义 IRI 前缀映射，简化 IRIs 书写 |
| `SELECT / CONSTRUCT / DESCRIBE / ASK` | 必需 | 指定查询类型 |
| `FROM / FROM NAMED` | 可选 | 指定要查询的 RDF 图或命名图 |
| `WHERE` | 必需* | 包含图模式表达式（CONSTRUCT/DESCRIBE 中非可选但可隐式） |
| `FILTER` | 可选 | 过滤匹配结果 |
| `GROUP BY` | 可选 | 聚合分组 |
| `HAVING` | 可选 | 过滤分组结果 |
| `ORDER BY` | 可选 | 排序 |
| `LIMIT` | 可选 | 限制结果条数 |
| `OFFSET` | 可选 | 结果偏移量（分页） |
| `DISTINCT` | 可选 | 去重 |
| `REDUCED` | 可选 | 减少冗余 |

> \* `CONSTRUCT / DESCRIBE` 中 `WHERE` 子句为可选，但不含 `WHERE` 时无过滤条件，等同于全图扫描。

---

### 4.2 前缀声明（PREFIX）

**前缀**（Prefix）是 SPARQL 中的一种简写机制，通过**短名称（Local Name）+ IRI 基地址**的方式来替代冗长完整的 IRI。

```sparql
# 完整 IRI 写法
SELECT * WHERE {
    <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>
        <http://example.org/ontology#Person> .
}

# 使用前缀（等效写法）
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ex: <http://example.org/ontology#>

SELECT * WHERE {
    ?person rdf:type ex:Person .
}
```

**使用规范建议**：

| 命名空间 | 推荐前缀 |
|----------|----------|
| RDF | `rdf:` |
| RDFS | `rdfs:` |
| OWL | `owl:` |
| FOAF | `foaf:` |
| DBpedia Ontology | `dbo:` |
| DBpedia Property | `dbp:` |
| Schema.org | `schema:` |
| SKOS | `skos:` |
| XSD | `xsd:` |

---

## 5. SPARQL 与 RDF 数据模型的映射

RDF 数据模型中，数据以**三元组**（`<Subject Predicate Object>`）的形式存储在**RDF 图（Graph）**中。

```turtle
# Turtle 示例数据
<http://example.org/person/001> a <http://example.org/ontology#Person> ;
    <http://example.org/ontology#name> "张三" ;
    <http://example.org/ontology#age> "35"^^<http://www.w3.org/2001/XMLSchema#integer> .
```

**三元组的组成部分及 SPARQL 中的表达**：

| RDF 三元组 | 完整形式 | SPARQL 变量表示 |
|------------|---------|----------------|
| 主体（Subject） | `<http://example.org/person/001>` | `?person` |
| 谓词（Predicate） | `<http://example.org/ontology#name>` | `:name` |
| 客体（Object） | `"张三"`（字面量） | `"张三"`（常量） |
| 客体（Object） | `<http://example.org/ontology#Person>`（IRI） | `:Person` 或 `<...>` |

```sparql
PREFIX ex: <http://example.org/ontology#>

SELECT ?name ?age
WHERE {
    ?person a ex:Person ;           # ?person rdf:type ex:Person
            ex:name ?name ;         # ?person ex:name ?name
            ex:age ?age .           # ?person ex:age ?age
}
```

**图模式**（Graph Pattern）在 SPARQL 中被定义为**三元组的集合**，每个三元组可以是三元组模式（Triple Pattern），即包含变量的模式三元组。

```
┌──────────────────────────────────────────────────┐
│                  RDF 图结构                       │
│                                                  │
│  (张三) ● ─── ex:name ───────────► "张三"        │
│         │                                     ▲  │
│         │ ex:age                              │  │
│         ▼                                     │  │
│       35 ─────────────────────────────────────┘  │
│                                                  │
│  SPARQL 匹配过程：                               │
│  ?person → 匹配到 (张三) 节点的 RDF 主体          │
│  ?name   → 绑定到 "张三" 字面量                   │
│  ?age    → 绑定到 35 字面量                       │
└──────────────────────────────────────────────────┘
```

---

## 6. SPARQL 端点（Endpoint）的概念

**SPARQL 端点（SPARQL Endpoint）** 是一种 HTTP Web 服务接口，接受用户以 **POST** 或 **GET** 请求发送的 SPARQL 查询，返回 RDF 或 Table 结果。它是 SPARQL 协议的核心组成部分。

### 6.1 端点通信协议

```
┌──────────┐    SPARQL 查询    ┌──────────────┐     RDF/JSON/TSV     ┌──────────┐
│  查询客户端  │ ─────────────────►│   SPARQL 端点  │ ◄──────────────────│  查询客户端  │
│  (Client)  │ ◄──────────────── │  (Endpoint)  │  查询结果            │  (Client)  │
└──────────┘    HTTP 响应      └──────────────┘  (Table/Graph)      └──────────┘
```

**请求示例**：

```bash
# POST 方式
POST /sparql HTTP/1.1
Host: dbpedia.org
Content-Type: application/x-www-form-urlencoded

query=PREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0ASELECT+%3Fname%0AWHERE+%7B%3Fs+foaf%3Aname+%3Fname.+%7D

# GET 方式
GET /sparql?query=PREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0ASELECT+%3Fname%0AWHERE+%7B%3Fs+foaf%3Aname+%3Fname.+%7D HTTP/1.1
Host: dbpedia.org
```

**常见结果格式**：

| 格式 | MIME Type | 适用场景 |
|------|-----------|----------|
| SPARQL Results JSON | `application/sparql-results+json` | Web API 客户端集成 |
| SPARQL Results XML | `application/sparql-results+xml` | 标准交换格式 |
| Turtle / RDF/XML | `text/turtle`, `application/rdf+xml` | CONSTRUCT/DESCRIBE 结果 |
| CSV / TSV | `text/csv`, `text/tsv` | 简单表格导出 |

### 6.2 常见 SPARQL 端点资源

| 端点名称 | 地址 | 数据源 |
|----------|------|--------|
| DBpedia SPARQL Endpoint | <https://DBpedia.org/sparql> | DBpedia 百科数据 |
| Wikidata SPARQL Endpoint | <https://query.wikidata.org/sparql> | 维基百科结构化数据 |
| W3C SPARQL Playground | <https://www.w3.org/2013/04/w3c/sparql/> | W3C 内部数据集 |
| GeoSPARQL Endpoints | <https://www.geopkg.org/query/sparql> | 地理空间数据 |

### 6.3 本地端点工具

| 工具 | 端点服务 | 支持功能 |
|------|---------|----------|
| Apache Jena Fuseki | `http://localhost:3030/` | SELECT/CONSTRUCT/DESCRIBE/ASK, UPDATE |
| GraphDB | `http://localhost:7200/` | 同上，含语义推理 |
| Blazegraph | `http://localhost:8888/blazegraph/sparql` | 高性能图数据库 |
| RDF4J Workbench | `http://localhost:8080/` | 全功能管理 |

---

## 7. 示例：查询豆瓣电影 Top 250

```sparql
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX schema: <http://schema.org/>

SELECT ?title ?director ?rating
WHERE {
    ?movie a schema:Movie ;
           schema:name ?title ;
           schema:aggregateRating ?rating .
    ?movie schema:director ?director .
    ?director foaf:name ?directorName .
    FILTER(LANGMATCHES(LANG(?title), "zh"))
}
ORDER BY DESC(?rating)
LIMIT 252
```

---

## 8. 总结

| 概念 | 关键要点 |
|------|----------|
| SPARQL | W3C 标准（1.0/1.1），语义网核心查询语言 |
| SPARQL vs SQL | 表 → 图，行 → 三元组，JOIN → BGP |
| 四种查询 | SELECT（结果表），CONSTRUCT（构造图），DESCRIBE（资源描述），ASK（布尔值） |
| 前缀 | PREFIX 用于简化 IRI 书写，遵循 FOAF/DBpedia/Schema.org 等惯例 |
| 端点 | SPARQL Endpoint 提供 HTTP 服务，支持 POST/GET |

---

> **下一章**：[13.2 基本图模式查询](./02-basic-graph-patterns.md) — 深入三元组模式（Triple Pattern）、基本图模式（BGP）、变量匹配、OPTIONAL、FILTER、LIMIT/OFFSET 及 ORDER BY 等图模式查询技术。

## 💡 在线验证

以下链接可将本节的代码粘贴到在线 RDF/SPARQL 验证器中进行语法检查：

- [Virtuoso Online SPARQL Editor](https://virtuoso.openlinksw.com/dataspace/dav/wiki/Open/VOS/WebQueryEditor/)
- [RDFg — Turtle Editor & Validator](https://rdfg.org/)
- [Turtle Validator Online](https://semrobot.net/turtle-validator/)

**使用方式**：
1. 复制上方的任意一个代码块
2. 粘贴到上述任意一个验证器的输入框中
3. 点击"Parse"或"Validate"按钮
4. 若解析成功则说明语法符合相关 W3C 规范