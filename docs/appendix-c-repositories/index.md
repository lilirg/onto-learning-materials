# 附录 C: 本体仓库与知识库资源

> **本节要点**：本节汇总了知名的本体仓库、关联数据知识库和 SPARQL 端点，提供访问方法和使用示例。

---

## 1. 知名本体仓库

### 1.1 OBO Foundry

| 属性 | 说明 |
|------|------|
| **地址** | [https://obofoundry.org/](https://obofoundry.org/) |
| **类型** | 开放本体协作仓库 |
| **领域** | 生物医学为主 |
| **协议** | MIT, CC-BY, ODC-BY |
| **数量** | 200+ 互操作本体 |

**OBO Foundry 原则**：
- 本体具有明确的范围（Domain and Content）
- 使用友好的 ID 空间（Friendly Ontology Identifier Space）
- 提供清晰的名称和定义（Ontology Metadata）
- 使用上层次本体进行建模（Use of a Superior Taxonomy）

**常用本体举例**：

| 本体缩写 | 全称 | 描述 |
|----------|------|------|
| **GO** | Gene Ontology | 基因产物功能和属性的标准化描述 |
| **UBERON** | Unified Biomedical Anatomy Ontology | 多物种解剖学本体 |
| **Doidis** | Drug Ontology | 药物术语本体 |
| **RO** | Relationship Ontology | 生物实体间的关系定义 |
| **CL** | Cell Ontology | 细胞类型分类本体 |

```sparql
# 使用 OBO Foundry SPARQL 端点查询
PREFIX obo: <http://purl.obolibrary.org/obo/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?term ?label
WHERE {
  ?term a owl:Class ;
        rdfs:label ?label .
  FILTER(LCASE(?label) LIKE "%cancer%")
}
LIMIT 20
```

---

### 1.2 BioPortal

| 属性 | 说明 |
|------|------|
| **地址** | [https://bioportal.bioontology.org/](https://bioportal.bioontology.org/) |
| **维护方** | 斯坦福大学医学院 |
| **类型** | 生物医学本体仓库 |
| **数量** | 2,000+ 本体 |
| **API** | RESTful API 支持 |

**BioPortal 功能特性**：
- 本体浏览与搜索
- 跨本体映射浏览
- 类层次结构可视化
- OntoLingo 浏览器扩展

```bash
# BioPortal REST API 示例
curl "https://data.bioontology.org/ontologies" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### 1.3 DBpedia

| 属性 | 说明 |
|------|------|
| **地址** | [http://dbpedia.org/](http://dbpedia.org/) |
| **类型** | 从维基百科提取的结构化知识 |
| **数据量** | 约 4.3M 英文实体 |
| **语言** | 30+ 语言版本（含中文） |
| **SPARQL 端点** | [http://dbpedia.org/sparql](http://dbpedia.org/sparql) |

**DBpedia 核心本体特征**：

```turtle
# DBpedia 本体核心类
dbo:Person a owl:Class ;
    rdfs:label "人物"@zh .

dbo:Place a owl:Class ;
    rdfs:label "地点"@zh .

dbo:Work a owl:Class ;
    rdfs:label "作品"@zh .

dbo:Organisation a owl:Class ;
    rdfs:label "组织"@zh .
```

```sparql
# 查询 DBpedia SPARQL 端点示例
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?person ?label ?abstract
WHERE {
  ?person a dbo:Person ;
          rdfs:label ?label ;
          dbo:abstract ?abstract .
  FILTER(LANG(?label) = "zh" && LANG(?abstract) = "zh")
}
LIMIT 20
```

---

### 1.4 GeoLinkedData (Geonames)

| 属性 | 说明 |
|------|------|
| **地址** | [http://www.geonames.org/](http://www.geonames.org/) |
| **类型** | 地理命名数据服务 |
| **数据量** | 1,000 万+ 地理名称 |
| **SPARQL 端点** | [http://localhost:8890/sparql](http://localhost:8890/sparql) |

**GeoLinkedData 核心特征**：

```turtle
# GeoNames 本体 RDF 示例
<http://sws.geonames.org/1816670/> a onto:City ;
    onto:name "Tokyo" ;
    onto:country "JP" ;
    geo:lat "35.6895"^^xsd:decimal ;
    geo:long "139.6917"^^xsd:decimal ;
    geo:featureCode onto:HMTP .
```

---

### 1.5 LODCloud (Linked Open Data Cloud)

| 属性 | 说明 |
|------|------|
| **地址** | [https://lod-cloud.net/](https://lod-cloud.net/) |
| **类型** | 链接开放数据目录 |
| **内容** | 数据集清单 + 数据集间映射关系 |
| **覆盖领域** | 学术、地理、机构、人名等 |

**LODCloud 云图主要数据集**：

| 数据集 | 描述 | 链接类型 |
|--------|------|---------|
| **DBpedia** | 维基百科结构化数据 | owl:sameAs |
| **GeoNames** | 地理命名数据 | owl:sameAs |
| **Wikidata** | 维基百科知识库 | owl:sameAs |
| **Bibliographic LOD** | 学术文献关联数据 | owl:sameAs |
| **BabelNet** | 多语言语义网络 | relatedLink |
| **ICD10** | 国际疾病分类 | owl:sameAs |
| **IMDb** | 互联网电影数据库 | owl:sameAs |

---

### 1.6 IBM PubSub Everywhere

| 属性 | 说明 |
|------|------|
| **地址** | [https://www.ibm.com/products/pubsub-everywhere](https://www.ibm.com/products/pubsub-everywhere) |
| **类型** | 企业级本体管理平台 |
| **功能** | 本体创建、管理、可视化、集成 |

IBM 本体相关资源：
- **IBM Graph**：基于图的本体可视化工具
- **Z-Store**：知识图谱数据管理服务

---

### 1.7 RDF Data Cube Registry

| 属性 | 说明 |
|------|------|
| **地址** | [https://statistics.data.gov.uk/dq/](https://statistics.data.gov.uk/dq/) |
| **标准** | [Vocab Data Cube](https://www.w3.org/TR/vocab-data-cube/) (W3C 推荐标准) |
| **用途** | 统计数据和官方数据的标准化表达 |

**Data Cube 核心概念**：

```turtle
@prefix dq: <http://data.gov.uk/def/statistical-unit/> .
@prefix qb: <http://purl.org/linked-data/cube#> .
@prefix sdmx: <http://purl.org/linked-data/sdmx/2009/code#> .

:UK Economic Statistics
    a qb:DataStructureDefinition ;
    qb:component [ qb:dataSet :UK Economic Statistics ;
                 qb:constraint [ qb:dimension sdmx:UnitOfMeasure ] ] .
```

---

## 2. 其他重要本体仓库

### 2.1 汇总对照表

| 仓库名称 | 网址 | 领域 | 协议 |
|----------|------|------|------|
| **Schema.org** | [schema.org](https://schema.org/) | 网络数据模式 | 公开领域 |
| **Linkedmdb** | [linkedmdb.org](http://www.linkedmdb.org/) | 电影数据 | CC-BY |
| **BabelNet** | [babelnet.org](https://babelnet.org/) | 多语言词汇语义网络 | 研究用途 |
| **OpenCyc** | [cyc.com](https://www.cyc.com/) | 常识本体 | 商业许可 |
| **WordNet** | [wordnet.princeton.edu](https://wordnet.princeton.edu/) | 英语词汇数据库 | 研究许可 |
| **Gaia Foundation** | [gaiafoundation.com](https://gaiafoundation.com/) | Gaia 上层本体 | MIT 许可 |

### 2.2 本体发现工具

```
本体搜索工具：
├── OntoPortal Hub → 跨仓库搜索
├──Ontobee → 本体查询服务
├──LOD View → 链接数据浏览器
└──SHOEBOX → 可视化OWL本体
```

---

## 3. SPARQL 端点使用指南

### 3.1 常用 SPARQL 端点地址

| 服务 | SPARQL 端点 URL |
|------|----------------|
| **DBpedia** | `http://dbpedia.org/sparql` |
| **Wikidata** | `https://query.wikidata.org/sparql` |
| **GeoSPARQL** | `http://geolinkeddata.eu/sparql` |
| **LOD-QUERIES** | `http://public-lod.gesis.org/sparql` |
| **Apache Jena Fuseki** | `http://localhost:3030/dataset/sparql` |
| **Virtuoso** | `http://localhost:8890/sparql` |

### 3.2 SPARQL 查询示例：访问 DBpedia

```sparql
# 查询：找出所有中国城市及其人口
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?city ?cityLabel ?population
WHERE {
  ?city a dbo:PopulatedPlace ;
        rdfs:label ?cityLabel ;
        dbo:populationTotal ?population ;
        dbo:country dbr:China .
  FILTER(LANG(?cityLabel) = "zh")
}
ORDER BY DESC(?population)
LIMIT 20
```

### 3.3 SPARQL 查询示例：访问 Wikidata

```sparql
# 查询：获取著名哲学家及其生卒年份
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?philosopher ?philosopherLabel ?birthDate ?deathDate
WHERE {
  ?philosopher wdt:P31 wd:Q5 ;            # 人类实例
               wdt:P106 wd:Q4961651 .     # 职业：哲学家
  OPTIONAL { ?philosopher wdt:P569 ?birthDate }
  OPTIONAL { ?philosopher wdt:P570 ?deathDate }
  FILTER(LANG(?philosopherLabel) = "zh")
}
ORDER BY ?birthDate
```

### 3.4 SPARQL 端点对比

| 端点 | 特点 | 适合场景 |
|------|------|----------|
| **DBpedia** | 维基百科结构化数据，数据量大 | 通用知识查询、实体链接 |
| **Wikidata** | 结构化知识图谱，众包维护 | 综合知识查询 |
| **DBLP** | 学术文献元数据 | 学术研究、引文分析 |
| **GeneKB** | 基因组学知识 | 生物医学研究 |
| **本地 Fuseki** | 自建可控 | 企业级应用 |

---

## 4. 本体仓库选择建议

### 4.1 选择指南

```
选择本体仓库/数据的决策树：

开始
  ├─ 领域是什么？
  │   ├─ 生物医学 → OBO Foundry, BioPortal
  │   ├─ 地理 → GeoNames, GeoLinkedData
  │   ├─ 综合知识 → DBpedia, Wikidata
  │   ├─ 企业数据 → 自建 Fuseki/Virtuoso
  │   └─ 统计数据 → RDF Data Cube Registry
  |
  ├─ 查询方式？
  │   ├─ SPARQL → DBpedia SPARQL, Wikidata
  │   ├─ REST API → BioPortal
  │   └─ 本体下载 → OBO Foundry, Schema.org
  |
  └─ 需要关联数据？
      ├─ 是 → LOD Cloud 查找映射关系
      └─ 否 → 直接使用本体本体
```

### 4.2 质量评估维度

| 维度 | 评估指标 | 说明 |
|------|----------|------|
| **完备性** | 是否覆盖目标领域 | 类的数量、属性的丰富程度 |
| **准确性** | 数据质量 | 由专业志愿者/专家维护 |
| **更新频率** | 数据时效性 | 定期更新频率 |
| **许可协议** | 可用性 | 是否允许商业/修改使用 |
| **文档化** | 可用文档 | 是否存在良好文档 |

---

## 5. 构建自己的知识库

### 5.1 技术栈推荐

| 层次 | 组件 | 推荐工具 |
|------|------|----------|
| **本体编辑** | 本体建模 | Protégé |
| **存储** | 三元组存储 | Apache Jena Fuseki, Virtuoso, GraphDB |
| **推理** | 推理机 | HermiT, Pellet, Elk |
| **查询** | SPARQL 引擎 | SPARQL 1.1 兼容 |
| **验证** | 约束校验 | SHACL, ShEX |
| **API** | 数据访问 | SPARQL, REST API |