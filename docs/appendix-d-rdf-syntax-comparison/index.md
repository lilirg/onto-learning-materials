# 附录 D: RDF 序列化格式对照表

> **本节要点**：RDF（Resource Description Framework）支持多种序列化格式。本附录系统比较 Turtle、N-Triples、N-Quads、TriG、Trix、JSON-LD 和 RDF/XML 的语法特征与适用场景。

---

## 1. RDF 格式全景总览

| 格式 | 简称 | 标准状态 | 支持命名图 | 人类可读 | 特点 |
|------|------|----------|-----------|---------|------|
| **RDF/XML** | RDF/XML | W3C 推荐标准 (2004) | 否 | 部分 | 原始 RDF 格式，XML 结构 |
| **Turtle** | TTL | W3C 推荐标准 (2014) | 否 | ✅ | 推荐的人可读格式 |
| **N-Triples** | N-Tri | W3C 建议 (2004) | 否 | ✅ | 最简单、每条语句独占一行 |
| **N-Quads** | N-Quads | 社区标准 | ✅ | ✅ | N-Triples 的扩展，支持命名图 |
| **TriG** | TriG | W3C 推荐标准 (2014) | ✅ | ✅ | Turtle 的扩展，支持命名图 |
| **Trix** | TriX | W3C 建议 (2008) | ✅ | 部分 | RDF/XML 的扩展，支持命名图 |
| **JSON-LD** | JSON-LD | W3C 推荐标准 (2014/2020) | 否 | ✅ | JSON 结构，Web 友好 |

---

## 2. 各格式详解

### 2.1 Turtle (.ttl)

**Turtle (Terse RDF Triple Language)** 是最常用的人可读 RDF 序列化格式。

#### 语法特征

```turtle
@prefix ex: <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# 类声明
ex:Person a owl:Class ;
    rdfs:label "人"@zh ;
    rdfs:comment "表示人类个体"@zh .

# 属性声明
ex:hasName a owl:DatatypeProperty ;
    rdfs:domain ex:Person ;
    rdfs:range xsd:string .

ex:hasParent a owl:ObjectProperty ;
    rdfs:domain ex:Person ;
    rdfs:range ex:Person .

# 个体实例
ex:alice a ex:Person ;
    ex:hasName "Alice"@en ;
    ex:hasAge 30^^xsd:integer ;
    ex:hasParent ex:bob, ex:carol .

ex:bob a ex:Person ;
    ex:hasName "Bob"@en ;
    ex:hasAge 55^^xsd:integer .

# 注释属性
ex:createdBy a owl:AnnotationProperty .
```

#### Turtle 核心语法要素

| 特性 | 语法 | 说明 |
|------|------|------|
| **前缀声明** | `@prefix ex: <...> .` | 简化 IRI 缩写 |
| **类型断言** | `a owl:Class` | `a` 是 `rdf:type` 的简写 |
| **多条属性** | `p1 v1 ; p2 v2 .` | 分号分隔同一主体的属性 |
| **多个值** | `p v1, v2 .` | 逗号分隔同一属性的多个值 |
| **字符串字面** | `"文本"@en` | 带语言标签的字符串 |
| **数据类型字面** | `"30"^^xsd:integer` | 带数据类型限制的字符串 |

---

### 2.2 N-Triples (.nt)

**N-Triples** 是 RDF 语法的最简形式，每条语句独占一行，完全无别名。

#### 语法特征

```ntriples
<http://example.org/Person> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Class> .
<http://www.w3.org/2000/01/rdf-schema#label> "人" .
<http://example.org/alice> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.org/Person> .
<http://example.org/alice> <http://example.org/hasName> "Alice" .
<http://example.org/alice> <http://example.org/hasAge> "30"^^<http://www.w3.org/2001/XMLSchema#integer> .
<http://example.org/alice> <http://example.org/hasParent> <http://example.org/bob> .
<http://example.org/alice> <http://example.org/hasParent> <http://example.org/carol> .
```

