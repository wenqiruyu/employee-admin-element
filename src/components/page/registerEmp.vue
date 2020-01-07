<template>
    <div class="register" >
      <div class="register-form" >
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!--<script>
            export default {
                data() {
                    var checkAge = (rule, value, callback) => {
                        if (!value) {
                            return callback(new Error('年龄不能为空'));
                        }
                        setTimeout(() => {
                            if (!Number.isInteger(value)) {
                                callback(new Error('请输入数字值'));
                            } else {
                                if (value < 18) {
                                    callback(new Error('必须年满18岁'));
                                } else {
                                    callback();
                                }
                            }
                        }, 1000);
                    };
                    var validatePass = (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请输入密码'));
                        } else {
                            if (this.ruleForm.checkPass !== '') {
                                this.$refs.ruleForm.validateField('checkPass');
                            }
                            callback();
                        }
                    };
                    var validatePass2 = (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.ruleForm.pass) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    };
                    return {
                        ruleForm: {
                            pass: '',
                            checkPass: '',
                            age: ''
                        },
                        rules: {
                            pass: [
                                { validator: validatePass, trigger: 'blur' }
                            ],
                            checkPass: [
                                { validator: validatePass2, trigger: 'blur' }
                            ],
                            age: [
                                { validator: checkAge, trigger: 'blur' }
                            ]
                        }
                    };
                },
                methods: {
                    submitForm(formName) {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                alert('submit!');
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    },
                    resetForm(formName) {
                        this.$refs[formName].resetFields();
                    }
                }
            }
        </script>-->
        <!-- v-bind:show-message="isShow"是否显示错误提示 -->
        <!--<Form ref="user" :model="user" :rules="rule">
          <div>
            <FormItem prop="username">
              <Input type="text" size="large" v-model="user.username" placeholder="请输入用户名" clearable>
                <Icon type="ios-contact" slot="prefix"></Icon>
              </Input>
            </FormItem>
          </div>
          <div>
            <FormItem prop="password">
              <Input v-bind:type="pwdType" size="large" v-model="user.password" placeholder="请输入密码">
                <Icon type="ios-lock-outline" slot="prefix"></Icon>
                <Icon v-if="showPwd" type="md-eye" slot="suffix" @click="showPassword"/>
                <Icon v-else type="md-eye-off" slot="suffix" @click="showPassword"/>
              </Input>
            </FormItem>
          </div>
          <div>
            <FormItem prop="phone">
              <Input type="text" size="large" v-model="user.phone" placeholder="请输入手机号" clearable>
                <Icon type="md-phone-portrait" slot="prefix"></Icon>
              </Input>
            </FormItem>
          </div>
          <div>
            <FormItem>
              <Row>
                <Col span="15" v-on:blur="hide()">
                  <FormItem prop="verify">
                    <Input type="text" size="large" v-model="user.verify" placeholder="请输入手机验证码" clearable></Input>
                  </FormItem>
                </Col>
                <Col span="6" offset="1">
                  <FormItem prop="senverify">
                    &lt;!&ndash; disabled按钮为禁止状态 &ndash;&gt;
                    <Button type="primary" size="large" v-model="user.sendverify" @click="getVerify()" v-bind:disabled="sty" >获取验证码</Button>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </div>
          <div class="register-from-checkbox">
            <Checkbox v-model="single">
              <span>我已阅读并同意<a href="">《书斋交易条款》</a>和<a href="">《书斋社区条款》</a></span>
            </Checkbox>
          </div>
          <div class="register-from-button">
            <FormItem>
              <Button type="primary" size="large" @click="handleSubmit('user')" long v-bind:disabled="!single">注册</Button>
            </FormItem>
          </div>
        </Form>-->
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                }
            };
        },
