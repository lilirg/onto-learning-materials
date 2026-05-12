# 附录 E: PIZZA 本体学习教程

> **本节要点**：PIZZA 本体（Pizza Ontology）是语义网和本体工程领域最经典的入门教学本体。通过本教程，您将系统掌握 OWL 2 的核心建模概念。

---

## 1. PIZZA 本体简介

### 1.1 什么是 PIZZA 本体？

PIZZA 本体是一个专为**教学和学习 OWL 2** 而设计的示例本体。它使用"披萨"作为应用领域，定义了一套描述披萨类型、配料和制作规则的完整词汇表。

### 1.2 学习目标

通过构建和理解 PIZZA 本体，您将学习到：

| 学习目标 | 涉及的知识领域 |
|----------|---------------|
| 创建类和构建层次结构 | [`类层次结构`](docs/ch03-core-concepts/01-elements.md) |
| 定义对象属性及其约束 | [`对象属性`](docs/ch11-owl2-property-axioms/01-object-data-properties.md) |
| 使用数据类型属性 | [`数据类型属性`](docs/ch11-owl2-property-axioms/01-object-data-properties.md) |
| 应用存在约束 (`someValuesFrom`) | [`存在约束`](docs/ch10-owl2-class-modeling/01-class-expressions.md) |
| 应用全称约束 (`allValuesFrom`) | [`全称约束`](docs/ch10-owl2-class-modeling/01-class-expressions.md) |
| 定义等价类和不相交类 | [`等价与不相交`](docs/ch10-owl2-class-modeling/02-equivalent-disjoint.md) |
| 使用基数约束 | [`基数约束`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md) |
| 执行一致性检查与推理 | [`推理与一致性`](docs/ch15-reasoning-consistency/01-reasoning-basics.md) |

### 1.3 PIZZA 本体的结构概览

```
PIZZA 本体类层次结构（简化版）
├── Thing (顶层)
│   └── PhysicalFoodThing (物理食物)
│       ├── Pizza (披萨 - 核心类)
│       │   ├── ThinAndCrispyPizza (薄脆披萨)
│       │   │   ├── ThinAndCrispyBasePizza (薄脆底披萨)
│       │   │   │   ├── TraditionalItalianPizza (传统意大利披萨)
│       │   │   │   └── NYStylePizza (纽约风味披萨)
│       │   │   └── ...
│       │   ├── ThinAndCrishyPizza (另一类薄脆)
│       │   ├── StuffedCrustPizza (芝士边披萨)
│       │   │   └── ...
│       │   └── SimplePizza (简配披萨)
│       │       ├── SimpleCheesePizza
│       │       └── SimplePepperoniPizza
│       ├── Ingredient (配料 - 与 Pizza 不相交)
│       │   ├── Dairy (乳制品)
│       │   │   ├── Cheese (奶酪)
│       │   │   │   ├── Mozzarella
│       │   │   │   ├── Parmesan
│       │   │   │   ├── GoatCheese
│       │   │   │   ├── Gorgonzola
│       │   │   │   └── Pecorino
│       │   │   ├── Cream
│       │   │   └── Butter
│       │   ├── Topping (浇头)
│       │   │   ├── MeatMeat (肉类)
│       │   │   │   ├── Ham
│       │   │   │   ├── Bacon
│       │   │   │   ├── SlicedHam
│       │   │   │   └── Pancetta
│       │   │   ├── FishProducts (鱼类)
│       │   │   │   └── SlicedSalmon
│       │   │   ├── HerbsAndSpices (香草香料)
│       │   │   │   ├── Chilly
│       │   │   │   ├── JalapenoChilly
│       │   │   │   └── Basil
│       │   │   └── VegetableTopping (蔬菜)
│       │   │       ├── Mushroom
│       │   │       └── ...
│       │   ├── BaseTopping (底部配料)
│       │   ├── Sauce (酱汁)
│       │   │   ├── TomatoSauce
│       │   │   └── GarlicSauce
│       │   └── CheeseRegion (奶酪产区)
│       │       └── ...
│       ├── PizzaRegion (披萨产区)
│       │   ├── Neapolitan (那不勒斯)
│       │   ├── Roman (罗马)
│       │   ├── Sicilian (西西里)
│       │   └── Sardinian (撒丁岛)
│       ├── Amount (数量)
│       └── ...
│   └── ...
```

