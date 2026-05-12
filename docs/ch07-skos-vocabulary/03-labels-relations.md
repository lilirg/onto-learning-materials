# 第7章 SKOS 词汇构造

## 第3篇 标签体系与关系

### prefLabel、altLabel、hiddenLabel

- **prefLabel**：首选标签（每个语言最多一个）
- **altLabel**：替代标签
- **hiddenLabel**：隐藏标签（用于搜索但不显示）

```turtle
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .

:ai a skos:Concept ;
    skos:prefLabel "人工智能"@zh , "Artificial Intelligence"@en ;
    skos:altLabel "AI"@zh , "机器学习"@zh .
```

### related、broader、narrower

SKOS 定义的核心关系：

| 关系 | 说明 | 示例 |
|------|------|------|
| **broader** | 更宽泛的概念 | "科学" broader "物理" |
| **narrower** | 更狭窄的概念 | "物理" narrower "科学" |
| **related** | 相关概念（非层级） | "物理" related "数学" |