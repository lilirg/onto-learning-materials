---
layout: home

hero:
  name: 本体论与语义网
  text: 系统教材
  tagline: 从哲学基础到神经符号 AI，系统掌握 W3C 语义网标准技术栈
  actions:
    - theme: brand
      text: 开始学习
      link: /ch01-what-is-ontology/01-overview
    - theme: alt
      text: 知识体系图
      link: '#modules'
    - theme: alt
      text: 查看 GitHub
      link: https://github.com/lilirg/onto-learning-materials

features:
  - icon: 📚
    title: 完整知识体系
    details: 23 章核心内容 + 7 个附录，从理论基础到前沿应用全覆盖
  - icon: 🏛️
    title: W3C 标准
    details: 严格遵循 RDF 1.1、OWL 2、SPARQL 1.1、SHACL 等 W3C 推荐标准
  - icon: 🛠️
    title: 实践导向
    details: Protégé 工具实操，每章配备练习实例与真实案例
  - icon: 🔍
    title: 推理与验证
    details: 深入理解描述逻辑、推理机与一致性检查机制
---

<div id="modules"></div>

<div class="intro-banner">
  <h2 class="section-title">课程概览</h2>
  <p class="section-desc">本课程是一套面向零基础学习者的系统性本体工程教材，深入讲解 W3C 语义网标准体系。内容从哲学基础出发，逐步深入到实际建模，涵盖理论知识、工具操作与实践练习。</p>
</div>

<div class="stats-grid">
  <div class="stat-card" style="--stat-color: #1976d2;">
    <div class="stat-icon">📕</div>
    <div class="stat-value">23</div>
    <div class="stat-label">核心章节</div>
  </div>
  <div class="stat-card" style="--stat-color: #2e7d32;">
    <div class="stat-icon">📦</div>
    <div class="stat-value">8</div>
    <div class="stat-label">知识模块</div>
  </div>
  <div class="stat-card" style="--stat-color: #f57c00;">
    <div class="stat-icon">✅</div>
    <div class="stat-value">5</div>
    <div class="stat-label">W3C 标准</div>
  </div>
  <div class="stat-card" style="--stat-color: #7b1fa2;">
    <div class="stat-icon">🎓</div>
    <div class="stat-value">∞</div>
    <div class="stat-label">实践价值</div>
  </div>
</div>

<div class="quick-start">
  <h2 class="section-title">🚀 快速开始</h2>
  <div class="quick-grid">
    <a href="/ch01-what-is-ontology/01-overview" class="quick-card">
      <span class="quick-number">01</span>
      <h3>理论基石</h3>
      <p>从哲学基础到本体概念，建立系统性认知</p>
    </a>
    <a href="/ch04-rdf-data-model/01-rdf-introduction" class="quick-card">
      <span class="quick-number">02</span>
      <h3>RDF 数据模型</h3>
      <p>掌握语义网的数据基石，理解三元组结构</p>
    </a>
    <a href="/ch08-owl2-overview/01-why-owl2" class="quick-card">
      <span class="quick-number">03</span>
      <h3>OWL 2 核心</h3>
      <p>深入学习描述逻辑与本体建模语言</p>
    </a>
    <a href="/ch13-sparql-query/01-sparql-introduction" class="quick-card">
      <span class="quick-number">04</span>
      <h3>查询与推理</h3>
      <p>掌握 SPARQL 查询与推理验证技术</p>
    </a>
  </div>
</div>

<div class="course-map">
  <h2 class="section-title">📐 知识体系地图</h2>

  ```mermaid
  graph LR
      A[模块一：理论基石<br/>哲学 · 概念 · 本体类型] --> B[模块二：RDF 数据模型<br/>三元组 · 资源 · 命名空间]
      B --> C[模块三：RDFS & SKOS<br/>分类 · 词汇 · 层次]
      C --> D[模块四：OWL 2 核心<br/>描述逻辑 · 公理 · 约束]
      D --> E[模块五：推理与验证<br/>SPARQL 查询 · SHACL · 推理]
      E --> F[模块六：工程方法<br/>生命周期 · 方法论 · 质量]
      F --> G[模块七：应用生态<br/>顶层本体 · 场景 · 工具]
      G --> H[模块八：专家进阶<br/>本体对齐 · 神经符号 AI]

      style A fill:#e3f2fd,color:#000
      style B fill:#e8f5e9,color:#000
      style C fill:#fff3e0,color:#000
      style D fill:#f3e5f5,color:#000
      style E fill:#e0f2f1,color:#000
      style F fill:#fce4ec,color:#000
      style G fill:#fff8e1,color:#000
      style H fill:#efebe9,color:#000
  ```
