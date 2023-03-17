<template>
  <div id="chatBox">
    <div class="close" @click="close"></div>
    <section class="box">
      <div class="chat-room">
        <div class="user-list">
          <h3>Online Users</h3>
          <ul>
            <li
              v-for="(user, index) in users"
              :key="index"
              @click="pick($event, index)"
              :class="activeIndex == index ? 'active' : ''"
            >
              <img src="../assets/images/default-avatar.png" data-src="" />
              <p>{{ user.name }}</p>
            </li>
          </ul>
        </div>
        <div class="chat-box">
          <div class="messageBox">
            <div
              class="message-list"
              ref="messageList"
              v-for="(user, index) in users"
              :key="index"
              :style="activeIndex == index ? '' : 'display:none'"
            ></div>
          </div>
          <div class="input-box">
            <input type="text" v-model="newMessage" placeholder="Type your message here..." />
            <button @click="sendMessage">Send</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
  name: "chatBox",
  components: {},

  props: ["userInformation"],
  data() {
    return {
      users: [
        {
          id: "",
          name: "qq",
          imgUrl: "xxxxxxxx",
        },
      ],
      activeIndex: -1,
      messages: [],
      recMessages: [],
      newMessage: "",
      socket: null,
      currentUser: {
        id: "",
        name: "",
        imgUrl: "xxxxx",
      },
      targets: {
        id: "",
        name: "",
      },
    };
  },
  created() {
    this.currentUser = {
      name: this.userInformation.nickName,
      imgUrl: this.userInformation.imgUrl,
    };
  },
  mounted() {
    // 连接 Socket.IO 服务器
    this.socket = io("http://localhost:3000");

    // 监听连接成功事件
    this.socket.on("connect", () => {
      this.currentUser = {
        id: this.socket.id,
        name: this.currentUser.name,
        imgUrl: this.currentUser.imgUrl,
      };
      console.log("Connected to server:", this.socket.id);
      this.joinChatRoom();
      this.getOnlineUsers();
    });

    // 监听新用户加入事件
    this.socket.on("user-joined", user => {
      console.log("New user joined:", user);

      this.users.push(user);
    });

    // 监听用户离开事件
    this.socket.on("user-left", user => {
      console.log("User left:", user);

      this.users = this.users.filter(item => {
        return item.id !== user.id;
      });
      this.activeIndex = -1;

      // this.$delete(this.users, this.socket.id);
    });

    // 监听服务端发送的私聊消息
    this.socket.on("private-message", message => {
      console.log("Received private message:", message);
      // 处理接收到的私聊消息
      this.recMessages.push(message.message);

      const text = `
            <div class="recMessages">
              ${message.message.content}: 
              <strong>${message.message.sender}</strong>
            </div>
      `;
      this.users.forEach((item, index) => {
        if (item.id === message.from && this.activeIndex === -1) {
          this.$refs.messageList[index].insertAdjacentHTML("beforeend", text);
        }
      });
      this.$refs.messageList[this.activeIndex].insertAdjacentHTML("beforeend", text);
    });
  },
  methods: {
    close() {
      this.$emit("closeChatBox");
    },
    pick(e, i) {
      const nikeName = e.currentTarget.children[1].textContent;
      this.activeIndex = i;
      this.users.forEach(item => {
        if (item.name === nikeName) {
          this.targets = {
            id: item.id,
            name: nikeName,
          };
        }
      });
    },
    // 获取在线用户列表
    getOnlineUsers() {
      axios.get("http://localhost:3000/users/online").then(res => {
        // 过滤掉当前用户
        this.users = res.data.filter(item => {
          if (item.id !== this.currentUser.id) {
            return item;
          }
        });
      });
    },
    // 加入聊天室
    joinChatRoom() {
      this.socket.emit("join", this.currentUser);
    },
    // 发送消息
    sendMessage() {
      if (this.newMessage.trim() === "") {
        return;
      }
      // const res = this.getOnlineUsers();
      // console.log("zzzzzz", res);

      const message = {
        sender: this.currentUser.name,
        content: this.newMessage.trim(),
      };

      // 客户端向服务端发送消息
      this.socket.emit("private-message", {
        to: this.targets.id, // 指定接收者的 socket id
        message: message, // 消息内容
      });

      const text = `
            <div class="messages">
              <strong>${message.sender}</strong>
              : ${message.content}
            </div>
      `;

      this.$refs.messageList[this.activeIndex].insertAdjacentHTML("beforeend", text);
      // 将消息添加到本地消息列表中
      this.messages.push(message);

      // 清空输入框
      this.newMessage = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#chatBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 9000;
  top: 0;
  display: flex;
  flex-direction: column;

  .close {
    width: 18px;
    height: 18px;
    cursor: pointer;
    float: right;
    position: fixed;
    overflow: hidden;
    margin-top: 10px;
    z-index: 9999;
    top: 0;
    right: 10px;
    &:after {
      width: 100%;
      position: absolute;
      height: 1.5px;
      background: #fff;
      content: "";
      top: 9px;
      left: 0;
      transform: rotate(134deg);
      -ms-transform: rotate(134deg);
      -moz-transform: rotate(134deg);
      -webkit-transform: rotate(134deg);
      -o-transform: rotate(134deg);
    }

    &:before {
      width: 100%;
      position: absolute;
      height: 1.5px;
      background: #fff;
      content: "";
      top: 9px;
      right: 0;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
    }
  }

  .active {
    background: #c6c7c8;
  }
  .box {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }

  .chat-room {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 700px;
    width: 938px;
    border-radius: 5px;
    background: #fff;
  }

  .user-list {
    width: 200px;
    background: #e5e4e4;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    ul {
      flex: 1;
      overflow: auto;
      li {
        width: 100%;
        height: 50px;
        display: flex;
        &:hover {
          background: #cfcfcf;
        }
        img {
          box-sizing: border-box;
          width: 50px;
          height: 50px;
        }
        p {
        }
      }
    }
  }

  .chat-box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
  }

  .messageBox {
    flex: 1;
    .message-list {
      flex-grow: 1;
      overflow-y: auto;
      padding: 10px;
      ::v-deep(.message) {
        margin-bottom: 10px;
      }
      ::v-deep(.recMessages) {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      }
    }
  }

  .input-box {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 5px;
  }

  input[type="text"] {
    flex-grow: 1;
    margin-right: 10px;
    padding: 5px;
    border: none;
    border-radius: 3px;
  }
}
</style>
