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
          @change="setQueryField"
          :disabled="disable"
        >
          <el-option
            v-for="item in Object.keys(option)"
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
          :disabled="disable"
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
          :disabled="disable"
        />
        <el-select
          v-model="logic"
          placeholder="选择多重条件"
          size="large"
          style="width: 150px"
          @change="logicInputChange"
          :disabled="disable"
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
        <el-button
          size="large"
          class="btn"
          @click="handleVolume"
          :loading="isRecognizing"
          >{{ isRecognizing ? "识别中" : "开始识别" }}</el-button
        >
      </div>
      <el-input
        v-model="textarea"
        style="width: 600px"
        :rows="5"
        type="textarea"
        placeholder="语音输入格式：我要查询（字段）[为、大于、小于、等于、大于等于、小于等于]（值）的顾客，多重条件使用“和”连接，例如“我要查询性别为男和教育水平为硕士的顾客”"
        class="show"
      />
      <el-button size="large" class="btn1" @click="handleAdvancedQuery"
        >开始查询</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElNotification } from "element-plus";
import axios from "axios";
import useQueryStore from "../../store/query";
import { ref, reactive } from "vue";
const column = ref("");
const compare = ref("");
const givedata = ref("");
const logic = ref("");
const textarea = ref("");
const isRecognizing = ref(false);
const disable = ref(false);
let isVolume = false;
let recognition = null;
let sqlparse = "";

const options2 = ref([
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
]);
const options3 = ["and", "or", "无"];
const queryStore = useQueryStore();

const option = reactive({
  姓名: ["like", "not like"],
  性别: ["="],
  年龄: ["=", "<", "<=", ">", ">="],
  收入: ["=", "<", "<=", ">", ">="],
  地区: ["=", "like"],
  职业: ["=", "like"],
  教育水平: ["="],
  婚姻状态: ["="],
  家庭人数: ["=", "<", "<=", ">", ">="],
  顾客忠诚度: ["=", "<", "<=", ">", ">="],
});
const handleVolume = () => {
  isVolume = true;
  // 检查浏览器是否支持Web Speech API
  if (!("webkitSpeechRecognition" in window)) {
    alert("您的浏览器不支持语音识别功能，请使用Chrome或其他支持的浏览器。");
  } else {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "zh-CN"; // 设置语言为中文
    recognition.interimResults = false; // 设置只返回最终结果
    recognition.onstart = () => {
      ElMessage({
        message: "开始识别，请说话...",
        type: "warning",
      });
      isRecognizing.value = true;
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      isRecognizing.value = false;
      sqlparse = parseQueryToSql(transcript);
      textarea.value = `语音识别结果: ${transcript}\n解析查询语句: ${sqlparse}`;
    };
    recognition.onerror = function (event) {
      isRecognizing.value = false;
      alert(`语音识别错误: ${event.error}`);
    };
    recognition.onend = () => {
      isRecognizing.value = false;
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
  queryText = queryText.replace("我要查询", "").replace("的顾客。", "");

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
  for (const token of tokens) {
    // 解析条件
    for (const field in fields) {
      if (token.includes(field)) {
        let operator = "";
        let value = "";
        if (token.includes("小于") && !token.includes("等于")) {
          operator = "<";
          value = token.split("小于")[1];
        } else if (token.includes("大于") && !token.includes("等于")) {
          operator = ">";
          value = token.split("大于")[1];
        } else if (
          token.includes("等于") &&
          !token.includes("小于") &&
          !token.includes("大于")
        ) {
          operator = "=";
          value = token.split("等于")[1];
        } else if (token.includes("大于等于")) {
          operator = ">=";
          value = token.split("大于等于")[1];
        } else if (token.includes("小于等于")) {
          operator = "<=";
          value = token.split("小于等于")[1];
        }
        // 处理数值类型的字段
        const column = fields[field];
        let condition = "";
        if (
          [
            "Age",
            "Income",
            "Number_of_Household_Members",
            "Customer_Loyalty",
          ].includes(column)
        ) {
          if (operator != "" && value != "") {
            value = parseInt(value);
            condition = `${column} ${operator} ${value}`;
          }
        } else {
          value = token.split("为")[1];
          // 处理非数值类型的字段
          if (value != "" && value != undefined) {
            condition = `${column} = '${value}'`;
          }
        }
        if (condition != "") {
          conditions.push(condition);
        }
      }
    }
  }
  // 构建SQL查询语句
  let sqlQuery = "";
  if (conditions.length > 0) {
    sqlQuery =
      "SELECT * FROM customer_info_100 WHERE " + conditions.join(" AND ");
    sqlQuery = conditions.join(" AND ");
  } else {
    // 如果没有条件，默认查询所有顾客信息
    sqlQuery = "语音输入格式不正确，请重新输入！";
  }

  return sqlQuery;
};

const handleAdvancedQuery = () => {
  if (
    !isVolume &&
    (column.value == "" ||
      compare.value == "" ||
      givedata.value == "" ||
      logic.value == "")
  ) {
    ElNotification({
      title: "Error",
      message: "查询条件不完整！",
      type: "error",
    });
    return;
  }
  console.log("查询", sqlparse);
  axios
    .post("http://localhost:5000/", {
      sql: "SELECT * FROM customer_info_100 WHERE " + sqlparse,
    })
    .then((response) => {
      queryStore.table = response.data;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  disable.value = false;
  logic.value = "";
  isVolume = false;
  sqlparse = "";
};

function setQueryField(value) {
  options2.value = option[value];
}

function logicInputChange(value) {
  setStrSQL(column.value);
  setStrSQL(compare.value);
  setStrSQL(givedata.value);
  if (value == "无") {
    disable.value = true;
  } else {
    disable.value = false;
    column.value = "";
    compare.value = "";
    givedata.value = "";
    setStrSQL(value);
  }
  console.log(sqlparse);
  textarea.value = `查询语句: SELECT * FROM customer_info_100 WHERE ${sqlparse}`;
}

function setStrSQL(value) {
  switch (value) {
    case "姓名":
      sqlparse = sqlparse + "Name ";
      break;
    case "性别":
      sqlparse = sqlparse + "Gender ";
      break;
    case "年龄":
      sqlparse = sqlparse + "Age ";
      break;
    case "收入":
      sqlparse = sqlparse + "Income ";
      break;
    case "地区":
      sqlparse = sqlparse + "Region ";
      break;
    case "职业":
      sqlparse = sqlparse + "Occupation ";
      break;
    case "教育水平":
      sqlparse = sqlparse + "Education_Level ";
      break;
    case "婚姻状态":
      sqlparse = sqlparse + "Marital_Status ";
      break;
    case "家庭人数":
      sqlparse = sqlparse + "Number_of_Household_Members ";
      break;
    case "顾客忠诚度":
      sqlparse = sqlparse + "Customer_Loyalty ";
      break;
    case "=":
    case "<":
    case "<=":
    case ">":
    case ">=":
    case "!=":
    case "like":
    case "not like":
    case "is null":
    case "in":
    case "not in":
      sqlparse = sqlparse + value + " ";
      break;
    case "and":
    case "or":
      sqlparse = sqlparse + " " + value + " ";
      break;
    default:
      let str = /^\d+$/.test(value) ? value : `'` + value + `'`;
      sqlparse = sqlparse + str;
      break;
  }
}
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
