<template>
  <div class="normal">
    <div class="topselect">
      <div class="title">
        <h3>设置查询条件:</h3>
      </div>
      <div class="select">
        <el-select
          v-model="column"
          placeholder="选择字段"
          size="large"
          style="width: 150px"
        >
          <el-option
            v-for="item in options1"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="compare"
          placeholder="选择运算符"
          size="large"
          style="width: 150px"
        >
          <el-option
            v-for="item in options2"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input
          v-model="givedata"
          style="width: 180px"
          size="large"
          placeholder="输入数据"
        />
        <el-select
          v-model="logic"
          placeholder="选择多重条件"
          size="large"
          style="width: 150px"
        >
          <el-option
            v-for="item in options3"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="select">
        <el-select
          v-model="column1"
          placeholder="选择字段"
          size="large"
          style="width: 150px"
        >
          <el-option
            v-for="item in options1"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="compare1"
          placeholder="选择运算符"
          size="large"
          style="width: 150px"
        >
          <el-option
            v-for="item in options2"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input
          v-model="givedata1"
          style="width: 180px"
          size="large"
          placeholder="输入数据"
        />
        <el-select
          v-model="logic1"
          placeholder="选择多重条件"
          size="large"
          style="width: 150px"
        >
          <el-option
            v-for="item in options3"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="volume">
        <span>语音输入条件:</span>
        <el-button size="large" class="btn">开始识别</el-button>
      </div>
      <el-input
        v-model="textarea"
        style="width: 600px"
        :rows="3"
        type="textarea"
        placeholder="文本展示区域"
        class="show"
      />
      <el-button size="large" class="btn1">开始查询</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const column = ref("");
const compare = ref("");
const givedata = ref("");
const logic = ref("");
const column1 = ref("");
const compare1 = ref("");
const givedata1 = ref("");
const logic1 = ref("");
const textarea = ref("");
const options1 = [
  "姓名",
  "性别",
  "收入",
  "地区",
  "邮箱",
  "职业",
  "教育水平",
  "婚姻状态",
  "家庭人数",
  "顾客忠诚度",
];
const options2 = [
  "=",
  "<",
  "<=",
  ">",
  ">=",
  "!=",
  "like",
  "not like",
  "is null",
  "in",
  "not in",
];
const options3 = ["and", "or"];
</script>

<style lang="scss" scoped>
.normal {
  width: 100%;
  .topselect {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 25px;
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
      margin-bottom: 20px;
      span {
        color: #409eff;
      }
    }
    .volume {
      float: left;
      span {
        align-self: flex-start;
        text-align: center;
        margin-top: 12px;
        font-size: 15px;
        color: #409eff;
      }
      .btn {
        border: 1px solid rgb(229, 225, 225);
        margin-left: 10px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        width: 80px;
        color: #409eff;
      }
    }
    .show {
      margin-top: 20px;
    }
    .btn1 {
      border: 1px solid rgb(229, 225, 225);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      margin-top: 10px;
      width: 80px;
      color: #409eff;
    }
  }
}
</style>
