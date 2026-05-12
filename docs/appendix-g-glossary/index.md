# 附录 G: 术语中英对照表

> **本节要点**：本术语表收录了 ontology（本体）、semantic web（语义网）和 knowledge representation（知识表示）领域的核心概念与词汇，方便读者对照查阅。所有术语均按英文字母排序分类。

---

## 1. A–F

| 英文 | 中文 | 音标/发音参考 | 类别 | 定义说明 |
|------|------|--------------|------|----------|
| **Axiom** | 公理 | /ˈæksiəm/ | 核心概念 | 用于描述本体中类、属性或个体之间关系的陈述。本体推理的基础。 |
| **Atom** | 原子 | /ˈætəm/ | 逻辑基础 | 描述逻辑中最小的不可分公式。 |
| **Attribute** | 属性 | /ˈætrɪbjuːt/ | 核心概念 | 描述实体特征的变量；在 OWL 中对应 Property。 |
| **Base Instance** | 基实例 | — | 推理 | 由推理器推导出的根级别个体。 |
| **Blank Node** | 空白节点 | — | RDF | 没有全局唯一标识的资源，用 `_:` 表示。 |
| **Busyness** | 繁忙性 | /ˈbɪzɪnɪs/ | 逻辑基础 | 描述逻辑中的特性：如果一个逻辑允许自引用循环公理则认为是 Busier。 |
| **Class** | 类 | /klæs/ | 核心概念 | 同一类别个体的集合；OWL 中表示为 `owl:Class`。 |
| **Closure** | 闭包 | /ˈkloʊʒər/ | 逻辑基础 | 一组推理操作应用完毕后的知识完备集合。 |
| **Concept** | 概念 | /ˈkɒnsept/ | 核心概念 | 人类对一组对象共性的抽象分类。 |
| **Concrete Domain** | 具体域 | — | 推理 | 用于数据类型属性值的结构，如整数、字符串。 |
| **CWA (Closed World Assumption)** | 封闭世界假设 | — | 逻辑基础 | 无法证明为真的命题都被假定为假。RDBMS 默认采用。 |
| **CWE** | 冲突与不相交 (Contradictory & Disjoint Axioms) | — | 一致性 | 本体中矛盾公理的检查标志。 |
| **Data Property** | 数据属性 | — | OWL 2 | 从个体到具体值（字符串、数字）的属性。 |
| **Dead Node** | 死亡节点 | — | 推理 | 被标记为不可能存在的类，通常因矛盾导致。 |
| **Descendant (Class/Individual)** | 后代 | — | 层次 | 类层次结构中，某个类下的所有子类/个体。 |
| **DL (Description Logic)** | 描述逻辑 | — | 逻辑基础 | 概念知识与属性知识的形式化表征理论，是 OWL 的逻辑基础。 |
| **Disjoint** | 不相交 | /dɪsˈdʒɔɪnt/ | 核心概念 | 两个类没有任何共同实例；在 OWL 中表示为 `owl:disjointWith`。 |
| **Domain (Property)** | (属性的) 定义域 | /dəˈmeɪn/ | OWL 2 | 属性所关联的主体个体的集合。`rdfs:domain` |
| **Equivalent** | 等价 | /ˌɛkwɪˈvælənt/ | 核心概念 | 两类或两属性具有完全相同的实例集合。OWL 中表示为 `owl:equivalentClass/Property`。 |

---

## 2. G–N

| 英文 | 中文 | 类别 | 定义说明 |
|------|------|------|----------|
| **Goal-Based** | 目标驱动的 | 方法论 | 一种本体建模方法论，从目标任务出发提取和定义所需概念。 |
| **Glossary** | 术语表 | — | 专业术语定义的列表，用于统一领域内的沟通词汇。 |
| **Graph** | 图 | — | RDF 的存储结构，由节点和边组成；RDF 图是一组三元组构成的有向图。 |
| **Graph-based View** | 视图模式 | 工具 | Protégé 中的一种可视化查看方式。 |
| **Grounding** | 实例映射 | — | 将抽象概念映射到实际个体和属性的过程。 |
| **Hammer Principle** | 锤子原理 | 方法论 | "如果你手里只有一把锤子，那么一切看起来都像钉子"——工具局限性提醒。 |
| **Hierarchy** | 层次 | — | 按父子关系组织的类或属性结构体系。OWL 类的父类、子类关系形成层次。 |
| **Horn Clause** | 霍尔子句 | 逻辑基础 | 只包含一个正文字的子句形式。OWL EL 片段基于此保证推理效率。 |
| **IRI (Internationalized Resource Identifier)** | 国际化资源标识符 | — | URI 的扩展，支持 UTF-8 国际化字符。RDF 中推荐使用 IRI 而非 URI。 |
| **Instance (Individual)** | 实例 / 个体 | — | 概念域中的具体对象。OWL 中表示为 `owl:NamedIndividual`。 |
| **Instantiation** | 实例化 | — | 将一个个体链接到特定类的过程。例如 `alice rdf:type Person`。 |
| **Intensional Definition** | 意向式定义 | — | 通过类约束定义概念，而非列举所有实例。（vs. 外延式定义 Extensional Definition） |
| **Irreflexive** | 非自反 | — | 属性关系不能与自身成立，如 `P(x,x)` 永不真。OWL 用 `owl:IrreflexiveProperty`。 |
| **Named Graph** | 命名图 | — | 带唯一 IRIs 标识的三元组集合，支持多图的推理与存储。 |
| **Node** | 节点 | — | 图数据库中连接点（subject / object）；在三元组结构中可对应主体或客体。 |
| **NOR** | 非或逻辑 (Not-OR) | — | 逻辑关系；类不能同时是某些不相交类的实例。 |
| **N-Triples** | N-三元组 | 序列化 | RDF 规范化的无缩写格式，每行一个完整的三元组。 |

