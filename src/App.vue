<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <el-image
        style="width: 100px; height: 50px"
        src="/src/assets/icon.png"
        alt="流萤遗器助手"
        fit="cover"
      />
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="/HowToUse">使用教程</el-menu-item>
    <el-menu-item index="/Analyze">遗器分析</el-menu-item>
    <el-menu-item index="/ScoreRuleConfig">分析配置</el-menu-item>
    <el-menu-item index="4">设置</el-menu-item>
  </el-menu>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

import { useScoreRuleStore } from '@/stores/scorerule'
import { exampleSliders } from '@/components/defaultscorerule'
const scoreruleStore = useScoreRuleStore()
if (scoreruleStore.scorerule.length === 0) {
  localStorage.setItem('scorerule', JSON.stringify(exampleSliders))
  scoreruleStore.$reset()
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 0;
}
</style>