#### N-Triples 特点

| 特性 | 说明 |
|------|------|
| **格式** | 每行一个完整的三元组 |
| **结构** | `主语 谓语 宾语 .` |
| **IRI** | 必须使用完整 IRI（不缩写） |
| **前缀** | ❌ 不支持前缀声明 |
| **块级语法** | ❌ 不支持 `;` 或 `,` 语法 |
| **标准化** | ✅ 是 RDF 语义的标准格式 |
| **文件大小** | 最大（无缩写） |
| **处理性能** | 最快（结构简单） |

```turtle
# N-Triples 标准格式示例
# 主语必须是 URI 或 blank node
# 谓语必须是 URI
# 宾语可以是 URI、BNode 或 Literal

<URI> <URI> <URI> .      # 个体到个体
<URI> <URI> "literal" .  # 个体到字面值
<URI> <URI> _:b0 .       # 个体到匿名节点
```

---

### 2.3 N-Quads (.nq)

**N-Quads** 是 N-Triples 的扩展，每条语句增加**命名图（命名上下文）**。

#### 语法特征

```nquad
<http://example.org/alice> <http://example.org/hasName> "Alice" <http://example.org/graph1> .
<http://example.org/bob> <http://example.org/hasName> "Bob" <http://example.org/graph1> .
<http://example.org/alice> <http://example.org/knows> <http://example.org/bob> <http://example.org/graph2> .
```

#### N-Quads 结构

```
四元组格式: <主语> <谓词> <宾语> <命名图URI> .

组成部分:
├── 主语 (Subject): 资源的 URI
├── 谓词 (Predicate): 属性/关系的 URI
├── 宾语 (Object): URI 或字面值
└── 命名图 (Graph): 图名的 URI，表示该三元组所属的图
```

#### 适用场景

| 场景 | 说明 |
|------|------|
| **多图存储** | 管理多个来源/版本的三元组 |
| **变更追踪** | 记录三元组的元数据 |
| **图索引** | 为不同数据集建立索引 |

---

### 2.4 TriG (.trig)

**TriG (Turtle with Named Graphs)** 是 Turtle 的扩展，支持命名图。

#### 语法特征

```trig
@prefix ex: <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

# 默认图（无名的图）
{
  ex:alice a ex:Person ;
           ex:hasName "Alice" .
}

# 命名图 1
<http://example.org/graph/employees> {
  ex:bob a ex:Employee ;
         ex:hasName "Bob" ;
         ex:hasDepartment :Engineering .
}

# 命名图 2
<http://example.org/graph/contracts> {
  ex:alice ex:hasContract ex:contract001 .
  ex:contract001 a ex:Contract ;
                 ex:hasValue "100000"^^xsd:integer .
}
```

#### TriG vs Turtle 对比

| 特性 | Turtle | TriG |
|------|--------|------|
| 单个图 | ✅ | ✅ |
| 命名图 | ❌ | ✅ |
| 前缀声明 | ✅ | ✅（图级别） |
| 块语法 | ✅ | ✅ |
| 标准状态 | 推荐标准 | 推荐标准 |

```trig
# TriG 命名图中的前缀声明是局部的
PREFIX ex: <http://example.org/>
{
    <http://example.org/graph1> {
        ex:alice ex:name "Alice" .
        # 此处的 ex: 仅限本图
    }
}
```

---

### 2.5 TriX (.tx)

**TriX** 是基于 XML 的 RDF 序列化格式，支持命名图。

#### 语法特征

