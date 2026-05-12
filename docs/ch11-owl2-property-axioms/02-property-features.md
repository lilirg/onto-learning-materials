# 11.2 属性特性与公理

> **本节要点**：掌握 OWL 2 中属性特性的核心公理——等价属性、不相交属性、逆属性与传递属性，并了解其在 Protégé 中的操作方式。

---

## 1. 等价属性（Equivalent Properties）

### 1.1 基本概念

**等价属性**声明两个属性在语义上完全等价，即它们适用于完全相同的个体对。

| 特性 | 说明 |
|------|------|
| 传递性 | A ≡ B 且 B ≡ C 则 A ≡ C |
| 对称性 | A ≡ B 则 B ≡ A |
| 自反性 | A ≡ A |
| 推理效果 | 推理机自动将两个属性的实例互相映射 |

### 1.2 等价属性的应用场景

**场景一：属性别名**

```turtle
# 为主要属性设置别名
:hasLocation owl:equivalentProperty :isLocatedIn .

# 推理效果：
# 如果 :Paris :hasLocation :France
# 则推理机也将推断 :Paris :isLocatedIn :France
```

**场景二：跨本体属性整合**

```turtle
# FOSS 与 SKOS 属性等价
<http://purl.org/dc/terms/creator> owl:equivalentProperty :author .

# 结果：任何使用 dc:creator 的数据也被视为 :author
```

### 1.3 Turtle 示例

```turtle
@prefix : <http://example.org/ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

# 定义两个等价对象属性
:hasParent owl:equivalentProperty :parentOf .

# 定义等价数据属性
:age owl:equivalentProperty :yearsOld .
```

---

## 2. 不相交属性（Disjoint Properties）

### 2.1 基本概念

**不相交属性**声明两个属性永远不会应用于同一对个体。这是一种强约束，用于防止语义冲突。

```turtle
# :createdBy 和 :destroyedBy 不会应用于同一对个体
:createdBy owl:disjointProperty :destroyedBy .
```

### 2.2 应用场景

| 属性对 | 说明 |
|--------|------|
| `:hasParent` ↔ `:hasChild` | 虽然互逆，但在同一方向不相交 |
| `:createdBy` ↔ `:destroyedBy` | 创建与被销毁永远不会同一主体→客体 |
| `:isA` ↔ `:hasPart` | "是...的类型" 与 "是...的部件" 不相交 |

```turtle
# 电影本体中的不相交属性约束
:hasDirector owl:disjointProperty :hasProducer .
# 语义：一个关系不能同时是"导演关系"和"制作人关系"
```

---

## 3. 属性逆（Inverse Property）

### 3.1 基本概念

**逆属性**声明两个属性的方向互为反转。如果 `A owl:inverseOf B`，那么 `x A y` 意味着 `y B x`。

| 记法 | 语法 |
|------|------|
| 三元组形式 | `x A y` |
| 反向推导 | `y (inverse of A) x` |

### 3.2 属性逆的语法

```turtle
# 声明逆属性
:directed owl:inverseOf :directedBy .

# 使用示例
:ChristopherNolan :directed :Inception .
# 推理机自动推导：
:Inception :directedBy :ChristopherNolan .
```

### 3.3 应用场景

```turtle
@prefix : <http://example.org/ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

# 场景一：人物关系
:hasSpouse owl:inverseOf :isSpouseOf .
:hasChild owl:inverseOf :isParentOf .

# 场景二：位置关系
:locatedIn owl:inverseOf :contains .

# 场景三：本体工作流
:authorOf owl:inverseOf :hasAuthor .
:about owl:inverseOf :topicOf .
```

### 3.4 逆属性的推理示例

```
已知事实：
  :Alice :hasChild :Bob .

逆属性声明：
  :hasChild owl:inverseOf :hasParent .

推理结果：
  :Bob :hasParent :Alice .
```

```mermaid
graph LR
  Alice -->|hasChild| Bob
  Bob -->|hasParent[Alice]| Alice
  style Alice fill:#e1f5fe
  style Bob fill:#fff3e0
```

---

## 4. 传递属性（Transitive Property）

### 4.1 基本概念

**传递属性**声明如果 `x A y` 且 `y A z`，则必然 `x A z`。典型的传递关系包括"祖先"、"属于某个容器层次"等。

| 传递性定义 | 公式 |
|------------|------|
| 形式化表达 | ∀x∀y∀z (P(x,y) ∧ P(y,z) → P(x,z)) |
| 通俗理解 | 如果 A 是 B 的 XX，且 B 是 C 的 XX，则 A 是 C 的 XX |

### 4.2 声明传递属性

