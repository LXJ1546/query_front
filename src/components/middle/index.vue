<template>
  <div class="content">
    <div class="container">
      <el-menu default-active="1" mode="horizontal" class="menu">
        <el-menu-item index="1" @click="chooseQuery1">常规查询</el-menu-item>
        <el-menu-item index="2" @click="chooseQuery2">高级查询</el-menu-item>
      </el-menu>
      <Normal v-if="normal" />
      <Advanced v-if="advanced" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Normal from "../normal/index.vue";
import Advanced from "../advanced/index.vue";
const normal = ref(true);
const advanced = ref(false);
const chooseQuery1 = () => {
  normal.value = true;
  advanced.value = false;
};
const chooseQuery2 = () => {
  normal.value = false;
  advanced.value = true;
};
</script>

<style lang="scss" scoped>
.content {
  width: calc(100% - $base-sidebar-width);
  height: 100%;
  left: $base-sidebar-width;
  top: $base-header-width;
  border-radius: 8px;
  padding: 8px;
  overflow: auto;
  .container {
    border-radius: 8px;
    background: white;
    height: 100%;
    border: 1px solid rgb(183, 183, 186);
    display: flex;
    flex-direction: column;
    align-items: center;
    .menu {
      width: 100%;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
  }
}
</style>
