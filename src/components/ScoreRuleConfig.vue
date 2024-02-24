<template>
  <el-select
    v-model:model-value="selectedScoreRule"
    placeholder="默认评分配置"
    style="width: 240px"
    class="score-config"
  >
    <el-option
      v-for="item in Object.keys(scorerules)"
      :key="item"
      :label="convertToChineseCharacterName(item)"
      :value="item"
    >
    </el-option>
  </el-select>
  <div
    v-for="(item, index) in scorerules[selectedScoreRule]"
    :key="index"
    class="slider-demo-block"
  >
    <el-text class="mx-1">{{ convertToChineseStatName(index) }}</el-text>
    <el-slider
      class="flex-slider"
      v-model="scorerules[selectedScoreRule][index]"
      show-input
      :min="0"
      :max="1"
      :step="0.01"
    />
  </div>
  <el-button type="primary" :icon="Share">恢复默认</el-button>
  <el-button type="primary" @click="toSave" :icon="Delete">保存</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import { useScoreRuleStore } from '@/stores/scorerule'
import { storeToRefs } from 'pinia'
// import { type IScoreRule } from '@/types/scorerule'
import { convertToChineseStatName } from '@/calculators/StatNameCalculator'
import { convertToChineseCharacterName } from '@/calculators/CharacterNameCalculator'
const scoreruleStore = useScoreRuleStore()
const scorerules = storeToRefs(scoreruleStore).scorerule
const selectedScoreRule = ref()
function toRest() {
  const scorerulejson = JSON.parse(localStorage.getItem('scorerule') as string) || []
  // const tobechanged = selectedScoreRule.value
  scorerulejson[selectedScoreRule.value] = scorerules.value[selectedScoreRule.value]
  localStorage.setItem('scorerule', JSON.stringify(scorerulejson))
}

function toSave() {
  const scorerulejson = JSON.parse(localStorage.getItem('scorerule') as string) || []
  scorerulejson[selectedScoreRule.value] = scorerules.value[selectedScoreRule.value]
  localStorage.setItem('scorerule', JSON.stringify(scorerulejson))
}
</script>

<style>
.slider-demo-block {
  display: flex;
  align-items: center;
  margin: 15px;
}

.flex-slider {
  flex: 1;
}
.mx-1 {
  width: 100px;
}
</style>
