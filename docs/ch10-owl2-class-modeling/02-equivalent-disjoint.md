# 第10章 OWL 类建模

## 第2篇 等价类与不相交性

### owl:equivalentClass（等价类）

等价类表示两个类具有完全相同的实例：

```turtle
:Woman owl:equivalentClass [
    owl:intersectionOf ( :Person ;
        [ owl:onProperty :hasGender ;
          owl:someValuesFrom :Female ] ) ;
] .
```

### owl:disjointWith（不相交性）

不相交性确保两个类没有共同的实例：

```turtle
:Male owl:disjointWith :Female .
```

### 应用示例

在实际本体建模中，等价类和不相交性断言对于保证本体的一致性和完整性非常重要。