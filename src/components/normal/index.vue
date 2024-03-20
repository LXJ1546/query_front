<template>
  <div class="normal">
    <div class="top">
      <div class="title">
        <h3>选择查询条件:</h3>
      </div>
      <div class="select">
        <div>
          <span>性别：</span>
          <el-select
            v-model="value"
            placeholder="Select"
            size="large"
            style="width: 212px"
          >
            <el-option
              v-for="item in options1"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div>
          <span>省份：</span>
          <el-select
            v-model="value"
            placeholder="Select"
            size="large"
            style="width: 212px"
          >
            <el-option
              v-for="item in options2"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </div>
      <div class="select">
        <div>
          <span>教育水平：</span>
          <el-select
            v-model="value"
            placeholder="Select"
            size="large"
            style="width: 180px"
          >
            <el-option
              v-for="item in options3"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div>
          <span>结婚状态：</span>
          <el-select
            v-model="value"
            placeholder="Select"
            size="large"
            style="width: 180px"
          >
            <el-option
              v-for="item in options4"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");

const options1 = ["男", "女"];
const options2 = [
  "北京市",
  "天津市",
  "上海市",
  "重庆市",
  "新疆维吾尔自治区",
  "西藏自治区",
  "宁夏回族自治区",
  "内蒙古自治区",
  "广西壮族自治区",
  "黑龙江省",
  "吉林省",
  "辽宁省",
  "河北省",
  "山东省",
  "江苏省",
  "安徽省",
  "浙江省",
  "福建省",
  "广东省",
  "海南省",
  "云南省",
  "贵州省",
  "四川省",
  "湖南省",
  "湖北省",
  "河南省",
  "山西省",
  "陕西省",
  "甘肃省",
  "青海省",
  "江西省",
  "台湾省",
  "香港特别行政区",
  "澳门特别行政区",
];
const options3=["高中","本科","硕士","博士"];
const options4=["单身","已婚","离异"];
</script>

<style lang="scss" scoped>
.normal {
  width: 100%;
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px;
    .title {
      align-self: flex-start;
      margin-bottom: 20px;
      h3 {
        font-size: 15px;
        color: #409eff;
      }
    }
    .select {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 30px;
      span {
        color: #409eff;
      }
    }
  }
}
</style>
