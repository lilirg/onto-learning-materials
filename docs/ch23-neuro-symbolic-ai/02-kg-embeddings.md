# 23.2 知识图谱嵌入（Knowledge Graph Embeddings）

> **本节要点**：知识图谱嵌入（Knowledge Graph Embeddings, KGE）将知识图谱中的实体和关系映射到低维连续向量空间，是实现神经符号融合的关键桥梁。本章将详细介绍平移模型（Translating Embeddings）、语义匹配模型（Semantic Matching Models）、深层模型（Deep Models）、评估指标和主流工具。

---

## 1. 什么是知识图谱嵌入？

**知识图谱嵌入**（Knowledge Graph Embeddings）是将知识图谱（Knowledge Graph, KG）中的**实体**（Entities）和**关系**（Relations）映射到连续低维向量空间的技术。

```mermaid
flowchart LR
    subgraph KnowledgeGraph["知识图谱 Knowledge Graph"]
        e1["(Einstein)"] -- "born_in" --> e2["(Germany)"]
        e1 -- "work_at" --> e3["(Princeton)"]
        e4["[""Marie Curie""]"] -- "discovered" --> e5["[""Radium""]"]
    end
    
    KGE["知识图谱嵌入<br/>Knowledge Graph Embedding"]
    
    subgraph VectorSpace["向量空间 Vector Space"]
        v1["Einstein → [0.23, -1.45, ...]"]
        v2["Germany → [-0.82, 2.10, ...]"]
        v3["born_in → [1.05, -0.32, ...]"]
    end
    
    KnowledgeGraph --> KGE
    KGE --> VectorSpace
    VectorSpace --> Similarity["相似性计算<br/>Similarity Computation"]
    
    style KGE fill:#e1f5fe
    style VectorSpace fill:#fff3e0
```

### 1.1 形式化定义

给定知识图谱 $G = (E, R, T)$，其中：
- $E$ 是**实体集合**（Entity Set）
- $R$ 是**关系集合**（Relation Set）
- $T$ 是**事实三元组集合**（Fact Triplets Set），$T \subseteq E \times R \times E$

例如：$T$ 包含三元组 $(\text{Einstein}, \text{born\_in}, \text{Germany})$

KGE 的目标是找到映射函数：
$$h, r, t \in \mathbb{R}^d$$

使得对于三元组 $(h, r, t)$，其得分函数 $f(h, r, t)$ 能够为**真三元组**（Valid Triplets）赋高分，为**假三元组**（Invalid Triplets）赋低分。

### 1.2 核心应用

| 应用 | 英文名 | 描述 |
|------|--------|------|
| **链接预测** | Link Prediction | 预测实体间缺失关系或关系不完整的三元组 |
| **实体对齐** | Entity Alignment | 发现不同 KG 中表示同一实体的实体 |
| **关系分类** | Relation Classification | 分类实体对的语义关系类型 |
| **知识补全** | Knowledge Completion | 补全 KG 中缺失的边 |
| **推荐系统** | Recommender System | 结合 KG 增强推荐（KG-based Recommendation） |

---

## 2. 平移模型（Translating Embeddings Models）

平移模型是最早且最具影响力的 KGE 方法家族，其核心思想是将关系视为实体向量之间的**平移变换**（Translation）。

### 2.1 TransE（Translating Embeddings）

TransE（Bouchard et al., 2003; Bordes et al., 2013）是最经典的平移模型。

**核心假设**：对于每个真三元组 $(h, r, t)$，实体 $h$ 的向量减去实体 $t$ 的向量应近似等于关系 $r$ 的向量：

$$h + r \approx t$$

**打分函数**：
$$f(h, r, t) = -\|h + r - t\|_{L1 \text{ or } L2}$$

分数越高（距离越短），三元组越可能为真。

```mermaid
vector:2rd
    h["h<br/>(Einstein)"] -- "+ r" --> mid["h + r"]
    r["r<br/>(born_in)"] -.-> mid
    mid -- "≈ t" --> t["t<br/>(Germany)"]
    
    diff["距离 = \|h + r - t\| → 小"]
    mid --> diff
    
    style h fill:#e3f2fd
    style r fill:#fff3e0
    style t fill:#e8f5e9
```

**损失函数**（Hinge Loss）：

$$L = \sum_{(h,r,t) \in T} \sum_{(h',r,t') \notin T} [\gamma + f(h,r,t) - f(h',r,t')]_+$$

其中 $\gamma$ 是**间隔超参数**（Margin Hyperparameter），$[x]_+ = \max(0, x)$。

**TransE 的优点与局限**：

| 优点 | 局限 |
|------|------|
| 简单高效，计算复杂度低 | 难以处理一对多（One-to-Many）关系 |
| 物理意义清晰（平移） | 无法处理多对一（Many-to-One） |
| 适合快速原型开发 | 对 1:N、N:1、M:N 关系建模能力弱 |

