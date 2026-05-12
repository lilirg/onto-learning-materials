# 附录 A: OWL 2 标准参考

> **本节要点**：OWL 2（Web Ontology Language 2）是 W3C 推荐的本体语言标准，基于描述逻辑（Description Logic）。本附录提供 OWL 2 核心公理的完整速查参考。

---

## 1. 前置知识：命名空间与前缀

在使用 OWL 2 编写本体之前，需要声明常用的命名空间前缀：

```turtle
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl:    <http://www.w3.org/2002/07/owl#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .
@prefix dbo:    <http://dbpedia.org/ontology/> .
@prefix dcterms: <http://purl.org/dc/terms/> .
```

---

## 2. 类表达式（Class Expressions）

类表达式允许通过组合基本类来定义复杂类。

### 2.1 基本类构造器

| OWL 2 语法 | 描述逻辑记法 | 含义 | 示例 |
|-------------|-------------|------|------|
| `owl:equivalentClass` | `A ≡ B` | 类 A 与类 B 等价 | [`owl:equivalentClass`](docs/ch10-owl2-class-modeling/02-equivalent-disjoint.md:1) |
| `owl:disjointWith` | `A ∩ B = ∅` | 类 A 与类 B 不相交 | [`owl:disjointWith`](docs/ch10-owl2-class-modeling/02-equivalent-disjoint.md:1) |
| `owl:subclassOf` | `A ⊑ B` | 类 A 是类 B 的子类 | [`owl:subclassOf`](docs/ch06-rdfs-core/02-subclass-subproperty.md:1) |
| `owl:intersectionOf` | `C ⊓ D` | 类交集 | [`owl:intersectionOf`](docs/ch10-owl2-class-modeling/01-class-expressions.md:40) |
| `owl:unionOf` | `C ⊔ D` | 类联集 | [`owl:unionOf`](docs/ch10-owl2-class-modeling/01-class-expressions.md:19) |
| `owl:complementOf` | `¬C` | 类补集 | [`owl:complementOf`](docs/ch10-owl2-class-modeling/01-class-expressions.md:18) |

### 2.2 类表达式示例

```turtle
# 等效类定义：「单身人士」=「人」且非「已婚人士」
:SinglePerson owl:equivalentClass [
    owl:intersectionOf (
        :Person
        owl:complementOf :MarriedPerson
    )
] .

# 不相交类声明
:Man owl:disjointWith :Woman .

# 子类关系
:Postdoc owl:subClassOf :Researcher .
:Researcher owl:subClassOf :Person .

# 复杂类表达式：「获得博士学位的女性研究员」
:FemalePhDResearcher owl:equivalentClass [
    owl:intersectionOf (
        :Researcher
        :Woman
        [
            owl:onProperty :hasDegree ;
            owl:someValuesFrom :PhDDegree
        ]
    )
] .
```

### 2.3 量化类构造器

| OWL 2 语法 | 描述逻辑记法 | 含义 | 示例 |
|-------------|-------------|------|------|
| `[owl:onProperty P; owl:someValuesFrom C]` | `∃P.C` | 存在约束：至少有一个 P 关系指向 C | `:Parent [owl:onProperty :hasChild; owl:someValuesFrom :Child]` |
| `[owl:onProperty P; owl:allValuesFrom C]` | `∀P.C` | 全称约束：所有 P 关系都指向 C | `:PureBreed [owl:onProperty :parent; owl:allValuesFrom :PureBreed]` |
| `[owl:onProperty P; owl:qualifiedCardinality N; owl:classOnValuesFrom C]` | `(≥ N P.C)` | 至少 N 个限制 | [`owl:minQualifiedCardinality`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md:1) |
| `[owl:onProperty P; owl:minCardinality N]` | `(≥ N P.⊤)` | 至少 N 个关系（不限类型） | `:Person [owl:onProperty :hasFriend; owl:minCardinality 1]` |
| `[owl:onProperty P; owl:maxCardinality N]` | `(≤ N P.⊤)` | 至多 N 个关系 | [`owl:maxCardinality`](docs/ch12-owl2-data-constraints/02-value-constraints.md:1) |
| `[owl:onProperty P; owl:exactCardinality N]` | `(= N P.⊤)` | 恰好 N 个关系 | [`owl:exactCardinality`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md:1) |

```turtle
# 存在约束：「披萨」必须至少有一种配料
:Pizza owl:subClassOf [
    owl:onProperty :hasIngredient ;
    owl:someValuesFrom :Ingredient
] .

# 全称约束：「纯种狗」的所有祖先都是纯种狗
:PureDog owl:subClassOf [
    owl:onProperty :ancestor ;
    owl:allValuesFrom :PureDog
] .
```

---

## 3. 属性公理（Property Axioms）

### 3.1 属性类型声明

