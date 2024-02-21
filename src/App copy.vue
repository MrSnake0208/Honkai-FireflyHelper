<template>
  <div class="left-aligned-container">
    <el-header height="60px">
      <h3>流萤遗器小助手</h3>
    </el-header>
    <el-container>
      <el-aside width="50px"></el-aside>
      <el-main>
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="uploadUrl"
          :show-file-list="false"
          :on-change="handleChange"
          :http-request="customHttpRequest"
        >
          <el-button type="primary">选择JSON文件</el-button>
        </el-upload>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="头" name="head"></el-tab-pane>
          <el-tab-pane label="手" name="hands"></el-tab-pane>
          <el-tab-pane label="身子" name="body"></el-tab-pane>
          <el-tab-pane label="脚" name="feet"></el-tab-pane>
          <el-tab-pane label="球" name="planarSphere"></el-tab-pane>
          <el-tab-pane label="绳" name="linkRope"></el-tab-pane>
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
import type { TabsPaneContext } from "element-plus";
import { computed, ref } from "vue";

import { IRelicContentOnly } from "@/types/relic.ts"; // 替换为实际的路径
import RelicDispaly from "./components/display/RelicDisplay.vue";
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
  return relics.value.filter((relic) => relic.position === activeName.value);
});
</script>

<style scoped></style>
