# 第6章 RDFS 核心

## 第3篇 domain 与 range

### rdfs:domain 与 rdfs:range

- **rdfs:domain**：谓词适用的类
- **rdfs:range**：谓词值适用的类或数据类型

```turtle
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

:hasAge rdfs:domain :Person ;
        rdfs:range xsd:integer .
```

### 实际应用与约束

domain 和 range 是 RDFS 推理的基础。