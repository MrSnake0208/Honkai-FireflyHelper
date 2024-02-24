import { createRouter, createWebHistory } from 'vue-router'
import ScoreRuleConfig from "../components/ScoreRuleConfig.vue"
import RelicAnalyze from "../components/RelicAnalyze.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ScoreRuleConfig',
      name: 'ScoreRuleConfig',
      component: ScoreRuleConfig
    },
    {
      path: '/Analyze',
      name: 'Analyze',
      component: RelicAnalyze
    }
  ]
})

export default router
