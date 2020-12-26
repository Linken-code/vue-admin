<template>
  <div id="login">
    <!--内容区-->
    <div class="login-warp">
      <ul class="menu-tab">
        <li class="current"
            v-for="item in menuTab"
            :key="item.id"
            :class="{'current':item.currnet}"
            @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <!--表单区-->
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               class="login-Form"
               size="medium ">
        <el-form-item prop="username"
                      class="item-From">
          <label for="username">邮箱<label>
              <el-input type="text"
                        v-model="ruleForm.username"
                        autocomplete="off"
                        id="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="password">密码<label>
              <el-input type="password"
                        v-model="ruleForm.password"
                        autocomplete="off"
                        minlength="6"
                        maxlength="16"
                        id="password"></el-input>
        </el-form-item>
        <el-form-item prop="passwords">
          <label>重复密码<label>
              <el-input type="password"
                        v-model="ruleForm.passwords"
                        autocomplete="off"
                        minlength="6"
                        maxlength="16"
                        v-show="this.module==='register'"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label>验证码<label>
              <el-row :gutter="10">
                <el-col :span="15">
                  <el-input v-model.number="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="9">
                  <el-button type="success"
                             class="block"
                             minlength="6"
                             maxlength="6"
                             @click="getSms()">获取验证码</el-button>
                </el-col>
              </el-row>

        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     @click="submitForm('ruleForm')"
                     class="block login-btn"
                     :disabled="loginButtonStatus">{{this.module ==='login'?"登录":"注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { GetSms } from '@api/login.js'
import { stripscript, validateEmail, validatePass, validateCode } from '@/utils/validate.js';
export default {
  name: "login",
  data () {
    //验证邮箱
    var validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (validateuserEmail(value)) {
        callback(new Error('邮箱格式有误'));
      }
      else {
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      //过滤后的数据，用来防止xss攻击
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (validatePass(value)) {
        callback(new Error('密码为8-16个字符，至少1个大写字母，1个小写字母和1个数字'));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePasswords = (rule, value, callback) => {
      //如果模块值为login，直接通过验证
      if (this.module === 'login') { callback(); }
      //过滤后的数据，用来防止xss攻击
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.ruleForm.password) {
        callback(new Error('重复密码不正确'));
      } else {
        callback();
      }
    };
    //验证码
    var checkCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      } else if (validateCode(value)) {
        callback(new Error('验证码格式有误'));
      } else {
        callback();
      }

    };
    return {
      //模块值
      module: 'register',
      //登录按钮禁用状态
      loginButtonStatus: true,
      //表单头
      menuTab: [
        { txt: '登录', currnet: true, type: 'login' },
        { txt: '注册', currnet: false, type: 'register' }],
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateusername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  //挂载完成后自动执行的
  mounted () {

  },
  //写函数的地方
  methods: {
    //点击高亮
    toggleMenu (item) {
      this.menuTab.forEach(elem => { elem.currnet = false });
      item.currnet = true
      //修改模块值
      this.module = item.type
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getSms () {
      //进行提示
      if (this.ruleForm.username == '') {
        this.$message.error('邮箱不能为空！');
        return false
      }
      if (validateuserEmail(this.ruleForm.username)) {
        this.$message.error('邮箱格式有误，请重新输入！');
        return false
      }
      //请求的接口数据
      let data = {
        username: this.ruleForm.password,
        module: 'login'
      }
      //获取验证码
      GetSms(data).then(response => {

      }).catch(error => {

      })
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-Form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-From {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
