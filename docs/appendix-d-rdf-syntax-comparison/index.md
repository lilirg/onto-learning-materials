# 附录 D: RDF/XML 与 Turtle 语法对照表

## 语法对照示例

### 类声明

**Turtle:**
```turtle
:Person a owl:Class .
```

**RDF/XML:**
```xml
<rdf:Description rdf:about="http://example.org/Person">
  <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#Class" />
</rdf:Description>
```

### 子类关系

**Turtle:**
```turtle
:Student rdfs:subClassOf :Person .
```

**RDF/XML:**
```xml
<rdf:Description rdf:about="http://example.org/Student">
  <rdfs:subClassOf rdf:resource="http://example.org/Person" />
</rdf:Description>
```

### 对象属性

**Turtle:**
```turtle
:hasParent a owl:ObjectProperty .
```

**RDF/XML:**
```xml
<rdf:Description rdf:about="http://example.org/hasParent">
  <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#ObjectProperty" />
</rdf:Description>
```

### 数据属性

**Turtle:**
```turtle
:hasAge a owl:DatatypeProperty .
```

**RDF/XML:**
```xml
<rdf:Description rdf:about="http://example.org/hasAge">
  <rdf:type rdf:resource="http://www.w3.org/2002/07/owl#DatatypeProperty" />
</rdf:Description>
```

### 实例断言

**Turtle:**
```turtle
:alice a :Person ;
       :hasName "Alice" .
```

**RDF/XML:**
```xml
<rdf:Description rdf:about="http://example.org/alice">
  <rdf:type rdf:resource="http://example.org/Person" />
  <ex:hasName>Alice</ex:hasName>
</rdf:Description>
```

## 常用前缀对照

| 前缀 | 命名空间 |
|------|---------|
| rdf | http://www.w3.org/1999/02/22-rdf-syntax-ns# |
| rdfs | http://www.w3.org/2000/01/rdf-schema# |
| owl | http://www.w3.org/2002/07/owl# |
| xsd | http://www.w3.org/2001/XMLSchema# |
| dbo | http://dbpedia.org/ontology/ |
| dbr | http://dbpedia.org/resource/ |