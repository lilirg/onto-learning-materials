# 12.4 综合练习：电影本体的数据约束

> **本节要点**：在第 9 章电影本体的基础上，整合本章所学，为电影本体添加完整的数据约束、值约束和 datatype 约束，使用 HermiT 推理机验证一致性。

---

## 1. 练习背景

在本章的前几节中，我们学习了 OWL 2 数据约束的三大类别：基数约束、值约束和 datatype 约束。现在，我们把这些知识整合到一个完整的实践中——为"电影本体"添加数据约束层。

### 1.1 前置知识衔接

| 先修章节 | 相关知识 | 在本练习中的应用 |
|----------|----------|-----------------|
| 第 9 章 | 电影本体基础（类、对象属性） | 继承已有类和属性定义 |
| 第 11 章 | 属性公理（数据属性定义） | 定义数据类型属性和范围 |
| 12.1 | 基数约束 | 电影必须有至少 1 个导演 |
| 12.2 | 值约束 | 特定评分等级的标记 |
| 12.3 | datatype 约束 | 票房、评分的范围限制 |

### 1.2 目标

在本练习结束时，电影本体将具备以下数据约束：

1. **基数约束**：电影必须有导演、必须有名称、每个演员只能有一个身份证号
2. **值约束**：标记特定类型的评分、定义官方语言枚举
3. **datatype 约束**：票房数字范围、评分范围（0.0-10.0）、IMDb ID 格式

---

## 2. 步骤一：完善数据属性定义

### 2.1 数据属性清单

| 属性名 | 域（Domain） | 范围（Range） | 说明 |
|--------|-------------|--------------|------|
| `releaseYear` | :Movie | xsd:integer | 发行年份 |
| `duration` | :Movie | xsd:integer | 时长（分钟） |
| `imdbRating` | :Movie | xsd:decimal | IMDb 评分 |
| `boxOffice` | :Movie | xsd:decimal | 票房（亿美元） |
| `actorId` | :Actor | xsd:string | 演员身份证号/唯一 ID |
| `imdbId` | :Movie | xsd:string | IMDb 电影编号 |

### 2.2 Turtle 实现

```turtle
@prefix : <http://example.org/movie#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# 发行年份
:releaseYear a owl:DatatypeProperty ;
    rdfs:domain :Movie ;
    rdfs:range xsd:integer ;
    rdfs:label "发行年份" ;
    rdfs:comment "电影首次公映的日历年份" .

# 电影时长
:duration a owl:DatatypeProperty ;
    rdfs:domain :Movie ;
    rdfs:range xsd:integer ;
    rdfs:label "时长(分钟)" ;
    rdfs:comment "电影的放映时长，单位分钟" .

# IMDb 评分
:imdbRating a owl:DatatypeProperty ;
    rdfs:domain :Movie ;
    rdfs:range xsd:decimal ;
    rdfs:label "IMDb 评分" ;
    rdfs:comment "电影在 IMDb 网站上的平均评分" .

# 票房
:boxOffice a owl:DatatypeProperty ;
    rdfs:domain :Movie ;
    rdfs:range xsd:decimal ;
    rdfs:label "票房(亿美元)" ;
    rdfs:comment "全球累计票房，单位亿美元" .

# 演员编号
:actorId a owl:DatatypeProperty ;
    rdfs:domain :Actor ;
    rdfs:range xsd:string ;
    rdfs:label "演员编号" ;
    rdfs:comment "演员的唯一标识符" .

# IMDb 编号
:imdbId a owl:DatatypeProperty ;
    rdfs:domain :Movie ;
    rdfs:range xsd:string ;
    rdfs:label "IMDb 编号" ;
    rdfs:comment "IMDb 上的电影唯一编号（tt开头的10位字符串）" .
```

---

## 3. 步骤二：添加基数约束

### 3.1 最少要求

#### 每部电影必须至少有一个导演

```turtle
# ⚠️ 最佳实践：使用 rdfs:subClassOf 而非 owl:equivalentClass
:Movie rdfs:subClassOf [
    a owl:Restriction ;
    owl:onProperty :directedBy ;
    owl:minQualifiedCardinality 1 ;
    owl:onClass :Director
] .
```