```turtle
# 声明 :hasAncestor 为传递属性
:hasAncestor a owl:TransitiveProperty .

# 使用示例
:GeorgeWashington :hasAncestor :JohnWashington .
:JohnWashington :hasAncestor :WilliamWashington .

# 推理结果：
:GeorgeWashington :hasAncestor :WilliamWashington .
# (即使该事实未在数据中显式声明)
```

### 4.3 Protégé 中的类型选择

在 Protégé 中定义传递属性的步骤：

1. 选择属性，如 `:hasAncestor`
2. 在 **Types** 标签页中选择 `owl:TransitiveProperty`
3. 或直接在类型下拉框中选择 **Transitive Property**

```
┌─────────────────────────────────────────┐
│ Types                                    │
├─────────────────────────────────────────┤
│ Properties                              │
│ ● Transitive Property                   │  ← 选中此类型
│ ○ Reflexive Property                    │
│ ○ Symmetric Property                    │
│ ○ Asymmetric Property                   │
│ ○ Irreflexive Property                  │
└─────────────────────────────────────────┘
```

---

## 5. 全部属性特性示例汇总

```turtle
@prefix : <http://example.org/ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# ==================== 等价属性 ====================
:hasCreator owl:equivalentProperty :createdBy .
:postalAddress owl:equivalentProperty :mailingAddress .

# ==================== 不相交属性 ====================
:hasDirector owl:disjointProperty :hasProducer .
:hasPart owl:disjointProperty :hasInstance .

# ==================== 逆属性 ====================
:hasPart owl:inverseOf :partOf .
:owns owl:inverseOf :ownedBy .

# ==================== 传递属性 ====================
:hasAncestor a owl:TransitiveProperty .
:partOf owl:TransitiveProperty .
:containedIn owl:TransitiveProperty .
```

---

## 6. 属性特性的推理行为

### 6.1 传递属性推理示例

```
事实:
  :Europe :contains :France .
  :France :contains :Paris .

声明:
  :containedIn owl:TransitiveProperty .
  :contains owl:inverseOf :containedIn .

推理:
  :Europe :contains :Paris .  (传递性推导)
```

### 6.2 逆属性推理示例

```
事实:
  :Apple :hasPart :Core .

声明:
  :hasPart owl:inverseOf :partOf .

推理:
  :Core :partOf :Apple .  (逆向推导)
```

---

## 7. Protégé 界面操作指南

### 7.1 添加等价属性

1. 选择属性，如 `:hasCreator`
2. 进入 **Axioms** 标签页
3. 点击 **"Add"** → **"Equivalent Property"**
4. 选择等价属性 `:createdBy`
5. 确认后，该公理出现在 Axioms 列表中

### 7.2 添加不相交属性

1. 选择属性 `:hasDirector`
2. 进入 **Axioms** 标签页
3. 点击 **"Add"** → **"Disjoint Properties"**
4. 选择 `:hasProducer`

### 7.3 添加逆属性

1. 选择属性 `:hasPart`
2. 进入 **Axioms** 标签页
3. 点击 **"Add"** → **"Inverse Property"**
4. 选择 `:partOf`

### 7.4 声明传递属性

1. 选择属性 `:hasAncestor`
2. 在 **Types** 标签页中直接点击 **Transitive Property**
3. 或进入 **Axioms** 标签页添加 `a owl:TransitiveProperty` 公理

---

## 8. 注意事项

| 注意项 | 说明 |
|--------|------|
| Hermit 推理机 | 传递属性在 EL Profile 中推理速度最优；在 RL/L 中需特定规则映射 |
| 逆属性组合 | 逆属性与传递属性组合使用时，需确保推理机支持（HermiT 全支持） |
| 自反性陷阱 | 传递属性不隐含自反性；`:hasAncestor` 不是 `:hasAncestor :hasAncestor` |
| 循环风险 | `A inverseOf B` 且 `A TransitiveOf B` 可导致无限推理，需审查逻辑 |

---

## 9. 总结

| 属性特性 | 核心语法 | 推理行为 |
|----------|----------|----------|
| 等价属性 | `owl:equivalentProperty` | 自动映射两个属性的实例 |
| 不相交属性 | `owl:disjointProperty` | 禁止两属性用于同一对个体 |
| 逆属性 | `owl:inverseOf` | `x A y` → `y (inverse of A) x` |
| 传递属性 | `owl:TransitiveProperty` | `x A y ∧ y A z` → `x A z` |

---

> **下一章**：[11.3 属性层次结构与属性链](./03-property-hierarchy-chain.md) — 深入学习子属性关系、属性链公理与复杂链推理。