</div>

<div class="module-sections">
  <h2 class="section-title">📖 课程模块</h2>

  <div class="module-grid">
  <div class="module-card">
  <div class="module-badge">模块 01</div>
  <h3 class="module-title">理论与哲学基础</h3>
  <div class="module-icon">🧠</div>
  <p class="module-desc">理解"什么是知识"和"如何对世界进行分类"，奠定本体工程的思想根基。</p>
  <div class="module-links">
  <a href="/ch01-what-is-ontology/01-overview">第 1 章：什么是本体</a>
  <a href="/ch02-philosophy-conceptualization/01-philosophical-roots">第 2 章：哲学渊源</a>
  <a href="/ch03-core-concepts/01-elements">第 3 章：核心概念</a>
  </div>
  </div>

  <div class="module-card">
  <div class="module-badge">模块 02</div>
  <h3 class="module-title">RDF 数据模型</h3>
  <div class="module-icon">🔗</div>
  <p class="module-desc">RDF 是语义网的数据基石，系统讲解如何描述和建模知识。</p>
  <div class="module-links">
  <a href="/ch04-rdf-data-model/01-rdf-introduction">第 4 章：RDF 数据模型</a>
  <a href="/ch05-rdf-syntax/01-serialization-overview">第 5 章：RDF 语法格式</a>
  </div>
  </div>

  <div class="module-card">
  <div class="module-badge">模块 03</div>
  <h3 class="module-title">RDFS 与 SKOS</h3>
  <div class="module-icon">📋</div>
  <p class="module-desc">在 RDF 基础上构建层次和词汇体系，掌握分类与标签管理。</p>
  <div class="module-links">
  <a href="/ch06-rdfs-core/01-rdf-vocabulary">第 6 章：RDFS 核心概念</a>
  <a href="/ch07-skos-vocabulary/01-skos-introduction">第 7 章：SKOS 词汇构造</a>
  </div>
  </div>

  <div class="module-card module-card-highlight">
  <div class="module-badge highlight">模块 04</div>
  <h3 class="module-title">OWL 2 核心</h3>
  <div class="module-icon">🏗️</div>
  <p class="module-desc">OWL 2 是最强大的语义网本体语言。深入描述逻辑、公理系统与建模技巧。</p>
  <div class="module-links">
  <a href="/ch08-owl2-overview/01-why-owl2">第 8 章：OWL 2 概述</a>
  <a href="/ch09-protoge-intro/01-protoge-introduction">第 9 章：Protégé 入门</a>
  <a href="/ch10-owl2-class-modeling/01-class-expressions">第 10 章：类建模</a>
  <a href="/ch11-owl2-property-axioms/01-object-data-properties">第 11 章：属性公理</a>
  <a href="/ch12-owl2-data-constraints/01-cardinality-constraints">第 12 章：数据约束</a>
  </div>
  </div>

  <div class="module-card">
  <div class="module-badge">模块 05</div>
  <h3 class="module-title">推理与验证</h3>
  <div class="module-icon">🔎</div>
  <p class="module-desc">学习查询语言和验证机制，提取及确保知识质量。</p>
  <div class="module-links">
  <a href="/ch13-sparql-query/01-sparql-introduction">第 13 章：SPARQL 查询</a>
  <a href="/ch14-shacl-validation/01-shacl-introduction">第 14 章：SHACL 验证</a>
  <a href="/ch15-reasoning-consistency/01-reasoning-basics">第 15 章：推理与一致性</a>
  </div>
  </div>

  <div class="module-card">
  <div class="module-badge">模块 06</div>
  <h3 class="module-title">本体工程方法</h3>
  <div class="module-icon">⚙️</div>
  <p class="module-desc">关注本体开发的工程化方法论、质量保障与实践流程。</p>
  <div class="module-links">
  <a href="/ch16-development-lifecycle/01-lifecycle-phases">第 16 章：开发生命周期</a>
  <a href="/ch17-methodologies-comparison/01-methontology">第 17 章：方法论</a>
  <a href="/ch18-quality-assessment/01-evaluation-dimensions">第 18 章：质量评估</a>
  </div>
  </div>

  <div class="module-card">
  <div class="module-badge">模块 07</div>
  <h3 class="module-title">应用与工具生态</h3>
  <div class="module-icon">🌐</div>
  <p class="module-desc">了解本体在实际领域中的应用实践以及工具全景。</p>
  <div class="module-links">
  <a href="/ch19-mainstream-ontologies/01-upper-ontologies">第 19 章：主流本体</a>
  <a href="/ch20-application-scenarios/01-biomedicine">第 20 章：应用场景</a>
  <a href="/ch21-tool-ecosystem/01-editors">第 21 章：工具生态</a>
  </div>
  </div>

  <div class="module-card module-card-elec">
  <div class="module-badge elective">模块 08 <span class="elective-tag">选学</span></div>
  <h3 class="module-title">专家进阶</h3>
  <div class="module-icon">🚀</div>
  <p class="module-desc">深入学习本体对齐、融合及神经符号 AI 前沿话题。</p>
  <div class="module-links">
  <a href="/ch22-ontology-alignment/01-concepts">第 22 章：本体对齐</a>
  <a href="/ch23-neuro-symbolic-ai/01-symbolic-Neuro-comparison">第 23 章：神经符号 AI</a>
  </div>
  </div>
  </div>
