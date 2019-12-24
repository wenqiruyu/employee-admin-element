<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">启明星后台管理系统</div>
            <div class="ms-remind">{{msg}}</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="iconfont icon-wen-person"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="iconfont icon-wen-password"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                msg: '',
                ruleForm: {
                    username: null,
                    password: null
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = new URLSearchParams()
                        params.append('username', this.ruleForm.username)
                        params.append('password', this.ruleForm.password)
                        this.$axios.post('/employee-admin-server/user/login',params).then((res) => {
                            if(res.data.code == 200){
                                localStorage.setItem('employee_username',this.ruleForm.username)
                                this.$router.push('/index')
                            }else{
                                this.msg = res.data.msg
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #FF0036;
        border-bottom: 1px solid #515A6E;
    }
    .ms-remind{
        font-size: 14px;
        margin-top: 5px;
        height: 15px;
        margin-left: 30px;
        margin-bottom: -15px;
        color: #FF0036;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
</style>