#### 每部电影必须至少有一个标题

```turtle
:Movie rdfs:subClassOf [
    a owl:Restriction ;
    owl:onProperty :hasTitle ;
    owl:minCardinality 1
] .
```

#### 每个演员必须有且只有一个 ID

```turtle
:Actor rdfs:subClassOf [
    a owl:Restriction ;
    owl:onProperty :actorId ;
    owl:qualifiedCardinality 1 ;
    owl:onDatatype xsd:string
] .
```

### 3.2 最多限制

#### 每个导演最多有一个生物母亲

```turtle
:Director rdfs:subClassOf [
    a owl:Restriction ;
    owl:onProperty :hasBiologicalMother ;
    owl:maxQualifiedCardinality 1 ;
    owl:onClass :Person
] .
```

### 3.3 推理验证测试

在 Protégé 中添加个体：

```turtle
# 测试：Inception 没有导演断言
:Inception a :Movie ;
    rdfs:label "盗梦空间" .

# ❌ 推理结果：本体不一致！
# 因为 :Movie 定义要求至少有一个 :directedBy 指向 :Director 实例
# 但 :Inception 没有任何 :directedBy 断言

# 修复后
:Inception :directedBy :ChristopherNolan .
```

---

## 4. 步骤三：添加值约束

### 4.1 标记奥斯卡获奖电影

```turtle
# 定义奥斯卡获奖电影
:OscarWinner owl:equivalentClass [
    owl:intersectionOf (
        :Movie
        [ owl:onProperty :awardReceived ;
          owl:hasValue :AcademyAward ]
    )
] .

# 定义个体
:AcademyAward a owl:NamedIndividual ;
    rdfs:label "奥斯卡最佳影片" .
```

### 4.2 定义评分等级枚举

```turtle
# 电影分级
:MovieRating a owl:Class .
:RatingG a :MovieRating .
:RatingPG a :MovieRating .
:RatingPG13 a :MovieRating .
:RatingR a :MovieRating .

# 定义分级枚举
:MovieRating owl:oneOf ( :RatingG :RatingPG :RatingPG13 :RatingR ) .

# 电影必须有且只有一个分级
:Movie rdfs:subClassOf [
    a owl:Restriction ;
    owl:onProperty :hasRating ;
    owl:qualifiedCardinality 1 ;
    owl:onClass :MovieRating
] .
```

---

## 5. 步骤四：添加 datatype 约束

### 5.1 定义有效数值范围

```turtle
# 合法评分范围：0.0 - 10.0
:ValidRating owl:onDatatype xsd:decimal ;
    owl:withRestrictions (
        [ xsd:minInclusive "0.0"^^xsd:decimal ] ,
        [ xsd:maxInclusive "10.0"^^xsd:decimal ]
    ) .

# 合法票房：大于 0
:PositiveBoxOffice owl:onDatatype xsd:decimal ;
    owl:withRestrictions (
        [ xsd:minInclusive "0.01"^^xsd:decimal ]
    ) .

# 合法年份：1888 年至今（电影诞生的那一年）
:ValidYear owl:onDatatype xsd:integer ;
    owl:withRestrictions (
        [ xsd:minInclusive "1888"^^xsd:integer ] ,
        [ xsd:maxInclusive "2099"^^xsd:integer ]
    ) .

# 合法时长：1 分钟以上
:ValidDuration owl:onDatatype xsd:integer ;
    owl:withRestrictions (
        [ xsd:minInclusive "1"^^xsd:integer ]
    ) .
```

### 5.2 添加范围约束到数据属性

```turtle
# 评分使用合法范围
:imdbRating rdfs:range :ValidRating .

# 年份使用合法范围
:releaseYear rdfs:range :ValidYear .

# 时长使用合法范围
:duration rdfs:range :ValidDuration .
```

---

## 6. 步骤五：添加 SHACL 验证规则

### 6.1 IMDb ID 格式验证

