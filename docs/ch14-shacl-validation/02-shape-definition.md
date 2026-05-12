# 14.2 形状定义与约束

> **本节要点**：掌握 Target（目标）的四种类型，熟悉核心约束组件（`sh:minCount`, `sh:maxCount`, `sh:datatype`, `sh:pattern`, `sh:hasValue`），理解复杂 Shape 中 `sh:property`（嵌套属性约束）的使用方法。

---

## 1. Target（目标）详解

**Target（目标）** 决定了 SHACL Shape 验证应用到哪些 RDF 节点上。SHACL 提供了多种 Target 表达方式。

### 1.1 sh:targetClass — 按类目标定

**`sh:targetClass`** 是最常用的 Target 方式，它将 Shape 应用到指定类的所有实例上。

```turtle
PREFIX ex: <http://example.org/ontology#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# 定义一个 Person 类别的形状
ex:PersonShape
    a sh:NodeShape ;
    sh:targetClass ex:Person .
```

**验证场景**：假设有 100 个 `ex:Person` 实例，Shape 会对每个实例逐一检查约束条件。

### 1.2 sh:targetNode — 按指定节点目标定

**`sh:targetNode`** 将 Shape 直接应用于一个或一组明确列出的 IRI。

```turtle
# 只验证特定的几个节点
ex:AdminShape
    a sh:NodeShape ;
    sh:targetNode ex:Alice, ex:Bob, ex:Charlie ;
    sh:property [
        sh:path ex:hasRole ;
        sh:hasValue ex:Administrator
    ] .
```

**应用场景**：
- 验证特定资源是否符合某个数据质量要求
- 在大型数据图中针对少数节点进行检查
- 调试 Shape 时使用

### 1.3 sh:targetSubjectsOf — 按关系主体目标定

**`sh:targetSubjectsOf`** 将所有以指定谓词为主体（Subject）的节点作为验证目标。

```turtle
# 所有具有 ex:hasEmail 属性的资源都要验证邮箱格式
ex:EmailShape
    a sh:NodeShape ;
    sh:targetSubjectsOf ex:hasEmail ;
    sh:property [
        sh:path ex:hasEmail ;
        sh:pattern "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}$"
    ] .
```

**验证语义**：所有出现在 RDF 图中作为 `ex:hasEmail` 关系左侧的节点都将作为验证目标。

### 1.4 sh:targetObjectsOf — 按关系客体目标定

**`sh:targetObjectsOf`** 将所有以指定谓词的客体（Object）作为验证目标。

```turtle
# 所有被标记为 Project 的资源都需要验证其属性
ex:ProjectShape
    a sh:NodeShape ;
    sh:targetObjectsOf ex:hasProject ;
    sh:property [
        sh:path ex:projectName ;
        sh:minCount 1
    ] .
```

### 1.5 多 Target 组合

一个 Shape 可以同时使用多种 Target：

```turtle
ex:PriorityPersonShape
    a sh:NodeShape ;
    # 目标 1: 所有 Person 实例
    sh:targetClass ex:Person ;
    # 目标 2: 特别关注的几个节点
    sh:targetNode ex:VIP1, ex:VIP2 ;
    # 约束 ...
    sh:property [
        sh:path ex:hasName ;
        sh:minCount 1
    ] .
```

---

## 2. 约束组件详解

**Constraint（约束）** 是 Shape 的核心内容，定义了目标节点必须满足的条件。

### 2.1 数量约束

#### sh:minCount / sh:maxCount — 最小/最大出现次数

```turtle
PREFIX ex: <http://example.org/ontology#>
PREFIX sh: <http://www.w3.org/ns/shacl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

ex:PersonShape
    a sh:NodeShape ;
    sh:targetClass ex:Person ;
    
    # 名字必须恰好 1 个（至少 1，最多 1）
    sh:property [
        sh:path ex:hasName ;
        sh:minCount 1 ;
        sh:maxCount 1
    ] ;
    
    # 年龄可选但最多只能有 1 个值
    sh:property [
        sh:path ex:hasAge ;
        sh:minCount 0 ;
        sh:maxCount 1
    ] ;
    
    # 标签至少要有 0 个，最多 5 个
    sh:property [
        sh:path ex:hasTag ;
        sh:minCount 0 ;
        sh:maxCount 5
    ] .
```

| 组件 | 值类型 | 描述 |
|------|--------|------|
| `sh:minCount` | `0, 1, 2, ...` | 该属性路径对应的值**至少要有**的个数（包括 0） |
| `sh:maxCount` | `0, 1, 2, ...` | 该属性路径对应的值**最多可以有**的个数 |

### 2.2 类型约束

#### sh:datatype — 数据类型约束

```turtle
ex:PersonShape
    a sh:NodeShape ;
    sh:targetClass ex:Person ;
    
    sh:property [
        sh:path ex:hasBirthDate ;
        sh:datatype xsd:date
    ] ;
    
    sh:property [
        sh:path ex:hasAge ;
        sh:datatype xsd:integer
    ] ;
    
    sh:property [
        sh:path ex:hasBio ;
        sh:datatype xsd:string
    ] .
```

