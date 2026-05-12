# 第9章 Protégé 入门

## 第4篇 练习：电影本体

### 创建包含类（电影、演员、导演）的完整本体

**练习步骤：**

1. **创建本体**：
   - 创建新本体 URI: `http://example.org/movie-ontology`

2. **定义类层次结构**：
   - Person (父类)
     - Actor (子类)
     - Director (子类)
     - Producer (子类)

3. **定义对象属性**：
   - actsIn (domain: Actor, range: Movie)
   - directed (domain: Director, range: Movie)
   - produced (domain: Producer, range: Movie)

4. **定义数据属性**：
   - releaseYear (domain: Movie, range: integer)
   - name (domain: Person, range: string)

### 添加类层次和属性约束

为上述属性和类添加适当的约束，如：
- `releaseYear` 的最大值为当前年份
- 每个电影至少有一个导演