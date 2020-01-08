<template>
    <div style="margin-top: 80px;">
        <el-steps :active="active">
            <el-step title="步骤 1" description=""></el-step>
            <el-step title="步骤 2" description=""></el-step>
            <el-step title="步骤 3" description="这段就没那么长了"></el-step>
        </el-steps>
        <div class="yingx">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="500px">
                <el-form-item label="员工姓名" prop="empName">
                    <el-input v-model="ruleForm.empName" autocomplete="off" @change="changeName()" style="width: 240px;float: left;margin-left: 15px;"></el-input>
                </el-form-item>
                <el-form-item label="员工号" prop="empId">
                    <el-input v-model="ruleForm.empId" autocomplete="off" :disabled="true" :placeholder="ruleForm.empId" style="width: 240px;float: left;margin-left: 15px;"></el-input>
                </el-form-item>
                <el-form-item label="平台用户名" prop="username">
                    <el-input v-model="ruleForm.username" autocomplete="off" :disabled="true" style="width: 240px;float: left;margin-left: 15px;">
                        {{this.ruleForm.username}}
                    </el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                    <el-input v-model="ruleForm.pass" autocomplete="off" style="width: 240px;float: left;margin-left: 15px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.checkPass" autocomplete="off" style="width: 240px;float: left;margin-left: 15px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.age" style="margin-left: 15px;">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                            <el-radio :label="2">保密</el-radio>
                        </el-radio-group>
                </el-form-item>
                <el-form-item label="员工邮箱" prop="email">
                    <el-input v-model="ruleForm.email" style="width: 240px;float: left;margin-left: 15px;"></el-input>
                </el-form-item>
                <el-form-item label="户籍所在地" prop="province">
                    <div style="float: left;margin-left: 15px;width: 360px;">
                        <div style="float: left;width: 120px;">
                            <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                                <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value">
                                    {{ item.label }}
                                </el-option>
                            </el-select>
                        </div>
                        <div style="float: left;width: 120px;">
                            <el-select v-model="ruleForm.city" placeholder="城市" @change="changeCity">
                                <el-option v-for="(item,index) in citiesArr" :key="item.value" :value="item.value">
                                    {{ item.label }}
                                </el-option>
                            </el-select>
                        </div>
                        <div style="float: left;width: 120px;">
                            <el-select v-model="ruleForm.county" placeholder="区县">
                                <el-option v-for="(item,index) in countyArr" :key="item.value" :value="item.value">
                                    {{ item.label }}
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
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
                active: 1,
                provinceArr: [],
                citiesArr: [],
                countyArr: [],
                ruleForm: {
                    empName: '',
                    empId: '',
                    username: '',
                    pass: '',
                    checkPass: '',
                    age: '',
                    province: '',
                    city: '',
                    county: ''
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
            this.getProvince()
        },
        methods: {
            getProvince(){
                this.$axios.get('http://localhost:8080/static/json/provinces.json').then((res) => {
                    this.provinceArr = res.data.data
                    console.log(this.provinceArr)
                })
            },
            changeProvince(val){
                for(var i=0; i<this.provinceArr.length; i++){
                    if(val == this.provinceArr[i].value ){
                        this.citiesArr = this.provinceArr[i].children
                        this.ruleForm.city = ''
                        this.ruleForm.county = ''
                        this.countyArr = []
                    }
                }
            },
            changeCity(val){
                for(var i=0; i<this.citiesArr.length; i++){
                    if(val == this.citiesArr[i].value ){
                        this.countyArr = this.citiesArr[i].children
                    }
                }
            },
            getEmpId(){
                this.$axios.post("/employee-admin-server/emp/getEmpId").then((res)=>{
                    console.log(res.data.data)
                    if(res.data.code == 200){
                        if(res.data.data.empId != null){
                            this.ruleForm.empId = res.data.data.empId
                        }else{
                            this.$message.error("员工号获取失败，请联系开发人员进行排查问题")
                        }
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
            changeName(){
                this.ruleForm.username = this.ruleForm.empName + this.ruleForm.empId
                console.log(this.ruleForm.username + "111")
            },
            submitForm(){
                $(yingx).style.display
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

<style>
  .register{
    background-image: url('/src/assets/img/index-bg.jpg');
  }
  .el-input .el-input--medium .el-input--suffix{
      width: 60px;
  }
</style>