</div>

<div class="appendix-section">
  <h2 class="section-title">📎 附录资源</h2>

  <div class="appendix-grid">
  <div class="appendix-card">
  <h4>附录 A</h4>
  <p>OWL 2 属性速查表</p>
  <a href="/appendix-a-owl2-reference">查看 →</a>
  </div>
  <div class="appendix-card">
  <h4>附录 B</h4>
  <p>Protégé 常用快捷键</p>
  <a href="/appendix-b-protoge-shortcuts">查看 →</a>
  </div>
  <div class="appendix-card">
  <h4>附录 C</h4>
  <p>常用本体仓库</p>
  <a href="/appendix-c-repositories">查看 →</a>
  </div>
  <div class="appendix-card">
  <h4>附录 D</h4>
  <p>RDF/XML 与 Turtle 对照</p>
  <a href="/appendix-d-rdf-syntax-comparison">查看 →</a>
  </div>
  <div class="appendix-card">
  <h4>附录 E</h4>
  <p>Pizza Ontology 教程</p>
  <a href="/appendix-e-pizza-tutorial">查看 →</a>
  </div>
  <div class="appendix-card">
  <h4>附录 F</h4>
  <p>Protégé 资源索引</p>
  <a href="/appendix-f-protege-resources">查看 →</a>
  </div>
  <div class="appendix-card">
  <h4>附录 G</h4>
  <p>术语中英对照表</p>
  <a href="/appendix-g-glossary">查看 →</a>
  </div>
  </div>
</div>

<div class="learning-paths">
  <h2 class="section-title">🎯 学习路径建议</h2>

  <div class="path-cards">
  <div class="path-card">
  <div class="path-icon">🎓</div>
  <h4>完整系统学习</h4>
  <p>模块一 → 二 → 三 → 四 → 五 → 六</p>
  </div>
  <div class="path-card">
  <div class="path-icon">🚀</div>
  <h4>快速上手建模</h4>
  <p>模块二 → 四 (Ch8~Ch12) → Protégé 实践</p>
  </div>
  <div class="path-card">
  <div class="path-icon">🔍</div>
  <h4>查询与分析</h4>
  <p>模块五 (SPARQL + SHACL)</p>
  </div>
  <div class="path-card">
  <div class="path-icon">🌟</div>
  <h4>进阶研究</h4>
  <p>模块七 → 模块八（选学）</p>
  </div>
  </div>
</div>

