# 第7章 SKOS 词汇构造

## 第2篇 Concept Scheme 与 Concept

### Concept Schema、Concept Scheme、Concept

- **Concept Scheme（概念体系）**：一组概念的组织
- **Concept（概念）**：词汇表中的个体概念

```turtle
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .

:thesaurus a skos:ConceptScheme ;
    skos:prefLabel "学科主题词表"@zh .

:计算机科学 a skos:Concept ;
    skos:inScheme :thesaurus .
```

### 基本概念建模

概念通过概念体系组织，形成可导航的知识结构。