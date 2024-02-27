<template>
  <el-container>
    <el-header class="operatingspace">
      <el-select
        v-model:model-value="selectedSetNames"
        multiple
        placeholder="套装"
        style="width: 240px"
      >
        <el-option
          v-for="item in setNameFilter"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model:model-value="selectedMaintagNames"
        multiple
        placeholder="主词条"
        style="width: 240px"
        class="main-tag"
      >
        <el-option
          v-for="item in maintagNameFilter"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
        />
      </el-select>
      <el-upload
        ref="upload"
        class="upload-import"
        :on-change="handleChange"
        :http-request="uploadHttpRequest"
        :limit="1"
        :on-exceed="handleExceed"
        :show-file-list="false"
      >
        <el-button type="primary"
          ><i class="el-icon-upload el-icon--right"></i>导入遗器数据</el-button
        >
      </el-upload>
      <el-button type="primary" class="upload-export">导出遗器数据 </el-button>
    </el-header>
    <el-main class="relic-cards">
      <el-tabs v-model:model-value="selectedTab" class="demo-tabs">
        <el-tab-pane v-for="tab in tabs" :key="tab.name" class="panel" :name="tab.name">
          <template #label>
            <img :src="tab.icon" class="icon" />
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-container class="cards">
        <div v-for="headInfo in filteredRelics" :key="headInfo" class="text item">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <el-avatar
                  :size="45"
                  style="flex-shrink: 0"
                  :src="getRelicImageSrc(headInfo)"
                ></el-avatar>
                <div class="card-header-text">
                  <span class="relic-info"
                    >{{ convertToChineseName(headInfo.setName, headInfo.position) }} +{{
                      headInfo.level
                    }}
                  </span>
                  <br />
                  <span class="sumscore">{{ getSumScore(headInfo) }}分</span>
                </div>
              </div>
            </template>
            <div class="normaltagscontainer">
              <div class="maintag-info">
                {{ convertToChineseStatName(headInfo.mainTag.name) }}
                {{ Math.round(headInfo.mainTag.value * 100) / 100 }}
              </div>
              <div class="tagscore">
                {{
                  calScore(
                    headInfo.mainTag,
                    selectedScoreRule,
                    headInfo.position,
                    headInfo.level,
                    true
                  )
                }}
              </div>
            </div>

            <div v-for="tag in headInfo.normalTags" :key="tag.name" class="normaltagscontainer">
              {{ convertToChineseStatName(tag.name) }}: {{ Math.round(tag.value * 100) / 100 }}
              <div class="tagscore">
                {{ calScore(tag, selectedScoreRule, headInfo.position, headInfo.level, false) }}
              </div>
            </div>
            <template #footer>
              <div class="relic-card-footer">
                <el-avatar
                  style="vertical-align: middle"
                  :size="40"
                  :src="getCharacterImageSrc(headInfo)"
                ></el-avatar>
                <span style="vertical-align: middle">{{
                  convertToChineseCharacterName(headInfo.equip)
                }}</span>
              </div>
            </template>
          </el-card>
        </div>
      </el-container>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

// import { IRelicContentOnly } from '@/types/relic'

import { storeToRefs } from 'pinia'
import { genFileId } from 'element-plus'
import { useScoreRuleStore } from '@/stores/scorerule'
import { convertToChineseCharacterName } from '@/calculators/CharacterNameCalculator'
import { convertToChineseName } from '@/calculators/RelicNameCalculator'
import { convertToChineseStatName } from '@/calculators/StatNameCalculator'
import { useRelicStore } from '@/stores/relic'
import { calScore } from '@/calculators/scorecalculator'

const scoreruleStore = useScoreRuleStore()
const scorerules = storeToRefs(scoreruleStore).scorerule

const relicStore = useRelicStore()
const {
  selectedSetNames,
  selectedMaintagNames,
  filteredRelics,
  selectedTab,
  selectedScoreRule,
  relicList
} = storeToRefs(relicStore)

import bodyIcon from '@/assets/BODY.png'
import footIcon from '@/assets/FOOT.png'
import handIcon from '@/assets/HAND.png'
import headIcon from '@/assets/HEAD.png'
import neckIcon from '@/assets/NECK.png'
import objectIcon from '@/assets/OBJECT.png'

const tabs = [
  { name: 'head', icon: headIcon },
  { name: 'hands', icon: handIcon },
  { name: 'body', icon: bodyIcon },
  { name: 'feet', icon: footIcon },
  { name: 'planarSphere', icon: objectIcon },
  { name: 'linkRope', icon: neckIcon }
]

