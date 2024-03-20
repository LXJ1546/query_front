<template>
  <div class="header">
    <div class="logo">
      <img src="../header/query.svg" class="image" />
      <h2 class="title">VIVA智能查询系统</h2>
    </div>
    <div class="text">
      <p>重庆大学大数据与软件学院</p>
      <p>——第16小组：梁兴竞，曾余茹，胡行</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: $base-header-width;
  justify-content: space-between;
  background: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(183, 183, 186);
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    .image {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }
    .title {
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
      margin-left: 10px;
      color: #316c72;
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    line-height: 20px;
    p {
      font-size: 14px;
      opacity: 0.6;
    }
  }
}
</style>
