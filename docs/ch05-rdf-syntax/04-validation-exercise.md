# 第5章 RDF 语法格式

## 第4篇 练习与验证

### 用三种格式书写同一知识

练习：用 RDF/XML、Turtle 和 JSON-LD 分别表示以下三元组：
- 资源: http://example.org/person/1
- 属性: http://purl.org/dc/terms/title
- 值: "My Book"

### 使用 RDF Validator 验证文档

推荐的 RDF 验证工具：
- **W3C RDF Validator**
- **Virtuoso Validator**
- **Apache Jena Validator**

### 常见语法错误及解决方法

| 错误类型 | 原因 | 解决方法 |
|----------|------|----------|
| 缺少句点 | Turtle 语句未完成 | 确保每条语句以 `.` 结尾 |
| 未闭合的引号 | 字符串未闭合 | 检查引号匹配 |
| 前缀未定义 | 使用前缀但未声明 | 添加 `@prefix` 声明 |