```turtle
@prefix sh: <http://www.w3.org/ns/shacl#> .

# IMDb 编号必须是 10 位（tt + 8 位数字或字母）
:MovieShape a sh:NodeShape ;
    sh:targetClass :Movie ;
    sh:property [
        sh:path :imdbId ;
        sh:datatype xsd:string ;
        sh:pattern "^tt[0-9]{7,8}$" ;
        sh:minLength "10"^^xsd:nonNegativeInteger ;
        sh:maxLength "10"^^xsd:nonNegativeInteger ;
        sh:message "IMDb 编号格式应为 tt 后跟 7-8 位数字，共 10 位"
    ] ;
    sh:property [
        sh:path :imdbRating ;
        sh:datatype xsd:decimal ;
        sh:minInclusive "0.0"^^xsd:decimal ;
        sh:maxInclusive "10.0"^^xsd:decimal ;
        sh:message "IMDb 评分必须在 0.0 到 10.0 之间"
    ] ;
    sh:property [
        sh:path :boxOffice ;
        sh:datatype xsd:decimal ;
        sh:minInclusive "0"^^xsd:decimal ;
        sh:message "票房必须是非负数"
    ] .
```

### 6.2 演员验证

```turtle
:ActorShape a sh:NodeShape ;
    sh:targetClass :Actor ;
    sh:property [
        sh:path :actorId ;
        sh:datatype xsd:string ;
        sh:minLength "3"^^xsd:nonNegativeInteger ;
        sh:maxLength "50"^^xsd:nonNegativeInteger ;
        sh:message "演员编号长度必须在 3-50 字符之间"
    ] .
```

---

## 7. 完整本体现在片段

### 7.1 Movie Ontology 数据约束汇总

```turtle
@prefix : <http://example.org/movie#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .

# ═══════════════════════════════════════════
# 一、数据属性定义
# ═══════════════════════════════════════════

:releaseYear a owl:DatatypeProperty ;
    rdfs:domain :Movie ; rdfs:range xsd:integer ;
    rdfs:label "发行年份" .

:duration a owl:DatatypeProperty ;
    rdfs:domain :Movie ; rdfs:range xsd:integer ;
    rdfs:label "时长(分钟)" .

:imdbRating a owl:DatatypeProperty ;
    rdfs:domain :Movie ; rdfs:range xsd:decimal ;
    rdfs:label "IMDb 评分" .

:boxOffice a owl:DatatypeProperty ;
    rdfs:domain :Movie ; rdfs:range xsd:decimal ;
    rdfs:label "票房(亿美元)" .

:hasBiologicalMother a owl:ObjectProperty ;
    rdfs:domain :Person ; rdfs:range :Person ;
    rdfs:label "生物学母亲" .

:directedBy a owl:ObjectProperty ;
    rdfs:domain :Movie ; rdfs:range :Director ;
    rdfs:label "执导" .

# ═══════════════════════════════════════════
# 二、基数约束
# ═══════════════════════════════════════════

# 每部电影必须有至少一个导演
:Movie rdfs:subClassOf [
    a owl:Restriction ;
    owl:onProperty :directedBy ;
    owl:minQualifiedCardinality 1 ;
    owl:onClass :Director
] .

# 每个演员必须有且只有一个身份证号
:Actor rdfs:subClassOf [
    a owl:Restriction ;
    owl:onProperty :actorId ;
    owl:qualifiedCardinality 1 ;
    owl:onDatatype xsd:string
] .

# ═══════════════════════════════════════════
# 三、值约束
# ═══════════════════════════════════════════

# 奥斯卡获奖电影定义
:OscarWinner owl:equivalentClass [
    owl:intersectionOf (
        :Movie
        [ owl:onProperty :awardReceived ;
          owl:hasValue :AcademyAward ]
    )
] .

# ═══════════════════════════════════════════
# 四、datatype 约束
# ═══════════════════════════════════════════

:ValidRating owl:onDatatype xsd:decimal ;
    owl:withRestrictions (
        [ xsd:minInclusive "0.0"^^xsd:decimal ] ,
        [ xsd:maxInclusive "10.0"^^xsd:decimal ]
    ) .

# ═══════════════════════════════════════════
# 五、SHACL 验证
# ═══════════════════════════════════════════

:MovieShape a sh:NodeShape ;
    sh:targetClass :Movie ;
    sh:property [
        sh:path :imdbRating ;
        sh:datatype xsd:decimal ;
        sh:minInclusive "0.0"^^xsd:decimal ;
        sh:maxInclusive "10.0"^^xsd:decimal
    ] .
```