```xml
<?xml version="1.0" encoding="UTF-8"?>
<TriX xmlns="http://www.w3.org/2003/TriX#Schema#"
      xmlns:ex="http://example.org/">
  <!-- 默认图 -->
  <graph uri="http://example.org/default">
    <subject uri="http://example.org/alice"/>
    <predicate uri="http://example.org/hasName"/>
    <literal datatype="http://www.w3.org/01/XMLSchema#string">Alice</literal>
  </graph>
  <!-- 命名图 1 -->
  <graph uri="http://example.org/graph1">
    <subject uri="http://example.org/bob"/>
    <predicate uri="http://example.org/hasName"/>
    <literal datatype="http://www.w3.org/01/XMLSchema#string">Bob</literal>
  </graph>
</TriX>
```

#### TriX 结构说明

```
TriX 层次结构:
└── TriX
    ├── graph (图)
    │   ├── subject (主体)
    │   ├── predicate (谓词)
    │   └── object (客体)
    │       ├── uri
    │       ├── bnode
    │       └── literal
    └── graph ...
```

---

### 2.6 RDF/XML

**RDF/XML** 是最早的 RDF 标准格式，使用 XML 语法。

#### 语法示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF
   xmlns:ex="http://example.org/"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
   xmlns:owl="http://www.w3.org/2002/07/owl#">

  <!-- 类定义：简写形式 -->
  <owl:Class rdf:about="http://example.org/Person"/>

  <!-- 属性定义：展开形式 -->
  <owl:ObjectProperty rdf:about="http://example.org/hasParent">
    <rdfs:domain rdf:resource="http://example.org/Person"/>
    <rdfs:range rdf:resource="http://example.org/Person"/>
  </owl:ObjectProperty>

  <!-- 个体实例：展开形式 -->
  <rdf:Description rdf:about="http://example.org/alice">
    <rdf:type rdf:resource="http://example.org/Person"/>
    <ex:hasName>Alice</ex:hasName>
    <ex:hasAge rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">30</ex:hasAge>
    <ex:hasParent rdf:resource="http://example.org/bob"/>
    <ex:hasParent rdf:resource="http://example.org/carol"/>
  </rdf:Description>

  <rdf:Description rdf:about="http://example.org/bob">
    <rdf:type rdf:resource="http://example.org/Person"/>
    <ex:hasName>Bob</ex:hasName>
    <ex:hasAge rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">55</ex:hasAge>
  </rdf:Description>

</rdf:RDF>
```

#### RDF/XML 样式表（美化显示）

```xml
<?xml-stylesheet type="text/xsl" href="ontology.xsl"?>
<!-- 可添加 XSLT 样式表使 RDF/XML 在浏览器中可读 -->
```

```css
/* ontology.xsl 样式表示例 */
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="owl:Class">
    <tr>
      <td><xsl:value-of select="@rdf:about"/></td>
    </tr>
  </xsl:template>
