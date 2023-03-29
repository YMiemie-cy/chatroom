import axios from "../plugins/axios";
const serverBaseUrl = "http://localhost:8000/api";

//登录
export const getLogin = async ({ username, password }) =>
  axios({
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: { username: username, password: password },
    url: `${serverBaseUrl}/login`,
  });

//注册
export const postReg = async ({ username, password }) =>
  axios({
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: { username: username, password: password },
    url: "/register",
  });

// 获取用户列表
export const getUserList = async () => axios.get(`${serverBaseUrl}/article-list`);

// 获取用户发布帖子数
export const getACount = async userId =>
  axios.get(`${serverBaseUrl}/publish-count?userId=${userId}`);

// 获取用户被点赞数
export const getGCount = async userId => axios.get(`${serverBaseUrl}/good-invoke?userId=${userId}`);
