<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <img :src="getRelicImageSrc" class="relic-img" />
        <h2 class="relic-name">{{ convertedName }} +{{ relic.level }}</h2>
        <!-- <el-checkbox v-model="checked1" label="弃置" size="large" />
        <el-checkbox v-model="checked2" label="锁定" size="large" /> -->
        
        
      </div>
    </template>
    <div class="maintag-container">
      <h4 class="left">
        {{ convertedMainStatName }} +{{ relic.main_tag.value }}
      </h4>
      <h4 class="right">{{ relic.main_tag.score }}分</h4>
    </div>
    <div
      v-for="tag in relic.normal_tags"
      :key="tag.name"
      class="normaltag-container"
    >
      <div class="left">
        {{ convertedNormalStatName(tag.name) }} +{{ tag.value }}
      </div>
      <div class="right">{{ tag.score }}分</div>
    </div>
    <template #footer>有效词条数：</template>
  </el-card>
</template>

<script lang="ts">
import { IRelicContentOnly } from "@/types/relic"; // 替换为实际的路径
import { PropType, computed, defineComponent, defineProps, toRefs } from "vue";

import { convertToChineseName } from "@/components/converter/NameConverter";
import { convertToChineseStatName } from "@/components/converter/StatNameConverter";

let x = defineProps(["relic"])
console.log(x)

export default defineComponent({
  props: {
    relic: {
      type: Object as PropType<IRelicContentOnly>,
      required: true,
    },
  },
  setup(props) {
    const { relic } = toRefs(props);
    const convertedName = computed(() => {
      return convertToChineseName(relic.value.set_name, relic.value.position);
    });
    const convertedMainStatName = computed(() => {
      return convertToChineseStatName(relic.value.main_tag.name);
    });
    const convertedNormalStatName = computed(() => {
      return (tagName: string) => convertToChineseStatName(tagName);
    });
    const getRelicImageSrc = computed(() => {
      const imageName = `${relic.value.set_name}-${relic.value.position}.png`;
      // Assuming your images are stored in a folder named "relics" within the "public" directory
      return `/src/assets/relic/${imageName}`;
    });
    return {
      convertedName,
      convertedMainStatName,
      convertedNormalStatName,
      getRelicImageSrc,
    };
  },
});
</script>

<!-- <script lang="ts" setup>
const checked1 = false
const checked2 = false
</script> -->
<style scoped>
.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.relic-name {
  text-align: left;
  margin-right: auto;
}

.relic-img {
  width: 50px;
  height: 50px;
  margin-left: 0;
  margin-right: 5px;
  text-align: left; /* 或者使用 align-self: flex-start; */
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 450px;
}

.maintag-container {
  display: flex;
  justify-content: space-between;
  width: 100%; /* 让容器占满卡片的宽度 */
  margin: 5px;
  /* border: 1px solid #ccc; */
  padding: 0px;
}

.normaltag-container {
  display: flex;
  justify-content: space-between;
  width: 100%; /* 让容器占满卡片的宽度 */
  margin: 5px;
  /* border: 1px solid #ccc; */
  padding: 0px;
}
.left {
  text-align: left;
}

.right {
  text-align: right;
  border-radius: 4px;
  border: 0px solid;
  background-color: rgb(0, 0, 0);
  color: aliceblue;
}

h4 {
  margin: 0;
}

.relic-level {
  display: flex; /* 或者使用 display: flex; */
  justify-content: flex-start
}
</style>
