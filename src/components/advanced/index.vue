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
      <div class="volume">
        <span>语音输入条件:</span>
        <el-button size="large" class="btn" @click="handleVolume"
          >开始识别</el-button
        >
      </div>
      <el-input
        v-model="textarea"
        style="width: 600px"
        :rows="5"
        type="textarea"
        placeholder="文本展示区域"
        class="show"
      />
      <el-button size="large" class="btn1">开始查询</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
const column = ref("");
const compare = ref("");
const givedata = ref("");
const logic = ref("");
const textarea = ref("");
let recognition = null;
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
const handleVolume = () => {
  // 检查浏览器是否支持Web Speech API
  if (!("webkitSpeechRecognition" in window)) {
    alert("您的浏览器不支持语音识别功能，请使用Chrome或其他支持的浏览器。");
  } else {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "zh-CN"; // 设置语言为中文
    recognition.interimResults = false; // 设置只返回最终结果
    recognition.onstart = () => {
      ElMessage("开始识别，请说话...");
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      textarea.value = `语音识别结果: ${transcript}`;
    };
    recognition.onerror = function (event) {
      alert(`语音识别错误: ${event.error}`);
    };
    recognition.onend = () => {
      ElMessage({
        message: "识别成功！",
        type: "success",
      });
    };
    recognition.start();
  }
};

const parseQueryToSql = (queryText) => {
  // 去除固定词语
  queryText = queryText.replace("我要查询", "").replace("的顾客", "");

  // 解析条件
  const conditions = [];
  const fields = {
    性别: "Gender",
    年龄: "Age",
    收入: "Income",
    地区: "Region",
    职业: "Occupation",
    教育水平: "Education_Level",
    婚姻状态: "Marital_Status",
    家庭人数: "Number_of_Household_Members",
    顾客忠诚度: "Customer_Loyalty",
  };

  const tokens = queryText.split("和");
  for (const token in tokens) {
    // 解析条件
    for (const field in fields) {
      if (token.includes(field)) {
        let operator = "";
        let value = "";
        if (token.includes("小于")) {
          operator = "<";
          value = token.split("小于")[1];
        } else if (token.includes("大于")) {
          operator = ">";
          value = token.split("大于")[1];
        } else if (token.includes("等于")) {
          operator = "=";
          value = token.split("等于")[1];
        }
        // 处理数值类型的字段
        const column = fields[field];
        let condition = "";
        if (
          ["Age", "Income", "Number_of_Household_Members", "Customer_Loyalty"].includes(column)
        ) {
          value=parseInt(value)
          condition = `${column} ${operator} ${value}`;
        } else {
          value = token.split("为")[1];
          // 处理非数值类型的字段
          condition = `${column} = '${value}'`;
        }
        conditions.push(condition);
      }
    }
  }

  // 构建SQL查询语句
  let sqlQuery = "";
  if (conditions.length > 0) {
    sqlQuery = "SELECT * FROM customers WHERE " + conditions.join(" AND ");
  } else {
    // 如果没有条件，默认查询所有顾客信息
    sqlQuery = "SELECT * FROM customers";
  }

  return sqlQuery;
};
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
      margin-top: 20px;
      width: 80px;
      color: #409eff;
    }
  }
}
</style>
