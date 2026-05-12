# 5.2 Turtle 语法详解

Turtle（Terse Triple Compound Turtle）是当今 RDF 序列化格式中的事实标准。它广泛采用了缩写（Terse Compound Syntax）特性，极大地减少了开发者编写和阅读 RDF 数据时的重复劳动。

> **本节要点**：掌握 Turtle 中前缀的定义与解析、三元素（SPO）的基础结构、复合语句缩写（`;` 和 `,`），以及空白节点（Blank Node）和列表（List）的表达方式。

---

## 1. Turtle 的基本组成要素

| 语法元素 | 书写示例 | 说明 |
| --- | --- | --- |
| **绝对 IRI** | `<http://xmlns.com/foaf/0.1/name>` | 用于精确引用，必须以尖括号包裹 |
| **前缀缩写** | `foaf:name` | 由冒号分隔的前缀和本地名构成 |
| **数据类型字面量** | `"Alice"^^xsd:string` | 指定值的语言或数据类型 |
| **语言标记** | `"Bonjour"@fr` | 用于多语言文本表达 |
| **空白节点** | `[] rdf:type foaf:Person` | 使用方括号表示未命名的匿名资源 |

### 1.1 命名空间与前缀声明

Turtle 的第一行通常是前缀声明，用于简化冗长的 IRI：

```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix schema: <http://schema.org/> .
@prefix ex: <http://example.org/> .

# 展开示例：
# ex:Alice foaf:name "Alice" .
# 等价于：
# <http://example.org/Alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
```

注意：前缀声明本身**不是**三元组，它只是告诉解析器如何在后续内容中进行文本替换。在序列化时，它们不会写入最终的 RDF 图结构中。

---

## 2. 基础三元组结构

Turtle 的核心依然是 `Subject Predicate Object .` 的形式：

### 2.1 主体与客体类型

| 节点类型 | 写法特点 | 示例代码 |
| --- | --- | --- |
| **IRI / 资源** | 尖括号 `<>` 或 `前缀:本地名` | `<http://dbpedia.org/resource/Paris>` |
| **普通字符串字面量** | 双引号包裹 `""` | `"Hello World"` |
| **带数据类型的字面量** | `"值"^^数据类型` | `"1999-12-31"^^xsd:date` |
| **数字字面量** | 直接书写 `0` 或 `1.5` (隐式 xsd 类型) | `42^^xsd:integer` 或 `3.14` |
| **布尔值字面量** | `"true"^^xsd:boolean` 或纯写 `true` | `true` |

### 2.2 复合写法：分号与逗号

Turtle 的核心魅力在于它能极大地简化连续表达的结构。
当共享**同一个主体**，我们可以使用分号 `;`。
当共享**同一个主体和同一个谓词**时，我们可以使用逗号 `,`。

```turtle
@prefix ex: <http://example.org/> .

# 以下两个写法是 100% 语义等价的：
# [1] 普通写法：
ex:Person1
    rdf:type ex:Developer .
ex:Person1
    ex:skills "Java" .
    
# [2] 缩写写法（推荐！）：
ex:Person1
    rdf:type ex:Developer ;      # 这里的分号表示 "主体还是 ex:Person1"
    ex:skills "Java" .           # 这里的逗号表示 "主体和谓词都省略"
```

更规范的写法如下：

```turtle
# 共享主体（主体省略）
:MyResource
    a rdf:Property ;         # (主体省略，谓词为 a)
    rdfs:domain :Class ;     # (主体省略，谓词为 domain)
    rdfs:range :Thing .      # (主体省略)

# 同一主体同一谓词，多个客体（主体和谓词均省略）
:MyResource
    ex:hasAlias "Mike" , "Michael", "Mikey" .
```

---

## 3. 类型简写与上下文简化

### 3.1 `a`：RDF 类型的简写

在 W3C 语义网标准中，`rdf:type` 是最基础的谓词。为了书写简洁，Turtle 定义了关键字 `a` 作为 `rdf:type` 的唯一替代符：

```turtle
:Cipher a foaf:Person ;
    foaf:name "Cipher" .
```
等价于：
```turtle
:Cipher rdf:type foaf:Person ;
    foaf:name "Cipher" .
```

---

## 4. 空白节点与复合资源表达

