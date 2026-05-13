# 15.1 推理基础

> **本节要点**：理解本体论推理的哲学与数学基础，区分显式知识与隐式知识，掌握演绎推理在语义网中的核心作用，了解可满足性、蕴含两个关键概念，以及 OWL 2 三大 Profile（EL, QL, DL）的推理场景选择。

---

### 🔗 前置知识

在继续学习本章之前，建议先阅读以下内容：

- [第 8 章：OWL 2 概述](../ch08-owl2-overview/01-why-owl2.md) — 描述逻辑与 OWA/CWA 概念
- [第 11 章：OWL 2 属性公理](../ch11-owl2-property-axioms/01-object-data-properties.md) — 属性特征与公理
- [第 12 章：OWL 2 数据约束](../ch12-owl2-data-constraints/01-cardinality-constraints.md) — 基数约束与公理
- [第 4 章：RDF 数据模型](../ch04-rdf-data-model/01-rdf-introduction.md) — 三元组与资源

### ▶️ 继续阅读

学习完本章后，可继续探索：

- [第 15.2 节：推理机工具](./02-reasoner-tools.md) — 主流推理机配置与使用
- [第 18 章：质量评估](../ch18-quality-assessment/01-evaluation-dimensions.md) — 本体的质量评估维度

## 1. 推理（Reasoning）的本体论基础

**推理**（Reasoning）是本体论（Ontology）与逻辑学（Logic）中的核心概念，指从已知的知识（前提、公理）出发，通过逻辑规则推导出新的知识（结论、隐式知识）的过程。

在本体论语境中，推理的本质是：**本体建模者显式编码的知识 ≠ 本体所表达的完整知识**。推理机会自动发现那些"不言自明"但未曾显式陈述的知识。

### 1.1 为什么需要推理？

| 场景 | 无推理 | 有推理 |
|------|--------|--------|
| 类层次 | 建模者手动定义每个子类和父类关系 | 通过属性约束自动推导子类和父类 |
| 个体分类 | 每个个体必须显式声明所属类 | 通过个体属性自动推断其类 |
| 一致性检测 | 建模者手动检查是否有矛盾 | 推理机自动发现逻辑矛盾 |
| 知识发现 | 仅能查询显式存储的数据 | 能发现隐含的知识关联 |

```turtle
# 示例：无需推理的情况（显式知识）
:Superman a :Hero ;
    :hasPower :Flight .

:Hero rdfs:subClassOf :Human .

# 查询：Superman 是谁？ → 直接匹配 → 结果是 :Hero
SELECT ?type WHERE { :Superman a ?type . }
# 结果：?type = :Hero

# ═══════════════════════════════════════════
# 需要推理的情况（隐式知识）
# ═══════════════════════════════════════════

# 推理机知道：:Hero rdfs:subClassOf :Human
# 推理机知道：:Superman 是 :Hero 的实例
# 推理机推导出：:Superman 必然是 :Human 的实例（无需显式声明！）
```

### 1.2 推理的哲学根源

推理的概念根植于**描述逻辑（Description Logic, DL）**——OWL 2 的形式语义基础。描述逻辑是一阶逻辑（First-Order Logic）的可判定子集，保证推理过程的**完备性（Completeness）**和**终止性（Termination）**。

| 逻辑系统 | 表达能力 | 可判定性 | OWL 2 对应 |
|----------|----------|----------|------------|
| 命题逻辑（Propositional Logic） | 低 | ✅ 可判定 | 不足 |
| 描述逻辑（Description Logic） | 中 | ✅ 可判定 | OWL 2 DL / EL / QL |
| 一阶逻辑（First-Order Logic） | 高 | ❌ 半可判定 | OWL 2 Full |
| 二阶逻辑（Second-Order Logic） | 极高 | ❌ 不可判定 | 不支持 |

> **关键原则**：OWL 2 的设计选择了**可判定性**而非**最大表达能力**。这意味着某些强大的表达（如 OWL 2 Full 支持的内容）在 OWL 2 DL 中不被允许，以保证推理机总能终止并返回结果。

---

