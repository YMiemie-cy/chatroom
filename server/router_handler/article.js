/**  文章接口 **/
const { renderSync } = require("node-sass");
const db = require("../db");

const err = { code: 500, message: "err" };

/**  返回所有的文章 **/
exports.articleList = (req, res) => {
  let sql = "select * from t_chat_circle";

  db.query(sql, (err, result) => {
    if (err) return res.send({ code: 500, message: "sql执行异常" });
    return res.send({ code: 200, message: "ok", data: result });
  });
};
/** 返回所有的文章 **/

/** 发布一条朋友圈 **/
exports.articlePublish = (req, res) => {
  const userId = req.body.userId;
  const content = req.body.content;

  if (!userId || !content) {
    return res.send({ code: 500, message: "参数不完整" });
  }

  let sql = "insert into t_chat_circle (userId, content) values(?, ?)";
  db.query(sql, [userId, content], (err, result) => {
    if (err) return res.send({ code: 500, message: "sql执行异常" });
    if (result.affectedRows !== 1) return res.send({ code: 500, message: "发布失败" });
    return res.send({ code: 200, message: "发布成功" });
  });
};
/** 发布一条朋友圈 **/

/** 点赞 人 **/
exports.goodInvoke = (req, res) => {
  const articleId = req.query.articleId;
  if (!articleId) {
    return res.send({ code: 500, message: "点赞失败" });
  }
  db.query("select * from t_chat_circle where id = ?", [articleId], (e, r) => {
    {
      if (e) return res.send({ code: 500, message: "点赞失败" });

      const articleObj = r[0];
      const userId = articleObj.userId;

      db.query("update t_user set goodCount = goodCount + 1 where id = ?", [userId], (e, r) => {
        if (e) return res.send({ code: 500, msg: "点赞数更新失败" });
        return res.send({ code: 500, msg: "ok" });
      });
    }
  });
};
/**  点赞 **/

/** 点赞 帖子 */
exports.goodCountForArticle = (req, res) => {
  const id = req.param.id; // ?id=xxx
  let sql = "update t_chat_circle set goodCount = ?";
  db.query(sql, id, (e, r) => {
    if (e) return res.send(err);

    if (r.affectedRows !== 1) return res.send(err);

    return res.send({ code: 200, message: "点赞成功" });
  });
};

/** 帖子数 */
exports.articleCount = (req, res) => {
  const userId = req.param.userId;

  if (!userId) return res.send({ code: 500, message: "参数不完整" });

  let sql = "select count(*) as `count` from t_chat_circle where userId = ?";

  db.query(sql, userId, (e, r) => {
    if (e) return res.send({ code: 500, message: "error" });

    return res.send({ code: 200, message: "ok", data: r });
  });
};

/** 用户id求点赞总数 */
exports.articleGoodCount = (req, res) => {
  const userId = req.query.userId;
  // console.log(req);

  if (!userId) return res.send({ code: 500, message: "参数不完整" });

  let sql = "select sum(goodCount) AS `count` from t_chat_circle where userId = ?";

  db.query(sql, userId, (e, r) => {
    if (e) return res.send({ code: 500, message: "error" });

    return res.send({ code: 200, message: "ok", data: r });
  });
};

exports.articleCountByUserId = (req, res) => {
  const userId = req.query.userId;
  console.log(req);

  if (!userId) return res.send({ code: 500, message: "参数不完整" });

  let sql = "select count(*) AS `count` from t_chat_circle where userId = ?";

  db.query(sql, userId, (e, r) => {
    if (e) return res.send({ code: 500, message: "sql exception" });

    return res.send({ code: 200, message: "ok", data: r });
  });
};
