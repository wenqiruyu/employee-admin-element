<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-wen-team"></i> 流程管理</el-breadcrumb-item>
                <el-breadcrumb-item>补签流程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="container-menu">
                <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <el-menu-item>
                        <span slot="title">2020/02/26考勤异常</span>
                    </el-menu-item>
                    <el-menu-item>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="container-form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px">
                    <el-form-item label="标题" prop="title" style="margin-left: 15px">
                        <el-input v-model="ruleForm.title" :disabled="true" :placeholder="ruleForm.title" style="width: 400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="申请人" prop="empIdAndName" style="margin-left: 15px">
                        <el-input v-model="ruleForm.empIdAndName" :disabled="true" :placeholder="ruleForm.empIdAndName" style="width: 400px;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="补签说明" prop="supplementStatus" style="margin-left: 15px">
                        <el-input v-model="ruleForm.supplementStatus" :disabled="true" :placeholder="ruleForm.supplementStatus" style="width: 240px;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="申请人部门" prop="empDept" style="margin-left: 15px">
                        <el-input v-model="ruleForm.empDept" :disabled="true" :placeholder="ruleForm.empDept" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="补签原因" prop="supplementReason" style="margin-left: 15px">
                        <el-input v-model="ruleForm.supplementReason" type="textarea" :autosize="{minRows: 3,maxRows: 4}" v-bind:maxlength="maxLen" style="width: 380px;">
                        </el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 15px;">
                        <el-button type="primary" @click="submit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                title: "2020/02/26-刘应兴（JXNC0001）-补签申请",
                empIdAndName: '刘应兴（JXNC0001）',
                supplementStatus: '旷工'
            },
            username: '',
            maxLen: 80,
            rules: {
            }
        };
    },
    mounted() {

    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        submit(){

        }
    },
    created() {
        this.username = localStorage.getItem('employee_username')
    }
};
</script>

<style scoped>
    .container{
        height: 530px
    }
    .container-menu{
        float: left;
        width: 15%;
    }
    .container-form{
        /* border:1px dashed #000; */
        float: left;
        width: 80%;
    }
</style>