## 2. 显式知识（Explicit）vs 隐式知识（Implicit）

本体论中的数据分为两个世界：**TBox（Terminological Box，术语盒子）** 和 **ABox（Assertional Box，断言盒子）**，分别对应显式和隐式知识的不同层面。

### 2.1 TBox：术语层面的知识

**TBox**（术语盒子）定义本体的**概念结构**——类、属性、公理的抽象定义。它是"知识的知识"（Knowledge about Knowledge），也称为元本体（Metadata）。

```turtle
# TBox：概念定义（类与属性的抽象规则）
@prefix : <http://example.org/university#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

# 定义 "教授" 的概念：所有至少有三位不同讲师学生的教师
:Professor owl:equivalentClass (
    :Faculty [
        owl:onProperty :hasStudent ;
        owl:minQualifiedCardinality 3 ;
        owl:onClass :Lecturer
    ]
) .

# 定义属性特征
:hasStudent a owl:ObjectProperty ;
    rdfs:subPropertyOf :knows .
```

在 TBox 层面：
- **显式知识**：直接写入本体的等价声明、子类声明、属性公理
- **隐式知识**：由推理机推导出的类层次关系——例如若定义 `:AssociateProfessor rdfs:subClassOf :Professor`，推理机会自动发现 `:AssociateProfessor` 的所有隐含父类

### 2.2 ABox：事实层面的知识

**ABox**（断言盒子）记录关于**具体个体**的事实声明——哪些个体属于哪些类、个体之间的关系、个体的数据属性值。

```turtle
# ABox：个体事实（具体数据）
:alice a :Faculty ;
    :hasStudent :bob , :charlie , :david ;
    :teachesCourse :CS101 .

:bob a :Lecturer .
:charlie a :Lecturer .
:david a :Lecturer .

# 显式断言：Alice 是 Faculty
# 推理结果：Alice 是 Professor（因为她有 3 位 :Lecturer 类型的学生）
```

### 2.3 显式与隐式的对照表

| 维度 | 显式知识（Explicit Knowledge） | 隐式知识（Implicit Knowledge） |
|------|-------------------------------|-------------------------------|
| **来源** | 建模者显式写入本体文件 | 推理机基于公理和事实推导 |
| **存储** | 直接存在于 RDF 图中 | 不显式存储，按需计算 |
| **查询方式** | 直接 SPARQL 匹配 | 需要调用推理机（Reasoner） |
| **更新影响** | 增删数据直接影响推理结果 | 修改 TBox 公理会触发重新推理 |
| **示例** | `:alice a :Faculty` | 推理得出 `:alice a :Professor` |

---

## 3. 演绎推理（Deductive Reasoning）在语义网中的应用

**演绎推理**（Deductive Reasoning，又称"演绎法"、"演绎逻辑"）是从一般性前提出发，推导出特定结论的逻辑方法。其核心特征是：**如果前提为真，则结论必然为真**（保真性，Soundness）。

### 3.1 演绎推理的经典模型：三段论

```
大前提（General Rule）：所有人（Human）都会死（Mortal）
小前提（Specific Fact）：苏格拉底（Socrates）是人（Human）
结论（Conclusion）：苏格拉底（Socrates）会死（Mortal）
```

转换为本体论 OWL 2 表达：

```turtle
# 大前提：Human 是 Mortal 的子类（或等价类）
:Human rdfs:subClassOf :Mortal .

# 小前提：Socrates 是 Human 的实例
:Socrates a :Human .

# 推理结论（自动推导）
# :Socrates a :Mortal  ← 隐式知识，推理机自动生成
```

### 3.2 语义网中的演绎推理模式

在语义网（Semantic Web）中，演绎推理的应用远不止简单的子类推导：

