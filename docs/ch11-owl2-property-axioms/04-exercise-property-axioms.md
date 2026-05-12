# 11.4 练习：属性公理实操

> **本节要点**：在电影本体中动手创建传递属性、等价属性与属性链，使用 HermiT 推理机进行一致性检测与推理验证，排查常见问题。

---

## 练习场景与目标

**背景**：基于第 9 章建立的"电影本体（Movie Ontology）"与前一节所学的属性公理知识，进一步为本体添加属性层级与链式推理能力。

**学习目标**：
1. 在 Protégé 中创建并配置传递属性（Transitive Property）
2. 为属性添加等价断言与逆断言
3. 使用属性链公理定义复合关系（如"参演过同一电影的人互为合作者"）
4. 通过 HermiT 推理机进行一致性检测与推理结果验证
5. 排查属性链推理中的常见问题

---

## 步骤一：准备基础本体

1. **打开电影本体文件**：
   - 启动 Protégé
   - 点击 **File → Open**，选择上一节使用的 `movie-ontology.owl`
   - 确认 **Classes** 视图中已存在：`Person`, `Actor`, `Director`, `Movie`
   - 确认 **Object Properties** 视图中已存在：`directed`, `actsIn`, `producedBy`

2. **添加新属性**：

| 属性名 | 类型 | 定义域 (Domain) | 值域 (Range) | 说明 |
|--------|------|-----------------|--------------|------|
| `collaboratedWith` | Object Property | `Person` | `Person` | 合作过 |
| `sequelOf` | Object Property | `Movie` | `Movie` | 续集 |
| `basedOn` | Object Property | `Movie` | `Movie` | 改编自 |
| `hasBirthDate` | Data Property | `Person` | `xsd:string` | 出生日期 |

**创建属性操作指引**：
1. 切换到 **Object Properties** 标签页
2. 点击 **Create New Property** (`Ctrl + N`)
3. 输入属性名（如 `collaboratedWith`）
4. 在 **Type** 区域保持默认或设为 **Object Property**
5. 在 **Axioms** 标签页添加 Domain 和 Range：
   - 点击 **Add** → **Domain** → 选择 `Person`
   - 点击 **Add** → **Range** → 选择 `Person`

---

## 步骤二：创建传递属性

### 2.1 场景说明

在电影本体中，定义"**续集的续集的续集…**"关系。如果 `:MovieA` 是 `:MovieB` 的续集，且 `:MovieB` 是 `:MovieC` 的续集，则 `:MovieA` 也应被视为 `:MovieC` 的"远代续集"。

### 2.2 Protégé 操作

1. 在左侧导航栏找到或创建属性 `sequelOf`
2. 在 **Object Properties** 视图中选中 `sequelOf`
3. 切换到右侧 **Types** 标签页
4. 点击 **Transitive Property** 类型
5. 确认后，属性层次图（Hierarchy 视图）中会自动出现一条标注："TransitiveProperty"

**验证操作**：切换到 **Hierarchy** 标签页，展开 **Axioms**，确认 `sequelOf` 下包含：
```
sequelOf is a TransitiveProperty
```

### 2.3 Turtle 源码验证

```turtle
# 声明 sequelOf 为传递属性
:sequelOf a owl:TransitiveProperty ;
    rdfs:label "续集于" ;
    rdfs:domain :Movie ;
    rdfs:range :Movie .
```

### 2.4 推理验证

在 Protégé 中添加以下个体事实：

```turtle
# 个体实例
:Inception a :Movie ;
    rdfs:label "盗梦空间" .

:Inception2 a :Movie ;
    rdfs:label "盗梦空间2" .

:Inception3 a :Movie ;
    rdfs:label "盗梦空间3" .

# 传递关系链
:Inception2 :sequelOf :Inception .
:Inception3 :sequelOf :Inception2 .
```

**运行推理机**：
1. 点击顶部菜单 **Tools → HermiT Reasoner → Inferencing → Reset Class Assertions to Root**
2. 或在推理机面板中点击 **Run Reasoner**
3. 在 **Classes** 标签页中搜索 `owl:Thing`
4. 观察 `:Inception3` 的类分配（此时推理机会将其分类为所有包含它的类）

**推理结果预期**：
```
已知：:Inception3 :sequelOf :Inception2 且 :Inception2 :sequelOf :Inception
传递性推导：:Inception3 :sequelOf :Inception
```

---

## 步骤三：创建等价属性与逆属性

### 3.1 等价属性实操

**场景**：在本体中，`:createdBy` 和 `:hasCreator` 语义相同。

**Protégé 操作**：
1. 创建属性 `:createdBy`（Object Property）
2. 创建属性 `:hasCreator`（Object Property）
3. 选中 `:createdBy`，切换到 **Axioms** 标签页
4. 点击 **Add** → **Equivalent Property**
5. 选择 `:hasCreator`
6. 确认 Axioms 列表中出现 `:createdBy EquivalentProperty :hasCreator`

