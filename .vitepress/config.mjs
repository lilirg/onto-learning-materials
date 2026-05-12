import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'Ontology 学习教材',
  description: '《本体论与语义网》课程教材 - 涵盖本体论理论基础、RDF/RDFS/SKOS 语义网标准、OWL 2 本体建模语言，以及推理验证、工程方法与应用实践等核心内容。',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '导论',
        items: [
          { text: '第1章 什么是本体', link: '/ch01-what-is-ontology/01-overview' },
          { text: '第2章 概念化过程', link: '/ch02-philosophy-conceptualization/01-philosophical-roots' },
          { text: '第3章 核心概念', link: '/ch03-core-concepts/01-elements' },
        ]
      },
      {
        text: 'RDFS 与 SKOS',
        items: [
          { text: '第4章 RDF 数据模型', link: '/ch04-rdf-data-model/01-rdf-introduction' },
          { text: '第5章 RDF 语法', link: '/ch05-rdf-syntax/01-serialization-overview' },
          { text: '第6章 RDFS 核心', link: '/ch06-rdfs-core/01-rdf-vocabulary' },
          { text: '第7章 SKOS 词汇表', link: '/ch07-skos-vocabulary/01-skos-introduction' },
        ]
      },
      {
        text: 'OWL 2',
        items: [
          { text: '第8章 OWL 2 概览', link: '/ch08-owl2-overview/01-why-owl2' },
          { text: '第9章 Protégé 入门', link: '/ch09-protoge-intro/01-protoge-introduction' },
          { text: '第10章 OWL 2 类建模', link: '/ch10-owl2-class-modeling/01-class-expressions' },
          { text: '第11章 OWL 2 属性公理', link: '/ch11-owl2-property-axioms/01-object-data-properties' },
          { text: '第12章 OWL 2 数据约束', link: '/ch12-owl2-data-constraints/01-cardinality-constraints' },
        ]
      },
      {
        text: '推理与验证',
        items: [
          { text: '第13章 SPARQL 查询', link: '/ch13-sparql-query/01-sparql-introduction' },
          { text: '第14章 SHACL 验证', link: '/ch14-shacl-validation/01-shacl-introduction' },
          { text: '第15章 推理与一致性', link: '/ch15-reasoning-consistency/01-reasoning-basics' },
        ]
      },
      {
        text: '方法论',
        items: [
          { text: '第16章 开发生命周期', link: '/ch16-development-lifecycle/01-lifecycle-phases' },
          { text: '第17章 方法论比较', link: '/ch17-methodologies-comparison/01-methontology' },
          { text: '第18章 质量评估', link: '/ch18-quality-assessment/01-evaluation-dimensions' },
        ]
      },
      {
        text: '应用与工具',
        items: [
          { text: '第19章 主流本体', link: '/ch19-mainstream-ontologies/01-upper-ontologies' },
          { text: '第20章 应用场景', link: '/ch20-application-scenarios/01-biomedicine' },
          { text: '第21章 工具生态', link: '/ch21-tool-ecosystem/01-editors' },
        ]
      },
      {
        text: '高级专题',
        items: [
          { text: '第22章 本体对齐', link: '/ch22-ontology-alignment/01-concepts' },
          { text: '第23章 神经符号 AI', link: '/ch23-neuro-symbolic-ai/01-symbolic-Neuro-comparison' },
        ]
      },
      {
        text: '附录',
        items: [
          { text: '附录 A: OWL 2 速查', link: '/appendix-a-owl2-reference/index' },
          { text: '附录 B: Protégé 快捷键', link: '/appendix-b-protoge-shortcuts/index' },
          { text: '附录 C: 本体仓库', link: '/appendix-c-repositories/index' },
          { text: '附录 D: RDF 语法比较', link: '/appendix-d-rdf-syntax-comparison/index' },
          { text: '附录 E: PIZZA 教程', link: '/appendix-e-pizza-tutorial/index' },
          { text: '附录 F: Protégé 资源', link: '/appendix-f-protege-resources/index' },
          { text: '附录 G: 术语表', link: '/appendix-g-glossary/index' },
        ]
      },
    ],
    sidebar: {
      '/': [
        // 模块一：理论基础与导论
        {
          text: '模块一 理论基础与导论',
          collapsed: false,
          items: [
            { text: '第1章 什么是本体', link: '/ch01-what-is-ontology/01-overview' },
            { text: '第2章 概念化过程', link: '/ch02-philosophy-conceptualization/01-philosophical-roots' },
            { text: '第3章 核心概念', link: '/ch03-core-concepts/01-elements' },
          ]
        },
        // 模块二：RDF 基础
        {
          text: '模块二 RDF 基础',
          collapsed: false,
          items: [
            { text: '第4章 RDF 数据模型', link: '/ch04-rdf-data-model/01-rdf-introduction' },
            { text: '第5章 RDF 语法', link: '/ch05-rdf-syntax/01-serialization-overview' },
          ]
        },
        // 模块三：RDFS 与 SKOS
        {
          text: '模块三 RDFS 与 SKOS',
          collapsed: false,
          items: [
            { text: '第6章 RDFS 核心', link: '/ch06-rdfs-core/01-rdf-vocabulary' },
            { text: '第7章 SKOS 词汇表', link: '/ch07-skos-vocabulary/01-skos-introduction' },
          ]
        },
        // 模块四：OWL 2 核心
        {
          text: '模块四 OWL 2 核心',
          collapsed: false,
          items: [
            { text: '第8章 OWL 2 概览', link: '/ch08-owl2-overview/01-why-owl2' },
            { text: '第9章 Protégé 入门', link: '/ch09-protoge-intro/01-protoge-introduction' },
            { text: '第10章 类建模', link: '/ch10-owl2-class-modeling/01-class-expressions' },
            { text: '第11章 属性公理', link: '/ch11-owl2-property-axioms/01-object-data-properties' },
            { text: '第12章 数据约束', link: '/ch12-owl2-data-constraints/01-cardinality-constraints' },
          ]
        },
        // 模块五：推理与验证
        {
          text: '模块五 推理与验证',
          collapsed: false,
          items: [
            { text: '第13章 SPARQL 查询', link: '/ch13-sparql-query/01-sparql-introduction' },
            { text: '第14章 SHACL 验证', link: '/ch14-shacl-validation/01-shacl-introduction' },
            { text: '第15章 推理与一致性', link: '/ch15-reasoning-consistency/01-reasoning-basics' },
          ]
        },
        // 模块六：本体工程
        {
          text: '模块六 本体工程方法论',
          collapsed: false,
          items: [
            { text: '第16章 开发生命周期', link: '/ch16-development-lifecycle/01-lifecycle-phases' },
            { text: '第17章 方法论比较', link: '/ch17-methodologies-comparison/01-methontology' },
            { text: '第18章 质量评估', link: '/ch18-quality-assessment/01-evaluation-dimensions' },
          ]
        },
        // 模块七：应用与工具
        {
          text: '模块七 应用与工具生态',
          collapsed: false,
          items: [
            { text: '第19章 主流本体', link: '/ch19-mainstream-ontologies/01-upper-ontologies' },
            { text: '第20章 应用场景', link: '/ch20-application-scenarios/01-biomedicine' },
            { text: '第21章 工具生态', link: '/ch21-tool-ecosystem/01-editors' },
          ]
        },
        // 模块八：高级专题
        {
          text: '模块八 高级专题',
          collapsed: false,
          items: [
            { text: '第22章 本体对齐', link: '/ch22-ontology-alignment/01-concepts' },
            { text: '第23章 神经符号 AI', link: '/ch23-neuro-symbolic-ai/01-symbolic-Neuro-comparison' },
          ]
        },
        // 附录
        {
          text: '附录',
          collapsed: false,
          items: [
            { text: '附录 A: OWL 2 速查', link: '/appendix-a-owl2-reference/index' },
            { text: '附录 B: Protégé 快捷键', link: '/appendix-b-protoge-shortcuts/index' },
          ]
        },
      ],
    },
  },
})