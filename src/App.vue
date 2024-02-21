<template>
  <el-container>
    <el-header>
      <h1 class="mb-2">流萤遗器小助手</h1>
      <el-page-header :icon="ArrowLeft">
        <template #content>
          <span class="text-large font-600 mr-3"> Titl12312312e </span>
        </template>
      </el-page-header>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu default-active="1" class="el-menu-vertical-demo" router>
          <el-menu-item index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>使用教程</span>
          </el-menu-item>
          <el-menu-item index="/relic">
            <el-icon><icon-menu /></el-icon>
            <span>遗器分析</span>
          </el-menu-item>

          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ArrowLeft } from "@element-plus/icons-vue";
import { RouterView } from "vue-router";
</script>

<style>
.el-menu-item{
  font-size: 18px;
}
</style>
