# 第 8 章 OWL 2 概述

> **本章要点**：本章从 RDFS 的表达能力局限出发，阐述为什么需要 OWL 2；介绍 OWL 2 Profiles（EL、QL、DL、RL）的设计理念与适用场景；描述逻辑是 OWL 2 的逻辑基础；并深入讨论开世界假设 vs 闭世界假设，以及 TBox 与 ABox 的知识分层。

---

## 🔗 前置知识

在继续学习本章之前，建议读者至少了解：

- [第 4 章：RDF 数据模型](../ch04-rdf-data-model/index.md) — RDF 三元组、资源标识符等基本概念
- [第 6 章：RDFS 核心](../ch06-rdfs-core/index.md) — RDF 词汇表、`rdfs:subClassOf`、定义域与值域等

---

## 1. 本章概述

OWL 2（Web Ontology Language 2）是 W3C 推荐的语义网本体语言标准，在 RDF/RDFS 的基础上提供了更加丰富和精确的知识表达能力。

本章作为 OWL 2 建模技术的入门章节，从以下几个维度建立系统性理解：

### 1.1 为什么需要 OWL 2（Ch08.1）

RDF/RDFS 虽然简洁高效，但在表达能力上存在诸多局限：

- 无法声明类之间的**不相交性**（Disjointness）
- 无法表达**等价类**（Equivalent Class）
- 缺乏**基数约束**（Cardinality Constraints）与**属性特征**（Property Features）
- **闭世界推理**能力缺失，难以满足关系数据库场景的需求

OWL 2 通过引入描述逻辑（Description Logic）作为形式化基础，克服了这些局限。

### 1.2 OWL 2 Profiles（Ch08.2）

OWL 2 提供了四种 Profile，每个 Profile 限制了本体的构造能力，以换取**更好的推理或查询性能**：

| Profile | 全称 | 设计目标 | 典型应用场景 |
|---------|------|---------|-------------|
| **OWL 2 EL** | — | 高效分类推理 | 大规模类层次结构（如生物医学 SNOMED CT） |
| **OWL 2 QL** | — | 高效数据查询 | 与关系数据库集成，使用 Datalog 重写 |
| **OWL 2 RL** | | 基于规则的推理 | 支持向后链式规则引擎，扩展推理能力 |
| **OWL 2 DL** | Description Logic | 完整推理性保证 | 通用本体验证和分类（最大表达力 + 可判定性） |

> **关键理解**：Profiles 是 OWL 2 在**表达能力**与**推理效率**之间的妥协。选择合适的 Profile 取决于应用需求。

### 1.3 描述逻辑基础（Ch08.3）

描述逻辑（Description Logic，简称 DL）是一族形式化知识表示语言，是 OWL 2 的**逻辑基础**。

DL 通过字母缩写表示不同逻辑能力：

- **A** — 任意类求交（At most general conjunction of concepts）
- **C** — 类补（Negation / Complement）
- **E** — 存在量化（Existential quantification）
- **I** — 逆属性（Inverse property）
- **N** — 基数约束的否定（Negation of qualified number restriction）
- **P** — 属性链（Property chains）
- **Q** — 量化基数约束（Qualified number restrictions）

例如：
- **ALC** = A + L + C（基础描述逻辑，包含类交集、补集、存在量化和全称量化）
- **ALN** = A + L + N（ALC + 量化基数约束）
- **S** = SHIN(D)（OWL DL 对应的描述逻辑）
- **SHOIN(D)** = S + H + O + I + N + (D)（OWL DL 的完整逻辑）

### 1.4 OWA/CWA 与 TBox/ABox（Ch08.4）

OWL 2 基于**开世界假设**（Open World Assumption, OWA），与关系数据库的**闭世界假设**（Closed World Assumption, CWA）有本质区别：

| 假设 | 未知事实的处理 | 典型系统 |
|------|--------------|---------|
| **OWA** | 无法证实或不证的陈述均不被假定为真或假 | RDF/OWL |
| **CWA** | 无法证明为真的命题都被假定为假 | RDBMS/SQL |

同时，本体知识分为两个层次：

| 层次 | 全称 | 含义 | 示例 |
|------|------|------|------|
| **TBox** | Terminological Box | 术语知识：类、属性、公理的结构定义 | `Person subClassOf hasChild Person` |
| **ABox** | Assertional Box | 断言知识：具体个体的实例和属性值 | `alice a Person`, `alice hasChild bob` |

---

## 2. 章节导航

| 节 | 内容 | 链接 |
|----|------|------|
| 8.1 | 为什么需要 OWL 2（RDFS 的不足） | [`01-why-owl2.md`](01-why-owl2.md) |
| 8.2 | OWL 2 Profiles（EL、QL、RL、DL） | [`02-owl2-profiles.md`](02-owl2-profiles.md) |
| 8.3 | 描述逻辑基础 | [`03-description-logic.md`](03-description-logic.md) |
| 8.4 | OWA/CWA 与 TBox/ABox | [`04-owa-cwa-tbox-abox.md`](04-owa-cwa-tbox-abox.md) |
| 8.5 | OWL 2 的新特性 | [`05-owl2-new-features.md`](05-owl2-new-features.md) |

---

## 3. 继续阅读

学习完本章后，可继续探索：

- [第 9 章：Protégé 入门](../ch09-protoge-intro/index.md) — 如何使用 Protégé 工具创建和操作本体
- [第 10 章：OWL 2 类建模](../ch10-owl2-class-modeling/index.md) — 深入 OWL 2 类表达式、等价与不相交声明

---

## 4. 本章小结

| 概念 | 说明 |
|------|------|
| RDFS 不足 | 不支持不相交性、等价类、基数约束等表达能力限制 |
| OWL 2 Profiles | EL（高效分类）、QL（高效查询）、RL（规则推理）、DL（完整推理） |
| 描述逻辑 | OWL 2 的逻辑基础，通过字母缩写表示不同构造能力 |
| OWA vs CWA | 开世界假设（未知 ≠ 假）vs 闭世界假设（未知 = 假） |
| TBox vs ABox | 术语知识（结构定义）vs 断言知识（实例数据） |