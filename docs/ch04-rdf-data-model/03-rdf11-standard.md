# 第4章 RDF 数据模型

## 第3篇 W3C RDF 1.1 标准详解

### RDF 1.1 标准规范解读

RDF 1.1 是当前的最新版本，于 2014 年发布。主要改进包括：
- 与 RDF 1.0 的向后兼容
- 增加了对 RDF 数据集（RDF Datasets）的支持
- 增强的语言标记和类型化字面量

### 空白节点（Blank Node）的用法

空白节点用于表示未知 URI 的资源：

```turtle
_:node1 a foaf:Person ;
    foaf:name "张三" .
```

### RDF 容差与重新命名（Renaming）

RDF 语义具有重命名不变性，空白节点的名称不影响语义。