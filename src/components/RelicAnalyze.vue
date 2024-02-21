<template>
  <div class="left-aligned-container">
    <el-container>
      <!-- <el-aside width="50px"></el-aside> -->
      <el-main>
        <div class="row-container">
          <el-select
            v-model="value1"
            multiple
            placeholder="套装"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :on-change="handleChange"
            :http-request="customHttpRequest"
          >
            <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>导入遗器数据</el-button>
          </el-upload>
          <el-button type="primary">导出遗器数据</el-button>
        </div>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="tab in tabs"
            :key="tab.name"
            class="panel"
            :name="tab.name"
          >
            <template #label>
              <img :src="tab.icon" class="icon" />
            </template>
          </el-tab-pane>
          <div class="wrapper">
            <RelicDispaly
              v-for="relic in filteredRelics"
              :key="relic.setName"
              :relic="relic"
              class="relic-item"
            />
          </div>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { type TabsPaneContext } from "element-plus";
import { computed, ref, watch } from "vue";

import RelicDispaly from "@/components/display/RelicDisplay.vue";
import { IRelicContentOnly } from "@/types/relic.ts"; // 替换为实际的路径

import bodyIcon from "@/assets/BODY.png";
import footIcon from "@/assets/FOOT.png";
import handIcon from "@/assets/HAND.png";
import headIcon from "@/assets/HEAD.png";
import neckIcon from "@/assets/NECK.png";
import objectIcon from "@/assets/OBJECT.png";

const tabs = [
  { name: "head", icon: headIcon },
  { name: "hands", icon: handIcon },
  { name: "body", icon: bodyIcon },
  { name: "feet", icon: footIcon },
  { name: "planarSphere", icon: objectIcon },
  { name: "linkRope", icon: neckIcon },
];

let showRelicHelper = ref(false);
const value1 = ref([]);
const options = [
  { value: "PasserbyofWanderingCloud", label: "云无留迹的过客" },
  { value: "MusketeerofWildWheat", label: "野穗伴行的快枪手" },
  { value: "KnightofPurityPalace", label: "净庭教宗的圣骑士" },
  { value: "HunterofGlacialForest", label: "密林卧雪的猎人" },
  { value: "ChampionofStreetwiseBoxing", label: "街头出身的拳王" },
  { value: "GuardofWutheringSnow", label: "戍卫风雪的铁卫" },
  { value: "FiresmithofLavaForging", label: "熔岩锻铸的火匠" },
  { value: "GeniusofBrilliantStars", label: "繁星璀璨的天才" },
  { value: "BandofSizzlingThunder", label: "激奏雷电的乐队" },
  { value: "EagleofTwilightLine", label: "晨昏交界的翔鹰" },
  { value: "ThiefofShootingMeteor", label: "流星追迹的怪盗" },
  { value: "WastelanderofBanditryDesert", label: "盗匪荒漠的废土客" },
  { value: "SpaceSealingStation", label: "太空封印站" },
  { value: "FleetoftheAgeless", label: "不老者的仙舟" },
  { value: "SprightlyVonwacq", label: "生命的翁瓦克" },
  { value: "PanCosmicCommercialEnterprise", label: "泛银河商业公司" },
  { value: "BelobogoftheArchitects", label: "筑城者的贝洛伯格" },
  { value: "TaliaKingdomofBanditry", label: "盗贼公国塔利亚" },
  { value: "CelestialDifferentiator", label: "星体差分机" },
  { value: "InertSalsotto", label: "停转的萨尔索图" },
  { value: "RutilantArena", label: "繁星竞技场" },
  { value: "BrokenKeel", label: "折断的龙骨" },
  { value: "LongevousDisciple", label: "宝命长存的莳者" },
  { value: "MessengerTraversingHackerspace", label: "骇域漫游的信使" },
  { value: "WatchmakerMasterofDreamMachinations", label: "机心戏梦的钟表匠" },
  { value: "TheAshblazingGrandDuke", label: "毁烬焚骨的大公" },
  { value: "PioneerDiverofDeadWaters", label: "死水深潜的先驱" },
  { value: "PenaconyLandoftheDreams", label: "梦想之地匹诺康尼" },
  { value: "FirmamentFrontlineGlamoth", label: "苍穹战线格拉默" },
  { value: "PrisonerinDeepConfinement", label: "幽锁深牢的系囚" },
];
// import { UploadFilled } from '@element-plus/icons-vue'

const uploadUrl = "http://127.0.0.1:8000/processrelicdata";

const relics = ref<IRelicContentOnly[]>([]);

let activeName = ref("head");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeName.value = tab.props.name;
};

const handleChange = (file) => {
  // If you want to perform some action when files are selected, you can do it here
};

const customHttpRequest = async ({ file, onSuccess, onError }) => {
  try {
    const jsonData = JSON.parse(await file.text());

    const response = await axios.post(uploadUrl, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log('API response:', response.data);
    relics.value = response.data;
    onSuccess(); // Signal that the upload is successful
  } catch (error) {
    console.error("API request failed:", error);
    onError(); // Signal that the upload has failed
  }
};

const filteredRelics = computed(() => {
  // 根据当前选中的标签过滤relics数组
  return relics.value.filter((relic) => {
    const meetsCondition = relic.position === activeName.value && value1.value.includes(relic.set_name);
    if (value1.value.length === 0 && relic.position === activeName.value) {
      return true;
    }
    // 在这里加入调试语句
    console.log(value1.value.includes(relic.set_name))
    if (meetsCondition) {
        console.log(`Relic: ${relic.set_name}, Position: ${relic.position}, Meets Condition: ${meetsCondition}`);
        // 在 meetsCondition 为 true 时执行其他操作
        // 例如，你可以在这里触发其他的逻辑或更新其他的状态
      }
    return meetsCondition;
  });
});
watch(value1,(value) => {
  filteredRelics
})
</script>

<style scoped>
.row-container {
  display: flex;
  align-items: center; /* 可选，使内容垂直居中 */
  justify-content: flex-start;
}

.upload-demo {
  margin-left: 10px;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.relic-item {
  width: 450px; /* 固定宽度为300px */
  margin-bottom: 15px;
}

.icon {
  display: block;
  width: 30px;
  height: 30px;
  padding: 0 12px;
  margin: auto;
}
</style>