---

## 3. O–S

| 英文 | 中文 | 类别 | 定义说明 |
|------|------|------|----------|
| **Object Property** | 对象属性 | — | 连接两个个体的关系属性。OWL 中表示为 `owl:ObjectProperty`。 |
| **Ontology** | 本体 | — | 对某一领域内概念的规范化表示及它们之间的关系的明确规约。 |
| **Owl:Class** | OWL 类 | — | OWL 中定义类别的核心元素：`owl:Class`。 |
| **Owl:DatatypeProperty** | OWL 数据属性 | — | 连接个体到基本数据类型的属性：`owl:DatatypeProperty`。 |
| **Owl:ObjectProperty** | OWL 对象属性 | — | 连接两个个体的 OWL 属性：`owl:ObjectProperty`。 |
| **Owl:NamedIndividual** | OWL 命名个体 | — | 声明唯一命名个体：`owl:NamedIndividual`。 |
| **OWL (Web Ontology Language)** | Web 本体语言 | — | W3C 推荐的用于定义与推理 Web 本体的语言标准，包含 Profiles (EL, QL, DL)。 |
| **OWL EL** | OWL EL 配置 | — | 支持高效多项式推理的本体片段；适合大规模类层次与属性链。 |
| **OWL QL** | OWL QL 配置 | — | 支持映射到关系数据库进行查询优化的配置片段。 |
| **OWL DL** | OWL Description Logic 配置 | — | 支持完整推理性保证的标准 OWL 子集。 |
| **Open World Assumption (OWA)** | 开放世界假设 | — | 无法证实或不证的陈述均不被假定为真或假，留作后续扩展。RDF/OWL 的核心假设。 |
| **Opaque Property** | 不透明属性 | — | 属性的命名不包含其语义细节，仅用于结构。 |
| **Ordering Property** | 有序属性 | — | 值按特定顺序排列的属性约束。 |
| **OR-Constraint** | OR 约束 | — | 类必须从一组指定类中选择至少一个进行定义（Union/Selection constraints）。 |
| **OWL-Thing** | 全部个体 | ⊤ | 本体包含的顶级类 `owl:Thing`，其包含了所有的个体。 |
| **OOPS! (Oh Oh... ProtoTypical Mistake! Ontology Mistake Detection)** | 本体错误检测服务 | Web 工具 | 自动检测常见本体建模错误的在线工具。 |
| **Partial Function** | 部分函数 | — | 允许某些输入有 0 或 1 个输出值；对应 OWL 的 `owl:PartialFunctionalProperty`。 |
| **Partial Inverse** | 部分逆属性 | — | 属性关系的逆不要求完全满足的约束特性。 |
| **Partition** | 划分 | — | 将一组不相交类并集等于其父类的定义，等价于 `owl:disjointUnionOf`。 |
| **PIZZA Ontology** | PIZZA 教学本体 | 教学 | 经典的 OWL 2 入门教学示例本体，定义各种披萨类型与配料。 |
| **Property** | 属性 | — | 实体间的关系（对象属性）或特征（数据属性）描述元素。 |
| **Property Chain** | 属性链 | — | 多个属性按顺序组合形成的组合属性约束：`owl:propertyChainAxiom`。 |
| **Quad Graph** | 四元图结构 | — | 四元组（主体、谓词、客体、图名），支持命名图三元组的扩展。 |
| **Quadratic Inverse** | 二次逆变换 | — | 涉及属性逆关系的二次推理过程。 |
| **Quadruple (RDF Extension)** | 四元组 | — | RDF 扩展：主体、谓词、客体、图的四个元素的集合。 |
| **Quasi-Logical Property** | 准逻辑属性 | — | 看起来像逻辑约束但在语义上有细微差异的属性。 |

---

## 4. T–Z