<div class="tools-section">
  <h2 class="section-title">🛠️ 推荐工具</h2>

  <div class="tools-grid">
  <a href="https://protege.stanford.edu/" target="_blank" rel="noopener" class="tool-card">
  <div class="tool-icon">🎭</div>
  <div class="tool-info">
  <h4>Protégé</h4>
  <p>斯坦福大学开发的开源本体编辑器</p>
  </div>
  </a>
  <a href="https://ide.zazuko.com/" target="_blank" rel="noopener" class="tool-card">
  <div class="tool-icon">✨</div>
  <div class="tool-info">
  <h4>Zazuko IDE</h4>
  <p>在线 RDF/SPARQL 编写与验证工具</p>
  </div>
  </a>
  <a href="https://dbpedia.org/sparql" target="_blank" rel="noopener" class="tool-card">
  <div class="tool-icon">📊</div>
  <div class="tool-info">
  <h4>DBpedia Endpoint</h4>
  <p>现实世界知识图谱 SPARQL 查询实践</p>
  </div>
  </a>
  <a href="https://www.w3.org/standards/semanticweb/" target="_blank" rel="noopener" class="tool-card">
  <div class="tool-icon">🏛️</div>
  <div class="tool-info">
  <h4>W3C 标准</h4>
  <p>语义网官方技术规范文档</p>
  </div>
  </a>
  </div>
</div>

<style scoped>
#modules {
  scroll-margin-top: 100px;
}

/* 通用样式 */
.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 3rem 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--vp-c-divider);
  text-align: center;
}

.section-desc {
  text-align: center;
  color: var(--vp-c-text-2);
  max-width: 720px;
  margin: -1rem auto 2rem;
  line-height: 1.7;
  font-size: 1rem;
}

/* Hero 优化 */
.VPHero .container {
  max-width: 900px;
}
.VPHero .main {
  padding-top: 1.5rem;
}

/* 统计网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin: 2.5rem 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.stat-card {
  text-align: center;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.25s ease;
}

.stat-card:hover {
  border-color: var(--stat-color);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--stat-color);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

/* 快速开始 */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0;
}

.quick-card {
  display: block;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.quick-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.quick-card:hover::before {
  transform: scaleX(1);
}

.quick-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.quick-number {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  opacity: 0.15;
}

.quick-card h3 {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
}

.quick-card p {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

/* 课程地图 */
.course-map {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid var(--vp-c-divider);
}

/* 模块网格 */
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0;
}

.module-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.module-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.module-card-highlight {
  border-color: var(--vp-c-brand-soft);
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.05), rgba(13, 71, 161, 0.05));
}

.module-card-highlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
}

.module-card-elec {
  border-style: dashed;
  border-color: var(--vp-c-tip-soft);
}

.module-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  width: fit-content;
}

.module-badge.highlight {
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.1), rgba(13, 71, 161, 0.1));
}

.module-badge.elective {
  background: var(--vp-c-tip-soft);
  color: var(--vp-c-tip-1);
}

.elective-tag {
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
  border-radius: 12px;
  background: var(--vp-c-tip-media);
  color: var(--vp-c-tip-1);
  font-weight: 500;
  margin-left: 0.25rem;
}

.module-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.module-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  opacity: 0.3;
}

.module-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.module-links {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.module-links a {
  font-size: 0.8125rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
}

.module-links a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

/* 附录部分 */
.appendix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.appendix-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
  transition: all 0.25s ease;
}

.appendix-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.appendix-card h4 {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.appendix-card p {
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem;
}

.appendix-card a {
  font-size: 0.8125rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.appendix-card a:hover {
  text-decoration: underline;
}

/* 学习路径 */
.path-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0;
}

.path-card {
  text-align: center;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.25s ease;
}

.path-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-4px);
}

.path-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.path-card h4 {
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
}

.path-card p {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 工具部分 */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0;
}

.tool-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
}

.tool-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.tool-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.tool-info h4 {
  font-size: 0.9375rem;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
}

.tool-info p {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .module-grid {
    grid-template-columns: 1fr;
  }
  
  .tools-grid,
  .path-cards,
  .quick-grid {
    grid-template-columns: 1fr;
  }
  
  .appendix-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .appendix-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .VPHero .container {
    padding: 0 1rem;
  }
}
</style>
