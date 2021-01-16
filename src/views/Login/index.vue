<template>
  <div id="login">
    <!--内容区-->
    <div class="login-warp">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{current:item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <!--表单区-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-Form" size="medium ">
        <el-form-item prop="username" class="item-Form">
          <label for="username">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" id="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="password">密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="16" id="password"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show="model==='register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" minlength="6" maxlength="6" @click="getSms()" :disabled="codeButtonStatus.Status">{{codeButtonStatus.Text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="block login-btn" :disabled="loginButtonStatus">{{model ==='login'?"登录":"注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1'
import { setUserName } from '../../utils/token'
import { GetSms, Register, Login } from '../../api/login.js'
import { stripscript, validateuserEmail, validatePass, validateCode } from '@/utils/validate.js';
export default {
  name: "Login",
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
      if (this.model === 'login') { callback(); }
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
      model: 'login',
      //登录按钮禁用状态,true为禁用
      loginButtonStatus: true,
      //验证码按钮状态
      codeButtonStatus: {
        Status: false,
        Text: '获取验证码'
      },
      //倒计时
      timer: null,
      //表单头
      menuTab: [
        { txt: '登录', current: true, type: 'login' },
        { txt: '注册', current: false, type: 'register' }],
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
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  //写函数的地方
  methods: {
    //修改获取验证按钮状态
    updataButtonStatus (params) {
      this.codeButtonStatus.Status = params.Status
      this.codeButtonStatus.Text = params.Text
    },
    //倒计时函数
    countDown (num) {
      //判断定时器是否存在，存在则清除
      if (this.timer) {
        clearInterval(this.timer)
      }
      let countTime = num
      //倒计时
      this.timer = setInterval(() => {
        countTime--
        if (countTime === 0) {
          clearInterval(this.timer)
          //修改验证码状态         
          this.updataButtonStatus({
            Status: false,
            Text: '重新发送'
          });
        } else {
          this.codeButtonStatus.Text = `倒计时${countTime}秒`
        }
      }, 1000)
    },
    //清除倒计时，还原验证码按钮
    clearCount () {
      //清除定时器
      clearInterval(this.timer)
      //还原验证码按钮
      this.updataButtonStatus({
        Status: false,
        Text: '获取验证码'
      })
    },
    //切换登录或者注册状态，点击高亮
    toggleMenu (item) {
      this.menuTab.forEach(elem => { elem.current = false });
      item.current = true;
      //修改模块值
      this.model = item.type
      //清除表单数据
      this.$refs.loginForm.resetFields();
      //清除定时器
      this.clearCount()

    },
    //提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证通过   
        if (valid) {
          if (this.model === 'login') {
            //登录
            this.login()
          } else {
            //注册
            this.register()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //登录
    login () {
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
        // module: 'login'
      }
      Login(requestData).then(response => {
        let data = response.data
        this.$store.commit('set_username', data.data.username)
        setUserName(data.data.username)
        //页面跳转到控制台
        this.$router.push({
          name: 'Console'
        })
      }).catch(error => {
        //失败
        console.log('失败')
        console.log(error)
      })
    },
    //注册
    register () {
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      }
      //注册接口
      Register(requestData).then(response => {
        let data = response
        this.$message({
          message: data.message,
          type: 'success'
        });
        //注册成功
        this.toggleMenu(this.menuTab[0])
        //清除倒计时
        this.clearCount()
      }).catch(error => {
        //失败时执行
        // alert('注册失败');
      })
      alert('注册成功');
    },
    getSms () {
      //弹出提示信息
      if (this.ruleForm.username == '') {
        this.$message.error('邮箱不能为空！');
        return false
      }
      if (validateuserEmail(this.ruleForm.username)) {
        this.$message.error('邮箱格式有误，请重新输入！');
        return false
      }
      //请求的接口数据
      let requestData = {
        username: this.ruleForm.username,
        module: this.model
      }
      //修改获取验证按钮状态    
      this.updataButtonStatus({
        Status: true,
        Text: '发送中'
      })
      //获取验证码
      GetSms(requestData).then(response => {
        let data = response.data
        this.$message({
          message: data.message,
          type: 'success'
        });
        //启用登录或注册按钮
        this.loginButtonStatus = false;
        //调用定时器，倒计时60秒
        this.countDown(60);
      }).catch(error => {
        this.countDown(60);
        this.loginButtonStatus = false;
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
  .item-Form {
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
