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
            <el-input v-model="userInformation.nickName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="学校" prop="school">
            <el-input v-model="userInformation.school" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="专业" prop="specialized">
            <el-input v-model="userInformation.specialized" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="userInformation.age"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-input v-model="userInformation.gender" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="个人标签" prop="label">
            <el-input v-model="userInformation.label" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="个性签名" prop="signature">
            <el-input v-model="userInformation.signature" autocomplete="off"></el-input>
          </el-form-item>

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
export default {
  name: "userCenter",
  components: {},
  mounted() {
    console.log("xxxxxxxxxxxx", this.userInformation);
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
      rules: {
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        school: [{ validator: validateSchool, trigger: "blur" }],
        specialized: [{ validator: validateSpecialized, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        gender: [{ validator: validateGender, trigger: "blur" }],
        label: [{ validator: validateLabel, trigger: "blur" }],
        signature: [{ validator: validateSignature, trigger: "blur" }],
      },
    };
  },
  methods: {
    close() {
      this.$emit("closeUserInfo");
    },
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //     console.log("formName", formName);
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      this.$emit("update:userInformation", this.userInformation);
      this.close();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      height: 600px;
      background-color: white;
      box-sizing: border-box;
      padding: 50px 30px 30px 15px;

      :deep(.el-form) {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