/*        data(){
            var regPhone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else if(this.remindName){
                    this.remindName = false
                    callback(new Error('用户名已经存在'));
                }else{
                    // 通过给标签添加ref，得以获取该标签
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    // 通过给标签添加ref，得以获取该标签
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不能为空'));
                } else if (!regPhone.test(value)) {
                    callback(new Error('请输入正确手机号'));
                } else {
                    // 通过给标签添加ref，得以获取该标签
                    this.sty=false
                    callback();
                }
            };
            const validateVerify = (rule, value, callback) => {
                if (this.remindVerify) {
                    this.remindVerify = false
                    callback(new Error('该手机号已经注册过啦'))
                }else if(this.sendSuccess){
                    this.sendSuccess = false
                    callback(new Error('验证短信发送成功，请查收'))
                } else if (!regPhone.test(this.user.phone)) {
                    callback(new Error('请输入正确手机号'))
                } else if (value === '') {
                    callback(new Error('验证码不能为空'))
                }else {
                    // 通过给标签添加ref，得以获取该标签
                    this.sty=false
                    callback()
                }
            };
            return{
                empId: '',
                // 条款勾选
                single: true,
                // 验证用户名是否已经存在
                remindName: false,
                // 验证发送验证码
                remindVerify: false,
                // 验证码发送成功
                sendSuccess: false,
                // 验证码手机号提示信息
                remindMsg: '',
                // 显示密码
                showPwd: false,
                pwdType: 'password',
                sty: true,
                user:{
                    username:'',
                    password:'',
                    phone:'',
                    verify:'',
                    sendverify:''
                },
                rule: {
                    username: [
                        { validator: validateUser, trigger: 'blur' },
                        { type: 'string', min: 3,max:8, message: '用户名长度应在3到8之间', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度应在6位以上才更安全哦', trigger: 'blur' }
                    ],
                    phone:[
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    verify:[
                        { validator: validateVerify, trigger: 'blur' },
                        { type: 'string', min: 6,max:6, message: '六位验证码不正确哦', trigger: 'blur' }
                    ]
                },
            }
        },*/
        created(){
            this.getEmpId()
        },
        methods: {
            getEmpId(){
                this.$axios.post("/employee-admin-server/emp/getEmpId").then((res)=>{
                    console.log(res.data.data)
                    if(res.data.code == 200){
                        this.empId = res.data.data.empId
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            showPassword(){
                if(this.showPwd){
                    this.showPwd = false
                    this.pwdType = 'password'
                }else{
                    this.showPwd = true
                    this.pwdType = 'text'
                }
            },
            getVerify(){
                this.$axios.get('/user-server/user/sms',{
                    params : {
                        //请求参数
                        phone:this.user.phone
                    }
                }).then((data)=>{
                    var data = data.data
                    // 后台状态码 8 为号码已经注册过了，1成功。0失败
                    if(data.status === 8){
                        this.remindVerify = true
                        this.$refs.user.validateField('verify')
                    }else if(data.status === 1){
                        // 显示验证码提示
                        this.sendSuccess = true
                        this.$refs.user.validateField('verify')
                    }else{
                        this.remindMsg='* ' + data.msg
                    }
                })
            },
            toLogin(){
                this.$router.push({path: '/login'})
            },
            handleSubmit(name){
                var self = this
                this.remindMsg = ''
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 验证用户名是否存在
                        this.$axios.get('/user-server/user/register',{
                            params:{
                                username: this.user.username
                            }
                        }).then((data)=>{
                            var data  = data.data
                            if(data.status == 1){
                                this.$axios.post('/user-server/user/register',{
                                    name: this.user.username,
                                    password: this.user.password,
                                    phone: this.user.phone,
                                    verify: this.user.verify
                                }).then((data) => {
                                    var data = data.data
                                    if(data.status == 1) {
                                        //路由跳转
                                        // self.$router.push({path: '/login'})
                                        window.location.href = "/login"
                                    } else {
                                        this.remindMsg='* ' + data.msg
                                    }
                                })
                            }else{
                                this.remindName = true
                                this.$refs.user.validateField('username')
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .register{
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    height: 550px;
    background-image: url('/src/assets/img/index-bg.jpg');
    outline: 4px solid #F9F9F9;
  }
  /* 标题 */
  .register-title{
    margin-left: 60px;
    margin-top:30px;
    float:left;
    color: #8A8A8A;
    font-size: 18px;
  }
  .register-toLogin{
    float: left;
    margin-top: 30px;
    margin-left: 1000px;
    color: #8A8A8A;
    font-size: 16px;
  }
  /* 错误信息提示位置 */
  .register-remind{
    width: 200px;
    height: 20px;
    float:left;
    color: red;
    text-align: left;
    margin-left: 415px;
    margin-top: 30px;
  }
  .register-form{
    width:320px;
    float:left;
    margin-left:560px;
    margin-top:10px;
  }
  .register-from-checkbox{
    float: left;
    margin-bottom: 20px;
  }
  Input{
    height:50px;
  }
  .register-footer{
    float:left;
  }
</style>
