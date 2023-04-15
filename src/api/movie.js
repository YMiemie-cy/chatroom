import axios from "../plugins/axios";

const serverBaseUrl = "http://localhost:8000/api";

export const articlePublish = async (userId, content) =>
  axios({
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: { userId: userId, content: content },
    url: `${serverBaseUrl}/article-publish`,
  });

// export const getUserList = async () => axios.get(`${serverBaseUrl}/article-list`);

export const publishReview = async (userId, articleId, content) =>
  axios({
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: { userId: userId, articleId: articleId, content: content },
    url: `${serverBaseUrl}/review-add`,
  });

// 获取电影信息列表
export const getNews = async () => axios.get("/news/nc/article/headline/T1348647853363/0-40.html");
