# 第8章 OWL 2 概览

## 第5篇 OWL 2 新特性

### OWL 2 相较于 OWL 1 的新特性

- **新的数据类型约束**：如 minLength, maxLength, pattern, minValue, maxValue
- **属性断言（Property Assertions）**：如 owl:distinctMembers
- **更丰富的属性特征**：如 owl:InverseFunctionalProperty, owl:TransitiveProperty
- **数据范围属性（Data Ranges）**：更灵活的数据类型组合

### OWL 2 性能改进

- **Profile 支持**：EL, QL, RL, DL 四种 Profile 针对不同场景优化
- **增量推理**：支持本体修改后的增量更新
- **大规模本体支持**：支持百万级实体的高效推理

### OWL 2 扩展

- **Moreaxioms**：允许在公理上附加元数据
- **直接 IRI 声明**：改进的可读性和可维护性