# 附录 B: Protégé 快捷键参考

> **本节要点**：掌握 Protégé 快捷键可显著提升本体编辑效率。本附录列出常用快捷键、菜单导航路径和操作技巧。

---

## 1. 键盘快捷键总览

### 1.1 文件操作

| 快捷键 | 功能 | 详细说明 |
|--------|------|----------|
| `Ctrl + N` | 新建本体 | 创建空本体或从模板创建 |
| `Ctrl + O` | 打开本体 | 打开 .owl、.rdf 等格式文件 |
| `Ctrl + S` | 保存本体 | 保存当前编辑的本体 |
| `Ctrl + Shift + S` | 另存为 | 选择保存格式和位置 |
| `Ctrl + W` | 关闭本体 | 关闭当前窗口 |
| `Ctrl + Q` | 退出 | 退出 Protégé |
| `Ctrl + Shift + N` | 新建本体窗口 | 创建新选项卡窗口 |

### 1.2 编辑操作

| 快捷键 | 功能 | 详细说明 |
|--------|------|----------|
| `Delete` | 删除选中项 | 删除选中的类、属性或个体 |
| `F2` | 重命名 | 重命名选中的实体 |
| `Ctrl + A` | 全选 | 在列表中选中所有项 |
| `Ctrl + C` | 复制 | 复制选中的实体或内容 |
| `Ctrl + V` | 粘贴 | 粘贴复制的内容 |
| `Ctrl + X` | 剪切 | 剪切选中的项 |
| `Ctrl + Z` | 撤销 | 撤销上一步操作 |
| `Ctrl + Y` | 重做 | 重做被撤销的操作 |
| `Ctrl + D` | 复制实体 | 创建选中外表的副本 |
| `Ctrl + Shift + Delete` | 永久删除 | 不经回收站直接删除 |

### 1.3 创建操作

| 快捷键 | 功能 | 详细说明 |
|--------|------|----------|
| `Ctrl + Alt + C` | 新建类 | 在当前本体中创建新类 |
| `Ctrl + Alt + P` | 新建属性 | 创建新的对象属性 |
| `Ctrl + Alt + D` | 新建数据类型属性 | 创建新的数据类型属性 |
| `Ctrl + Alt + I` | 新建个体 | 创建新个体实例 |
| `Ctrl + Alt + T` | 新建注释属性 | 创建注解属性 |

### 1.4 查找与导航

| 快捷键 | 功能 | 详细说明 |
|--------|------|----------|
| `Ctrl + F` | 查找文本 | 在当前面板中搜索文本 |
| `Ctrl + H` | 替换 | 替换查找的文本 |
| `F3` | 查找类 | 直接跳转到类层次结构查找 |
| `Ctrl + G` | 导航到实体 | 输入名字跳转到特定实体 |
| `Ctrl + F3` | 查找个体 | 直接跳转到个体查找 |
| `Ctrl + F4` | 查找属性 | 直接跳转到属性查找 |
| `Enter` | 打开/查看 | 双击或回车打开选中项详情 |
| `Alt + ←` | 后退导航 | 返回上一个查看位置 |
| `Alt + →` | 前进导航 | 前进到上一个位置 |
| `Home` | 跳到顶部 | 跳到层次结构顶部 |
| `End` | 跳到底部 | 跳到层次结构底部 |

### 1.5 编辑属性值

| 快捷键 | 功能 | 详细说明 |
|--------|------|----------|
| `Tab` | 下一字段 | 在编辑区域间跳转 |
| `Shift + Tab` | 上一字段 | 反向跳转 |
| `Space` | 展开/折叠 | 展开或折叠节点 |
| `Enter` | 编辑/打开 | 打开选中的属性编辑器 |
| `Delete` | 删除值 | 删除选中的属性值 |
| `Ctrl + +` | 放大字体 | 增大编辑器字体大小 |
| `Ctrl + -` | 缩小字体 | 减小编辑器字体大小 |
| `Ctrl + 0` | 重置字体 | 恢复默认字体大小 |

---

## 2. 推理操作

