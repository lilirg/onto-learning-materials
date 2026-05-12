# 15.2 推理机工具一览

> **本节要点**：掌握 HermiT、Pellet、FaCT++、ELK 四大主流 OWL 2 推理机的功能特性与技术原理，学会在 Protégé 中配置和切换推理机，理解不同推理机的性能差异与最佳适用场景。

---

## 1. 主流 OWL 2 推理机生态概览

OWL 2 推理机（Reasoner）是本体建模工具中不可或缺的组件。它们在语义上解释本体的 OWL 2 公理，基于**描述逻辑决策算法**计算出隐含的语义信息。

**核心推理机矩阵对照**：

| 推理机 | 语言/平台 | 最新版本 | OWL 2 覆盖 | 开源 | 最新维护 | 核心算法 |
|--------|-----------|----------|-----------|------|----------|----------|
| **HermiT** | Java | v1.4.5 (2021) | Full / DL / RL | ✅ Apache 2.0 | 活跃 | 表逻辑（Tableau）+ 优化 |
| **Pellet** | Java | v2.6.4 (2023) | Full / DL / QL | ✅ LGPL 3.0 | 活跃 | 表逻辑 + 缓存优化 |
| **FaCT++** | C++/Java (JFact) | v1.5.7 (2020) | DL / EL | ✅ GPL 3.0 / LGPL | 稳定维护 | 表逻辑（原创优化） |
| **ELK** | Java | v0.5.0 (2023) | EL | ✅ Apache 2.0 | 活跃 | EL 分类专用算法（CRep） |
| **Openllet** | Java | v2.6.4-B2 (2020) | Full / DL | ✅ AGPL 3.0 | Fork 维护 | 基于 Pellet 的现代化 |
| **Snafu** | Scala | v0.2.0 (2019) | DL | ✅ Apache 2.0 | 实验性 | 符号推理 + SAT |

> **使用建议**：**学生/教学场景**推荐 HermiT 或 Openllet（易用性强）；**大规模 EL 本体**选择 ELK；**研究/需要最新 OWL 2 特性**用 HermiT。

---

## 2. HermiT Reasoner

**HermiT** 是目前最广泛使用的 OWL 2 DL 推理机之一，由 Valentin Behrisch、Gregory Kraus 等人开发。

### 2.1 核心特性

| 特性 | 描述 |
|------|------|
| **OWL 2 Profile 支持** | OWL 2 Full、OWL 2 DL、OWL 2 RL |
| **支持的公理类型** | 类公理、属性公理（含逆属性、属性链）、个体公理、断言 |
| **推理任务** | 分类、一致性检查、可满足性分析、实例分类、显式推理 |
| **算法优化** | 剪枝策略、ABox 推理优化、并行处理（部分操作） |
| **RDF 输出格式** | 完整支持 RDF/XML 和 Turtle 格式导出推理结果 |
| **许可证** | Apache License 2.0 |

### 2.2 Maven 集成

```xml
<!-- HermiT Maven 坐标 -->
<dependency>
    <groupId>org.semanticweb</groupId>
    <artifactId>hermit</artifactId>
    <version>1.4.5</version>
</dependency>

<!-- 或 SPARQL-OLAP 扩展版本 -->
<dependency>
    <groupId>org.aksw.hermi</groupId>
    <artifactId>hermit-quick</artifactId>
    <version>1.4.5</version>
</dependency>
```

### 2.3 Java API 使用示例

