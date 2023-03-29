/**  用户接口 **/
const { renderSync } = require("node-sass");
const db = require("../db");

// 更新
exports.userUpdate = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const sex = req.body.sex;
  const age = req.body.age;
  const school = req.body.school;
  const major = req.body.major;
  const tag = req.body.tag;
  const selfTag = req.body.selfTag;
  const imgUrl = req.body.imgUrl;

  let sql =
    "update t_user set username=?, password=?, nickname=?, sex=?, age=?, school=?, major=?, tag=?, selfTag=?, imgUrl=?";

  db.query(
    sql,
    [username, password, nickname, sex, age, school, major, tag, selfTag, imgUrl],
    (err, result) => {
      if (err) return res.send({ code: 500, message: "失败" });

      if (result.affectedRows === 1)
        return res.send({ code: 200, message: "ok", data: "更改成功" });

      return res.send({ code: 500, message: "失败" });
    }
  );
};

// 注册接口控制器
exports.reg = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const sex = req.body.sex;
  const age = req.body.age;
  const school = req.body.school;
  const major = req.body.major;
  const tag = req.body.tag;
  const selfTag = req.body.selfTag;
  const imgUrl = req.body.imgUrl;

  if (!username || !password) {
    res.send({ code: 500, message: "参数不完整-注册失败" });
  }

  // 合法性校验
  let userExistSql = "select * from t_user where username = ?";
  db.query(userExistSql, username, (err, result) => {
    if (err) {
      return res.send({ code: 500, message: "数据库异常" });
    }
    if (result.length > 0) {
      return res.send({ code: 500, message: "用户已注册" });
    }

    // 写入数据库
    let insertSql = "insert into " + "t_user(username, password) " + "values(?, ?)";

    db.query(insertSql, [username, password], (err, result) => {
      if (err) {
        return res.send({ code: 500, message: "SQL执行异常" });
      }
      if (result.affectedRows === 1) {
        return res.send({ code: 200, message: "注册成功" });
      }
      return res.send({ code: 500, message: "注册失败" });
    });
  });
};

// 登录接口控制器
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send({ code: 500, message: "参数不完整" });
  }
  db.query(
    "select * from t_user where username=? and password=?",
    [username, password],
    (err, result) => {
      if (err) {
        return res.send({ code: 500, message: "sql执行异常" });
      }
      if (result.length !== 1) {
        console.log(result);
        return res.send({ code: 500, message: "用户名或密码错误" });
      }
      return res.send({ code: 200, message: "登录成功", data: result[0] });
    }
  );
};
