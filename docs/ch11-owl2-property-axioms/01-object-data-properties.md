# 11.1 对象属性与数据属性概述

> **本节要点**：理解对象属性（Object Property）与数据属性（Data Property）的本质区别，掌握两类属性的语法定义与应用场景。

---

## 1. 属性的基本概念

在 OWL 2 中，**属性（Property）** 用于描述个体（Individual）之间的关系或个体与数据值之间的关系。OWL 2 定义了三种主要属性类型：

| 属性类型 | 英文 | 关系描述 | 示例 |
|----------|------|----------|------|
| 对象属性 | Object Property | 链接两个个体 | `:Museum :hasLocation :Beijing` |
| 数据属性 | Data Property | 链接个体与基本数据类型值 | `:Movie :hasDuration "120"^^xsd:integer` |
| 注解属性 | Annotation Property | 为资源提供元数据说明 | `:Movie rdfs:label "电影名称"` |

```turtle
# 属性类型对比示例
:directed a owl:ObjectProperty .    # 对象属性：个体到个体
:hasDuration a owl:DatatypeProperty .  # 数据属性：个体到数据值
:rdfs:label a owl:AnnotationProperty .  # 注解属性：元数据说明
```

---

## 2. 对象属性（Object Property）

### 2.1 定义与语义

**对象属性**用于关联两个本体中的个体（Individual），形成三元组结构 `<主体属性客体>`。

**典型示例**：

```turtle
# 定义"执导"对象属性
:directed a owl:ObjectProperty ;
    rdfs:label "执导" ;
    rdfs:comment "关联导演个体与电影个体" .

# 使用示例：张艺谋执导电影《活着》
:ZhangYimowl a :Director ;
    :directed :Living ;
    :birthYear "1950-05-02"^^xsd:date .

:Living a :Movie ;
    rdfs:label "活着" .
```

### 2.2 对象属性公理

对象属性可添加以下公理约束：

| 公理类型 | OWL 2 语法 | 语义 |
|----------|------------|------|
| 子类 | `owl:subPropertyOf` | 属性之间的层次关系 |
| 等价 | `owl:equivalentProperty` / `owl:equivalentObjectProperty` | 两个对象属性具有相同的实例 |
| 不相交 | `owl:disjointProperties` | 两个属性永远不会应用于同一对个体 |
| 逆 | `owl:inverseOf` | 属性关系的反向 |
| 传递 | `owl:transitiveProperty` | 如果 A→B 且 B→C，则 A→C |

```turtle
# 属性链：parent o parent SubPropertyOf ancestor
:parent o :parent owl:propertyChainAxiom :ancestor .

# 逆属性
:directed owl:inverseOf :directedBy .

# 传递属性声明
:ancestor a owl:TransitiveProperty .
```

---

## 3. 数据属性（Data Property）

### 3.1 定义与语义

**数据属性**用于关联个体与基本数据类型（Datatype）的值，如字符串、整数、日期等。

**与对象属性的关键区别**：

| 比较维度 | 对象属性 | 数据属性 |
|----------|----------|----------|
| 客体类型 | 本体个体（IRI） | RDF 字面量（Literal） |
| 数据类型 | 任意 | `xsd:string`, `xsd:integer`, `xsd:date` 等 |
| 推理能力 | 个体间关系推理 | 值约束与范围检查 |

```turtle
# 定义数据属性
:hasAge a owl:DatatypeProperty ;
    rdfs:domain :Person ;
    rdfs:range xsd:integer .

:hasName a owl:DatatypeProperty ;
    rdfs:domain :Person ;
    rdfs:range xsd:string .

# 使用示例
:ZhangYimowl a :Person ;
    :hasName "张艺谋" ;
    :hasAge 74 .
```

### 3.2 OWL 2 支持的基本数据类型

OWL 2 基于 XML Schema Datatypes（XSD）提供数据属性范围：

| XSD 类型 | OWL 表示 | 示例值 |
|----------|----------|--------|
| 字符串 | `xsd:string` | `"Hello, World"` |
| 整数 | `xsd:integer` | `42` |
| 小数 | `xsd:decimal` | `3.14` |
| 布尔值 | `xsd:boolean` | `true`, `false` |
| 日期 | `xsd:date` | `"2024-01-01"^^xsd:date` |
| 日期时间 | `xsd:dateTime` | `"2024-01-01T00:00:00Z"^^xsd:dateTime` |
| 浮点数 | `xsd:float`, `xsd:double` | `3.14` |

---

## 4. 属性定义方式汇总

