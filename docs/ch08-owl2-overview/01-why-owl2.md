# 第8章 OWL 2 概览

## 第1篇 为什么需要 OWL：RDFS 的不足

### RDF/RDFS 的不足

RDF/RDFS 虽然简洁，但表达能力有限：
- 不支持不相交性（disjointness）
- 不支持属性特征（传递性、对称性、函数性）
- 不支持基数约束
- 不支持复杂类表达式

### OWL 带来的表达能力提升

OWL（Web Ontology Language）提供了丰富的表达机制：
- 完整的类表达式
- 属性公理和特征
- 不变式（Invariant）约束
- 推理支持

### OWL 与 RDFS 的关系

OWL 建立在 RDF/RDFS 之上，提供了更形式化的语义。