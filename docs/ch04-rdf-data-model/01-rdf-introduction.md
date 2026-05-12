# 第4章 RDF 数据模型

## 第1篇 RDF 简介：What is RDF？

### What is RDF？

RDF（Resource Description Framework）是 W3C 推荐的标准数据模型，用于描述资源及其之间的关系。

### RDF 的发展历程与 W3C 标准化

- **1997年**：RDF 概念由 W3C 首次提出
- **2004年**：RDF 1.0 成为 W3C 推荐标准
- **2014年**：RDF 1.1 发布，增强与国际数据网的兼容

### RDF 的核心思想

RDF 的核心思想是用**三元组**（主语-谓语-宾语）来表示知识：

| 组件 | 说明 | 示例 |
|------|------|------|
| **主语（Subject）** | 资源 | http://example.org/person/1 |
| **谓语（Predicate）** | 属性/关系 | http://purl.org/dc/terms/title |
| **宾语（Object）** | 值或另一资源 | "My Book" |