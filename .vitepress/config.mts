import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid({
  title: '本体论与语义网',
  description: '从 0 开始学习 Web Ontology 的系统教材，涵盖 RDF、RDFS、OWL 2、SPARQL、SHACL 等 W3C 标准',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  base: '/onto-learning-materials/',
  srcDir: 'docs',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'keywords', content: '本体论,ontology,RDF,OWL,SPARQL,SHACL,知识图谱,语义网,W3C,Protégé' }],
    ['meta', { name: 'author', content: 'Ontology Learning Materials Contributors' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'og:image', content: '/logo.svg' }],
  ],
  markdown: {
    config: (md) => {
      // 允许图片相对路径
    },
  },
  themeConfig: {
    outline: {
      level: [2, 3],
      label: '页面大纲',
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lilirg/onto-learning-materials' },
    ],
    nav: [
      { text: '首页', link: '/' },
      {
        text: '知识基础',
        activeMatch: '^/ch0[1-7]-',
        items: [
          { text: '第 1 章：什么是本体', link: '/ch01-what-is-ontology/01-overview' },
          { text: '第 2 章：哲学渊源与概念化', link: '/ch02-philosophy-conceptualization/01-philosophical-roots' },
          { text: '第 3 章：核心概念', link: '/ch03-core-concepts/01-elements' },
          { text: '第 4 章：RDF 数据模型', link: '/ch04-rdf-data-model/01-rdf-introduction' },
          { text: '第 5 章：RDF 语法格式', link: '/ch05-rdf-syntax/01-serialization-overview' },
          { text: '第 6 章：RDFS 核心概念', link: '/ch06-rdfs-core/01-rdf-vocabulary' },
          { text: '第 7 章：SKOS 词汇构造', link: '/ch07-skos-vocabulary/01-skos-introduction' },
        ],
      },
      {
        text: '本体核心',
        activeMatch: '^/ch0[8-9]-|^/ch1[0-5]-',
        items: [
          { text: '第 8 章：OWL 2 概述', link: '/ch08-owl2-overview/01-why-owl2' },
          { text: '第 9 章：Protégé 入门', link: '/ch09-protoge-intro/01-protoge-introduction' },
          { text: '第 10 章：OWL 2 类建模', link: '/ch10-owl2-class-modeling/01-class-expressions' },
          { text: '第 11 章：OWL 2 属性公理', link: '/ch11-owl2-property-axioms/01-object-data-properties' },
          { text: '第 12 章：OWL 2 数据约束', link: '/ch12-owl2-data-constraints/01-cardinality-constraints' },
          { text: '第 13 章：SPARQL 查询语言', link: '/ch13-sparql-query/01-sparql-introduction' },
          { text: '第 14 章：SHACL 约束验证', link: '/ch14-shacl-validation/01-shacl-introduction' },
          { text: '第 15 章：OWL 推理与一致性', link: '/ch15-reasoning-consistency/01-reasoning-basics' },
        ],
      },
      {
        text: '工程与应用',
        activeMatch: '^/ch1[6-9]-|^/ch2[0-3]-',
        items: [
          { text: '第 16 章：本体开发生命周期', link: '/ch16-development-lifecycle/01-lifecycle-phases' },
          { text: '第 17 章：主流方法论', link: '/ch17-methodologies-comparison/01-methontology' },
          { text: '第 18 章：本体质量评估', link: '/ch18-quality-assessment/01-evaluation-dimensions' },
          { text: '第 19 章：主流本体赏析', link: '/ch19-mainstream-ontologies/01-upper-ontologies' },
          { text: '第 20 章：典型应用场景', link: '/ch20-application-scenarios/01-biomedicine' },
          { text: '第 21 章：工具生态全景', link: '/ch21-tool-ecosystem/01-editors' },
          { text: '第 22 章：本体对齐与融合', link: '/ch22-ontology-alignment/01-concepts' },
          { text: '第 23 章：神经符号融合与 AI', link: '/ch23-neuro-symbolic-ai/01-symbolic-Neuro-comparison' },
        ],
      },
      {
        text: '附录',
        activeMatch: '^/appendix',
        items: [
          { text: '附录 A：OWL 2 速查表', link: '/appendix-a-owl2-reference' },
          { text: '附录 B：Protégé 快捷键', link: '/appendix-b-protoge-shortcuts' },
          { text: '附录 C：本体仓库', link: '/appendix-c-repositories' },
          { text: '附录 D：RDF 语法对照', link: '/appendix-d-rdf-syntax-comparison' },
          { text: '附录 E：Pizza 教程指引', link: '/appendix-e-pizza-tutorial' },
          { text: '附录 F：Protégé 资源索引', link: '/appendix-f-protege-resources' },
          { text: '附录 G：术语中英对照表', link: '/appendix-g-glossary' },
        ],
      },
      {
        text: '资源',
        items: [
          { text: 'W3C 标准', link: 'https://www.w3.org/standards/semanticweb/' },
          { text: 'Protégé', link: 'https://protege.stanford.edu/' },
          { text: 'OWL 2 规范', link: 'https://www.w3.org/TR/owl2-overview/' },
        ],
      },
    ],
    sidebar: {
      '/ch01-what-is-ontology/': [
        {
          text: '第 1 章 什么是本体',
          collapsed: false,
          items: [
            { text: '1.1 概述', link: '/ch01-what-is-ontology/01-overview' },
            { text: '1.2 定义与概念', link: '/ch01-what-is-ontology/02-definition' },
            { text: '1.3 本体与其他概念对比', link: '/ch01-what-is-ontology/03-ontology-vs' },
            { text: '1.4 应用场景', link: '/ch01-what-is-ontology/04-applications' },
          ],
        },
      ],
      '/ch02-philosophy-conceptualization/': [
        {
          text: '第 2 章 哲学渊源与概念化',
          collapsed: false,
          items: [
            { text: '2.1 哲学根源', link: '/ch02-philosophy-conceptualization/01-philosophical-roots' },
            { text: '2.2 概念化过程', link: '/ch02-philosophy-conceptualization/02-conceptualization' },
            { text: '2.3 练习', link: '/ch02-philosophy-conceptualization/03-exercises' },
          ],
        },
      ],
      '/ch03-core-concepts/': [
        {
          text: '第 3 章 核心概念',
          collapsed: false,
          items: [
            { text: '3.1 基本元素', link: '/ch03-core-concepts/01-elements' },
            { text: '3.2 本体类型', link: '/ch03-core-concepts/02-ontology-types' },
            { text: '3.3 对比与练习', link: '/ch03-core-concepts/03-comparison-exercise' },
          ],
        },
      ],
      '/ch04-rdf-data-model/': [
        {
          text: '第 4 章 RDF 数据模型',
          collapsed: false,
          items: [
            { text: '4.1 RDF 简介', link: '/ch04-rdf-data-model/01-rdf-introduction' },
            { text: '4.2 资源与语句', link: '/ch04-rdf-data-model/02-resources-statements' },
            { text: '4.3 RDF 1.1 标准', link: '/ch04-rdf-data-model/03-rdf11-standard' },
            { text: '4.4 实践：编辑器练习', link: '/ch04-rdf-data-model/04-practice-editor' },
          ],
        },
      ],
      '/ch05-rdf-syntax/': [
        {
          text: '第 5 章 RDF 语法格式',
          collapsed: false,
          items: [
            { text: '5.1 序列化概述', link: '/ch05-rdf-syntax/01-serialization-overview' },
            { text: '5.2 Turtle 语法', link: '/ch05-rdf-syntax/02-turtle-syntax' },
            { text: '5.3 N-Quads 与 JSON-LD', link: '/ch05-rdf-syntax/03-n-quads-jsonld' },
            { text: '5.4 验证与练习', link: '/ch05-rdf-syntax/04-validation-exercise' },
          ],
        },
      ],
      '/ch06-rdfs-core/': [
        {
          text: '第 6 章 RDFS 核心概念',
          collapsed: false,
          items: [
            { text: '6.1 RDF 词汇表', link: '/ch06-rdfs-core/01-rdf-vocabulary' },
            { text: '6.2 子类与子属性', link: '/ch06-rdfs-core/02-subclass-subproperty' },
            { text: '6.3 域与范围', link: '/ch06-rdfs-core/03-domain-range' },
            { text: '6.4 RDFS 局限性', link: '/ch06-rdfs-core/04-rdfs-limits' },
          ],
        },
      ],
      '/ch07-skos-vocabulary/': [
        {
          text: '第 7 章 SKOS 词汇构造',
          collapsed: false,
          items: [
            { text: '7.1 SKOS 简介', link: '/ch07-skos-vocabulary/01-skos-introduction' },
            { text: '7.2 概念体系', link: '/ch07-skos-vocabulary/02-concept-schemes' },
            { text: '7.3 标签与关系', link: '/ch07-skos-vocabulary/03-labels-relations' },
            { text: '7.4 主题词表练习', link: '/ch07-skos-vocabulary/04-exercise-topic-thesaurus' },
          ],
        },
      ],
      '/ch08-owl2-overview/': [
        {
          text: '第 8 章 OWL 2 概述',
          collapsed: false,
          items: [
            { text: '8.1 为什么需要 OWL 2', link: '/ch08-owl2-overview/01-why-owl2' },
            { text: '8.2 OWL 2 概要', link: '/ch08-owl2-overview/02-owl2-profiles' },
            { text: '8.3 描述逻辑', link: '/ch08-owl2-overview/03-description-logic' },
            { text: '8.4 OWA/CWA/TBox/ABox', link: '/ch08-owl2-overview/04-owa-cwa-tbox-abox' },
            { text: '8.5 OWL 2 新功能', link: '/ch08-owl2-overview/05-owl2-new-features' },
          ],
        },
      ],
      '/ch09-protoge-intro/': [
        {
          text: '第 9 章 Protégé 入门',
          collapsed: false,
          items: [
            { text: '9.1 Protégé 简介', link: '/ch09-protoge-intro/01-protoge-introduction' },
            { text: '9.2 安装与创建', link: '/ch09-protoge-intro/02-installation-creation' },
            { text: '9.3 类与属性', link: '/ch09-protoge-intro/03-classes-properties' },
            { text: '9.4 电影本体练习', link: '/ch09-protoge-intro/04-exercise-movie-ontology' },
          ],
        },
      ],
      '/ch10-owl2-class-modeling/': [
        {
          text: '第 10 章 OWL 2 类建模',
          collapsed: false,
          items: [
            { text: '10.1 类表达式', link: '/ch10-owl2-class-modeling/01-class-expressions' },
            { text: '10.2 等价与不相交', link: '/ch10-owl2-class-modeling/02-equivalent-disjoint' },
            { text: '10.3 集合运算', link: '/ch10-owl2-class-modeling/03-set-operations' },
            { text: '10.4 练习', link: '/ch10-owl2-class-modeling/04-protoge-exercise' },
            { text: '10.5 推理：类与类表达式', link: '/ch10-owl2-class-modeling/05-reasoning-class-person' },
          ],
        },
      ],
      '/ch11-owl2-property-axioms/': [
        {
          text: '第 11 章 OWL 2 属性公理',
          collapsed: false,
          items: [
            { text: '11.1 对象属性与数据属性', link: '/ch11-owl2-property-axioms/01-object-data-properties' },
            { text: '11.2 属性特性', link: '/ch11-owl2-property-axioms/02-property-features' },
            { text: '11.3 属性层次与链', link: '/ch11-owl2-property-axioms/03-property-hierarchy-chain' },
            { text: '11.4 属性公理练习', link: '/ch11-owl2-property-axioms/04-exercise-property-axioms' },
          ],
        },
      ],
      '/ch12-owl2-data-constraints/': [
        {
          text: '第 12 章 OWL 2 数据约束',
          collapsed: false,
          items: [
            { text: '12.1 基数约束', link: '/ch12-owl2-data-constraints/01-cardinality-constraints' },
            { text: '12.2 值约束', link: '/ch12-owl2-data-constraints/02-value-constraints' },
            { text: '12.3 数据类型约束', link: '/ch12-owl2-data-constraints/03-datatype-constraints' },
            { text: '12.4 综合练习', link: '/ch12-owl2-data-constraints/04-comprehensive-exercise' },
          ],
        },
      ],
      '/ch13-sparql-query/': [
        {
          text: '第 13 章 SPARQL 查询语言',
          collapsed: false,
          items: [
            { text: '13.1 SPARQL 简介', link: '/ch13-sparql-query/01-sparql-introduction' },
            { text: '13.2 基本图模式', link: '/ch13-sparql-query/02-basic-graph-patterns' },
            { text: '13.3 高级特性', link: '/ch13-sparql-query/03-advanced-features' },
            { text: '13.4 实践：DBpedia 查询', link: '/ch13-sparql-query/04-practice-dbpedia-sesame' },
          ],
        },
      ],
      '/ch14-shacl-validation/': [
        {
          text: '第 14 章 SHACL 约束验证',
          collapsed: false,
          items: [
            { text: '14.1 SHACL 简介', link: '/ch14-shacl-validation/01-shacl-introduction' },
            { text: '14.2 形状定义', link: '/ch14-shacl-validation/02-shape-definition' },
            { text: '14.3 复杂规则', link: '/ch14-shacl-validation/03-complex-rules' },
            { text: '14.4 Protégé + Jena 练习', link: '/ch14-shacl-validation/04-protoge-jena-exercise' },
          ],
        },
      ],
      '/ch15-reasoning-consistency/': [
        {
          text: '第 15 章 OWL 推理与一致性',
          collapsed: false,
          items: [
            { text: '15.1 推理基础', link: '/ch15-reasoning-consistency/01-reasoning-basics' },
            { text: '15.2 推理器工具', link: '/ch15-reasoning-consistency/02-reasoner-tools' },
            { text: '15.3 推理任务', link: '/ch15-reasoning-consistency/03-inference-tasks' },
            { text: '15.4 Protégé 推理练习', link: '/ch15-reasoning-consistency/04-protoge-reasoner-exercise' },
          ],
        },
      ],
      '/ch16-development-lifecycle/': [
        {
          text: '第 16 章 本体开发生命周期',
          collapsed: false,
          items: [
            { text: '16.1 生命周期阶段', link: '/ch16-development-lifecycle/01-lifecycle-phases' },
            { text: '16.2 工具与交付物', link: '/ch16-development-lifecycle/02-tools-deliverables' },
            { text: '16.3 书店本体练习', link: '/ch16-development-lifecycle/03-practice-bookstore-ontology' },
          ],
        },
      ],
      '/ch17-methodologies-comparison/': [
        {
          text: '第 17 章 主流方法论',
          collapsed: false,
          items: [
            { text: '17.1 METHONTOLOGY', link: '/ch17-methodologies-comparison/01-methontology' },
            { text: '17.2 NeOn 方法论', link: '/ch17-methodologies-comparison/02-neon-methodology' },
            { text: '17.3 敏捷本体建模', link: '/ch17-methodologies-comparison/03-agile-ontology-modeling' },
            { text: '17.4 方法论比较', link: '/ch17-methodologies-comparison/04-comparison-table' },
          ],
        },
      ],
      '/ch18-quality-assessment/': [
        {
          text: '第 18 章 本体质量评估',
          collapsed: false,
          items: [
            { text: '18.1 评估维度', link: '/ch18-quality-assessment/01-evaluation-dimensions' },
            { text: '18.2 自动化工具', link: '/ch18-quality-assessment/02-automation-tools' },
            { text: '18.3 Ontometrics 实践', link: '/ch18-quality-assessment/03-practice-ontometrics' },
          ],
        },
      ],
      '/ch19-mainstream-ontologies/': [
        {
          text: '第 19 章 主流本体赏析',
          collapsed: false,
          items: [
            { text: '19.1 顶层本体', link: '/ch19-mainstream-ontologies/01-upper-ontologies' },
            { text: '19.2 中等层次本体', link: '/ch19-mainstream-ontologies/02-mid-level-ontologies' },
            { text: '19.3 领域本体', link: '/ch19-mainstream-ontologies/03-domain-ontologies' },
          ],
        },
      ],
      '/ch20-application-scenarios/': [
        {
          text: '第 20 章 典型应用场景',
          collapsed: false,
          items: [
            { text: '20.1 生物医学', link: '/ch20-application-scenarios/01-biomedicine' },
            { text: '20.2 搜索与问答', link: '/ch20-application-scenarios/02-search-qa' },
            { text: '20.3 企业管理', link: '/ch20-application-scenarios/03-enterprise-management' },
            { text: '20.4 知识图谱与本体', link: '/ch20-application-scenarios/04-kg-vs-ontology' },
          ],
        },
      ],
      '/ch21-tool-ecosystem/': [
        {
          text: '第 21 章 工具生态全景',
          collapsed: false,
          items: [
            { text: '21.1 编辑器', link: '/ch21-tool-ecosystem/01-editors' },
            { text: '21.2 推理器', link: '/ch21-tool-ecosystem/02-reasoners' },
            { text: '21.3 三元组存储', link: '/ch21-tool-ecosystem/03-triplestores' },
            { text: '21.4 研究平台', link: '/ch21-tool-ecosystem/04-research-platforms' },
          ],
        },
      ],
      '/ch22-ontology-alignment/': [
        {
          text: '第 22 章 本体对齐与融合',
          collapsed: false,
          items: [
            { text: '22.1 概念与方法', link: '/ch22-ontology-alignment/01-concepts' },
            { text: '22.2 对齐方法', link: '/ch22-ontology-alignment/02-alignment-methods' },
            { text: '22.3 工具与案例', link: '/ch22-ontology-alignment/03-tools-cases' },
          ],
        },
      ],
      '/ch23-neuro-symbolic-ai/': [
        {
          text: '第 23 章 神经符号融合与 AI',
          collapsed: false,
          items: [
            { text: '23.1 符号与神经对比', link: '/ch23-neuro-symbolic-ai/01-symbolic-Neuro-comparison' },
            { text: '23.2 知识图谱嵌入', link: '/ch23-neuro-symbolic-ai/02-kg-embeddings' },
            { text: '23.3 神经符号集成', link: '/ch23-neuro-symbolic-ai/03-neurosymbolic-integration' },
            { text: '23.4 LLM 与知识图谱', link: '/ch23-neuro-symbolic-ai/04-llm-kg' },
          ],
        },
      ],
      '/appendix-a-owl2-reference/': [
        {
          text: '附录 A：OWL 2 速查表',
          collapsed: false,
          items: [
            { text: '概览', link: '/appendix-a-owl2-reference' },
          ],
        },
      ],
      '/appendix-b-protoge-shortcuts/': [
        {
          text: '附录 B：Protégé 快捷键',
          collapsed: false,
          items: [
            { text: '概览', link: '/appendix-b-protoge-shortcuts' },
          ],
        },
      ],
      '/appendix-c-repositories/': [
        {
          text: '附录 C：本体仓库',
          collapsed: false,
          items: [
            { text: '概览', link: '/appendix-c-repositories' },
          ],
        },
      ],
      '/appendix-d-rdf-syntax-comparison/': [
        {
          text: '附录 D：RDF 语法对照',
          collapsed: false,
          items: [
            { text: '概览', link: '/appendix-d-rdf-syntax-comparison' },
          ],
        },
      ],
      '/appendix-e-pizza-tutorial/': [
        {
          text: '附录 E：Pizza 教程',
          collapsed: false,
          items: [
            { text: '概览', link: '/appendix-e-pizza-tutorial' },
          ],
        },
      ],
      '/appendix-f-protege-resources/': [
        {
          text: '附录 F：Protégé 资源',
          collapsed: false,
          items: [
            { text: '概览', link: '/appendix-f-protege-resources' },
          ],
        },
      ],
      '/appendix-g-glossary/': [
        {
          text: '附录 G：术语表',
          collapsed: false,
          items: [
            { text: '概览', link: '/appendix-g-glossary' },
          ],
        },
      ],
    },
    footer: {
      message: '采用 MIT 许可证发布',
      copyright: 'Copyright © 2026 Ontology Learning Materials',
    },
  },
})