** Turtle 源码**：
```turtle
:createdBy a owl:ObjectProperty ;
    rdfs:label "创作者" .

:hasCreator owl:equivalentProperty :createdBy .

# 推理效果
:ChristopherNolan :createdBy :Inception .
# 推理机将自动推断：
:Inception :hasCreator :ChristopherNolan .
```

### 3.2 逆属性实操

**场景**：`:directed` 与 `:directedBy` 互为逆属性。

**Protégé 操作**：
1. 创建属性 `:directedBy`（Object Property）
2. 选中已有的 `:directed` 属性
3. 切换到 **Axioms** 标签页
4. 点击 **Add** → **Inverse Property**
5. 选择 `:directedBy`

**Turtle 源码**：
```turtle
:directed owl:inverseOf :directedBy .

# 事实
:ChristopherNolan :directed :Inception .
# 推理机自动推导
:Inception :directedBy :ChristopherNolan .
```

---

## 步骤四：创建属性链

### 4.1 场景一：合作者链

**需求**：定义"合作者链"属性。如果 A 参演了电影 M1，M1 由导演 D 执导，那么 A 与 D 通过电影产生合作关系。

```turtle
# 定义合作者链
# actsIn o directed SubPropertyOf hasCollaboration
[ owl:propertyChainAxiom ( :actsIn :directed ) ] rdfs:subPropertyOf :collaboratedWith .
```

**推理示例**：
```
事实:
  :LeonardoDiCaprio :actsIn :Inception .
  :ChristopherNolan :directed :Inception .

链推理:
  LeonardoDiCaprio :collaboratedWith ChristopherNolan .
  (因为: LeonardoDiCaprio actsIn Inception ∧ Inception directedBy ChristopherNolan)
```

### 4.2 场景二：改编链条

**需求**：定义三层改编链——"改编自原著的原著的电影也属于改编作品"。

```turtle
# :basedOn o :basedOn SubPropertyOf :adaptedFrom
:adaptedFrom a owl:ObjectProperty .

[ owl:propertyChainAxiom ( :basedOn :basedOn ) ] rdfs:subPropertyOf :adaptedFrom .
```

### 4.3 场景三：通过续集链定义"同一宇宙"关系

**需求**：如果 `:MovieA sequelOf :MovieB` 且 `:MovieB sequelOf :MovieC`，则 A 和 C 属于同一个续集宇宙。

```turtle
# 定义同一宇宙关系
:inSameUniverse a owl:ObjectProperty .

# sequelOf o inverseOf:sequelOf SubPropertyOf inSameUniverse
# 即: A sequelOf B 且 C sequelOf B → A inSameUniverse C
[ owl:propertyChainAxiom ( :sequelOf [ owl:inverseOf :sequelOf ] ) ] rdfs:subPropertyOf :inSameUniverse .
```

---

## 步骤五：一致性检测与推理验证

### 5.1 使用 HermiT 推理机检测

1. 确保所有属性和公理已添加完毕
2. 点击顶部菜单 **Tools → HermiT Reasoner**
3. 点击 **Run Reasoner**
4. 查看结果面板中的状态信息

**正常输出示例**：
```
Class hierarchy built successfully.
Number of named classes: 6
Number of inferred subclasses: 4
Consistency check: consistent
```

**不一致输出示例**（含属性约束冲突时）：
```
Consistency check: inconsistent
Inconsistent classes found: [...]
```

### 5.2 常见验证步骤

| 验证项 | 操作 | 预期 |
|--------|------|------|
| 传递性 | 检查 `:Inception3 :sequelOf :Inception` 是否推导出现 | 存在该断言 |
| 逆属性 | 检查 `:Inception :directedBy :ChristopherNolan` 是否推导出现 | 存在该断言 |
| 等价属性 | 检查 `:Inception :hasCreator :ChristopherNolan` 是否推导出现 | 存在该断言 |
| 属性链 | 检查 `:LeonardoDiCaprio :collaboratedWith :ChristopherNolan` 是否推导出现 | 存在该断言 |
| 一致性 | 查看推理机是否报告 `inconsistent` | 报告 `consistent` |

### 5.3 通过 Protégé 可视化检查

1. 点击 **Inferred** 标签页（位于编辑区域顶部）
2. 切换到 **Object Property Assertions** 子标签
3. 搜索任一实例（如 `:ChristopherNolan`）
4. 查看推理生成的属性断言

---

## 步骤六：Turtle 最终对照源码

以下是本练习全部属性的完整 Turtle 源码，可用于保存为 `.ttl` 文件后在 Protégé 中验证。

