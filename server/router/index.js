/** 路由配置模块 **/
const express = require("express");
/**  导入处理函数 **/
const userHandler = require("../router_handler/user");
const articleHandler = require("../router_handler/article");
const reviewHandler = require("../router_handler/review");

/**  实例化路由 **/
const router = express.Router();

/**  挂载路由 start **/

/** base url http://localhost:8000/api */
/** user start **/
// ==> /api/register
router.post("/register", userHandler.reg);
// ==> /api/login
router.post("/login", userHandler.login);
// --> 更新用户数据
router.post("/update", userHandler.userUpdate);
router.get("/user-list", userHandler.userList);
/** user end **/

/** article start **/
//  ==> /api/article-publish
router.post("/article-publish", articleHandler.articlePublish);
// ==> /api/article-list
router.get("/article-list", articleHandler.articleList);
// 点赞 ==> /api/good-invoke?articleId=
router.get("/good-invoke", articleHandler.articleGoodCount);
// 发布数
router.get("/publish-count", articleHandler.articleCountByUserId);

// 点赞
router.get("/post-good-add", articleHandler.goodCountForArticle);
/** article end **/

/** review start **/ router.post("/review-add", reviewHandler.reviewInsert);
router.get("/review-list-by-userId", reviewHandler.reviewListByUserId);
router.get("/review-list-by-articleId", reviewHandler.reviewListByArticleId);

router.get("/review-all-count-by-aid", reviewHandler.postReviewCount);

router.get("/review-list-by-post-id", reviewHandler.reviewListByPostId);
/** review end**/

/**  挂载路由 end **/

/** 导出模块 **/
module.exports = router;
