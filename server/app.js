// 服务入口
const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();
// 挂载跨域中间件
app.use(cors());

/**  配置包体解析格式 **/

// 只能解析 application/x-www-form-url-urlencoded
app.use(express.urlencoded({ extended: false }));

// 配置解析json
app.use(express.json());

// 抽离冗余代码
/**
app.use((req, res, next) => {
    res.cc = function(err, code=500) {
        // code = 500 默认值500 错误
        res.send({
            code,
            message: err instanceof Error ? err.message : err,
        });
    }
    next(); 
});

 **/

// 挂载路由
app.use("/api", router);

// 启动服务本机环回地址+8000端口
app.listen(8000, () => {
  console.log("server start at localhost:8000");
});
