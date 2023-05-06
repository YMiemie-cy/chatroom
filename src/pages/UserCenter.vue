<template>
  <div id="userCenter">
    <div class="close" @click="close"></div>
    <section class="box">
      <div class="userForm">
        <el-form
          :model="userInformation"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userInformation.nickname" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="学校" prop="school">
            <el-input v-model="userInformation.school" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="专业" prop="specialized">
            <el-input v-model="userInformation.major" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="userInformation.age"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-input v-model="userInformation.sex" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="个人标签" prop="label">
            <el-input v-model="userInformation.tag" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="个性签名" prop="signature">
            <el-input v-model="userInformation.selfTag" autocomplete="off"></el-input>
          </el-form-item>

          <div class="avatar-upload">
            <label for="upload" class="custom-file-upload">
              <i class="fa fa-cloud-upload"></i>
              头像上传
            </label>
            <input
              id="upload"
              type="file"
              @change="handleUpload"
              style="display: none"
              accept="image/*"
              ref="uploadInput"
            />
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { getLogin } from "../api";
export default {
  name: "userCenter",
  components: {},
  mounted() {
    console.log("xxxxxxxxxxxx", JSON.parse(window.localStorage.getItem("user")).token.id);
  },
  props: {
    userInformation: {
      type: Object,
      default: {},
    },
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      callback();
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error("请输入数字值"));
      //   } else {
      //     if (value < 18) {
      //       callback(new Error("必须年满18岁"));
      //     } else {
      //       callback();
      //     }
      //   }
      // }, 1000);
    };
    var validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      }
      callback();
    };
    var validateSchool = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入学校"));
      }
      callback();
    };
    var validateSpecialized = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入专业"));
      }
      callback();
    };
    var validateGender = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入性别"));
      }
      callback();
    };
    var validateLabel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入个人标签"));
      }
      callback();
    };
    var validateSignature = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入个性签名"));
      }
      callback();
    };

    return {
      /** test start */

      /** test end */
      rules: {
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        school: [{ validator: validateSchool, trigger: "blur" }],
        specialized: [{ validator: validateSpecialized, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        gender: [{ validator: validateGender, trigger: "blur" }],
        label: [{ validator: validateLabel, trigger: "blur" }],
        signature: [{ validator: validateSignature, trigger: "blur" }],
      },
      fileList: [],
    };
  },
  methods: {
    close() {
      this.$emit("closeUserInfo");
    },
    submitForm(formName) {
      // 数据写入数据库
      const userInfoObj = {
        id: JSON.parse(window.localStorage.getItem("user")).token.id,
        username: JSON.parse(window.localStorage.getItem("user")).token.username,
        nickname: this.userInformation.nickname,
        password: JSON.parse(window.localStorage.getItem("user")).token.password,
        sex: this.userInformation.sex,
        age: this.userInformation.age,
        school: this.userInformation.school,
        major: this.userInformation.major,
        tag: this.userInformation.tag,
        selfTag: this.userInformation.selfTag,
        imgUrl: this.userInformation.imgUrl,
      };

      axios({
        url: "http://localhost:8000/api/update",
        data: userInfoObj,
        method: "post",
      })
        .then(async res => {
          if (res.data.code === 200) {
            /** 更新localstroage user数据 */
            const res2 = await getLogin({
              username: JSON.parse(window.localStorage.getItem("user")).token.username,
              password: JSON.parse(window.localStorage.getItem("user")).token.password,
            });

            if (res2.data.code === 200) {
              const obj = {
                username: JSON.parse(window.localStorage.getItem("user")).token.username,
                token: res2.data.data,
              };
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(obj));
            }
            console.log("update success");
            /** 更新localstroage user数据 */
          } else {
            console.log(res);
            console.log("err");
          }
        })
        .catch(e => console.log(e));

      this.$emit("update:userInformation", this.userInformation);
      this.close();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleUpload() {
      const file = this.$refs.uploadInput.files[0]; // 获取选择的文件对象
      const reader = new FileReader(); // 创建FileReader对象
      reader.readAsDataURL(file); // 读取文件为DataURL
      reader.onload = () => {
        const imgData = reader.result; // 获取DataURL
        console.log(imgData);
        this.userInformation.imgUrl = imgData;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#userCenter {
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
  .box {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);

    .userForm {
      border-radius: 5px;
      width: 500px;
      height: 648px;
      background-color: white;
      box-sizing: border-box;
      padding: 50px 30px 30px 15px;

      :deep(.el-form) {
        width: 100%;
        height: 100%;
      }
    }
  }
  .avatar-upload {
    // margin-bottom: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    .custom-file-upload {
      border: 1px solid #ccc;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
  :deep(.el-form-item__content) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 !important;
  }
}
</style>