**一对多问题示例**：
```
(爱因斯坦, 职业, 物理学家)  -- TransE 能很好建模
(爱因斯坦, 著作, 狭义相对论)  -- TransE 能很好建模
(居里夫人, 导师, 多位科学家)  -- 多个"学生"对应一个"导师"，TransE 难以同时让导师 ≈ 所有学生 - 导师
```

### 2.2 TransE 变体的思想

| 变体 | 核心改进 |
|------|----------|
| **TransH** (Wang et al., 2014) | 为每个关系定义一个法向量平面，实体投影到该平面再进行平移 |
| **TransD** (Ji et al., 2015) | 使用动态映射矩阵，实体对各有自己的投影向量 |
| **TransR** (Lin et al., 2014) | 实体空间和关系空间分离，需先投影到关系特定空间 |
| **TransA** (Zhang et al., 2019) | 自适应选择 $L_1$ 或 $L_2$ 范数 |

---

## 3. 语义匹配模型（Semantic Matching Models）

语义匹配模型不再将关系视为平移，而是为三元组设计一个**打分函数**（Scoring Function），直接计算三元组的"合理性"分数。

### 3.1 SE（Semantic Embeddings）

SE 是最早的语义匹配模型之一，打分函数为：

$$f(h, r, t) = -(w_r \cdot (v_h \oplus v_t))$$

其中 $\oplus$ 可以是拼接（Concatenation）、逐元素乘积（Hadamard Product）或差（Difference）。

### 3.2 DistMult（Diagonal Multidimensional）

DistMult（Yang et al., 2014）是对 ComplEx 的简化版本，假设关系矩阵是对角矩阵：

$$f(h, r, t) = h^T \text{diag}(r) t = \sum_{k=1}^d h_k \cdot r_k \cdot t_k$$

**特点**：
- 对称关系建模效果好（即 $r$ 对称时，$f(h, r, t) = f(t, r, h)$）
- 无法有效建模非对称关系

### 3.3 ComplEx（Complex Embeddings）

ComplEx (Trouillon et al., 2016) 将 DistMult 扩展到复数空间：

$$f(h, r, t) = \text{Re}(h^T \text{diag}(r) \bar{t}) = \sum_{k=1}^d (h_k^r t_k^r + h_k^i t_k^i)$$

其中 $h_k = h_k^r + i \cdot h_k^i$ 是复数向量。

**关键优势**：ComplEx 能够有效建模**非对称关系**（Asymmetric Relations）：
```
(einstein, 导师之, curie)   -- 非对称
(curie, 导师之, einstein)   -- 不一定为真
```

### 3.4 RESCAL（REscoring）

RESCAL (Nickel et al., 2011) 使用完整的矩阵表示关系：

$$f(h, r, t) = h^T W_r t$$

其中 $W_r \in \mathbb{R}^{d \times d}$ 是关系 $r$ 的完整矩阵。

| 特性 | RESCAL | DistMult | ComplEx |
|------|--------|----------|---------|
| 关系表示 | 完整矩阵 $d \times d$ | 对角向量 | 复数对角向量 |
| 参数量 | 最多 ($d^2$) | 最少 ($d$) | 中等 ($2d$) |
| 非对称关系 | ✅ 支持 | ❌ 不支持 | ✅ 支持 |
| 计算效率 | 较慢 | 快 | 中等 |

---

## 4. 基于深层模型的 KGE（Deep Models）

### 4.1 DTTE（Deep Tranlsating Tensor Embedding

基于注意力（Attention）和深层网络建模 KG 中的复杂模式。

### 4.2 TransR、TransH、TransD 回顾

这三个模型已在上节 2.2 中提到，在此补充：

| 模型 | 年份 | 核心思想 |
|------|------|----------|
| **TransR** | 2014 | 实体和关系使用不同的嵌入空间，需要先投影 |
| **TransH** | 2014 | 每个关系定义一个超平面，实体投影到超平面上 |
| **TransD** | 2015 | 为每个实体对动态生成映射矩阵 |

### 4.3 TuckEr

TuckEr (Ding et al., 2018) 使用 **Tucker Decomposition**（张量分解）对KG的三阶张量进行分解：

$$f(h, r, t) = t_r \times_1 h \times_2 r \times_3 t$$

TuckEr 的参数效率高于 RESCAL，同时保留其表达能力。

### 4.4 HolE（Holographic Embeddings）

HolE (Nickel et al., 2010) 使用**循环互相关**（Circular Cross-Correlation）：

$$f(h, r, t) = h * r^T \cdot t$$

其中 $*$ 表示循环互相关运算，能够在有限维度下近似双循环卷积。

### 4.5 ConvE

ConvE (vanderSarl et al., 2018) 使用**卷积神经网络**（CNN）对嵌入进行二维建模：

$$f(h, r, t) = \text{softmax}( \text{Conv2D}([h; r]) \cdot t )$$

---

## 5. 评估指标（Evaluation Metrics）

KGE 模型的性能通过**链接预测**（Link Prediction）任务评估。

### 5.1 实验设置