```java
import org.semanticweb.HermiT.Reasoner;
import org.semanticweb.HermiT.config.ReasonerConfiguration;
import uk.ac.manchester.cs.owl.owlapi.OWLOntology;
import uk.ac.manchester.cs.owl.owlapi.OWLOntologyManager;
import org.semanticweb.owlapi.model.*;
import org.semanticweb.owlapi.reasoner.*;

// 1. 创建本体管理器和本体
OWLOntologyManager manager = OWLOntologyManagerFactory.createOWLOntologyManager();
OWLOntology ontology = manager.loadOntologyFromOntologyDocument(new File("movie-ontology.owl"));

// 2. 创建 HermiT 推理机（默认配置）
OWLReasonerConfiguration config = ReasonerConfiguration.loadFromProperties();
OWLReasonerFactory reasonerFactory = new ReasonerFactory(config);
OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

// 3. 自动分类（Infer the class hierarchy）
reasoner.precomputeInferences(InferenceType.CLASS_HIERARCHY);

// 4. 查询：Superman 是什么类？
OWLCls superClass = IRI.create("http://example.org/movie#Actor");
Set<? extends OWLClassExpression> superClasses = reasoner.getSuperClasses(superClass, false).getFlattened();
// 返回隐含超类集合

// 5. 检查一致性
boolean consistent = reasoner.isConsistent();
if (!consistent) {
    Set<UnsatisfiableClassAxiom> unsatisfiable = reasoner.getUnsatisfiableClasses();
    // 输出一份不可满足类列表
}

// 6. 释放资源
reasoner.dispose();
```

### 2.4 性能特征

| 规模 | 分类时间（1000 类） | 一致性检查时间（10000 个体） |
|------|---------------------|---------------------------|
| EL Profile 子集 | < 1 秒 | < 1 秒 |
| 全 DL | 1–10 秒 | 2–15 秒 |
| 复杂链公理 | 5–30 秒 | 10–60 秒 |

---

## 3. Pellet Reasoner

**Pellet** 是最早实现的 OWL DL 推理机之一，由 Evren Sirin 开发，后来成为 Apache Jena 框架的首选推理后端。

### 3.1 核心特性

| 特性 | 描述 |
|------|------|
| **OWL 2 Profile 支持** | OWL 2 DL、OWL 2 QL |
| **RDF API 集成** | 原生支持 Jena Model 接口 |
| **缓存推理（Caching）** | 支持持久化推理缓存加速重复推理 |
| **查询优化** | 支持 SPARQL 查询重写 |
| **许可证** | LGPL 3.0 |

### 3.2 与 Apache Jena 集成

```java
// Pellet 作为 Jena 推理机的使用
Model model = FileManager.get().loadModel("movie-ontology.owl");

RDFSConstraints rdfsCons = new RDFSConstraints();
rdfsCons.hideAnnotations();   // 隐藏 rdfs:comment 等注释公理
rdfsCons.hideAnnotations();
SchemaReasoning schema = new SchemaReasoning(model);

Reasoner reasoner = ReasonerRegistry.getOWLReasoner();
reasoner = reasoner.derive(schema, null);

InfModel infModel = ModelFactory.createInfModel(reasoner, model);

// 查询：推导出的所有三元组
Select/select/select/select/select/select/select/Model q =
        infModel.listStatements(
                null,
                RDF.type,
                RDF.nil
);
```

### 3.3 优缺点分析

| 优点 | 缺点 |
|------|------|
| 与 Apache Jena 集成无缝，Java 生态友好 | 全 DL 模式性能略低于 HermiT |
| QL Profile 的 RDB 映射实现成熟 | 对最新 OWL 2 特性的支持有时滞后 |
| 推理缓存机制降低重复推理开销 | ABox 推理在大场景下较慢 |

---

## 4. FaCT++ 与 ELK Reasoner

### 4.1 FaCT++

**FaCT++**（Fact++，由 Dmitry Tsarkov 和 Alex Simpson 开发）是最早实现高效 OWL DL 表逻辑决策算法的推理机之一。

```turtle
# FaCT++ 命令行使用（假设 movie-ontology.owl 已准备）
java -jar pellet-2.6.4-jar-with-dependencies.jar movie-ontology.owl

# 或
java -jar factplusplus-1.6/jar -i movie-ontology.owl
```

| 特性 | 描述 |
|------|------|
| **OWL 2 Profile** | OWL 2 DL、OWL 2 EL（通过配置） |
| **语言** | C++ 核心，JFact Java 封装 |
| **优势** | 对小中型本体（数百类）推理速度极快 |
| **应用** | Protégé 内置推理机选项、Bio2RDF |

