<template>
  <section class="features-section">
    <h2 class="section-title">核心特性</h2>
    <div class="features-grid">
      <div class="feature-card" v-for="feature in features" :key="feature.title">
        <div class="feature-icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: '📚',
    title: '系统全面',
    description: '23 章 + 7 个附录，覆盖本体工程的完整知识体系，从哲学基础到神经符号 AI',
  },
  {
    icon: '🏛️',
    title: '标准导向',
    description: '严格遵循 W3C 标准（RDF 1.1、OWL 2、SPARQL 1.1、SHACL），确保内容权威准确',
  },
  {
    icon: '🔄',
    title: '循序渐进',
    description: '从哲学基础到神经符号 AI，由浅入深，适合零基础学习者',
  },
  {
    icon: '🛠️',
    title: '实践导向',
    description: '每章配备练习实例，使用 Protégé 等工具动手操作，强化技能掌握',
  },
  {
    icon: '🌐',
    title: '开放开源',
    description: '采用 MIT 许可证，欢迎贡献与复用，共建开源知识社区',
  },
  {
    icon: '🤖',
    title: '前沿探索',
    description: '涵盖知识图谱嵌入、LLM 与知识图谱融合等 AI 前沿 topics',
  },
]
</script>

<style scoped>
.features-section {
  padding: 48px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--vp-c-text-1);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid var(--vp-c-divider);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature-card h3 {
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
}

.feature-card p {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-section {
    padding: 32px 16px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>