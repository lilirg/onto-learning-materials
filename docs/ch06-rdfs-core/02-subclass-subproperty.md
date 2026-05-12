# 第6章 RDFS 核心

## 第2篇 类层级与属性层级

### rdfs:subClassOf 与 rdfs:subPropertyOf

RDFS 提供了构建类层级和属性层级的机制。

```turtle
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

:Vehicle a rdfs:Class .
:Car rdfs:subClassOf :Vehicle .
:VehicleDriver rdf:type rdfs:Resource .
:hasDriver rdfs:subPropertyOf :hasPerson .
```

### 层级继承原理

子类和子属性继承父类和父属性的推理能力。