---

## 8. 在 Protégé 中操作

### 8.1 添加数据属性的步骤

1. **打开本体文件**：File → Open → 选择 movie-ontology.owl
2. **创建数据属性**：
   - 切换到 **Data Properties** 标签
   - 点击 **Create New Data Property**
   - 输入属性名（如 `releaseYear`）
   - 在 Types 标签中设置 Range 为 `xsd:integer`
3. **设置 Domain**：
   - 在 Domains 标签中点击 **Add**
   - 选择适用的类

### 8.2 添加基数约束

1. 选中 `:Movie` 类
2. 在 **Class Axioms** 标签页点击 **Add** → **Sub Class Of**
3. 在弹出的窗口中选择 **Restriction**
4. 配置：
   - Property：`:directedBy`
   - Type：**minQualifiedCardinality**
   - Value：`1`
   - Class/Type：**Class** → `:Director`

### 8.3 运行推理

1. 点击菜单 **Tools → HermiT Reasoner → Inferencing → Reset Class Assertions to Root**
2. 在 **Classes** 视图中查看推理结果
3. 检查是否有不一致的类

### 8.4 排查不一致问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| `:Movie` 被标记为 `owl:Nothing` | 有些电影个体没有导演断言 | 为个体添加 `:directedBy` 断言 |
| `:Director` 被标记为 `owl:Nothing` | 某个导演有两个生物学母亲 | 减少为至多一个 |

---

## 9. 自我评估

| 目标 | 已完成 | 自评分（1-5） |
|------|--------|-------------|
| 定义 6 个数据属性 | [ ] | |
| 实现基数约束（min/max/qualified） | [ ] | |
| 实现值约束（hasValue） | [ ] | |
| 实现枚举类（oneOf） | [ ] | |
| 添加 datatype 约束（onDatatype） | [ ] | |
| 编写 SHACL Shape | [ ] | |
| 推理机一致性检测通过 | [ ] | |

---

## 10. 进阶练习

### 10.1 扩展挑战

1. **演员年龄验证**：为演员添加出生年份数据属性，定义 1900-2024 范围的约束
2. **连续制片约束**：如果演员在 2024 年有两部电影上映，要求它们必须是不同的角色
3. **分级关联**：创建一个约束，使得 R 级电影不能有评分 >= 12 的观众

### 10.2 参考实现：演员年龄

```turtle
# 演员出生年份
:birthYear a owl:DatatypeProperty ;
    rdfs:domain :Actor ;
    rdfs:range xsd:integer .

# 定义合法出生年份
:ValidBirthYear owl:onDatatype xsd:integer ;
    owl:withRestrictions (
        [ xsd:minInclusive "1900"^^xsd:integer ] ,
        [ xsd:maxInclusive "2024"^^xsd:integer ]
    ) .

# SHACL 验证
:ActorAgeShape a sh:NodeShape ;
    sh:targetClass :Actor ;
    sh:property [
        sh:path :birthYear ;
        sh:datatype xsd:integer ;
        sh:minInclusive "1900"^^xsd:integer ;
        sh:maxInclusive "2024"^^xsd:integer ;
        sh:message "出生年份必须在 1900-2024 之间"
    ] .
```

---

## 11. 本章小结

| 知识点 | 在本练习中的体现 |
|--------|-----------------|
| 基数约束 | `:Movie` 必须有至少一个 `:Director` |
| 值约束 | `:OscarWinner` 必须获得 `:AcademyAward` |
| datatype 约束 | 评分范围 0.0-10.0，年份范围 1888-2099 |
| SHACL 验证 | IMDb 编号格式校验，评分范围检查 |
| OWL vs SHACL | OWL 用于分类推理，SHACL 用于格式验证 |