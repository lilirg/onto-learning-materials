# 第5章 RDF 语法格式

## 第2篇 Turtle 语法详解

### Turtle 语法规则详解

Turtle 语法的基本规则：
- 每条语句以句点 `.` 结尾
- 使用前缀声明简化 URI
- 支持多对象和多值的简洁表示

```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix : <http://example.org/> .

:alice a foaf:Person ;
    foaf:name "Alice" ;
    foaf:knows :bob .

:bob a foaf:Person ;
    foaf:name "Bob" .
```

### Turtle 最佳实践

- 使用有意义的前缀
- 保持 URI 的一致性
- 合理使用标点符号