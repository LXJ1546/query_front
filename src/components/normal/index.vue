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
            v-model="gender"
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
          <span>地区：</span>
          <el-select
            v-model="region"
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
            v-model="edlevel"
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
            v-model="mastatus"
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
      <el-button size="large" class="btn" @click="handleQuery">查询</el-button>
    </div>
    <div class="midselect">
      <div class="title">
        <h3>输入查询内容:</h3>
      </div>
      <div class="inputsearch">
        <el-input
          v-model="blur"
          style="width: 240px"
          size="large"
          placeholder="Please input"
        />
        <el-button size="large" class="btn" @click="handleBlur">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import useQueryStore from "../../store/query";
const gender = ref("");
const region = ref("");
const edlevel = ref("");
const mastatus = ref("");
const blur = ref("");
let sql = "SELECT * FROM customer_info_100 WHERE 1 = 1";
let blursql = "";
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
const queryStore = useQueryStore();
const handleQuery = () => {
  sql = "SELECT * FROM customer_info_100 WHERE 1 = 1";
  if (gender.value !== "") {
    sql += ` AND Gender = '${gender.value}'`;
  }

  if (region.value !== "") {
    sql += ` AND Region = '${region.value}'`;
  }

  if (edlevel.value !== "") {
    sql += ` AND Education_Level = '${edlevel.value}'`;
  }

  if (mastatus.value !== "") {
    sql += ` AND Marital_Status = '${mastatus.value}'`;
  }
  axios
    .post("http://localhost:5000/", { sql: sql })
    .then((response) => {
      queryStore.table = response.data;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};
const handleBlur = () => {
  gender.value = "";
  region.value = "";
  edlevel.value = "";
  mastatus.value = "";
  blursql = "SELECT * FROM customer_info_100 WHERE";
  if (blur.value !== "") {
    blursql += ` Gender LIKE '%${blur.value}%' OR Name LIKE '%${blur.value}%' 
    OR Age LIKE '%${blur.value}%' OR Income LIKE '%${blur.value}%' OR Region LIKE '%${blur.value}%' 
    OR Contact_Information LIKE '%${blur.value}%' OR Occupation LIKE '%${blur.value}%' OR Education_Level LIKE '%${blur.value}%' 
    OR Marital_Status LIKE '%${blur.value}%' OR Number_of_Household_Members LIKE '%${blur.value}%' OR Interests_and_Hobbies LIKE '%${blur.value}%' 
    OR Customer_Loyalty LIKE '%${blur.value}%'`;
  }
  axios
    .post("http://localhost:5000/", { sql: blursql })
    .then((response) => {
      queryStore.table = response.data;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};
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
      margin-bottom: 25px;
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
</style>