---

## 2. 逐步构建 PIZZA 本体

本节将指导您在 Protégé 中从零开始构建简化的 PIZZA 本体。

### 2.1 第一步：创建本体和基本类

#### 2.1.1 创建本体

```
操作步骤：
├── 打开 Protégé
├── File → New Ontology
├── 在 Label 字段输入 "Pizza"
├── 在 IRI 字段输入 "http://example.org/pizza"
└── 点击 OK
```

#### 2.1.2 创建顶级类

```turtle
# 创建三个顶级类

:Pizza owl:equivalentClass :PhysicalFoodThing owl:intersectionOf :Food [owl:onProperty :isBaseOf; owl:someValuesFrom :Pizza] .

:Food a owl:Class ;
    rdfs:label "食物"@zh ;
    rdfs:comment "可食用的东西"@zh .

:PhysicalFoodThing a owl:Class ;
    rdfs:label "实物"@zh ;
    rdfs:subClassOf :Food .
```

**Protégé 操作**：
```
创建类的操作步骤：
├── 点击 "Classes" 标签
├── 点击 "+" (新建类) 或 Ctrl+Alt+C
├── 输入类名
├── 在 "SubClass Of" 标签设置父类关系
```

---

### 2.2 第二步：定义披萨类层次

#### 2.2.1 基本披萨类型

```turtle
# 披萨本体核心类层次
:Pizza rdfs:subClassOf :PhysicalFoodThing .

# 薄脆类型披萨
:ThinAndCrispyPizza rdfs:subClassOf :Pizza .
:ThinAndCrispyBasePizza rdfs:subClassOf :ThinAndCrispyPizza .

# 意大利披萨（一种薄脆披萨）
:TraditionalItalianPizza rdfs:subClassOf :ThinAndCrispyPizza .
:TraditionalItalianPizza rdfs:subClassOf [
    owl:onProperty :hasRegion ;
    owl:someValuesFrom :Neapolitan
] .

# 那不勒斯地区
:Neapolitan rdfs:subClassOf :PizzaRegion .
:Roman rdfs:subClassOf :PizzaRegion .
:Sicilian rdfs:subClassOf :PizzaRegion .
:Sardinian rdfs:subClassOf :PizzaRegion .
```

#### 2.2.2 添加子类示例

| 披萨类型 | 父类 | 额外约束 |
|----------|------|----------|
| `TraditionalItalianPizza` | `ThinAndCrispyPizza` | 必须有 `Neapolitan` 地区 |
| `NYStylePizza` | `ThinAndCrispyPizza` | — |
| `StuffedCrustPizza` | `Pizza` | — |
| `Margherita` | `TraditionalItalianPizza` | — |

---

### 2.3 第三步：定义配料类层次

#### 2.3.1 配料的层次结构

```turtle
:Ingredient rdfs:subClassOf :PhysicalFoodThing .

# 乳制品
:Dairy rdfs:subClassOf :Ingredient .
:Cheese rdfs:subClassOf :Dairy .
:Cream rdfs:subClassOf :Dairy .
:Butter rdfs:subClassOf :Dairy .

# 奶酪种类
:Mozzarella rdfs:subClassOf :Cheese .
:Parmesan rdfs:subClassOf :Cheese .
:GoatCheese rdfs:subClassOf :Cheese .
:Gorgonzola rdfs:subClassOf :Cheese .
:Pecorino rdfs:subClassOf :Cheese .

# 浇头
:Topping rdfs:subClassOf :Ingredient .
:MeatTopping rdfs:subClassOf :Topping .
:FishTopping rdfs:subClassOf :Topping .
:VegetableTopping rdfs:subClassOf :Topping .
:HerbAndSpice rdfs:subClassOf :Topping .

# 肉类
:Ham rdfs:subClassOf :MeatTopping .
:Bacon rdfs:subClassOf :MeatTopping .
:SlicedHam rdfs:subClassOf :MeatTopping .

# 蔬菜
:Mushroom rdfs:subClassOf :VegetableTopping .
```