| 推理模式 | 逻辑规则 | 语义网应用示例 |
|----------|----------|---------------|
| **子类传递性** | A ⊑ B ∧ B ⊑ C → A ⊑ C | `:Dog rdfs:subClassOf :Mammal` ∧ `:Mammal rdfs:subClassOf :Animal` → `:Dog rdfs:subClassOf :Animal` |
| **属性传递性** | TransitiveProperty 推导链式关系 | `hasParent` 传递 → `:Alice :hasParent :Bob` ∧ `:Bob :hasParent :Carol` → `:Alice :hasParent :Carol` |
| **等价替换** | owl:equivalentClass 互换 | `:MortalHuman owl:equivalentClass ( :Human owl:intersectionOf (...) )`，两者可互换使用 |
| **属性域推断** | rdfs:domain 隐式类型赋值 | `:hasAge rdfs:domain :Person`，若 `:Alice :hasAge 30`，则 `:Alice` 隐式为 `:Person` |
| **值约束推断** | rdfs:range 推导客体类型 | `:hasParent rdfs:range :Person`，若 `:Alice :hasParent :Bob`，则 `:Bob` 隐式为 `:Person` |

### 3.3 OWL 2 的推理规则集合

OWL 2（特别是 OWL 2 DL Profile）基于 **DL-ML 描述逻辑**，支持以下核心推理规则：

```
# 类公理推理规则
SubClassOf(A B) → 若 A ⊑ B 且 B ⊑ C，则 A ⊑ C （传递性）
EquivalentClasses(A B) → A ⊑ B 且 B ⊑ A （可互换）
DisjointWith(A B) → A ∩ B = ∅ （无交集，一个个体不可能同时属于两者）

# 属性公理推理规则
TransitiveProperty(P) → 若 ?x P ?y 且 ?y P ?z，则 ?x P ?z
InverseOf(P Q) → 若 ?x P ?y，则 ?y Q ?x
Domain(P C) → 若 ?x P ?y，则 ?x C
Range(P C) → 若 ?x P ?y，则 ?y C

# 个体公理推理规则
SameAs(x y) → x 和 y 可互换使用
DifferentFrom(x y) → x 和 y 是不同个体
```

---

## 4. 两个关键概念：可满足性（Satisfiability）与蕴含（Entailment）

在推理理论中，**可满足性**和**蕴含**是两个最核心的概念，几乎所有推理任务都可以归结为这两者的计算。

### 4.1 可满足性（Satisfiability）

**可满足性（Satisfiability）** 是指：在给定本体公理（TBox + ABox）的约束下，一个类是否有**可能的实例**。

- **可满足类**（Satisfiable Class）：推理机可以构造出至少一个潜在实例的类
- **不可满足类**（Unsatisfiable Class）：在任何模型中都**永远不可能有实例**的类

```turtle
# 示例 1：可满足类
:LivingBeing a owl:Class .
# → 可满足，因为没有公理阻止它的实例存在

# 示例 2：不可满足类（矛盾）
:DeadLivingThing owl:equivalentClass ( :LivingBeing owl:intersectionOf ( :Dead ) ) .
:Dead owl:complementOf :LivingBeing .
# → 不可满足！:LivingBeing 与 :Dead 是不相交的，不存在既是生命又是死亡的东西
# 推理机将标记 :DeadLivingThing 为不可满足类
```

**不可满足类的实际用途**：
- **本体调试**：发现建模者的逻辑错误（如错误的公理组合导致类永不可能有实例）
- **分类质量检查**：消除分类树中永远不会有实例的空类
- **优化推理性能**：在推理前移除不可满足类可减少计算量

### 4.2 蕴含（Entailment）

**蕴含（Entailment）** 是指：给定一个本体 $O$ 和一个语句 $S$，如果 $O$ 的**每一个模型都使 $S$ 为真**，则称 $O$ **蕴含** $S$，记作 $O \models S$。

简单来说：**蕴含 = 逻辑必然性**。如果从本体 $O$ 中能必然推导出语句 $S$（不可能有反例），那么 $O$ 蕴含 $S$。

```turtle
# 本体 O
:Human rdfs:subClassOf :Mortal .
:Socrates a :Human .

# 蕴含关系：
# O ⊧ :Socrates a :Mortal  （必然蕴含，因为 :Socrates 必是 :Mortal）
# O ⊧ :Human rdfs:subClassOf :Animal  （若不定义 :Human ⊑ :Animal 的父类，则不蕴含）

# ⚠ 注意：OWL 2 的开放式世界假设（OWA）意味着：
# "数据不存在" ≠ "数据不存在（假）"，而是 = "我们不知道是否存在"
# 这与 SQL 数据库的封闭式世界假设（CWA）形成鲜明对比
```

