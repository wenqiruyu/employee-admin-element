<template>
  <div class="findPassword">
    <div class="find-title">
      <div class="find-title-msg">企业员工后台管理系统</div>
    </div>
    <div style="width: 500px; margin: 0 auto;">
      <el-steps :active="active">
        <el-step title="确认账号" description="此处信息必填"></el-step>
        <el-step title="重置密码" description="此处信息必填"></el-step>
        <el-step title="重置成功" description="返回登录"></el-step>
      </el-steps>
    </div>
    <div style="margin-top: 40px;">
      <div v-if="active == 1" style="width: 600px; margin: 0 auto;">
        <div style="width: 400px; margin-left: 50px;">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item prop="email" label="邮箱号">
              <el-input v-model="ruleForm.email" placeholder="请输入绑定的邮箱号"></el-input>
            </el-form-item>
            <el-form-item prop="emailVerify" label="验证码">
              <el-input v-model="ruleForm.emailVerify" placeholder="请输入邮箱验证码" style="width: 178px;"></el-input>
              <el-button
                type="primary"
                @click="sendVerifyEmail('ruleForm')"
                size="medium"
                v-bind:disabled="sty"
                style="margin-left: 5px;"
              >
                <span v-show="show">发送验证码</span>
                <span v-show="!show" class="count">{{count}} s后重试</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="width: 300px; margin-left: 150px; margin-top: 50px;">
          <el-button type="primary" @click="goToLogin" size="medium">返回登录</el-button>
          <el-button type="primary" @click="nextSubmitOne('ruleForm')" size="medium">下一步</el-button>
        </div>
      </div>
      <div v-if="active == 2" style="width: 600px; margin: 0 auto;">
        <div style="width: 400px; margin-left: 50px;">
          <el-form :model="restPassword" status-icon :rules="restPasswordRules" ref="restPassword" label-width="100px">
            <el-form-item prop="newPassord" label="新密码">
              <el-input v-model="restPassword.newPassord" type="password" placeholder="请输入新的密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" label="确认密码">
              <el-input v-model="restPassword.checkPass" type="password" placeholder="请再次输入密码" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="width: 300px; margin-left: 150px; margin-top: 50px;">
          <el-button type="primary" @click="backSubmit">上一步</el-button>
          <el-button type="primary" @click="nextSubmitTwo('restPassword')" size="medium">下一步</el-button>
        </div>
      </div>
      <div v-if="active == 3" style="width: 600px; margin: 0 auto;">
        <div style="width: 500px;">
          <div style="margin-left: 100px; margin-top: 30px;">
            <i class="el-icon-circle-check"></i>
            <span>重置密码成功，你可以使用新密码进行登录啦</span>
          </div>
        </div>
        <div style="width: 300px; margin-left: 200px; margin-top: 50px;">
          <el-button type="primary" @click="goToLogin" size="medium">返回登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var regEmail = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
    const validateEmail = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('邮箱号不能为空哦'))
      } else if (!regEmail.test(value)) {
        callback(new Error('请输入正确的邮箱号'))
      } else if (regEmail.test(value)) {
        this.sty = false
        callback()
      }
    }
    const validateEmailVerify = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('验证码不能为空哦'))
      } else if (value.length != 6) {
        callback(new Error('验证码是六位数的哦'))
      } else if (this.isSendSucc) {
        this.isSendSucc = false
        callback(new Error('验证邮箱发送成功，请查收'))
      } else {
        callback()
      }
    }
    const validateNewPassord = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.restPassword.checkPass !== '') {
            this.$refs.restPassword.validateField('checkPass');
          }
        callback()
      }
    }
    const validateRestPwd = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请再次输入密码'));
        } else if (value !== this.restPassword.newPassord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    }
    return {
      ruleForm: {
        email: null,
        emailVerify: ''
      },
      restPassword: {
        newPassord: '',
        checkPass: ''
      },
      timer: null,
      count: '', // 初始化次数
      show: true,
      sty: true,
      isSendSucc: false,
      active: 1,
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        emailVerify: [{ validator: validateEmailVerify, trigger: 'blur' }]
      },
      restPasswordRules: {
        newPassord: [{ validator: validateNewPassord, trigger: 'blur' }],
        checkPass: [{ validator: validateRestPwd, trigger: 'blur' }]
      }
    }
  },
  methods: {
    sendVerifyEmail(name) {
      var TIME_COUNT = 60 //更改倒计时时间
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.sty = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            this.sty = false
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }

      this.$axios
        .post('/employee-admin-server/user/getEmail', {
          email: this.ruleForm.email
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$axios
              .post('/employee-admin-server/user/sendVerifyEmail', {
                email: this.ruleForm.email
              })
              .then(resp => {
                if (resp.data.code == 200) {
                  this.isSendSucc = ture
                  this.$refs.ruleForm.validateField('emailVerify')
                } else {
                  this.$message.error(resp.data.msg)
                }
              })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    goToLogin() {
      this.$router.push('/login')
    },
    nextSubmitOne(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios
            .post('/employee-admin-server/user/verifyEmail', {
              email: this.ruleForm.email,
              verifyCode: this.ruleForm.emailVerify
            })
            .then(res => {
              if (res.data.code == 200) {
                this.active += 1
              } else {
                this.$message.error(res.data.msg)
              }
            })
        }
      })
    },
    nextSubmitTwo(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios
            .post('/employee-admin-server/user/restPassword', {
              email: this.ruleForm.email,
              newPassword: this.restPassword.newPassord
            })
            .then(res => {
              if (res.data.code == 200) {
                this.active += 1
              } else {
                this.$message.error(res.data.msg)
              }
            })
        }
      })
    },
    backSubmit() {
      this.active -= 1
    }
  }
}
</script>

<style scoped>
.find-title {
  width: 100%;
  height: 90px;
}
.find-title-msg {
  font-size: 24px;
  margin-top: 40px;
  margin-left: 600px;
}
</style>