</xsl:stylesheet>
```

---

### 2.7 JSON-LD

**JSON-LD (JSON for Linking Data)** 是专为 Web 设计 Linked Data 序列化格式。

#### 基本语法

```json
{
  "@context": {
    "ex": "http://example.org/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@graph": [
    {
      "@type": "ex:Person",
      "@id": "ex:alice",
      "ex:hasName": "Alice",
      "ex:hasAge": 30,
      "ex:hasParent": {"@id": "ex:bob"}
    },
    {
      "@type": "ex:Person",
      "@id": "ex:bob",
      "ex:hasName": "Bob",
      "ex:hasAge": 55
    },
    {
      "@type": "ex:Class",
      "@id": "ex:Person",
      "rdfs:label": "人"
    }
  ]
}
```

#### JSON-LD 核心概念

| 关键字 | 含义 | 示例 |
|--------|------|------|
| `@context` | 上下文定义 | 前缀映射和术语定义 |
| `@id` | IRI 标识 | `"@id": "ex:alice"` |
| `@type` | RDF 类型 | `"@type": "ex:Person"` |
| `@value` | 字面值 | `"@value": 30, "@type": "xsd:integer"` |
| `@graph` | 命名图集合 | 包含多个图的数组 |
| `@nest` | 嵌套结构 | 合并对象的属性 |
| `@language` | 语言标签 | `"@value": "你好", "@language": "zh"` |
| `@graph` | 匿名图 | `"@id": "_:b0", "@graph": [...]` |

```json
// JSON-LD 高级用法：使用 @container
{
  "@context": {
    "ex": "http://example.org/",
    "skills": {
      "@id": "ex:hasSkill",
      "@container": "@language"
    }
  },
  "@type": "ex:Person",
  "@id": "ex:alice",
  "skills": {
    "en": "JavaScript",
    "zh": "JavaScript"
  }
}
```

---

## 3. 格式对比详解

### 3.1 功能特性对比

| 功能 | Turtle | N-Triples | N-Quads | TriG | TriX | RDF/XML | JSON-LD |
|------|--------|-----------|---------|------|------|---------|---------|
| 三元组表达 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 命名图 | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| 前缀声明 | ✅ | ❌ | ❌ | ✅（局部） | ❌ | ✅ |
| 块语法(;) | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| 列表语法 | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| 人类可读性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 文件大小 | 小 | 大 | 大 | 中 | 大 | 中 | 中 |
| 处理速度 | 快 | 最快 | 最快 | 快 | 中 | 中 | 快 |
| Web 友好 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### 3.2 Turtle vs N-Triples

| 对比项 | Turtle | N-Triples |
|--------|--------|-----------|
| 缩写能力 | 支持前缀和块语法 | 无缩写 |
| 可读性 | 较好 | 较差（冗长） |
| 标准化 | ✅ W3C 推荐标准 | ✅ W3C 建议标准 |
| 最佳用途 | 人类编辑/交换 | 处理/验证/标准化 |

```turtle
# 同一数据的两种表达对比

# Turtle (简洁):
@prefix ex: <http://example.org/> .
ex:alice ex:name "Alice" ;
         ex:age 30 .

# N-Triples (冗长):
<http://example.org/alice> <http://example.org/name> "Alice" .
<http://example.org/alice> <http://example.org/age> "30"^^<http://www.w3.org/2001/XMLSchema#integer> .
```

### 3.3 Turtle vs N-Quads

| 对比项 | Turtle | N-Quads |
|--------|--------|---------|
| 图支持 | 单个图 | 多命名图 |
| 结构 | 三元组 | 四元组（增加图标识） |
| 最佳用途 | 单本体/数据集 | 多图管理、图差分 |

### 3.4 TriG vs TriX

| 对比项 | TriG | TriX |
|--------|------|------|
| 语法 | 文本 | XML |
| 可读性 | 高 | 中等 |
| 使用频率 | 高 | 低 |
| 最佳用途 | 人类编辑多图文本 | 程序生成/操作 XML |

### 3.5 JSON-LD vs RDF/XML

| 对比项 | JSON-LD | RDF/XML |
|--------|---------|---------|
| 语法基础 | JSON | XML |
| Web 开发 | 非常友好 | 不够友好 |
| 人类可读性 | 高 | 中 |
| 机器解析 | 所有语言原生支持 | 需要 XML 解析器 |
| 上下文映射 | 内建 @context | 需要额外机制 |
| 社区使用 | Web/API 场景 | 传统语义网 |
| 推荐场景 | JavaScript/现代 Web | 传统 RDF/语义网 |

```javascript
// JavaScript 处理 JSON-LD 天然优势
const data = {
  "@context": { "ex": "http://example.org/" },
  "@id": "ex:alice",
  "ex:name": "Alice"
};
// JSON-LD 库处理
const rdfGraph = await jsonld.graph(data);

// JSON-LD 使用：从 URL 加载和展开
const expanded = await jsonld.expand(jsonldUrl);
const compacted = await jsonld.compact(rdfGraph, context);
```

---

## 4. 格式选择决策树

```
选择 RDF 序列化格式:

开始
│
├─ 是否需要支持命名图？
│   ├─ 是 ──► TriG（文本格式） / RDF/XML + Named Graphs
│   │          ├─ 人类编辑 → TriG
│   │          └─ 程序处理 → 根据项目语言选
│   └─ 否 ↓
│
├─ 主要用途是什么？
│   ├─ 人类编辑/阅读 → Turtle（首选）
│   ├─ 交换/分发 → Turtle
│   ├─ 存储/索引 → N-Triples
│   ├─ Web API → JSON-LD
│   │   ├─ JavaScript 环境 → JSON-LD
│   │   └─ 其他环境 → 考虑 RDF/XML 或 Turtle
│   └─ 标准化/验证 → N-Triples
│
├─ 文件大小是否重要？
│   ├─ 是 → Turtle / N-Triples
│   └─ 否 → 按其他偏好选
│
└─ 工具兼容性如何？
    ├─ Protégé → Turtle、RDF/XML、N-Triples
    ├─ Jena Fuseki → 所有格式（自动转换）
    └─ 浏览器/Web → JSON-LD

推荐选择：
├─ 通用首选 → Turtle
├─ Web API → JSON-LD
├─ 标准化处理 → N-Triples
└─ 多图管理 → TriG
```

---

## 5. 编码与压缩考虑

### 5.1 编码选择

| 场景 | 推荐格式 | 原因 |
|------|----------|------|
| **开发/调试** | Turtle | 最易读 |
| **版本控制** | Turtle | 差异明显 |
| **数据交换** | Turtle | 简洁、可读 |
| **API 响应** | JSON-LD | Web 友好 |
| **批量处理** | N-Triples | 简单高效 |
| **归档存储** | 任何格式 + 压缩 | 选择最适合工具链的 |

### 5.2 数据压缩

| 压缩方式 | 适用格式 | 压缩率 | 工具 |
|----------|----------|--------|------|
| **Gzip** | 所有文本格式 | ~85-92% | `gzip`, `zstd` |
| **Brotli** | 所有文本格式 | ~90-95% | `brotli` |
| **bz2** | 所有文本格式 | ~88-93% | `bzip2` |

#### 常用压缩工具

```bash
# 压缩 Turtle 文件
gzip -k dataset.ttl     # 生成 dataset.ttl.gz
zstd dataset.ttl         # 生成 dataset.ttl.zst

# HTTP 传输头
Content-Encoding: gzip
Content-Encoding: br

# RDF 常用压缩格式（语义压缩，非简单压缩）
| 格式 | 说明 | 压缩率提升 |
|------|------|-----------|
| Snappy RDF | 使用公共词汇子集 | ~50-70% |
| FastRDF | 使用属性/URI 索引 | ~60-80% |
| TurboRDF | 增量编码优化 | ~70-90% |
```

### 5.3 性能基准参考

| 格式 | 加载 1M 三元组 | 处理 1M 三元组 | 文件大小(压缩) |
|------|---------------|---------------|----------------|
| Turtle | 2-5s | 1-3s | ~15MB |
| N-Triples | 1-2s | 0.5-1s | ~50MB |
| RDF/XML | 5-10s | 3-5s | ~20MB |
| JSON-LD | 3-5s | 2-4s | ~25MB |

*注：测试结果因硬件和处理库而异。*

---

## 6. 完整示例对照

假设我们要建模以下数据：
> Alice 是人，名字是 "Alice"，年龄 30 岁。Alice 知道 Bob。

### 6.1 各格式完整示例

```turtle
# ========== Turtle (.ttl) ==========
@prefix ex: <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:Person a owl:Class .

ex:alice a ex:Person ;
    ex:hasName "Alice" ;
    ex:hasAge 30 ;
    ex:knows ex:bob .

ex:bob a ex:Person .
```

```ntriples
# ========== N-Triples (.nt) ==========
<http://example.org/alice> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.org/Person> .
<http://example.org/alice> <http://example.org/hasName> "Alice" .
<http://example.org/alice> <http://example.org/hasAge> "30"^^<http://www.w3.org/2001/XMLSchema#integer> .
<http://example.org/alice> <http://example.org/knows> <http://example.org/bob> .
<http://example.org/bob> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.org/Person> .
```

```trig
# ========== TriG (.trig) ==========
@prefix ex: <http://example.org/> .

{
    ex:alice a ex:Person ;
        ex:hasName "Alice" ;
        ex:knows ex:bob .
}
<http://example.org/graph2> {
    ex:bob a ex:Person .
}
```

```json
// ========== JSON-LD (.jsonld) ==========
{
  "@context": {
    "ex": "http://example.org/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@graph": [
    {
      "@id": "ex:alice",
      "@type": "ex:Person",
      "ex:hasName": "Alice",
      "ex:hasAge": {"@value": 30, "@type": "xsd:integer"},
      "ex:knows": {"@id": "ex:bob"}
    },
    {
      "@id": "ex:bob",
      "@type": "ex:Person"
    }
  ]
}
```

```xml
<!-- ========== RDF/XML (.rdf/.owl) ========== -->
<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:ex="http://example.org/"
         xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:owl="http://www.w3.org/2002/07/owl#">

  <owl:Class rdf:about="http://example.org/Person"/>

  <rdf:Description rdf:about="http://example.org/alice">
    <rdf:type rdf:resource="http://example.org/Person"/>
    <ex:hasName>Alice</ex:hasName>
    <ex:hasAge rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">30</ex:hasAge>
    <ex:knows rdf:resource="http://example.org/bob"/>
  </rdf:Description>

  <rdf:Description rdf:about="http://example.org/bob">
    <rdf:type rdf:resource="http://example.org/Person"/>
  </rdf:Description>

</rdf:RDF>
```

---

## 7. 格式转换

### 7.1 使用 Apache Jena 转换

```bash
# 使用 Jena 的 rdfparse 工具进行格式转换
# Turtle 到 N-Triples
rdfcat -out:ntriple input.ttl > output.nt

# N-Triples 到 RDF/XML
rdfcat -out:rdfxml input.nt > output.rdf

# 自动格式检测
rdfcat -out:autoturtle input.rdf > output.ttl
```

### 7.2 使用 Python rdflib 转换

```python
from rdflib import Graph

# 创建图
g = Graph()

# 读取任何格式（自动检测）
g.parse("data.ttl")       # Turtle
g.parse("data.nt")        # N-Triples
g.parse("data.rdf")       # RDF/XML
g.parse("data.jsonld")    # JSON-LD（需要 @context）

# 序列化输出
print(g.serialize(format="turtle"))       # Turtle
print(g.serialize(format="nt"))           # N-Triples
print(g.serialize(format="xml"))          # RDF/XML
print(g.serialize(format="json-ld"))      # JSON-LD
```

---

## 8. 常用前缀对照表

| 前缀 | 命名空间 URI | 说明 |
|------|-------------|------|
| `rdf` | `http://www.w3.org/1999/02/22-rdf-syntax-ns#` | RDF 核心 |
| `rdfs` | `http://www.w3.org/2000/01/rdf-schema#` | RDF 词汇表 |
| `owl` | `http://www.w3.org/2002/07/owl#` | OWL 本体 |
| `xsd` | `http://www.w3.org/2001/XMLSchema#` | XML 数据类型 |
| `dcterms` | `http://purl.org/dc/terms/` |  Dublin Core 术语 |
| `dbo` | `http://dbpedia.org/ontology/` | DBpedia 本体 |
| `dbr` | `http://dbpedia.org/resource/` | DBpedia 资源 |
| `foaf` | `http://xmlns.com/foaf/0.1/` | Friend of a Friend |
| `skos` | `http://www.w3.org/2004/02/skos/core#` | 简单知识库 |
| `sh` | `http://www.w3.org/ns/shacl#` | SHACL 约束语言 |
| `qudt` | `http://qudt.org/schema/qudt/` | 定量单位术语表 |