### 4.3 可满足性 vs 蕴含的对比

| 维度 | 可满足性（Satisfiability） | 蕴含（Entailment） |
|------|--------------------------|-------------------|
| **问题类型** | "这个类**有没有可能**有实例？" | "这条语句**是否必然为真**？" |
| **推理输出** | 可满足 / 不可满足类列表 | 是 / 否 + 推导出的语句集合 |
| **应用场景** | 本体调试、质量评估 | 分类、实例分类、查询增强 |
| **计算难度** | 通常较低（DL-Eℒ 多项式时间） | 依赖 Profile（EL 低，DL 高） |
| **OWA 影响** | 开放世界：除非矛盾否则可满足 | 开放世界：缺乏证据 ≠ 假，仅当必然时为真 |

---

## 5. OWL 2 三个 Profile（EL, QL, DL）及其推理场景

由于 OWL 2 Full 的推理是**图灵完备的**（不可判定），W3C 定义了三个可判定的 **OWL 2 Profile**，各自优化了不同场景下的推理性能。

### 5.1 Profile 总览对比

| 维度 | OWL 2 EL | OWL 2 QL | OWL 2 DL |
|------|----------|----------|----------|
| **主要设计目标** | 大规模概念分类 | 大规模数据查询（对接数据库） | 平衡表达力与推理性能 |
| **核心算法** | 多项式时间分类算法（Ptime） | 基于 Datalog 的查询重写（CQ-rewriting） | 基于表逻辑（Tableau）的决策算法 |
| **表达力** | 低（仅支持合取、 Existential ∃ 前缀） | 中低（有限构造子，不支持复杂角色公理） | 高（完整的 OWL 2 构造子） |
| **支持的最大本体规模** | **数十万类** | **数十亿事实**（ABox） | **数千至数万类/事实** |
| **典型应用** | 生物医学本体（SNOMED CT, Gene Ontology） | 企业数据集成、RDB 映射（R2RML）、知识图谱 | 中小型语义网应用、哲学本体（BFO） |
| **支持的数据属性** | 有限（简单限制表达式） | 支持（但有约束） | 完整支持（正则、区间、枚举等） |
| **代表性推理机** | ELK, Openllet (EL 模式) | Stardog, GraphDB（QL Profile） | HermiT, Pellet, Fact++ |
| **可判定性** | ✅ 可判定（Ptime） | ✅ 可判定（CQ 重写） | ✅ 可判定（指数时间最坏情况） |

### 5.2 OWL 2 EL Profile：海量分类推理

**OWL 2 EL** 是专为大规模概念层次（TBox）设计的轻量级 Profile。它仅允许以下构造子：
- 类合取（Class Intersection：`owl:intersectionOf` 仅限两个类）
- 存在量词限制（Existential Restriction：`owl:someValuesFrom`）
- 自反闭包（Reflexive Transitive Closure，可选）

**不允许**的构造子：
- `owl:unionOf`（并集）、`owl:complementOf`（补集）
- `owl:allValuesFrom`（全称限制）
- `owl:minCardinality` / `owl:maxCardinality`（基数约束）
- `owl:inverseOf`（逆属性）、链公理等

```turtle
# ✅ OWL 2 EL 合法示例
:Heart a owl:Class .
:Organ a owl:Class .
:AnatomyThing owl:equivalentClass [
    owl:onProperty :partOf ;
    owl:someValuesFrom :AnatomyThing
] .  # 自反存在量词（EL++ 特性）

:Heart rdfs:subClassOf :Organ .
:Heart rdfs:subClassOf [
    owl:onProperty :partOf ;
    owl:someValuesFrom :Tissue
] .
# 推理机：:Heart 是 :Organ 的子类，且与 :Tissue 有 :partOf 关系
```

**适用场景**：**SNOMED CT**（临床医学术语集，含约 35 万概念）、**Gene Ontology**、**FMA**（解剖学本体）。

