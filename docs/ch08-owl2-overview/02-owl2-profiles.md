# 第8章 OWL 2 概览

## 第2篇 OWL Profiles（EL/QL/RL/DL）

### OWL EL、OWL QL、OWL RL、OWL DL

OWL 2 定义了四个 Profile（配置文件），每种针对不同的应用场景优化：

| Profile | 缩写 | 适用场景 | 推理复杂度 |
|---------|------|----------|------------|
| **OWL 2 EL** | EL | 大型术语本体 | 多项式时间 |
| **OWL 2 QL** | QL | 基于数据库的数据查询 | 数据线性 |
| **OWL 2 RL** | RL | 规则引擎推理 | 线性时间 |
| **OWL 2 DL** | DL | 最大表达能力 | 判定性（Decidable） |

### Profiles 选择：表达能力 vs 计算效率

选择 Profile 的权衡：
- 表达能力越强，推理计算量越大
- 需要根据实际应用场景选择合适的 Profile
- OWL 2 DL 是完整的 OWL 2 表达能力