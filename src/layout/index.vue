<template>
  <div class="allpage">
    <div class="container">
      <Header />
      <div class="middle">
        <SideBar />
        <Middle />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/header/index.vue";
import SideBar from "../components/sidebar/index.vue";
import Middle from "../components/middle/index.vue";
</script>

<style lang="scss" scoped>
.allpage {
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    flex-direction: column;
    width: 1000px;
    height: 100vh;
    background: rgba(245, 246, 251, 1);
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(183, 183, 186);
    border-radius: 12px;
    .middle {
      height: calc(100vh - $base-header-width);
      display: flex;
    }
  }
}
</style>
