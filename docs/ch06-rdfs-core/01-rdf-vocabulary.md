# 第6章 RDFS 核心

## 第1篇 RDF 词汇表简介

### RDF 词汇表概念

RDFS（RDF Schema）定义了用于描述 RDF 词汇表的词汇。

### rdfs:class 与 rdfs:Instance

- **rdfs:Class**：类的概念
- **rdfs:Instance**：类的实例

```turtle
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

:Person a rdfs:Class .
:Alice a :Person .