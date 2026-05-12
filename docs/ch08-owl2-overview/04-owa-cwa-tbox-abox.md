# 第8章 OWL 2 概览

## 第4篇 OWA vs CWA、TBox 与 ABox

### 开世界假设（OWA）vs 闭世界假设（CWA）

| 假设 | 说明 | 应用 |
|------|------|------|
| **OWA** | 未声明的知识可能是真的 | OWL、本体推理 |
| **CWA** | 未声明的知识被认为是假的 | SQL、数据库查询 |

**OWL 使用 OWA**：如果事实未明确声明，推理器不能假设它为假。

### TBox（术语盒）与 ABox（断言盒）分离

- **TBox（Terminological Box）**：描述概念和属性的定义（Schema）
- **ABox（Assertional Box）**：描述具体实例及其关系（Data）

```turtle
# TBox: 概念定义
:Person a owl:Class .

# ABox: 实例断言
:alice a :Person .