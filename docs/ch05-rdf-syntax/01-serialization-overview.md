# 第5章 RDF 语法格式

## 第1篇 序列化格式概览

### 序列化格式概览

RDF 有多种序列化格式：
- **RDF/XML**：W3C 推荐的标准格式
- **N-Triples**：纯文本格式，每行一个三元组
- **Turtle**：人类友好的文本格式
- **TriX**：支持多图（命名图）
- **JSON-LD**：基于 JSON 的 RDF 格式

### 为什么 Turtle 成为了事实标准

Turtle（Terse RDF Triple Language）因其简洁性和可读性成为主流选择：
- 支持前缀声明
- 支持序列化集合和组结构
- 人类可读性强

### PREFIX 与命名空间概念

```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix dc: <http://purl.org/dc/terms/> .
```

命名空间避免 URI 重复书写。