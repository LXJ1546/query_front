<template>
  <div class="sidebar">
    <el-card class="card">
      <template #header>
        <div>
          <span>欢迎</span>
        </div>
      </template>
      <p>使用VIVA智能查询系统！</p>
    </el-card>
    <el-card class="card">
      <template #header>
        <div>
          <span>技术框架</span>
        </div>
      </template>
      <p>构建工具Vite</p>
      <p>前端框架Vue</p>
      <p>UI框架Elements-plus</p>
      <p>状态管理Pinia</p>
      <p>后端语言Python</p>
      <p>后端框架Flask</p>
    </el-card>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.sidebar {
  width: $base-sidebar-width;
  height: $base-sidebar-height;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: white;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: rgb(183, 183, 186);
  border-bottom: 1px solid rgb(183, 183, 186);
  border-bottom-right-radius: 12px;
  .card {
    width: 230px;
    color: rgb(121, 174, 243);
    line-height: 24px;
  }
}
</style>
