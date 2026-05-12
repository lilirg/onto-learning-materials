# 第8章 OWL 2 概览

## 第3篇 描述逻辑与 OWL 的对应

### 描述逻辑（Description Logic）概念

描述逻辑（DL）是 OWL 的逻辑基础，是一门形式化的知识表示语言。

### 与 OWL 的对应关系

| 描述逻辑 | OWL 构造器 |
|----------|------------|
| ⊤ | owl:Thing |
| ⊥ | owl:Nothing |
| ¬C | owl:complementOf |
| C ⊓ D | owl:intersectionOf |
| C ⊔ D | owl:unionOf |
| ∃R.C | someValuesFrom |
| ∀R.C | allValuesFrom |

### 常用描述逻辑命名法

使用 ALC、SROIQ 等缩写描述 DL 的能力。