> **注意**：`sh:datatype` 不仅检查 `datatype` 也同时检查值是否合法（如 `xsd:date` 格式是否正确）。

### 2.3 值约束

#### sh:hasValue — 必须包含指定值

```turtle
ex:ConfirmedUserShape
    a sh:NodeShape ;
    sh:targetClass ex:User ;
    
    sh:property [
        sh:path ex:hasStatus ;
        sh:hasValue ex:statusConfirmed
    ] .
```

上述约束要求：**每个 `ex:User` 实例必须有至少一个 `ex:hasStatus` 值为 `ex:statusConfirmed`**。

### 2.4 正则约束

#### sh:pattern — 字符串正则表达式

```turtle
ex:ProductShape
    a sh:NodeShape ;
    sh:targetClass ex:Product ;
    
    sh:property [
        sh:path ex:hasSkuCode ;
        sh:pattern "^[A-Z]{2}-[0-9]{6}$"
    ] ;
    
    sh:property [
        sh:path ex:hasEmail ;
        sh:pattern "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}$" ;
        sh:flags "i"
    ] .
```

**正则标志（flags）**：

| 标志 | 含义 |
|------|------|
| `i` | 大小写不敏感（case-insensitive） |
| `m` | 多行模式（multiline） |

### 2.5 枚举约束

#### sh:in — 允许的值列表

```turtle
ex:MovieShape
    a sh:NodeShape ;
    sh:targetClass ex:Movie ;
    
    sh:property [
        sh:path ex:hasGenre ;
        sh:in ( ex:genreAction ex:genreComedy ex:genreDrama ex:genreSciFi ex:genreHorror )
    ] .
```

上述约束要求：**每部电影的 `ex:hasGenre` 值必须在允许的枚举列表中**。

---

## 3. 值约束 vs 路径约束

SHACL 约束可分为两大类：**值约束（Value Constraint）** 和 **结构约束（Structural Constraint）**。

### 3.1 值约束 — 直接写在 Shape 上

值约束直接声明在 Shape 资源本身之上，无需 `sh:property` 嵌套：

```turtle
ex:ActivePersonShape
    a sh:NodeShape ;
    sh:targetClass ex:Person ;
    
    # 值约束（直接作用于 Shape 目标）
    sh:class ex:ActivePerson ;            # 值必须属于某个类
    sh:datatype xsd:string ;              # 值必须有特定数据类型
    sh:in ( :male :female :other ) ;      # 值必须在指定集合中
    sh:hasValue :statusActive ;           # 值必须包含某特定值
    sh:minCount 1 ;                       # 最小个数
    sh:maxCount 10 ;                      # 最大个数
    sh:minInclusive 0 ;                   # 数值最小值
    sh:maxInclusive 100 ;                 # 数值最大值
    sh:pattern "^[A-Z]" ;                 # 正则约束
    sh:minLength 1 ;                      # 最小长度
    sh:maxLength 50 ;                     # 最大长度
```

### 3.2 结构约束 — 通过 sh:property 嵌套

结构约束需要嵌套在 `sh:property` 中，配合 `sh:path` 使用，对目标节点的属性进行路径访问和约束：

```turtle
ex:ComplexPersonShape
    a sh:NodeShape ;
    sh:targetClass ex:Person ;
    
    sh:property [
        sh:path ex:hasAddress ;         # 对 ex:hasAddress 属性的目标应用约束
        sh:class ex:Address             # 地址必须为 Address 类型
    ] ;
    
    sh:property [
        sh:path ex:hasFriends ;         # 对朋友圈进行约束
        sh:minCount 1 ;
        sh:maxCount 100
    ] .
```

---

## 4. 复杂 Shape：sh:property 嵌套

`sh:property` 是 SHACL 实现**深层结构约束**的核心组件。它允许你沿着属性路径逐层定义约束。

### 4.1 单级嵌套

```turtle
ex:CompanyShape
    a sh:NodeShape ;
    sh:targetClass ex:Company ;
    
    # 约束公司拥有的员工
    sh:property [
        sh:path ex:hasEmployee ;
        sh:minCount 1 ;
        sh:maxCount 1000 ;
        sh:class ex:Person
    ] .
```

### 4.2 多级嵌套（属性路径）

```turtle
ex:AuthorShape
    a sh:NodeShape ;
    sh:targetClass ex:Author ;
    
    # 约束作者写的书的出版年份
    sh:property [
        sh:path ( ex:authored ex:hasPublisher ex:publishYear ) ;  # 组合路径
        sh:minInclusive 1900 ;
        sh:maxInclusive 2030
    ] .
```

**路径表达式语法**：

| 表达式 | 含义 |
|--------|------|
| `ex:singlePath` | 单步路径 |
| `( sh:prop1 sh:prop2 ... )` | 顺序路径（concatenation） |
| `!*` | 自反闭包（自反传递闭包） |
| `!+` | 传递闭包（正闭包，不含起点） |

### 4.3 PropertyShape 与嵌套约束

**PropertyShape** 不能独立存在，必须嵌套在其他 Shape 中：