```turtle
@prefix : <http://example.org/movie-ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# ==================== 类定义 ====================
:Person a owl:Class .
:Actor a owl:Class ;
    rdfs:subClassOf :Person .
:Director a owl:Class ;
    rdfs:subClassOf :Person .
:Movie a owl:Class .

# ==================== 对象属性定义 ====================
:directed a owl:ObjectProperty ;
    rdfs:label "执导" ;
    rdfs:domain :Director ;
    rdfs:range :Movie .

:actsIn a owl:ObjectProperty ;
    rdfs:label "参演" ;
    rdfs:domain :Actor ;
    rdfs:range :Movie .

:collaboratedWith a owl:ObjectProperty ;
    rdfs:label "合作过" ;
    rdfs:domain :Person ;
    rdfs:range :Person .

:sequelOf a owl:TransitiveProperty ;
    rdfs:label "续集于" ;
    rdfs:domain :Movie ;
    rdfs:range :Movie .

:createdBy a owl:ObjectProperty ;
    rdfs:label "由...创作" .

:hasCreator owl:equivalentProperty :createdBy .

:directedBy owl:inverseOf :directed .

:adaptedFrom a owl:ObjectProperty ;
    rdfs:label "改编自（长链）" .

:basedOn a owl:ObjectProperty ;
    rdfs:label "改编自（直接）" .

:inSameUniverse a owl:ObjectProperty ;
    rdfs:label "同一续集宇宙" .

# ==================== 数据属性定义 ====================
:hasBirthDate a owl:DatatypeProperty ;
    rdfs:label "出生日期" ;
    rdfs:domain :Person ;
    rdfs:range xsd:string .

# ==================== 属性链公理 ====================
# actsIn o directed SubPropertyOf collaboratedWith
[ owl:propertyChainAxiom ( :actsIn :directed ) ] rdfs:subPropertyOf :collaboratedWith .

# basedOn o basedOn SubPropertyOf adaptedFrom
[ owl:propertyChainAxiom ( :basedOn :basedOn ) ] rdfs:subPropertyOf :adaptedFrom .

# sequelOf o inverseOf:sequelOf SubPropertyOf inSameUniverse
[ owl:propertyChainAxiom ( :sequelOf [ owl:inverseOf :sequelOf ] ) ] rdfs:subPropertyOf :inSameUniverse .

# ==================== 个体实例（事实数据） ====================
:ChristopherNolan a :Director ;
    :hasBirthDate "1970-07-19" .

:LeonardoDiCaprio a :Actor ;
    :hasBirthDate "1974-11-11" .

:Inception a :Movie ;
    rdfs:label "盗梦空间" .

:Inception2 a :Movie ;
    rdfs:label "盗梦空间2" ;
    :sequelOf :Inception .

:Inception3 a :Movie ;
    rdfs:label "盗梦空间3" ;
    :sequelOf :Inception2 .

:ChristopherNolan :directed :Inception .
:ChristopherNolan :createdBy :Inception .

:LeonardoDiCaprio :actsIn :Inception .

# ==================== 预期推理结果 ====================
# 1. 传递性: :Inception3 :sequelOf :Inception
# 2. 逆属性: :Inception :directedBy :ChristopherNolan
# 3. 等价属性: :Inception :hasCreator :ChristopherNolan
# 4. 链属性(actsIn∘directed): :LeonardoDiCaprio :collaboratedWith :ChristopherNolan
# 5. 链属性(basedOn∘basedOn): 需额外事实触发
# 6. 链属性(sequelOf∘inv:sequelOf): :Inception :inSameUniverse :Inception2
```

---

## 常见问题排查

| 问题 | 可能原因 | 排查方法 |
|------|----------|----------|
| 推理机运行后属性链未生效 | HermiT 版本过旧不支持 `owl:propertyChainAxiom` | 确认使用 HermiT v2.0+；检查属性链的 Turtle 语法是否正确 |
| 逆属性推导失败 | `owl:inverseOf` 声明在错误的属性上 | 确保 `owl:inverseOf` 同时出现在双向关系的一个属性上 |
| 传递属性无限循环 | 存在循环数据（A sequelOf B, B sequelOf A） | 检查事实数据是否存在矛盾或循环；推理机会检测为 `inconsistent` |
| Protégé 推理界面不显示推导断言 | 停留在 "Declared" 标签而非 "Inferred" | 切换到 **Inferred** 标签查看推导结果 |
| 属性链 `o inverseOf` 语法错误 | XML 序列化中 `owl:inverseOf` 需要嵌套在列表中 | Turtle 写法：`[ owl:propertyChainAxiom ( :A [ owl:inverseOf :B ] ) ]` |
| 数据类型值推理异常 | 将 `xsd:integer` 值用作个体链接 | 确认数据属性不能出现在对象属性链中 |

---

## 总结

| 实操内容 | 核心语法 / 操作 | 验证方式 |
|----------|----------------|----------|
| 传递属性 | `owl:TransitiveProperty` | HermiT 推导链式断言 |
| 等价属性 | `owl:equivalentProperty` | 实例互相替换检查 |
| 逆属性 | `owl:inverseOf` | 反向断言验证 |
| 属性链 | `owl:propertyChainAxiom` | 三元关系链推导 |
| 一致性检查 | Tools → HermiT → Run Reasoner | consistent/inconsistent 状态 |

---

> **上一章导航**：[11.1 对象属性与数据属性概述](./01-object-data-properties.md) · [11.2 属性特性与公理](./02-property-features.md) · [11.3 属性层次结构与属性链](./03-property-hierarchy-chain.md)
>
> **下一章预告**：[12.1 基数约束](../ch12-owl2-data-constraints/01-cardinality-constraints.md) — 深入学习 OWL 2 中的数据约束与基数断言。