#### 2.3.2 添加实例

```turtle
# 创建个体实例
:Margherita a :TraditionalItalianPizza .
:Pepperoni a :Topping .

# 为实例添加属性
:Margherita :usesCheese :Mozzarella ;
            :usesSauce :TomatoSauce .

:Mozzarella :originatesFrom :Italy ;
            :madeFrom :GoatMilk .
```

---

### 2.4 第四步：定义属性

#### 2.4.1 对象属性

```turtle
# 定义对象属性：配料关系
:hasIngredient a owl:ObjectProperty ;
    rdfs:domain :Pizza ;
    rdfs:range :Ingredient .

:isBaseOf a owl:ObjectProperty ;
    rdfs:domain :Topping ;
    rdfs:range :Pizza ;
    owl:inverseOf :hasIngredient .

:usesCheese a owl:ObjectProperty ;
    rdfs:domain :Pizza ;
    rdfs:range :Cheese .

:hasRegion a owl:ObjectProperty ;
    rdfs:domain :Pizza ;
    rdfs:range :PizzaRegion .

:originatesFrom a owl:ObjectProperty ;
    rdfs:domain :Ingredient ;
    rdfs:range :Country .
```

#### 2.4.2 数据类型属性

```turtle
# 定义数据类型属性
:weight a owl:DatatypeProperty ;
    rdfs:domain :Pizza ;
    rdfs:range xsd:decimal .

:temperature a owl:DatatypeProperty ;
    rdfs:domain :Pizza ;
    rdfs:range xsd:integer .

:fatContent a owl:DatatypeProperty ;
    rdfs:domain :Ingredient ;
    rdfs:range xsd:decimal .

:proteinContent a owl:DatatypeProperty ;
    rdfs:domain :Ingredient ;
    rdfs:range xsd:decimal .
```

---

### 2.5 第五步：使用类表达式（约束）

#### 2.5.1 存在约束 (someValuesFrom)

```turtle
# 「素食披萨」 = 「披萨」且「所有配料都是素食」
:VeggiePizza owl:equivalentClass [
    owl:intersectionOf (
        :Pizza
        [
            owl:onProperty :hasIngredient ;
            owl:allValuesFrom :VegetableTopping
        ]
    )
] .

# 「有奶酪的披萨」
:PizzaWithCheese owl:equivalentClass [
    owl:onProperty :hasIngredient ;
    owl:someValuesFrom :Cheese
] .
```

#### 2.5.2 全称约束 (allValuesFrom)

```turtle
# 「纯奶酪披萨」：所有配料都是奶酪
:PureCheesePizza owl:equivalentClass [
    owl:onProperty :hasIngredient ;
    owl:allValuesFrom :Cheese
] .

# 「那不勒斯披萨」：是披萨，且地区是那不勒斯，且所有配料都是意大利产的
:AuthenticNeapolitanPizza owl:equivalentClass [
    owl:intersectionOf (
        :Pizza
        [
            owl:onProperty :hasRegion ;
            owl:someValuesFrom :Neapolitan
        ]
        [
            owl:onProperty :hasIngredient ;
            owl:allValuesFrom [
                owl:onProperty :originatesFrom ;
                owl:someValuesFrom :Italy
            ]
        ]
    )
] .
```

#### 2.5.3 交集与等价定义

```turtle
# 「厚边芝士披萨」：是披萨，且有芝士边配料，且有面团边配料
:ThickAndCheesySidePizza owl:equivalentClass [
    owl:intersectionOf (
        :Pizza
        [
            owl:onProperty :hasIngredient ;
            owl:someValuesFrom :Dough ;
            owl:allValuesFrom :Dough
        ]
        [
            owl:onProperty :hasIngredient ;
            owl:someValuesFrom :Cheese ;
            owl:allValuesFrom :Cheese
        ]
    )
] .
```

---

### 2.6 第六步：定义不相交类

```turtle
# 披萨与配料是不相交的两个类
:Pizza owl:disjointWith :Ingredient .

# 不同披萨类型之间也可以定义不相交
:ThinAndCrispyPizza owl:disjointWith :StuffedCrustPizza .
:Neapolitan owl:disjointWith :Sicilian .

# 肉类与鱼类浇头不相交
:MeatTopping owl:disjointWith :FishTopping .
```

