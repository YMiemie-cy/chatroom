/**  评论接口 **/
const db = require("../db");

/** 评论接口 **/
// 新建
exports.reviewInsert = (req, res) => {
  const userId = req.body.userId;
  const articleId = req.body.articleId;
  const content = req.body.content;

  if (!userId || !articleId || !content) {
    return res.send({ code: 500, message: "参数不完整" });
  }

  let sql = "insert into t_review(userId, articleId, content) values(?, ?, ?)";
  db.query(sql, [userId, articleId, content], (e, r) => {
    if (e) return res.send({ code: 500, message: "sql执行失败" });
    if (r.affectedRows !== 1) {
      res.send({ code: 500, message: "评论失败" });
    }
    res.send({ code: 200, message: "评论成功" });
  });
};

// 用户id查询
exports.reviewListByUserId = (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.send({ code: 500, message: "参数不完整" });
  }
  let sql = "select * from t_review where userId = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.send({ code: 500, message: "查询失败" });
    }
    return res.send({ code: 200, message: "ok", data: result });
  });
};

// 求帖子的评论数
exports.postReviewCount = (req, res) => {
  const postId = req.query.postId;
  if (!postId) return res.send({ code: 500, message: "参数不完整" });

  let sql =
    "SELECT COUNT(t_review.articleId) AS articleCount, t_review.articleId AS aid FROM t_review GROUP BY t_review.articleId HAVING aid = ?";
  db.query(sql, [postId], (e, r) => {
    if (e) return res.send({ code: 500, msg: "sql exec error" });

    return res.send({ code: 200, msg: "ok", data: r });
  });
};

// 文章id|朋友圈id查询
exports.reviewListByArticleId = (req, res) => {
  const articleId = req.query.articleId;
  if (!articleId) {
    return res.send({ code: 500, message: "参数不完整" });
  }
  let sql = "select * from t_review where articleId = ?";
  db.query(sql, [articleId], (e, r) => {
    if (e) return res.send({ code: 500, message: "查询失败" });
    return res.send({ code: 200, message: "查询成功", data: r });
  });
};
/** 评论接口 **/

/** 帖子id查询评论列表 */
exports.reviewListByPostId = (req, res) => {
  const postId = req.query.postId;

  if (!postId) return res.send({ code: 500, msg: "参数不完整" });

  let sql =
    "SELECT t_review.content AS content, t_user.nickname AS nickname, t_user.imgUrl AS imgUrl FROM t_review, t_user WHERE t_review.userId = t_user.id AND t_review.articleId = ?";

  db.query(sql, [postId], (e, r) => {
    if (e) return res.send({ code: 500, message: "查询失败" });

    return res.send({ code: 200, message: "查询成功", data: r });
  });
};
/** 帖子id查询评论列表 */
