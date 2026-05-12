# 第10章 OWL 类建模

## 第1篇 类表达式基础

### Class Expression 概念

类表达式（Class Expression）用于定义复杂的类，可以通过组合基本类来构造新的类。

### 复合类构建

| 表达式 | 说明 | 示例 |
|--------|------|------|
| **owl:intersectionOf** | 类交集 | 既是Actor又是Director |
| **owl:unionOf** | 类并集 | Actor 或 Director |
| **owl:complementOf** | 类补集 | 不是Employee的人 |

```turtle
:ActorOrDirector a owl:Class ;
    owl:unionOf ( :Actor :Director ) .