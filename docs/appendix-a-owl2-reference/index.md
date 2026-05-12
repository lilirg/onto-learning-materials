# 附录 A: OWL 2 速查表

## OWL 2 类表达式

| 表达式 | 含义 |
|--------|------|
| `A ⊓ B` | 类 A 和类 B 的交集 |
| `A ⊔ B` | 类 A 和类 B 的并集 |
| `¬A` | 类 A 的补集 |
| `∃r.A` | 通过属性 r 与某个 A 有关系的个体 |
| `∀r.A` | 通过属性 r 只与 A 类个体有关系的个体 |

## OWL 2 属性公理

| 公理 | 含义 |
|------|------|
| `TransitiveObjectProperty(r)` | r 是传递属性 |
| `SymmetricObjectProperty(r)` | r 是对称属性 |
| `ReflexiveObjectProperty(r)` | r 是自反属性 |
| `IrreflexiveObjectProperty(r)` | r 是非自反属性 |
| `FunctionalDataProperty(r)` | r 是函数属性 |

## OWL 2 数据类型约束

| 约束 | 示例 |
|------|------|
| `owl:minNumericLiteral` | 至少有 1 个值 ≥ 18 |
| `owl:maxNumericLiteral` | 至少有 1 个值 ≤ 65 |
| `owl:hasValue` | 值恰好是给定的常量 |