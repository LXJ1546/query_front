//创建相关的小仓库
import { defineStore } from "pinia";
//创建小仓库
const useQueryStore = defineStore("query", {
  //小仓库存储数据地方
  state: () => {
    return {
      table: [],
    };
  },
  //处理异步|逻辑地方
  actions: {},
  getters: {},
});
//对外暴露小仓库
export default useQueryStore;