---

### 2.7 第七步：添加基数约束

```turtle
# 「双人披萨」：恰好有两个配料
:PizzaForTwo owl:equivalentClass [
    owl:onProperty :hasIngredient ;
    owl:exactCardinality 2
] .

# 「素食披萨」定义（含最小基数）
:StrictlyVeggiePizza owl:equivalentClass [
    owl:intersectionOf (
        :Pizza
        [
            owl:onProperty :hasIngredient ;
            owl:someValuesFrom :VegetableTopping
        ]
        [
            owl:onProperty :hasIngredient ;
            owl:allValuesFrom :VegetableTopping
        ]
        [
            owl:onProperty :hasIngredient ;
            owl:minQualifiedCardinality 2 ;
            owl:classOnValuesFrom :VegetableTopping
        ]
    )
] .

# 「单人份披萨」：恰好使用一种奶酪
:SingleCheesePizza owl:equivalentClass [
    owl:onProperty :hasIngredient ;
    owl:qualifiedCardinality 1 ;
    owl:classOnValuesFrom :Cheese
] .
```

---

## 3. 完整本体示例代码

```turtle
@prefix : <http://example.org/pizza#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# ===== 命名空间 =====
: has a rdfs:label "Pizza 本体"@zh .

# ===== 顶级类 =====
:Pizza a owl:Class ;
    rdfs:label "披萨"@zh .

:Ingredient a owl:Class ;
    rdfs:label "配料"@zh .

:Pizza owl:disjointWith :Ingredient .

# ===== 披萨层次 =====
:ThinAndCrispyPizza rdfs:subClassOf :Pizza ;
    rdfs:label "薄脆披萨"@zh .

:TraditionalItalianPizza rdfs:subClassOf :ThinAndCrispyPizza ;
    rdfs:label "传统意大利披萨"@zh .

:StuffedCrustPizza rdfs:subClassOf :Pizza ;
    rdfs:label "芝士边披萨"@zh .

# ===== 配料层次 =====
:Cheese rdfs:subClassOf :Ingredient ;
    rdfs:label "奶酪"@zh .

:VegetableTopping rdfs:subClassOf :Ingredient ;
    rdfs:label "蔬菜"@zh .

:MeatTopping rdfs:subClassOf :Ingredient ;
    rdfs:label "肉类"@zh .

:Pizza owl:disjointWith :Ingredient .

# ===== 属性 =====
:hasIngredient a owl:ObjectProperty ;
    rdfs:domain :Pizza ;
    rdfs:range :Ingredient ;
    rdfs:label "使用配料"@zh .

:hasRegion a owl:ObjectProperty ;
    rdfs:domain :Pizza ;
    rdfs:label "产区"@zh .

:Weight a owl:DatatypeProperty ;
    rdfs:label "重量"@zh .

# ===== 个体 =====
:Margherita a :TraditionalItalianPizza ;
    :hasIngredient :Mozzarella ;
    :hasIngredient :Tomato ;
    :hasRegion :Neapolitan .

:Pepperoni a :MeatTopping .
:Mozzarella a :Cheese .

:Neapolitan a :PizzaRegion .

# ===== 约束定义 =====
:VeggiePizza owl:equivalentClass [
    owl:onProperty :hasIngredient ;
    owl:allValuesFrom :VegetableTopping
] .
```

---

## 4. 在 Protégé 中验证与推理

### 4.1 运行一致性检查

```
验证步骤：
├── 点击菜单 "Onologies → Check Consistency"
├── 或使用快捷键: Shift + F5 / Ctrl + R
└── 如果本体不一致，推理机会弹出解释对话框
```

### 4.2 分类本体

```
分类操作步骤：
├── 点击菜单 "Onologies → Classify"
├── 这将基于公理自动计算完整的类层次结构
├── 分类后可在 "Class Hierarchy" 标签页查看结果
└── 新的等价类会自动出现在层次结构中
```

### 4.3 实例查询

