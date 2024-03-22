<template>
  <div class="allpage">
    <div class="container">
      <Header />
      <div class="middle">
        <SideBar />
        <Middle />
      </div>
      <div class="footer">
        <div class="table_container">
          <el-table
            :data="queryStore.table"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="Customer_ID" label="顾客ID" />
            <el-table-column prop="Name" label="姓名" />
            <el-table-column prop="Gender" label="性别" />
            <el-table-column prop="Age" label="年龄" />
            <el-table-column prop="Income" label="收入" />
            <el-table-column prop="Region" label="地区" />
            <el-table-column prop="Contact_Information" label="联系方式" />
            <el-table-column prop="Occupation" label="职业" />
            <el-table-column prop="Education_Level" label="教育水平" />
            <el-table-column prop="Marital_Status" label="婚姻状态" />
            <el-table-column
              prop="Number_of_Household_Members"
              label="家庭人数"
            />
            <el-table-column prop="Interests_and_Hobbies" label="兴趣爱好" />
            <el-table-column prop="Customer_Loyalty" label="顾客忠诚度" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/header/index.vue";
import SideBar from "../components/sidebar/index.vue";
import Middle from "../components/middle/index.vue";
import useQueryStore from "../store/query";
const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex % 4 === 1) {
    return "warning-row";
  } else if (rowIndex % 4 === 3) {
    return "success-row";
  }
  return "";
};
const queryStore = useQueryStore();
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
      display: flex;
    }
    .footer {
      background: white;
      height: calc(100vh - $base-sidebar-height - $base-header-width);
      margin: 8px;
      border: 1px solid rgb(183, 183, 186);
      overflow: auto;
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
