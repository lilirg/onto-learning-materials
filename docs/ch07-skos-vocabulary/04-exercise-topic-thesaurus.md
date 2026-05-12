# 第7章 SKOS 词汇构造

## 第4篇 综合练习：学科主题词表

### 创建 SKOS 主题词表

**练习任务：**

创建一个关于计算机科学的 SKOS 主题词表。

```turtle
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

:cs-thesaurus a skos:ConceptScheme ;
    skos:prefLabel "计算机科学主题词表"@zh ;
    skos:description "计算机科学与技术领域的主题词表"@zh .
```

### 构建学科分类体系

将以下概念组织到词表中：

| 概念 | 关系 | 说明 |
|------|------|------|
| 计算机科学 | broader | 计算机科学基础 |
| 人工智能 | narrower | 计算机科学子领域 |
| 数据库 | narrower | 计算机科学子领域 |
| 网络 | narrower | 计算机科学子领域 |

**实践建议：**
1. 使用 Protégé 或 TopBraid Editor 创建 SKOS 词汇表
2. 添加多语言标签（中文、英文）
3. 建立概念之间的关系网络