# Ontology 学习教材

从 0 开始学习 Web Ontology 的系统教材，兼顾概念释义、运行原理、工具操作、练习实例。

## 项目简介

本项目是一套面向零基础学习者的系统性 Ontology（本体）学习教材，深入讲解 W3C 标准体系，包括 **RDF**、**RDFS**、**OWL 2**、**SPARQL** 和 **SHACL**，并涵盖 **SKOS** 词汇表。内容从哲学基础到实际建模，从理论原理到工具操作，帮助读者循序渐进地掌握本体工程的核心知识与实践技能，最终达到专家水平。

## 特性

- **系统全面**：23 章 + 6 个附录，覆盖本体工程的完整知识体系
- **标准导向**：严格遵循 W3C 标准（RDF 1.1、OWL 2、SPARQL 1.1、SHACL）
- **循序渐进**：从哲学基础到神经符号 AI，由浅入深
- **实践导向**：每章配备练习实例，使用 Protégé 等工具动手操作
- **开放开源**：采用 MIT 许可证，欢迎贡献与复用

## 技术栈

| 技术 | 说明 |
|------|------|
| [VitePress](https://vitepress.dev/) | 下一代轻量级 Vue 驱动的静态站点生成器 |
| [Markdown](https://markdown.com.cn/) | 内容编写格式 |
| [Node.js >= 18](https://nodejs.org/) | 运行时环境 |

## 快速开始

### 环境要求

- Node.js >= 18
- npm / pnpm / yarn（任选其一）

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 `http://localhost:5173` 即可预览站点。

### 构建站点

```bash
npm run build
```

构建输出位于 `.vitepress/dist/` 目录。

### 本地预览

```bash
npm run preview
```

## 目录结构

```
docs/
├── index.md                      # 首页
├── ch01-what-is-ontology/        # 第1章：什么是本体（4 篇）
├── ch02-philosophy-conceptualization/  # 第2章：概念化过程（3 篇）
├── ch03-core-concepts/           # 第3章：核心概念（3 篇）
├── ch04-rdf-data-model/          # 第4章：RDF 数据模型（4 篇）
├── ch05-rdf-syntax/              # 第5章：RDF 语法（4 篇）
├── ch06-rdfs-core/               # 第6章：RDFS 核心（4 篇）
├── ch07-skos-vocabulary/         # 第7章：SKOS 词汇表（4 篇）
├── ch08-owl2-overview/           # 第8章：OWL 2 概览（5 篇）
├── ch09-protoge-intro/           # 第9章：Protégé 入门（4 篇）
├── ch10-owl2-class-modeling/     # 第10章：OWL 2 类建模（5 篇）
├── ch11-owl2-property-axioms/    # 第11章：OWL 2 属性公理（4 篇）
├── ch12-owl2-data-constraints/   # 第12章：OWL 2 数据约束（4 篇）
├── ch13-sparql-query/            # 第13章：SPARQL 查询（4 篇）
├── ch14-shacl-validation/        # 第14章：SHACL 验证（4 篇）
├── ch15-reasoning-consistency/   # 第15章：推理与一致性（4 篇）
├── ch16-development-lifecycle/   # 第16章：开发生命周期（3 篇）
├── ch17-methodologies-comparison/ # 第17章：方法论比较（4 篇）
├── ch18-quality-assessment/      # 第18章：质量评估（3 篇）
├── ch19-mainstream-ontologies/   # 第19章：主流本体（3 篇）
├── ch20-application-scenarios/   # 第20章：应用场景（4 篇）
├── ch21-tool-ecosystem/          # 第21章：工具生态（4 篇）
├── ch22-ontology-alignment/      # 第22章：本体对齐（3 篇）
├── ch23-neuro-symbolic-ai/       # 第23章：神经符号 AI（4 篇）
├── appendix-a-owl2-reference/    # 附录 A：OWL 2 速查
├── appendix-b-protoge-shortcuts/ # 附录 B：Protégé 快捷键
├── appendix-c-repositories/      # 附录 C：本体仓库
├── appendix-d-rdf-syntax-comparison/ # 附录 D：RDF 语法比较
├── appendix-e-pizza-tutorial/    # 附录 E：PIZZA 教程
├── appendix-f-protege-resources/ # 附录 F：Protégé 资源
└── appendix-g-glossary/          # 附录 G：术语表
```

## 章节总览

| 章节号 | 章节名称 | 文章数 |
|:----:|:------|:----:|
| Ch01 | 什么是本体 | 4 |
| Ch02 | 概念化过程 | 3 |
| Ch03 | 核心概念 | 3 |
| Ch04 | RDF 数据模型 | 4 |
| Ch05 | RDF 语法 | 4 |
| Ch06 | RDFS 核心 | 4 |
| Ch07 | SKOS 词汇表 | 4 |
| Ch08 | OWL 2 概览 | 5 |
| Ch09 | Protégé 入门 | 4 |
| Ch10 | OWL 2 类建模 | 5 |
| Ch11 | OWL 2 属性公理 | 4 |
| Ch12 | OWL 2 数据约束 | 4 |
| Ch13 | SPARQL 查询 | 4 |
| Ch14 | SHACL 验证 | 4 |
| Ch15 | 推理与一致性 | 4 |
| Ch16 | 开发生命周期 | 3 |
| Ch17 | 方法论比较 | 4 |
| Ch18 | 质量评估 | 3 |
| Ch19 | 主流本体 | 3 |
| Ch20 | 应用场景 | 4 |
| Ch21 | 工具生态 | 4 |
| Ch22 | 本体对齐 | 3 |
| Ch23 | 神经符号 AI | 4 |
| App A | OWL 2 速查 | — |
| App B | Protégé 快捷键 | — |
| App C | 本体仓库 | — |
| App D | RDF 语法比较 | — |
| App E | PIZZA 教程 | — |
| App F | Protégé 资源 | — |
| App G | 术语表 | — |

> **总计**：23 章 89 篇 + 6 个附录

## 参考资料

- [W3C RDF 1.1](https://www.w3.org/TR/rdf11-mt/)
- [W3C RDF Schema 1.1](https://www.w3.org/TR/rdf-schema/)
- [W3C OWL 2 Web Ontology Language](https://www.w3.org/TR/owl2-overview/)
- [W3C SPARQL 1.1](https://www.w3.org/TR/sparql11-overview/)
- [W3C SHACL](https://www.w3.org/TR/shacl/)
- [W3C SKOS](https://www.w3.org/TR/skos-reference/)
- [CS520 Web Ontology Course](https://github.com/sta1129/cs520-web-ontology)
- [Ontology Engineering (Gómez-Pévez)](https://www.ia.uni-saarland.de/de/project_handbook/)
- [NeOn Methodology](https://www.neon-project.org/)
- [METHONTOLOGY](http://www.ifp.uni-stuttgart.de/arbiter/html/methontology.html)

## 许可证

[MIT License](./LICENSE)