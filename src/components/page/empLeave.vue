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
                    <el-form-item label="员工姓名" prop="empName" style="margin-left: 15px">
                        <el-input v-model="ruleForm.empName" @change="changeName()" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="员工号" prop="empId" style="margin-left: 15px">
                        <el-input v-model="ruleForm.empId" :disabled="true" :placeholder="ruleForm.empId"
                                style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idCard" style="margin-left: 15px">
                        <el-input v-model="ruleForm.idCard" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" style="margin-left: 15px">
                        <el-input v-model="ruleForm.phone" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间" prop="participateTime">
                        <el-date-picker v-model="ruleForm.participateTime" type="date" value-format="yyyy-MM-dd" v-bind:placeholder="ruleForm.participateTime" style="width: 180px;float: left;margin-left: 15px;"/>
                    </el-form-item>
                    <el-form-item label="户籍所在地">
                        <div style="float: left;margin-left: 15px;width: 360px;">
                        <el-form-item style="float: left;width: 120px;" prop="province">
                            <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                            <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value" :label ="item.label">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="float: left;width: 120px;" prop="city">
                            <el-select v-model="ruleForm.city" placeholder="城市" @change="changeCity">
                            <el-option v-for="(item,index) in citiesArr" :key="item.value" :value="item.value" :label ="item.label">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="float: left;width: 120px;" prop="county">
                            <el-select v-model="ruleForm.county" placeholder="区县">
                            <el-option v-for="(item,index) in countyArr" :key="item.value" :value="item.value" :label ="item.label">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-left: 15px;">
                        <el-button type="primary" @click="nextSubmit('ruleForm')">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    data() {
        return {
            ruleForm: {},
            username: '',
        };
    },
    mounted() {

    },
    methods: {
        
    },
    created() {
        this.username = localStorage.getItem('employee_username')
    }
};
</script>

<style scoped>
    
</style>
