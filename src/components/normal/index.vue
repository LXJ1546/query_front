<template>
  <div class="normal">
    <div class="topselect">
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
      <el-button size="large" class="btn">查询</el-button>
    </div>
    <div class="midselect">
      <div class="title">
        <h3>输入查询内容:</h3>
      </div>
      <div class="inputsearch">
        <el-input
          v-model="input"
          style="width: 240px"
          size="large"
          placeholder="Please input"
        />
        <el-button size="large" class="btn">查询</el-button>
      </div>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
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
const options3 = ["高中", "本科", "硕士", "博士"];
const options4 = ["单身", "已婚", "离异"];
const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style lang="scss" scoped>
.normal {
  width: 100%;
  .topselect {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px;
    border-bottom: 1px solid rgb(229, 225, 225);
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
    .btn {
      border: 1px solid rgb(229, 225, 225);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      width: 80px;
      color: #409eff;
      margin-bottom: 8px;
    }
  }
  .midselect {
    display: flex;
    align-items: center;
    margin: 25px;
    border-bottom: 1px solid rgb(229, 225, 225);
    .title {
      align-self: flex-start;
      text-align: center;
      margin-top: 12px;
      h3 {
        font-size: 15px;
        color: #409eff;
      }
    }
    .inputsearch {
      margin-bottom: 8px;
      margin-left: 10px;
      .btn {
        border: 1px solid rgb(229, 225, 225);
        margin-left: 10px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        width: 80px;
        color: #409eff;
      }
    }
  }
}
::v-deep.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
::v-deep.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
