# 第5章 RDF 语法格式

## 第3篇 N-Quads 与 JSON-LD

### N-Quads 与四元组（RDF 数据集）

N-Quads 扩展了三元组的概念，增加了图的名称：

```
<s> <p> <o> <g> .
```

- 用于命名图（Named Graphs）
- 支持多图操作

### JSON-LD 的结构与用途

JSON-LD（JSON for Linking Data）将 RDF 编码为 JSON：

```json
{
  "@context": {
    "foaf": "http://xmlns.com/foaf/0.1/"
  },
  "@type": "foaf:Person",
  "foaf:name": "Alice"
}
```

JSON-LD 的优势：
- 与 JavaScript 原生兼容
- 易于与 Web API 集成
- 支持 @context 定义语义