| 英文 | 中文 | 类别 | 定义说明 |
|------|------|------|----------|
| **Triple (Subject-Predicate-Object)** | 三元组（主-谓-宾） | 核心概念 | RDF 数据的最小描述单元，由 `Subject Predicate Object` 三部分组成。 |
| **Triplestore** | 三元组存储 | 工具 | 专门用于 RDF 三元组存储、查询和推理的图数据库。如 Apache Jena Fuseki、GraphDB。 |
| **Type** | 类型 | — | 对个体所属类别的分类标识 (`rdf:type`)。 |
| **URI (Uniform Resource Identifier)** | 统一资源标识符 | — | 用于标识互联网资源的字符串；RDF/OWL 中用于表示实体和属性的唯一标识。 |
| **URBL (URI-Role-Binding Language)** | URI-角色绑定语言 | — | 语义网早期的一个基于 URIs 的角色描述系统。 |
| **Undecidability** | 不可判定性 | 逻辑基础 | 某些逻辑问题不存在通用算法能够永远在有限时间内得出确定答案。 |
| **Unification** | 统一 | 逻辑基础 | 描述逻辑推理中通过代换使多个原子达到一致的过程。 |
| **Untyped Property** | 无类型属性 | — | 不对属性值作类型限定（即不对 `range` 作约束）。 |
| **Validity of a Knowledge Base** | 知识库有效性 | — | 知识库存在至少一个满足所有公理约束的模型的性质。 |
| **Virtual Database** | 虚拟数据库 | — | 多数据源之上的逻辑映射层：使用虚拟本体接口统一不同知识源查询。 |
| **World (of Models)** | 模型世界 | 逻辑基础 | 描述逻辑中满足本体公理约束的一个模型集合；OWA 下存在多个可能的世界。 |

---

## 5. 中英文名称对照索引（中英→中）

| 中文 | 英文备选 |
|------|---------|
| 本体 | Ontology / 知识库 / 知识域 (Knowledge Domain) |
| 知识图谱 | Knowledge Graph (KG) |
| 语义网 | Semantic Web |
| 资源描述框架 | RDF (Resource Description Framework) |
| 描述逻辑 | Description Logic (DL) |
| 推理 | Reasoning / Inference |
| 一致性 | Consistency |
| 蕴含 | Entailment |
| 公理 | Axiom |
| 分类法 | Taxonomy |
| 词表 / 控制词汇表 | Thesaurus / Controlled Vocabulary |

---

## 6. 术语分类索引

### 6.1 按技术领域分类

#### 本体建模
`Ontology` `Class` `Property` `Individual` `Axiom` `Equivalent` `Disjoint` `Hierarchy` `Partition` `RDFS` `OWL` `Type`

#### 逻辑基础
`Description Logic` `Closed World Assumption` `Open World Assumption` `Entailment` `Busyness` `Closure` `Decidability` `Horn Clause` `Unification`

#### RDF 与序列化
`RDF` `Triple` `Triplestore` `N-Triples` `Turtle` `RDF/XML` `IRI` `URI` `Blank Node` `Named Graph` `Literal` `Subject` `Predicate` `Object`

#### OWL 2 特性
`Object Property` `Datatype Property` `Annotation Property` `Property Chain` `Transitive Property` `Symmetric Property` `Reflexive Property` `Function Property` `Qualified Cardinality` `Restriction` `Some Values From` `All Values From`

#### 推理与验证
`Reasoning` `Consistency` `Classification` `Realization` `Satisfaction` `Subsumption` `Similarity` `Model` `Valid` `Dead Class`

#### 工具与资源
`Protégé` `HermiT` `Pellet` `ELK` `FaCT++` `Turtle` `SPARQL` `Triplestore` `Ontobee` `LOD Cloud`

---

### 6.2 按字母排序的快速查找

| 字母 | 术语 |
|------|------|
| **A** | Axiom, Atom, Attribute |
| **B** | Base Instance, Blank Node, Busyness |
| **C** | Class, Closure, Concept, Concrete Domain, CWA, CWE |
| **D** | Data Property, Dead Node, Description Logic, Descendant, DL, Disjoint, Domain |
| **E** | Equivalent, Extensional Definition |
| **F** | F-Constraint, Fold |
| **G** | Goal-Based, Glossary, Graph, Graph View, Grounding |
| **H** | Hammer Principle, Hierarchy, Horn Clause |
| **I** | IRI, Instance, Instantiation, Intensional Definition, Irreflexive |
| **L** | Literal |
| **M** | Model, Modeling, Model Checking, Membership |
| **N** | Named Graph, Node, N-Triples, Node Status |
| **O** | Object Property, Ontology, Open World Assumption, Ordering Property, OOPS!, OR-Constraint, OWL-Thing, Partial Function, Property |
| **P** | Property, Property Chain, Quadruple, Quasi-Logical Property |
| **Q** | Query, Quick Browse |
| **R** | Reasoning, RDF, Range, Reflexive Property |
| **S** | Semantic Web, SHACL, SPARQL, SubClassOf, Subject, SuperClass, Symmetric Property |
| **T** | Taxonomy, TBox, Template, Thesaurus, Triple, Triplestore, Turtle |
| **U** | URI, URBL, Utility View |
| **V** | Valid, Virtual Database, Visual Graph, Visualization |
| **W** | Web Ontology Language, Workbench |
| **Y** | — (暂无) |

---

> **提示**：本术语表的定义部分摘录或借鉴了 W3C 推荐的 OWL 2 / RDF 官方词汇表，建议与 [MDN Web Docs Glossary](https://developer.mozilla.org/zh-CN/docs/Glossary) 及 [W3C OWL 2 Vocabulary](https://www.w3.org/TR/owl2-primer/) 一并参考阅读。