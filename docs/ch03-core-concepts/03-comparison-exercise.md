# 第3章 核心概念体系

## 第3篇 分类法与本体的对比练习

### 用 RDFS 分别建模"学科分类表"与"学科关系本体"

**分类法示例：**
```rdf
@prefix dct: <http://purl.org/dc/terms/> .
@prefix : <http://example.org/classification#> .

:dianxin a :Discipline ;
    rdfs:label "电子信息" ;
    rdfs:subClassOf :topDiscipline .
```

**本体示例：**
```rdf
@prefix : <http://example.org/ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

:电子信息 a owl:Class ;
    rdfs:label "电子信息" ;
    rdfs:subClassOf :工程技术 ;
    :hasSubdiscipline :通信工程, :计算机科学 .
```

### 分类法与本体对比分析

| 特性 | 分类法 | 本体 |
|------|--------|------|
| 关系类型 | 单一的 is-a | 多种语义关系 |
| 推理能力 | 有限 | 强大的逻辑推理 |
| 表达能力 | 树状结构 | 图结构 |