```turtle
ex:PersonShape
    a sh:NodeShape ;
    sh:targetClass ex:Person ;
    
    sh:property [
        sh:path ex:hasFriend ;
        sh:node ex:FriendConstraints  # 将子 Shape 应用到路径的每个目标
    ] .

ex:FriendConstraints
    a sh:NodeShape ;
    sh:class ex:Person ;          # 朋友必须也是 Person
    sh:property [
        sh:path ex:since ;        # 相识日期
        sh:datatype xsd:date
    ] .
```

---

## 5. 综合 Turtle 示例与结果解读

### 5.1 完整 Shape 示例

```turtle
PREFIX sh:   <http://www.w3.org/ns/shacl#>
PREFIX ex:   <http://example.org/ontology#>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>

# ════════════════════════════════════════════════
# Shape 定义：验证 Person 实例的完整性
# ════════════════════════════════════════════════

ex:PersonShape
    a sh:NodeShape ;
    sh:targetClass ex:Person ;
    
    # 约束 1: 必须有且仅有一个名字
    sh:property [
        sh:path ex:hasName ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:datatype xsd:string
    ] ;
    
    # 约束 2: 年龄可选，但必须有则为非负整数
    sh:property [
        sh:path ex:hasAge ;
        sh:minCount 0 ;
        sh:maxCount 1 ;
        sh:datatype xsd:integer ;
        sh:minInclusive 0
    ] ;
    
    # 约束 3: 邮箱格式必须符合正则
    sh:property [
        sh:path ex:hasEmail ;
        sh:datatype xsd:string ;
        sh:pattern "^[^@]+@[^@]+\\.[^@]+$" ;
        sh:flags "i"
    ] .
```

### 5.2 待验证 RDF 数据

```turtle
PREFIX ex:   <http://example.org/ontology#>
PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>

# Person 1：完全合规
<http://example.org/person/001>
    a ex:Person ;
    ex:hasName "Alice" ;
    ex:hasAge 30 ;
    ex:hasEmail "alice@example.com" .

# Person 2：缺少邮箱，年龄为负数
<http://example.org/person/002>
    a ex:Person ;
    ex:hasName "Bob" ;
    ex:hasAge -5 ;
    ex:hasEmail "invalid-email" .

# Person 3：没有名字（违反 minCount=1）
<http://example.org/person/003>
    a ex:Person .
```

### 5.3 验证结果解读

运行 SHACL 验证后，会生成 `ValidationReport`：

```turtle
PREFIX sh:   <http://www.w3.org/ns/shacl#>
PREFIX ex:   <http://example.org/ontology#>

[
    a sh:ValidationReport ;
    sh:conforms false ;          # 整体不合格
    
    sh:result [
        a sh:ValidationResult ;
        sh:focusNode <http://example.org/person/002> ;
        sh:resultSeverity sh:Violation ;
        sh:resultMessage "值不在允许的 datatyp 范围内." ;
        sh:sourceConstraint xsd:integer
    ] ;
    
    sh:result [
        a sh:ValidationResult ;
        sh:focusNode <http://example.org/person/002> ;
        sh:resultSeverity sh:Violation ;
        sh:resultMessage "字符串值不匹配给定模式." ;
        sh:resultPath ex:hasEmail
    ] ;
    
    sh:result [
        a sh:ValidationResult ;
        sh:focusNode <http://example.org/person/003> ;
        sh:resultSeverity sh:Violation ;
        sh:resultMessage "值数量少于最小允许值 1." ;
        sh:sourceShape [
            sh:path ex:hasName
        ]
    ] .
]
```

**验证报告关键字段说明**：

| 字段 | 含义 |
|------|------|
| `sh:conforms` | 整个报告是否符合（`true` = 全部通过，`false` = 有违规） |
| `sh:result` | 违规/结果列表 |
| `sh:focusNode` | 触发违规的 RDF 节点 |
| `sh:resultSeverity` | 严重级别（`sh:Violation` 或 `sh:Info`） |
| `sh:resultMessage` | 人类可读的违规消息 |
| `sh:resultPath` | 触发约束的 `sh:path` 路径 |
| `sh:sourceConstraint` | 未满足的约束组件 |
| `sh:sourceShape` | 触发验证的 Source Shape |

---

## 6. 总结

| 概念 | 关键要点 |
|------|----------|
| Target 类型 | `sh:targetClass`（类）, `sh:targetNode`（指定）, `sh:targetSubjectsOf`（关系主体）, `sh:targetObjectsOf`（关系客体） |
| sh:minCount / maxCount | 控制属性值的最小和最大出现次数 |
| sh:datatype | 验证值的 datatype 和格式 |
| sh:pattern | 字符串正则表达式约束，支持标志位 |
| sh:hasValue | 要求值包含指定常量 |
| sh:in | 枚举约束，限定可选值列表 |
| sh:property 嵌套 | 实现属性路径上的嵌套约束，支持 Path 表达式 |
| 验证报告 | `ValidationReport` 含 `conforms`, `result`（`focusNode`, `resultSeverity`, `resultMessage`） |