### 5.3 OWL 2 QL Profile：大规模数据查询

**OWL 2 QL** 专为通过本体层查询大规模关系数据库或三元组存储而设计。它使用 **CQ-rewriting**（Combined Query Rewriting）技术：

**核心思路**：将 SPARQL 查询 + 本体 TBox → 重写为等价的 SQL/SPARQL 查询（不加载推理结果，直接在数据库层推理）。

**允许的限制构造子**：
- 类表达式合取
- 存在量词前缀
- 简单数据类型限制
- 属性层次结构和属性公理（部分）

**不允许多余构造子**：属性补集、全称量化、复杂基数约束。

```turtle
# ✅ OWL 2 QL 合法示例
:Person a owl:Class .
:Employee rdfs:subClassOf :Person .
:hasSupervisor a owl:ObjectProperty ;
    rdfs:subPropertyOf :knows .

# CQ-rewriting 过程示例
# 用户查询：SELECT ?x WHERE { ?x a :Person }
# TBox 告知：:Employee rdfs:subClassOf :Person
# 重写后查询：SELECT ?x WHERE { ?x a :Person UNION ?x a :Employee }
# 数据库直接返回结果，无需将推理结果物化！
```

**适用场景**：企业数据虚拟化（Data Virtualization）、对关系数据库暴露语义视图、拥有十亿级别 ABox 数据的知识图谱平台。

### 5.4 OWL 2 DL Profile：通用推理黄金标准

**OWL 2 DL**（Description Logic Profile）是 OWL 2 的本体建模首选 Profile，它在描述逻辑的语义框架下保留了尽可能丰富的表达力。**几乎**所有 OWL 2 构造子（除 `rdfs:comment` 等元数据构造子）都支持。

| 典型 OWL 2 DL 构造子 | Turtle 示例 |
|---------------------|------------|
| 类等价与不等价 | `owl:equivalentClass`, `owl:disjointWith` |
| 类交集与补集 | `owl:intersectionOf`, `owl:complementOf` |
| 基数约束 | `owl:minCardinality`, `owl:maxCardinality`, `owl:qualifiedCardinality` |
| 全称限制 | `owl:allValuesFrom` |
| 属性逆与链 | `owl:inverseOf`, `owl:propertyChainAxiom` |
| 属性特征 | `owl:TransitiveProperty`, `owl:SymmetricProperty` |
| 完整数据属性 | `owl:onDataRange`, `owl:min/f qualified DataCardinality` |

**适用场景**：需要完全 OWL 2 语义的应用，包括**一致性检查**、**不可满足类发现**、**完整实例分类**。大多数中等规模的本体（数百至数千类、数万个事实）使用 OWL 2 DL。

### 5.5 选择建议

| 需求场景 | 推荐 Profile | 推理机建议 |
|----------|-------------|-----------|
| 超过 1 万类的层次本体，无需一致性强检查 | OWL 2 EL | ELK Reasoner |
| 十亿级事实，通过本体查询关系数据库 | OWL 2 QL | Stardog / GraphDB 内建 |
| 中小型本体，需要完整语义推理和一致性检查 | OWL 2 DL | HermiT 或 Pellet |
| 极端表达能力，不关心可判定性 | OWL 2 Full | 通用定理证明器（不推荐） |

---

## 6. 本章小结

本节建立了本体推理的理论和实践基础：

1. **推理的本体论本质**：从显式公理推导出隐含知识，是语义网区别于数据库查询的核心能力。
2. **显式知识（Explicit）vs 隐式知识（Implicit）**：显式存在于文件中的知识与推理机计算的隐含知识。
3. **演绎推理**：从一般到特殊的保真推理模式，是所有 OWL 2 推理的底层逻辑。
4. **可满足性与蕴含**：两个基本推理问题的概念区分与计算目标。
5. **三个 Profile**：EL（海量分类）、QL（大规模查询）、DL（平衡推理）各自适用于不同的场景。

在下节中，我们将逐一介绍主流推理机工具（HermiT、Pellet、FaCT++、ELK）和 Protégé 的配置方法。