| 快捷键 | 功能 | 详细说明 |
|--------|------|----------|
| `Ctrl + R` | 运行推理器 | 执行当前配置的推理机 |
| `Ctrl + Shift + R` | 检查一致性 | 检测本体是否存在矛盾 |
| `Ctrl + Shift + C` | 分类本体 | 自动计算类层次结构 |
| `Ctrl + Shift + I` | 实例化 | 计算类的实例（根实例） |
| `Ctrl + Shift + E` | 解释器 | 解释为什么个体是某类的实例 |
| `F5` | 刷新视图 | 刷新当前显示内容 |
| `Ctrl + Shift + F5` | 全量刷新 | 刷新所有视图和本体内容 |

---

## 3. 类层次结构操作

### 3.1 层次结构操作快捷键

| 操作 | 快捷键/方式 | 说明 |
|------|-------------|------|
| 新建父类 | 右键 → 新建直接父类 | 选择或创建新的直接父类 |
| 新建子类 | 右键 → 添加子类 | 将选中类作为父类 |
| 新建等价类 | 右键 → 等效类 | 定义等价关系 |
| 拖拽层级 | 鼠标拖拽 | 直接调整类在层次图中的位置 |
| 全选继承链 | 右键 → 选中所有实例 | 选中该类的所有个体 |

### 3.2 树形视图操作

```
类层次结构（Class Hierarchy）面板操作：
├── owl:Thing (顶部)
│   ├── Person
│   │   ├── Student
│   │   └── Teacher
│   └── Organization
│       └── University
│           └── TSinghua (个体)
```

| 操作 | 方式 | 说明 |
|------|------|------|
| 展开所有节点 | 右键 → 展开全部 | 展开完整树形图 |
| 折叠所有节点 | 右键 → 折叠全部 | 收起所有分支 |
| 跳转到类 | 输入类名 + Enter | 快速定位 |
| 查看公理 | 双击类 | 打开公理编辑器 |

---

## 4. 菜单导航

### 4.1 文件菜单

```
文件(File) → 本体操作(Onologies) → 
├── 新建(Create)
├── 打开(Open)
├── 打开最近(MRU Lists)
├── 保存(Save)
├── 全部保存(Save All)
├── 另存为(Save As) → Turtle, RDF/XML, Manchester, OWLMXML
├── 导入(Import) → 本体、文件、剪贴板
├── 导出(Export) → 序列化格式
└── 关闭(Close)
```

### 4.2 编辑菜单

```
编辑(Edit) → 
├── 撤销(Undo) / 重做(Redo)
├── 剪切(Cut) / 复制(Copy) / 粘贴(Paste)
├── 全选(Select All)
├── 查找(Find)
├── 偏好设置(Preferences)
└── 实体视图(Entity Visual Preferences)
```

### 4.3 视图菜单

```
视图(View) →
├── 标签页视图(View as Tabbed Label Editor) ← 推荐初始视图
├── 类层次结构视图(Class Hierarchy View)
├── 个体实例视图(Instance View)
├── 属性层次结构视图(Property Hierarchy View)
├── 公理视图(Axioms View)
├── 祖先视图(Ancestors View)
├── 后代视图(Descendants View)
├── 等价类视图(Equivalent Classes View)
└── 图形化视图(Graph View)
```

### 4.4 本体操作菜单

```
本体(Onologies) →
├── 选择推理器(Select Reasoner) → HermiT, Pellet, ELK
├── 运行推理器(Run Reasoner)
├── 检查一致性(Check Consistency)
├── 分类本体(Classify)
├── 新建断言(New Assertions)
│   ├── 公理视图编辑器
│   └── Manchester 语法编辑器
└── 查询推理机(Query Reasoner) → 实例查询解释
```

---

## 5. 推理机配置

### 5.1 常用推理机

| 推理机 | 特点 | 适用场景 |
|--------|------|----------|
| **HermiT** | 完整 OWL 2 ELQL 支持 | 推荐通用推理 |
| **Pellet** | 支持 OWL 2 DL 和 OWL 2 | 大型本体 |
| **ELK** | 高性能 OWL 2 EL | 超大规模层次结构 |
| **FaCT++** | 经典 OWL DL 推理机 | 传统.owl 本体 |

### 5.2 推理机配置步骤

