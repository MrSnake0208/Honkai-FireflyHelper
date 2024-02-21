// 引入createRouter
import RelicAnalyze from "@/components/RelicAnalyze.vue";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/relic",
      component: RelicAnalyze,
    },
  ],
});

export default router;
