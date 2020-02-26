<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-wen-team"></i> 考勤管理</el-breadcrumb-item>
                <el-breadcrumb-item>考勤统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="nowMonth">本月考勤</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="lastMonth">上月考勤</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="threeMonth">近三月考勤</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="allMonth">全部</el-button>
            </div>
            <div id="chart_example"></div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    data() {
        return {
            subtext: '本月考勤',
            username: '',
            lackNum: null,
            normalNum: '',
            lateNum: '',
            leaveEarlyNum: null,
            noSignBackNum: '',
            preData: [],
        };
    },
    mounted() {
        this.getData(1)
    },
    methods: {
        // 这个月1 上个月2 还是三月内3 全部0
        getData(month){
            this.preData = []
            this.$axios.post("/employee-admin-server/attendance/getMonthWorkAttendance", {
                username: this.username,
                month: month
            }).then((res) => {
                if (res.data.code == 200) {
                    let resData = res.data.data
                    if(resData.lackNum != 0){
                        this.preData.push({ value: resData.lackNum, name: "缺勤" })
                    }
                    if(resData.normalNum != 0){
                        this.preData.push({ value: resData.normalNum, name: "正常" })
                    }
                    if(resData.lateNum != 0){
                        this.preData.push({ value: resData.lateNum, name: "迟到" })
                    }
                    if(resData.leaveEarlyNum != 0){
                        this.preData.push({ value: resData.leaveEarlyNum, name: "早退" })
                    }
                    if(resData.noSignBackNum != 0){
                        this.preData.push({ value: resData.noSignBackNum, name: "未签退" })
                    }
                    this.drawPre()
                }
            })
        },
        drawPre(){
            let myChart = echarts.init(document.getElementById("chart_example"));
            let option = {
                title: {
                    text: "个人考勤统计",
                    subtext: this.subtext,
                    left: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: [
                        "缺勤",
                        "正常",
                        "未签退",
                        "早退",
                        "迟到"
                    ]
                },
                series: [
                    {
                        name: "考勤状态",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: this.preData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            }
            myChart.setOption(option);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        nowMonth(){
            this.getData(1)
            this.subtext = '本月考勤'
        },
        lastMonth(){
            this.getData(2)
            this.subtext = '上月考勤'
        },
        threeMonth(){
            this.getData(3)
            this.subtext = '近三月考勤'
        },
        allMonth(){
            this.getData(0)
            this.subtext = '全部考勤'
        }
    },
    watch: {
        showPie(){
            this.drawPre()
        }
    },
    created() {
        this.username = localStorage.getItem('employee_username')
    }
};
</script>

<style scoped>
    #chart_example {
        width: 50%;
        height: 500px;
        margin: 0 auto;
    }
    .handle-box {
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .handle-select {
        width: 120px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