对于无法通过 IRI 精准命名的资源，Turtle 允许我们通过 `[ ]` 方括号快速声明匿名资源（Blank Node）。

### 4.1 简单的空白节点
```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .

:CurrentLocation
    geo:lat 52.204 ;
    geo:long 0.1178 ;
    geo:spatial [
        a geo:Geometry ;
        geo:asWKT "POINT(52.204 0.1178)"^^geo:wktLiteral .
    ] .
```
上面的例子中，`[ ... ]` 代表一个新的匿名 Blank Node。它在底层会被赋予像 `_:b0` 的编号，但书写时无需分配特定名称。

### 4.2 列表（Lists / `rdf:rest` / `rdf:first`）

Turtle 提供了一种极其直观的括号 `()` 缩写方式，表示 RDF 集合或序列（Linked Lists in RDF）。

| 写法 | 展开说明（内部逻辑） | 示例 |
| --- | --- | --- |
| `( ... )` | 展开为 `rdf:first / rdf:rest / rdf:nil` 链 | |

```turtle
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:MyColors
    rdfs:member ( "Red" "Green" "Blue" ) .
    
# 展开后等价于多个三元组，例如:
_:b1 rdf:first "Red" .
_:b1 rdf:rest _:b2 .
_:b2 rdf:first "Green" .
_:b2 rdf:rest _:b3 .
_:b3 rdf:first "Blue" .
_:b3 rdf:rest rdf:nil .
```

---

## 5. Turtle 语法规则注意事项

| 语法点 | 说明 | 常见错误 |
| --- | --- | --- |
| **结束符** | 每个完整三元组必须用英文句号 `.` 结束 | 漏掉 `.` 导致解析器语法错误 |
| **前缀大小写** | 前缀是**区分大小写**的 | `Ex:` 和 `ex:` 被当成完全不同的映射 |
| **保留前缀** | `xml`, `rdf`, `rdfs`, `xsd`, `xsl` 可以直接使用，不需要再写 `@prefix` | `@prefix xml: <http://www.w3.org/XML/1998/namespace>`（多余，可直接写 `xml:lang`） |
| **单双引号** | 标准中均合法，但推荐使用双引号 `""` | 单引号 `'` 可能在部分老解析器下不识别 |

---

## 6. 小结

1. Turtle 的核心理念是**高可读性与强表达能力并存**。
2. `@prefix` 前缀声明和尖括号 `< IRI >` 是资源定义的双剑。
3. 分号 `;` (共享同一主体) 和逗号 `,` (共享同一主体和谓词) 极大提升了书写效率。
4. 关键字 `a` 专用于表示 `rdf:type`。
5. 方括号 `[]` 快速定义匿名实体。圆括号 `()` 可以方便地建立链表集合（RDF List）。
6. Turtle 是当前知识图谱编写的主流选择，是 SPARQL 等高级操作的基础语言。

---

## 7. 延伸阅读

- [W3C Turtle Terse Triple Compound Literals W3C Team Submission](https://www.w3.org/TeamSubmission/turtle/)
- [Turtle 官方语法手册 (SPARQL Working Group)](https://www.w3.org/TR/turtle/)

---

## 8. 本节练习

### 练习 1：基础改写

将下面这段略显冗余的 RDF 改写为简洁优美的 Turtle 语法（尝试用到分号或逗号来缩写）：

```turtle
<http://example.org/Alice> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.org/Person> .
<http://example.org/Alice> <http://xmlns.com/foaf/0.1/name> "Alice"@en .
<http://example.org/Alice> <http://example.org/hasAge> 25 .
```

### 练习 2：前缀映射展开

请给出下面前缀 `ex:p` 的绝对 IRI 映射。假设 `@prefix ex: <http://data.kg/core/>` 已经定义。

### 练习 3：列表展开

给定以下 Turtle 的列表定义：

```turtle
@prefix ex: <http://example.org/> .
ex:Numbers rdfs:member ( 1 2 3 ) .
```
尝试在纸上将其展开为多个基础的 `rdf:first / rdf:rest` 三元组。 

---

> **下一章**：[5.3 N-Quads 与 JSON-LD](./03-n-quads-jsonld.md) — 深入学习 N-Quads 数据集语法结构，以及 JSON-LD 如何桥接现代前端开发和语义网数据。