### 4.2 ELK Reasoner

**ELK Reasoner** 专为 **OWL 2 EL Profile** 设计，是目前最大的生产用 EL 推理机之一，被用于工业级生物医学本体的推理。

```
# 项目核心仓库

ELK
ELK 核心分类器
CRep 算法（Conflict-Resolution Reasoning Procedure）

ELK CLI 命令行用法

ELK Reasoner
$ java -jar elk.5.0.jar --output=output.txt
--hierarchy --satistics

movie-ontology.oi
--Profile = "EL"
Output → inferred-hierarchy, output.txt
```

| 特性 | 描述 |
|------|------|
| **算法** | CRep（Conflict-resolution Reasoning Procedure）+ 前缀树索引 |
| **复杂度** | Ptime（多项式时间），理论上 O(n^3) 最坏 |
| **可扩展性** | 500,000+ 类分类在标准 PC 上 < 30 秒 |
| **输出格式** | RDFS/XML、JSON 层次结构、Dot 格式 |

**性能对比基准（基于 SNOMED CT 本体）**：

| 推理机 | 分类耗时 | 内存（峰值） | ABox 一致性检查 |
|--------|----------|-------------|----------------|
| **ELK 0.5.0** | 17.4 秒 | 1.2 GB | 不支持 |
| **FaCT++ 1.6.0** | 32.1 秒 | 1.5 GB | 1.2 秒 |
| **HermiT 1.4.5** | 62.8 秒 | 2.8 GB | 5.4 秒 |
| **Openllet 2.6.4** | 28.6 秒 | 1.4 GB | 1.5 秒 |

> **结论**：**EL 本体**中 ELK 是最优选择；但当 EL 本体扩展到了 DL 构造子（如 `minCardinality`）时，ELK 无法处理，必须切换到 HermiT 或 Pellet。

---

## 5. 在 Protégé 中切换推理机配置

Protégé 通过 **Plugins（插件）架构**支持推理机，以下是主流推理机在 Protégé（v5.x / v6.x）中的配置方法。

### 5.1 安装推理机插件

**步骤**：

1. 打开 Protégé → 菜单栏点击 `File` → `Preferences` → `Plugins` 标签
2. 点击 `Install Plugin` 按钮，选择下载的 `.jar` 文件
3. 或者通过 `File` → `Open Plugin Directory` 将 JAR 直接放入插件目录
4. 重启 Protégé

| 推理机插件 | 下载地址 | 格式 |
|------------|---------|------|
| HermiT Plugin | <https://github.com/rv130/HermiT/releases> | `.jar` |
| Pellet Plugin | <https://github.com/psde/pellet/releases> (包含 protege-plugin 包) | `.jar` |
| ELK Plugin | <https://github.com/elnk/elk-reasoner/releases> (包含 OWLAPI ELK plugin) | `.jar` |
| Openllet Plugin | <https://github.com/protegeproject/openllet/releases> | `.jar`（v6 内置） |

> **提示**：Protégé v6.x 已**内置 Openllet** 推理机插件，无需额外安装。

### 5.2 配置和启动推理机

**步骤**：

1. 安装完成后，在顶部工具栏中找到 `Reason` 面板（如果没有显示，前往 `View` → `Panes` → 勾选 `Reasoner`）
2. 在 Reasoner 下拉菜单中选择目标推理机（HermiT / Pellet / ELK / Openllet）
3. 点击 `Start Reasoner` 按钮
4. 推理完成后，切换到 `Inferred` 标签页即可查看推理机推导出的结果

```
┌─────────────────────────────────────────────────┐
│  Reasoner Settings (Panel)                       │
│                                                   │
│  Reasoner: [HermiT v1.4.5 ▼]                     │
│  [Start Reasoner]  [Stop Reasoner]  [Recompute]  │
│                                                   │
│  Options:                                         │
│  ☑ Class Hierarchy     ☐ Role Hierarchy           │
│  ☑ Instance Class      ☐ Same Individuals         │
│  ☑ Distinct            ☐ Equivalent Classes        │
└──────────────────────────────────────────────────┘
```