| OWL 2 语法 | 含义 | 示例 |
|-------------|------|------|
| `owl:ObjectProperty` | 对象属性（连接两个个体） | `hasParent` |
| `owl:DatatypeProperty` | 数据类型属性（连接个体与数据类型值） | `hasAge` |
| `owl:AnnotationProperty` | 注解属性（用于元数据） | `label`, `comment` |

### 3.2 属性特征公理

| 公理 | 含义 | Turtle 示例 |
|------|------|-------------|
| `owl:TransitiveProperty` | 传递属性 | [`owl:TransitiveProperty`](docs/ch11-owl2-property-axioms/03-property-hierarchy-chain.md:1) |
| `owl:SymmetricProperty` | 对称属性 | — |
| `owl:ReflexiveProperty` | 自反属性 | — |
| `owl:IrreflexiveProperty` | 非自反属性 | — |
| `owl:AsymmetricProperty` | 非对称属性 | — |
| `owl:FunctionalProperty` | 函数属性（至多一个值） | [`owl:FunctionalProperty`](docs/ch12-owl2-data-constraints/02-value-constraints.md:1) |
| `owl:InverseFunctionalProperty` | 逆函数属性 | — |
| `owl:PartialFunctionProperty` | 部分函数属性 | — |
| `owl:PartialInverseFunctionProperty` | 部分逆函数属性 | — |

```turtle
# 传递属性：「祖先」关系是传递的
:hasAncestor owl:TransitiveProperty .

# 对称属性：「认识」关系是对称的
:knows owl:SymmetricProperty .

# 函数属性：每个人只能有一个生物学母亲
:biologicalMother owl:FunctionalProperty .

# 逆关系定义
:hasChild owl:inverseOf :hasParent .
```

### 3.3 属性关系公理

| 公理 | 含义 | 示例 |
|------|------|------|
| `owl:equivalentProperty` | 属性等价 | [`owl:equivalentProperty`](docs/ch11-owl2-property-axioms/01-object-data-properties.md:1) |
| `owl:disjointProperty` | 属性不相交 | [`owl:disjointProperty`](docs/ch11-owl2-property-axioms/01-object-data-properties.md:1) |
| `owl:inverseOf` | 属性互为逆 | `owl:inverseOf` |
| `owl:propertyChainAxiom` | 属性链 | [`owl:propertyChainAxiom`](docs/ch11-owl2-property-axioms/03-property-hierarchy-chain.md:1) |

```turtle
# 等价属性
:mother owl:equivalentProperty [
    owl:intersectionOf ( :parent :Female )
] .

# 不相交属性
:hasFather owl:disjointProperty :hasMother .

# 属性链：「祖父」=「父亲」∘「父亲」
:hasGrandfather owl:propertyChainAxiom ( :hasFather :hasFather ) .
```

### 3.4 属性层次结构

```turtle
# 属性子类
:hasBiologicalParent owl:subPropertyOf :hasParent .
:hasParent owl:subPropertyOf :hasAncestor .
```

---

## 4. 个体断言（Individual Axioms）

### 4.1 类型断言（rdf:type）

| RDF/OWL 语法 | 含义 | 示例 |
|--------------|------|------|
| `a` / `rdf:type` | 个体属于某个类 | [`rdf:type`](docs/ch04-rdf-data-model/02-resources-statements.md:1) |
| `owl:sameAs` | 两个个体标识相同 | [`owl:sameAs`](docs/ch04-rdf-data-model/03-rdf11-standard.md:1) |
| `owl:differentFrom` | 个体互不相同 | [`owl:differentFrom`](docs/ch04-rdf-data-model/02-resources-statements.md:1) |
| `owl:distinctMembers` | 互异成员声明 | — |

```turtle
# 类型断言
:alice rdf:type :Person .
:alice a :Woman ;           # 简写形式
       a :Researcher .

# 相等断言
:AliceSmith owl:sameAs :alice .

# 不同个体声明
:alice, :bob, :charlie owl:differentFrom .
```

### 4.2 属性断言

```turtle
# 对象属性断言
:alice :hasParent :bob .
:alice :hasName "Alice" ;
       :hasAge 30 ;
       :livesIn :Beijing .

# 带限值的断言（OWL 2 特性）
:alice :hasName "Alice"^^xsd:string .
:alice :hasAge 30^^xsd:integer .
```

---

## 5. 数据类型构造器（Datatype Constructors）

### 5.1 数据类型约束速查表

| 构造器 | 含义 | Turtle 示例 |
|--------|------|-------------|
| `owl:onDatatype` | 限制数据类型 | — |
| `owl:withRestrictions` | 添加类型限制 | — |
| `owl:oneOf` | 枚举类型 | — |
| `owl:complementOf` | 数据类型补集 | — |

### 5.2 基数约束（Cardinality Constraints）

