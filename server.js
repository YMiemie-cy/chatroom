const express = require("express");
const http = require("http");

const socketIO = require("socket.io");
const cors = require("cors"); // 引入 cors 模块

// 创建一个 Express 应用程序
const app = express();

// 使用 cors 中间件
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // 允许访问的域名
  res.header("Access-Control-Allow-Credentials", true); // 允许携带 cookie
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // 允许的 HTTP 方法
  res.header("Access-Control-Allow-Headers", "Content-Type"); // 允许的请求头
  next();
});

// 创建一个 HTTP 服务器，并将 Express 应用程序作为回调函数传入
const server = http.createServer(app);

// 创建一个 Socket.IO 服务器，并将 HTTP 服务器作为参数传入
const io = socketIO(server, { cors: true });

// 用于存储在线的用户
let users = [];

// 获取在线用户列表
app.get("/users/online", (req, res) => {
  const onlineUsers = Object.values(users);
  res.json(onlineUsers);
});

// 当有用户连接时触发
io.on("connection", socket => {
  console.log("A user connected:", socket.id);

  // 当有新用户加入时触发
  socket.on("join", user => {
    console.log(user.name + " joined the chat.");

    // 将新用户加入到用户列表中
    users.push(user);
    console.log(users);

    // 广播一条新用户加入的消息
    socket.broadcast.emit("user-joined", user);
  });

  // 处理客户端发送的私聊消息
  socket.on("private-message", ({ to, message }) => {
    // 向指定的客户端发送私聊消息
    io.to(to).emit("private-message", {
      from: socket.id, // 发送者的 socket id
      message, // 消息内容
    });

    //   // 将消息广播给所有在线用户（除了发送者）
    socket.broadcast.emit("message", message, socket.id);
  });

  // // 当有用户发送消息时触发
  // socket.on("message", message => {
  //   console.log("New message:", message);

  //   // // // 查找指定的socket连接对象
  //   // const targetSocket = io.sockets.connected[message.toUserId];
  //   // console.log("xxxxx", targetSocket);

  //   // 将消息广播给所有在线用户（除了发送者）
  //   socket.broadcast.emit("message", message);
  // });

  // 当有用户断开连接时触发
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // 将断开连接的用户从用户列表中移除
    const user = users.map(item => {
      return item.id === socket.id;
    });
    if (user) {
      // delete users[socket.id];
      users = users.filter(item => {
        return item.id !== socket.id;
      });

      // 广播一条用户离开的消息
      // socket.broadcast.emit("user-left", user);
    }
  });
});

// 监听 3000 端口
server.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
