//仓库大仓库
import { createPinia } from "pinia";
//创建大仓库
const pinia = createPinia();
//对外暴露：入口文件需要安装仓库，在入口文件中注册大仓库，记得在入口文件注册
export default pinia;