| 约束 | 含义 | 示例 |
|------|------|------|
| `owl:minCardinality` | 最少个数 | [`owl:minCardinality`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md:1) |
| `owl:maxCardinality` | 最多个数 | [`owl:maxCardinality`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md:1) |
| `owl:exactCardinality` | 恰好个数 | [`owl:exactCardinality`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md:1) |
| `owl:minQualifiedCardinality` | 至少 N 个指定类型的值 | — |
| `owl:maxQualifiedCardinality` | 至多 N 个指定类型的值 | — |
| `owl:hasValue` | 值等于指定常量 | [`owl:hasValue`](docs/ch12-owl2-data-constraints/02-value-constraints.md:1) |

### 5.3 值约束（Value Constraints）

| 约束 | 含义 | 示例 |
|------|------|------|
| `owl:hasValue` | 至少有一个值为给定常量 | [`owl:hasValue`](docs/appendix-a-owl2-reference/index.md:27) |
| `owl:minNumericLiteral` | 至少一个值 ≥ 给定数 | — |
| `owl:maxNumericLiteral` | 至少一个值 ≤ 给定数 | — |
| `owl:minInSet` | 至少一个值 ≥ 集合中最小值 | — |
| `owl:maxInSet` | 至少一个值 ≤ 集合中最大值 | — |

```turtle
# 年龄属性限制：值必须为正整数
:hasAge owl:onDatatype xsd:integer ;
    owl:minNumericLiteral 0 .

# 性别枚举定义
:Gender owl:oneOf ( :Male :Female :Other ) .

# 父母恰好有两个
:Person owl:subClassOf [
    owl:onProperty :hasParent ;
    owl:exactCardinality 2
] .
```

---

## 6. 语法示例汇总

### 6.1 Turtle 语法示例

```turtle
@prefix ex: <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

ex:Person a owl:Class ;
    rdfs:label "人"@zh ;
    rdfs:comment "人类个体的类"@zh .

ex:Student owl:subClassOf ex:Person ;
    rdfs:label "学生"@zh .

ex:hasTeacher a owl:ObjectProperty ;
    rdfs:domain ex:Student ;
    rdfs:range ex:Teacher ;
    rdfs:label "导师"@zh .

ex:alice a ex:Student ;
    ex:hasTeacher ex:bob ;
    ex:hasName "Alice"@en ;
    ex:hasAge 20^^xsd:integer .
```

### 6.2 RDF/XML 语法示例

```xml
<?xml version="1.0"?>
<rdf:RDF xmlns:ex="http://example.org/"
         xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
         xmlns:owl="http://www.w3.org/2002/07/owl#">

  <owl:Class rdf:about="http://example.org/Person">
    <rdfs:label>人</rdfs:label>
    <rdfs:comment>人类个体的类</rdfs:comment>
  </owl:Class>

  <owl:Class rdf:about="http://example.org/Student">
    <rdfs:subClassOf rdf:resource="http://example.org/Person"/>
    <rdfs:label>学生</rdfs:label>
  </owl:Class>

  <owl:ObjectProperty rdf:about="http://example.org/hasTeacher">
    <rdfs:domain rdf:resource="http://example.org/Student"/>
    <rdfs:range rdf:resource="http://example.org/Teacher"/>
  </owl:ObjectProperty>

  <rdf:Description rdf:about="http://example.org/alice">
    <rdf:type rdf:resource="http://example.org/Student"/>
    <ex:hasTeacher rdf:resource="http://example.org/bob"/>
    <ex:hasName>Alice</ex:hasName>
  </rdf:Description>

</rdf:RDF>
```

### 6.3 两种语法对照

| 概念 | Turtle 语法 | RDF/XML 语法 |
|------|-------------|-------------|
| 类声明 | `:Person a owl:Class` | `<owl:Class rdf:about="...Person">` |
| 子类 | `:Student rdfs:subClassOf :Person` | `<rdfs:subClassOf rdf:resource="...Person"/>` |
| 对象属性 | `:hasParent a owl:ObjectProperty` | `<rdf:type rdf:resource="...#ObjectProperty"/>` |
| 数据类型属性 | `:hasAge a owl:DatatypeProperty` | `<rdf:type rdf:resource="...#DatatypeProperty"/>` |
| 实例断言 | `:alice a :Person` | `<rdf:type rdf:resource="...Person"/>` |
| 属性值 | `:alice :hasName "Alice"` | `<ex:hasName>Alice</ex:hasName>` |

---

## 7. OWL 2 简介

OWL 2 是 OWL 语言的第二个版本，于 2012 年成为 W3C 推荐标准。它提供了三个配置文件（Profiles），以满足不同场景的性能需求：

| 配置文件 | 描述 | 推理复杂度 |
|----------|------|-----------|
| **OWL 2 QL** | 侧重大规模数据集查询 | LogLog |
| **OWL 2 EL** | 侧重大规模概念层次结构 | Polynomial |
| **OWL 2 LT** | 推理可判定但计算复杂 | NExpTime |

> **参考**：[`OWL 2 配置文件详解`](docs/ch08-owl2-overview/02-owl2-profiles.md)