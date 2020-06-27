<template>
    <div class="table" >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-wen-team"></i> 流程管理</el-breadcrumb-item>
                <el-breadcrumb-item>请假流程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="width: 600px; margin: 0 auto; height: 500px;">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px">
                    <el-form-item label="账号原密码" prop="password" autocomplete="off" style="margin-left: 15px">
                        <el-input v-model="ruleForm.password" type="password" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="账号新密码" prop="newPassword" autocomplete="off" style="margin-left: 15px">
                        <el-input v-model="ruleForm.newPassword" type="password" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入新密码" prop="checkPass" autocomplete="off" style="margin-left: 15px">
                        <el-input v-model="ruleForm.checkPass" type="password" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 15px;">
                        <el-button type="primary" @click="nextSubmit('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else{
                callback();
            }
        };
        var validateNewPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else if(value === this.ruleForm.password){
                callback(new Error('不能使用和原密码一样的密码哦'));
            }else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
            // else if(value === this.ruleForm.password){
            //     callback(new Error('不能使用和原密码一样的密码哦'));
            // } else if (this.ruleForm.repeatPWd !== '') {
            //     this.$refs.ruleForm.validateField('repeatPWd');
            //     callback();
            // }
        };
        var validateRepeatPWd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.ruleForm.newPassword) {
                callback(new Error('两次输入新密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                password: '',
                newPassword: '',
                checkPass: ''
            },
            username: '',
            rules: {
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                newPassword: [
                    { validator: validateNewPassword, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validateRepeatPWd, trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {

    },
    created() {
        this.username = localStorage.getItem('employee_username')
    },
    methods: {
        nextSubmit(){
            this.$axios.post("/employee-admin-server/user/updatePwd",{
                userId: this.userId,
                username: this.username,
                password: this.ruleForm.password,
                newPassword: this.ruleForm.newPassword
            }).then((res) => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '成功修改密码！',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
        }
    }
};
</script>

<style scoped>
    
</style>
