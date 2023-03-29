/**  数据中心 **/
const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "admin123", // 此处需要填写你的mysql密码
  database: "chat_room", // 请创建一个chat_room 数据库 => CREATE DATABASE chat_room;
});

module.exports = db;