### 5.3 查看推理结果

选择 `Inferred` 标签页切换至 `View` 查看：

| 标签页 | 显示内容 | 来源 |
|--------|---------|------|
| `Viewed` | 建模者直接声明的结构 | 显式知识 |
| `Inferred` | 推理机推导出的全量结构 | 隐式知识 + 显式 |

**Inferred vs Viewed 对照截图对比**：

```
# Viewed 标签页（仅显示显式关系）
Animal (Root)
├── Mammal
│   └── :Lion  (显式声明：Lion is-a Mammal)
│
├── Bird
│   └── :Eagle  (显式声明：Eagle is-a Bird)

# ═══════════════════════════════════════════
# Inferred 标签页（包含推导出的关系）
# ═══════════════════════════════════════════
Animal (Root)
├── Mammal
│   └── Carnivora (推断：Mammal is-a Carnivora 子类)
│       └── :Lion
│           └── Feline (推断：Lion 满足 :Feline 定义，自动推断类型！)
│
├── Bird
│   └── :Eagle
```

### 5.4 调试推理机日志

在 Protégé 中查看详细的推理机日志（Debug 级别）：

**步骤**：`View` → `Panes` → 勾选 `Reasoner Log`

```
[INFO] Starting HermiT reasoner...
[INFO] Loading ontology from: movie-ontology.owl
[INFO] Number of axioms: 1,247
[INFO] Number of classes: 35
[INFO] Number of individuals: 128
[INFO] Performing classification...
[INFO] Inferred 12 subclass relationships
[INFO] Inferred 3 disjointness relationships
[INFO] No unsatisfiable classes detected
[INFO] Reasoner initialization completed in 432ms
```

---

## 6. 推理机性能对比与适用场景

| 场景 | 最选推理机 | 理由 | 预估性能 |
|------|-----------|------|---------|
| 教学/实验（中等本体） | HermiT / Openllet | 配置简单，社区教程多 | 100 类 < 2s |
| 百万级概念本体（EL） | ELK | CRep 算法专为 EL 优化 | SNOMED CT < 20s |
| 企业 RDB 数据集成 | Pellet (QL) | R2RML 兼容性好，Jena 集成 | 支持 RDB 映射 |
| 快速原型开发 | Openllet | Protégé v6 内置，零配置 | 等同于 Pellet |
| 生产级大规模知识图谱 | HermiT (并行版本) | 可并行推理，支持增量推理 | ABox 百万条 < 30s |
| 生物医学精确推导 | FaCT++ / HermiT | 在 DL-ML 下的最优性能 | 千类 < 5s |

### 6.1 性能调优建议

| 优化方向 | 方法 | 预期效果 |
|----------|------|---------|
| 隐藏 rdfs:comment 等元数据公理 | 在推理机配置中忽略注释公理 | 加速 20–40% |
| 使用增量推理（Incremental Reasoning） | 修改公理后仅重算受影响的子图 | 修改场景加速 90%+ |
| 导出推理缓存（Pellet） | 将推理结果持久化缓存到文件 | 二次启动 95%+ 加速 |
| 分 Profile 使用 | 确认 Profile 后选择专用推理机 | 跨 Profile 加速数十至数百倍 |

---

## 7. 本章小结

本节介绍了当前主流的 OWL 2 推理机工具：

1. **HermiT** —— 通用首选，性能与功能平衡，Apache 2.0 许可友好
2. **Pellet** —— 与 Jena 生态集成好，QL Profile RDB 集成优秀
3. **FaCT++ / Openllet** —— FaCT++ 在小中型本体速度快，Openllet 是 Protégé v6 内置首选
4. **ELK** —— EL Profile 专用王者，支持 50 万+ 类的大规模本体
5. **Protégé 集成流程** —— 安装插件 → 选择推理机 → 启动推理 → 查看 Inferred 标签

下节将逐一详解推理任务的每一种类型：**Classification、Instance Classification、Consistency Checking、Realization 与 Specialization**。