### 4.1 三种属性定义的语法对照

| 属性类型 | OWL 声明 | 数据建模 | Protégé 界面 |
|----------|----------|----------|--------------|
| 对象属性 | `:prop a owl:ObjectProperty` | 个体 ↔ 个体 | Property → Type: Object Property |
| 数据属性 | `:prop a owl:DatatypeProperty` | 个体 → 数据值 | Property → Type: Data Property |
| 注解属性 | `:prop a owl:AnnotationProperty` | 元数据描述 | Property → Type: Annotation Property |

### 4.2 Turtle 源码示例

```turtle
@prefix : <http://example.org/ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# ==================== 对象属性定义 ====================
:directed a owl:ObjectProperty ;
    rdfs:label "执导" ;
    rdfs:domain :Director ;
    rdfs:range :Movie .

:hasLocation a owl:ObjectProperty ;
    rdfs:label "位于" ;
    rdfs:domain :Movie ;
    rdfs:range :City .

# ==================== 数据属性定义 ====================
:hasDuration a owl:DatatypeProperty ;
    rdfs:label "时长（分钟）" ;
    rdfs:domain :Movie ;
    rdfs:range xsd:integer .

:hasReleaseDate a owl:DatatypeProperty ;
    rdfs:label "发行日期" ;
    rdfs:domain :Movie ;
    rdfs:range xsd:date .

:hasName a owl:DatatypeProperty ;
    rdfs:label "名称" ;
    rdfs:domain :Person ;
    rdfs:range xsd:string .

# ==================== 使用示例 ====================
:ChristopherNolan a :Director ;
    :hasName "Christopher Nolan" ;
    :directed :Inception .

:Inception a :Movie ;
    :hasName "盗梦空间" ;
    :hasDuration 148 ;
    :hasReleaseDate "2010-07-16"^^xsd:date ;
    :hasLocation :LosAngeles .
```

---

## 5. 在 Protégé 中查看和创建属性

### 5.1 创建对象属性

1. 在 Protégé 左侧导航栏点击 **"Properties"** 标签页
2. 点击工具栏上的 **"New"** 按钮（或按 `Ctrl+N`）
3. 输入属性名称，如 `hasLocation`
4. 在右侧 **"Type"** 区域选择 **"Object Property"**
5. 可选：在 **"Axioms"** 标签页添加域（Domain）、范围（Range）等约束

### 5.2 创建数据属性

1. 在左侧导航栏选择 **"Properties"** 标签页
2. 点击 **"New"** 创建新属性
3. 输入属性名称，如 `hasDuration`
4. 在右侧 **"Type"** 区域选择 **"Data Property"**
5. 在 **"Axioms"** 标签页设置域和数据类型范围

### 5.3 查看属性信息

| 信息项 | 位置 | 说明 |
|--------|------|------|
| 属性类型 | Properties → Type | 显示 Object/Data/Annotation Property |
| 公理列表 | Properties → Axioms | 展示该属性的所有 OWL 公理 |
| 注解 | Properties → Annotations | 显示 rdfs:label 等注解属性 |
| 层次结构 | Properties → Hierarchy | 以树状图展示子属性/父属性 |

```
┌─────────────────────────────────────────┐
│ Properties                              │
├─────────────────────────────────────────┤
│ [New] [Delete] [Edit]                   │
├─────────────────────────────────────────┤
│ Properties:                             │
│   + :directed (Object Property)         │
│   + :hasDuration (Data Property)        │
│   + :hasLocation (Object Property)      │
│   + :rdfs:label (Annotation Property)   │
├─────────────────────────────────────────┤
│ Type:                                   │
│   ○ Object Property                     │
│   ● Data Property                       │
│   ○ Annotation Property                 │
├─────────────────────────────────────────┤
│ Axioms:                                 │
│   Domain: :Movie                        │
│   Range: xsd:integer                    │
└─────────────────────────────────────────┘
```

---

## 6. 总结

| 概念 | 关键要点 |
|------|----------|
| 对象属性 | 用于关联两个个体，支持推理机进行关系推导 |
| 数据属性 | 用于关联个体与基本数据类型，支持值约束 |
| 注解属性 | 用于提供元数据，不参与逻辑推理 |
| 属性定义 | 在 Protégé 中通过 Type 区域选择属性类型 |
| 公理约束 | 可通过子属性、等价、逆、传递等公理加强属性语义 |

---

> **下一章**：[11.2 属性特性与公理](./02-property-features.md) — 深入探讨等价属性、不相交属性、逆属性与传递属性的具体应用。