const setNameFilter = [
  { value: 'PasserbyofWanderingCloud', label: '云无留迹的过客' },
  { value: 'MusketeerofWildWheat', label: '野穗伴行的快枪手' },
  { value: 'KnightofPurityPalace', label: '净庭教宗的圣骑士' },
  { value: 'HunterofGlacialForest', label: '密林卧雪的猎人' },
  { value: 'ChampionofStreetwiseBoxing', label: '街头出身的拳王' },
  { value: 'GuardofWutheringSnow', label: '戍卫风雪的铁卫' },
  { value: 'FiresmithofLavaForging', label: '熔岩锻铸的火匠' },
  { value: 'GeniusofBrilliantStars', label: '繁星璀璨的天才' },
  { value: 'BandofSizzlingThunder', label: '激奏雷电的乐队' },
  { value: 'EagleofTwilightLine', label: '晨昏交界的翔鹰' },
  { value: 'ThiefofShootingMeteor', label: '流星追迹的怪盗' },
  { value: 'WastelanderofBanditryDesert', label: '盗匪荒漠的废土客' },
  { value: 'SpaceSealingStation', label: '太空封印站' },
  { value: 'FleetoftheAgeless', label: '不老者的仙舟' },
  { value: 'SprightlyVonwacq', label: '生命的翁瓦克' },
  { value: 'PanCosmicCommercialEnterprise', label: '泛银河商业公司' },
  { value: 'BelobogoftheArchitects', label: '筑城者的贝洛伯格' },
  { value: 'TaliaKingdomofBanditry', label: '盗贼公国塔利亚' },
  { value: 'CelestialDifferentiator', label: '星体差分机' },
  { value: 'InertSalsotto', label: '停转的萨尔索图' },
  { value: 'RutilantArena', label: '繁星竞技场' },
  { value: 'BrokenKeel', label: '折断的龙骨' },
  { value: 'LongevousDisciple', label: '宝命长存的莳者' },
  { value: 'MessengerTraversingHackerspace', label: '骇域漫游的信使' },
  { value: 'WatchmakerMasterofDreamMachinations', label: '机心戏梦的钟表匠' },
  { value: 'TheAshblazingGrandDuke', label: '毁烬焚骨的大公' },
  { value: 'PioneerDiverofDeadWaters', label: '死水深潜的先驱' },
  { value: 'PenaconyLandoftheDreams', label: '梦想之地匹诺康尼' },
  { value: 'FirmamentFrontlineGlamoth', label: '苍穹战线格拉默' },
  { value: 'PrisonerinDeepConfinement', label: '幽锁深牢的系囚' }
]
const maintagNameFilter = [
  { value: 'hp', label: '生命值' },
  { value: 'hp_', label: '生命值百分比' },
  { value: 'atk', label: '攻击力' },
  { value: 'atk_', label: '攻击力百分比' },
  { value: 'def', label: '防御力' },
  { value: 'def_', label: '防御力百分比' },
  { value: 'spd', label: '速度' },
  { value: 'critRate', label: '暴击率' },
  { value: 'critDMG', label: '暴击伤害' },
  { value: 'break', label: '击破特攻' },
  { value: 'eff', label: '效果命中' },
  { value: 'effRes', label: '效果抵抗' },
  { value: 'heal', label: '治疗量加成' },
  { value: 'enerRegen', label: '能量恢复率' },
  { value: 'imaginaryDmg', label: '虚数属性伤害提高' },
  { value: 'quantumDmg', label: '量子属性伤害提高' },
  { value: 'windDmg', label: '风属性伤害提高' },
  { value: 'lightningDmg', label: '雷属性伤害提高' },
  { value: 'iceDmg', label: '冰属性伤害提高' },
  { value: 'fireDmg', label: '火属性伤害提高' },
  { value: 'physicalDmg', label: '物理属性伤害提高' }
]
const upload = ref<UploadInstance>()
const handleChange = (file: any, fileList: any) => {
  // If you want to perform some action when files are selected, you can do it here
  let reader = new FileReader()
  reader.readAsText(fileList[0].raw, 'UTF-8')
  reader.onload = (evt) => {
    const dataJson = JSON.parse(evt.target.result)
    localStorage.setItem('relicList', JSON.stringify(dataJson))
    relicStore.$reset()
    relicStore.$patch({ relicList: dataJson })
  }
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

function getRelicImageSrc(relicinfo: any) {
  const imageName = `${relicinfo.setName}-${relicinfo.position}.png`
  return `/src/assets/relic/${imageName}`
}

function getCharacterImageSrc(relicinfo: any) {
  const imageName = `${relicinfo.equip}.png`
  return `/src/assets/character/${imageName}`
}

function getSumScore(relicinfo: any) {
  let sum = 0
  let maintagscore = calScore(
    relicinfo.mainTag,
    selectedScoreRule.value,
    relicinfo.position,
    relicinfo.level,
    true
  )
  relicinfo.normalTags.forEach((element: any) => {
    // console.log(element)
    sum += calScore(element, selectedScoreRule.value, relicinfo.position, relicinfo.level, false)
  })
  sum += maintagscore
  sum = Math.round(sum * 100) / 100
  return sum
}
function uploadHttpRequest() {}
</script>

<style scoped>
.sumscore {
  margin-left: 10px;
}
.relic-card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.relic-info {
  font-weight: bold;
  font-size: large;
  margin-left: 10px;
}
.maintag-info {
  font-weight: bold;
}
.card-header {
  display: flex;
}
.card-header-text {
  flex: 1;
}
.normaltagscontainer {
  display: flex;
  justify-content: space-between;
  width: 100%; /* 让容器占满卡片的宽度 */
  margin: 5px;
  /* border: 1px solid #ccc; */
  padding: 0px;
}
.cards {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.box-card {
  margin-right: 15px;
  margin-bottom: 15px;
}
.relic-cards {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.operatingspace {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
.el-select {
  margin-right: 10px;
}

.el-card {
  width: 300px;
  height: 340px;
  -webkit-transition: 0.15s all ease-in-out;
  transition: 0.15s all ease-in-out;
  border-radius: 10px;
  padding: 5px;
  border: 4px solid transparent;
  background-color: white;
}
.icon {
  display: block;
  width: 30px;
  height: 30px;
  padding: 0 12px;
  margin: auto;
}

.tagscore {
  text-align: right;
  border-radius: 4px;
  border: 0px solid;
  background-color: #303133;
  color: aliceblue;
  padding: 1px 10px;
}
</style>
