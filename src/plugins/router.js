// 引入vue
import Vue from "vue";

// 引入路由包
import VueRouter from "vue-router";

// 安装插件到vue上
Vue.use(VueRouter);

// 引入组件
import Home from "../pages/Home";
// import User from "../pages/User";
import Login from "../pages/Login";

// 路由配置
let routes = [
  { path: "/home", component: Home },
  // { path: "/user", component: User },
  { path: "/login", component: Login },
  { path: "/", redirect: "/home" },
];

// 路由实例
let router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("user");
  // 守卫业务
  console.log(to);
  if (to.path === "/home" && token) {
    //判断是不是登录了
    next();
  } else if (to.path === "/login") {
    next();
  } else {
    next("/login");
  }
});

// 导出路由实例，让他去控制vue根
export default router;