**头实体预测**（Head Masking）：
```
原始三元组: (einstein, born_in, germany)
头实体预测: (einstein, born_in, ?)  ← 预测正确的 h
```

**尾实体预测**（Tail Masking）：
```
原始三元组: (einstein, born_in, germany)
尾实体预测: (?, born_in, germany)   ← 预测正确的 t
```

### 5.2 核心指标

| 指标 | 英文名 | 公式/描述 |
|------|--------|-----------|
| **平均倒数排名** | Mean Reciprocal Rank (MRR) | 对所有正确实体的排名取倒数，再求平均 |
| **Hits@K** | Hits@1 / Hits@3 / Hits@10 | 排名在前 K 位的结果占比 |

**MRR 计算示例**：

假设有 5 个测试三元组，模型的推理排名结果如下：

| 测试样本 | 正确实体排名 | 倒数排名 (1/rank) |
|----------|-------------|-------------------|
| (einstein, born_in, ?) | 2 | 1/2 = 0.5 |
| (curie, studied_at, ?) | 1 | 1/1 = 1.0 |
| (newton, work_at, ?) | 5 | 1/5 = 0.2 |
| (turing, work_at, ?) | 1 | 1/1 = 1.0 |
| (noether, advisor_of, ?) | 3 | 1/3 ≈ 0.33 |

$$\text{MRR} = \frac{0.5 + 1.0 + 0.2 + 1.0 + 0.33}{5} = 0.606$$

### 5.3 FB15k-237 和 WN18RR 基准数据集

| 数据集 | 实体数 | 关系数 | 训练集 | 测试集 | 特点 |
|--------|--------|--------|--------|--------|------|
| **FB15k-237** | 14,541 | 237 | 272,115 | 17,535 | Freebase 子集，去除反向关系 |
| **WN18RR** | 40,943 | 11 | 86,835 | 3,134 | WordNet 子集，更难版本 |

```mermaid
barRL
    title "FB15k-237 上典型 KGE 模型 MRR 对比"
    yaxis ["ComplEx", "TuckEr", "ConvE", "RotatE"]
    xaxis [0.3, 0.33, 0.34, 0.36]
    
    style TuckEr fill:#a5d6a7
    style ComplEx fill:#90caf9
    style ConvE fill:#ce93d8
    style RotatE fill:#ef9a9a
```

---

## 6. 主流工具（Tools）

### 6.1 OpenKE

[OpenKE](https://github.com/thunlp/OpenKE) 是由清华大学 NLP 实验室开发的开源 KGE 工具包。

```python
# OpenKE 使用示例（伪代码）
from openKE import TransE

# 定义模型
model = TransE(
    dim=300,           # 嵌入维度
    margin=1.0,        # 间隔 margin
    lamba=0.001,       # 正则化系数
    neg_dim=25         # 负采样数量
)

# 加载数据
model.load_data(path="FB15k-237/")

# 训练
model.train_step(10000)

# 评估
model.test_step()
# MRR: 0.312, Hits@1: 0.231, Hits@3: 0.312, Hits@10: 0.508
```

### 6.2 PyKEen

[PyKEen](https://github.com/pykeen/pykeen) 是目前最流行的 Python KGE 库，支持 66 个模型、16 个数据集。

```python
# PyKEen 使用示例
from pykeen.pipeline import pipeline

result = pipeline(
    dataset="FB15k-237",
    model="TransE",
    training_kwargs=dict(num_epochs=500),
    testing_kwargs=dict(batch_size=256),
)

# 获取评估结果
evaluation = result.trained_model
print(f"MRR: {evaluation.evaluate(stopped=False)[0]:.4f}")
print(f"Hits@1: {evaluation.evaluate(stopped=False)[1]:.4f}")
```

### 6.3 工具对比

| 工具 | 语言 | 支持模型数 | 亮点 |
|------|------|-----------|------|
| **PyKEen** | Python | 66+ | 模型最全，API 最简洁，自动调参 |
| **OpenKE** | Python | 10+ | 中文文档丰富，适合教学和入门 |
| **KGlib** | Python | 20+ | 支持图神经网络集成 |
| **RotatE** | C++/Python | 1 (RotatE) | 专注旋转模型，性能最优 |
| **TensorFlow/KG** | Python | N/A | TensorFlow 原生集成 |

---

## 7. 总结（Summary）

| 要点 | 说明 |
|------|------|
| KGE 核心 | 将 KG 实体和关系映射到连续向量空间 |
| 平移模型 | TransE 及其变体（TransH, TransD, TransR），关系 = 实体平移 |
| 语义匹配 | DistMult, ComplEx, RESCAL，使用打分函数直接计算三元组得分 |
| 评估指标 | MRR、Hits@1/3/10，基于链接预测任务 |
| 标准数据集 | FB15k-237、WN18RR |
| 工具 | PyKEen（推荐）、OpenKE |
| 局限性 | KGE 学习的是统计相关性而非真正的逻辑推理 |