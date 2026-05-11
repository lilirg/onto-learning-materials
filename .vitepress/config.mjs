import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'Onto Learning Materials',
  description: '学习材料文档站点',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '介绍', link: '/intro' },
        ],
      },
    ],
  },
})