```
本体(Onologies) → 选择推理器(Select Reasoner) → 配置
├── 本体一致性(Description Logic Axioms)
├── 类的实例(Cls of Class)
├── 等价类计算(Calculate)
├── 根实例计算(Root Instances)
└── 实例分类(Add Instances)
```

---

## 6. 插件扩展

### 6.1 官方及常用插件

| 插件名称 | 功能 | 安装方式 |
|----------|------|----------|
| **SWRL Rule Editor** | SWRL 规则编写和编辑 | Protégé 内建插件 |
| **Quick Promote** | 快速将实例提升为新类 | 插件市场安装 |
| **Sherlock** | 本体质量分析和诊断 | 外部工具 |
| **Protege-SWRLTab** | SWRL 规则可视化标签页 | 插件市场安装 |
| **Visualization** | 本体可视化渲染 | 插件市场安装 |
| **Protege-OWLMini** | 轻量级 OWL 语法标签页 | 插件市场安装 |
| **OntoBDD** | 本体设计文档生成 | 外部工具 |
| **OOPS!** | 本体常见错误检查 | Web 服务 |

### 6.2 SWRL 规则编辑器示例

```python
# SWRL 规则示例：父母推理
Parent(?x, ?y) ^ hasMother(?x, ?z) →Female(?z)

# SWRL 规则示例：祖父母推理
hasParent(?x, ?y) ^ hasParent(?y, ?z) → hasGrandparent(?x, ?z)
```

配置路径：`插件(Plugin) → SWRL → New Rule`

---

## 7. 工作流优化技巧

### 7.1 视图配置推荐

```
推荐工作区布局：
┌─────────────────────┬─────────────────────┐
│     标签页视图       │     类层次结构       │
│  (属性编辑面板)      │  (树形导航)         │
├─────────────────────┼─────────────────────┤
│     公理视图         │     搜索面板         │
│  (当前实体公理列表)  │                     │
└─────────────────────┴─────────────────────┘
```

### 7.2 常用快捷键组合操作

| 操作场景 | 推荐操作流程 |
|----------|-------------|
| 快速创建层次 | `Ctrl+Alt+C` → 输入名称 → 设置父类 → `F5` 刷新 |
| 定义复杂类 | 选择类 → `本体 → 新建断言 → Manchester 语法` → 使用交集/并集/补集 |
| 一致性检查 | `Ctrl+Shift+R` → 查看报错 → 修改后 `Ctrl+Z` 撤销修改 |
| 分类本体 | `本体 → 分类本体` → 查看变化 → `F5` 刷新视图 |
| 搜索替换 | `Ctrl+F` → 输入搜索词 → `Ctrl+R` 替换确认 |

### 7.3 快捷键自定义

```
偏好设置(Preferences) → 常规(General) → 键盘(Keyboard Shortcuts)

可自定义的项目包括：
├── 菜单项快捷键
├── 工具按钮快捷键
├── 标签页切换快捷键
└── 自定义绑定
```

---

## 8. 常见操作面板

### 8.1 标签页视图 (Tabbed Pane View)

```
├── 类 (Class)
│   ├── IRI
│   ├── Annotations (注释)
│   ├── Axioms (公理)
│   │   ├── SubClassOf (子类比)
│   │   ├── EquivalentClasses (等价类)
│   │   ├── DisjointWith (不相交)
│   │   └── DisjointUnionOf (不相交并)
│   └── Instance of (实例类型)
├── 属性 (Property)
├── 个体 (Individual)
└── 注释属性 (Annotation Property)
```

### 8.2 Manchester 语法速查

在 Manchester 语法编辑器中使用的符号：

| 符号 | 含义 | 示例 |
|------|------|------|
| `and` | 交集 | `Person and Male` |
| `or` | 并集 | `Student or Teacher` |
| `not` | 补集 | `not Student` |
| `some` | 存在量词 | `hasParent some Person` |
| `all` | 全称量词 | `hasParent all Person` |
| `has_value` | 具有限制 | `hasAge has_value 30` |
| `exactly` | 精确基数 | `hasChild exactly 2 Person` |
| `at_least` | 至少基数 | `hasSkill at_least 3 Certification` |
| `at_most` | 至多基数 | `hasManager at_most 1` |