```turtle
# 运行实例查询：哪些个体是「素食披萨」？
查询条件: :VeggiePizza
结果: 所有 hasIngredient all :VegetableTopping 的个体

# 运行实例查询：哪些披萨包含奶酪？
查询条件: 存在约束
结果: 所有 hasIngredient some :Cheese 的披萨
```

### 4.4 推理规则

| 推理任务 | 操作目的 | 结果展示 |
|----------|---------|---------|
| 类一致性检查 | 确保类不矛盾 | 「披萨」是否与「NOT 披萨」等价？ |
| 实例一致性检查 | 确保个体不矛盾 | 个体是否属于不相交类的子类？ |
| 等价类计算 | 发现逻辑等价的类 | 新推导出的等价类 |
| 子类推理 | 推导隐含的层次关系 | 「Mozzarella」是「Cheese」也是「Dairy」也是「Ingredient」 |
| 实例分类 | 找出个体的所有隐含类 | 「Margherita」同时是「Pizza」、「ThinAndCrispyPizza」等 |

---

## 5. PIZZA 本体的学习价值

### 5.1 核心 OWL 2 特性覆盖

| 特性 | PIZZA 中的应用 | 章节参考 |
|------|---------------|----------|
| 类层次 | 配料 → 蔬菜 → Mushroom | [`类层次`](docs/ch06-rdfs-core/02-subclass-subproperty.md) |
| 对象属性 | hasIngredient, hasRegion | [`对象属性`](docs/ch11-owl2-property-axioms/01-object-data-properties.md) |
| 数据类型属性 | weight, fatContent | [`数据类型约束`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md) |
| 存在约束 | hasIngredient some Cheese | [`存在约束`](docs/ch10-owl2-class-modeling/01-class-expressions.md) |
| 全称约束 | hasIngredient all VegetableTopping | [`全称约束`](docs/ch10-owl2-class-modeling/01-class-expressions.md) |
| 等价类 | VeggiePizza 定义 | [`等价与不相交`](docs/ch10-owl2-class-modeling/02-equivalent-disjoint.md) |
| 不相交类 | Pizza 与 Ingredient 不相交 | [`不相交定义`](docs/ch10-owl2-class-modeling/02-equivalent-disjoint.md) |
| 基数约束 | 配料数量限制 | [`基数约束`](docs/ch12-owl2-data-constraints/01-cardinality-constraints.md) |
| 传递属性 | (可选) ancestor 关系 | [`传递属性`](docs/ch11-owl2-property-axioms/03-property-hierarchy-chain.md) |

### 5.2 学习路径推荐

```
PIZZA 本体学习路径:

Level 1 (基础):
├── 了解 Pizza Ontology 的基本结构
├── 理解 类 ↔ 实例 的概念
└── 熟悉 Protégé 基本操作

Level 2 (中级):
├── 尝试创建简化的披萨类层次
├── 定义 hasIngredient 属性
├── 添加若干配料个体和关系
└── 验证基本推理

Level 3 (高级):
├── 添加类表达式约束 (some/all ValuesFrom)
├── 使用交集和等价定义
├── 添加基数约束
├── 推理验证复杂类的推导能力
└── 检查本体一致性
```

---

## 6. 相关资料

### 6.1 官方网站

| 资源 | 地址 | 描述 |
|------|------|------|
| **Pizza Ontology 官网** | [http://ontobee.org/ontology/pizza](http://ontobee.org/ontology/pizza/) | OntoBee 上的 Pizza 本体浏览器 |
| **Pizza Ontology GitHub** | [https://github.com/zoreet/PizzaOntology](https://github.com/zoreet/PizzaOntology) | 官方 GitHub 仓库 |
| **Stanford OBO** | [http://purl.obolibrary.org/obo/pizza](http://purl.obolibrary.org/obo/pizza) | OBO 仓库中的版本 |
| **Protégé 教程页面** | [https://protege.stanford.edu/tutorials](https://protege.stanford.edu/tutorials) | Protégé 官方教程 |

### 6.2 在线浏览工具

| 工具 | 地址 |
|------|------|
| OntoBee | [http://ontobee.org/](http://ontobee.org/) |
| VisDL | [http://visdl.org/](http://visdl.org/) |
| OWLRI | [http://owlri.github.io/](http://owlri.github.io/) |