<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="iconfont icon-wen-team"></i> 流程管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>请假流程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="width: 600px; margin: 0 auto;">
        <el-steps :active="active">
          <el-step title="请假原因" description="此处信息必填"></el-step>
          <el-step title="上级审批" description="此处信息必填"></el-step>
        </el-steps>
      </div>

      <div style="margin-top: 40px;">
        <div v-if="active == 1" style="width: 600px; margin: 0 auto;">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="180px"
          >
            <el-form-item label="员工姓名" prop="empName">
              <el-input
                v-model="ruleForm.empName"
                :disabled="true"
                :placeholder="ruleForm.empName"
                @change="changeName()"
                style="width: 240px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="员工号" prop="empId">
              <el-input
                v-model="ruleForm.empId"
                :disabled="true"
                :placeholder="ruleForm.empId"
                style="width: 240px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="请假时间" prop="leaveTime">
              <el-date-picker
                v-model="ruleForm.leaveTime"
                type="datetimerange"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changeLeaveTime()"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['09:00:00', '18:00:00']"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="请假类型"
              prop="leaveType"
              @change="changeLeaveType"
            >
              <el-select v-model="ruleForm.leaveType" placeholder="请假类型">
                <el-option
                  v-for="(item, index) in leaveArr"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请假原因" prop="leaveReason">
              <el-input
                v-model="ruleForm.leaveReason"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4 }"
                v-bind:maxlength="maxLen"
                style="float: left;width: 380px;"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 15px;">
              <el-button type="primary" @click="nextSubmit('ruleForm')"
                >下一步</el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <div
          v-if="active == 2"
          style="width: 900px; margin: 0 auto; height: 400px;"
        >
          <el-table :data="tableData" border class="table" ref="multipleTable">
            <el-table-column
              type="selection"
              width="55"
              align="center"
            ></el-table-column>
            <el-table-column prop="empId" label="员工号" width="120" fixed>
            </el-table-column>
            <el-table-column prop="empName" label="员工名" width="120" fixed>
            </el-table-column>
            <el-table-column
              prop="procedureFlag"
              label="流程状态"
              width="100"
              :formatter="formatProcedureFlag"
            >
            </el-table-column>
            <el-table-column
              prop="leaveDetail"
              label="请假详情"
              :formatter="formatLeaveDetail"
            >
            </el-table-column>
          </el-table>
          <div style="margin-top: 60px;margin-left: 300px;">
            <el-button type="primary" @click="backSubmit">上一步</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  inject: ["reload"],
  data() {
    var validateStartTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请假时间不能为空"));
      } else {
        callback();
      }
    };
    var validateLeaveType = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请假类型不能为空"));
      } else {
        callback();
      }
    };
    var validateLeaveReason = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请假原因不能为空"));
      } else {
        callback();
      }
    };
    return {
      active: 1,
      maxLen: 80,
      tableData: [],
      ruleForm: {
        empId: "",
        empName: "",
        startTime: null,
        endTime: null,
        leaveType: "",
        leaveReason: "",
        leaveTime: null
      },
      leaveDetail: "",
      userInfo: {},
      username: "",
      leaveArr: [
        {
          value: "年假",
          label: "年假"
        },
        {
          value: "事假",
          label: "事假"
        }
      ],
      rules: {
        leaveTime: [{ validator: validateStartTime, trigger: "blur" }],
        leaveType: [{ validator: validateLeaveType, trigger: "blur" }],
        leaveReason: [{ validator: validateLeaveReason, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    backSubmit() {
      this.active -= 1;
    },
    changeLeaveTime() {
      console.log(this.ruleForm.leaveTime);
      this.ruleForm.startTime = this.ruleForm.leaveTime[0];
      this.ruleForm.endTime = this.ruleForm.leaveTime[1];
      console.log(this.ruleForm.startTime);
      console.log(this.ruleForm.endTime);
    },
    formatProcedureFlag(row, column) {
      return row.procedureFlag === null ? "待审批" : row.procedureFlag;
    },
    formatLeaveDetail(row, column) {
      this.leaveDetail =
        row.leaveDetail === null
          ? "员工[" +
            this.ruleForm.empName +
            "]员工号[" +
            this.ruleForm.empId +
            "]于[" +
            this.ruleForm.startTime +
            "]至[" +
            this.ruleForm.endTime +
            "]因[" +
            this.ruleForm.leaveReason +
            "]原因请[" +
            this.ruleForm.leaveType +
            "]"
          : row.leaveDetail;
      return this.leaveDetail;
    },
    getData() {
      this.$axios
        .post("/employee-admin-server/user/getEmp", {
          username: localStorage.getItem("employee_username")
        })
        .then(res => {
          if (res.data.code == 200) {
            this.ruleForm.empName = res.data.data.empName;
            this.ruleForm.empId = res.data.data.empId;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    changeLeaveType() {
      this.$refs.ruleForm.validateField("leaveType");
    },
    nextSubmit(name) {
      this.$axios
        .post("/employee-admin-server/staffDept/getSuperEmp", {
          username: localStorage.getItem("employee_username")
        })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.slice();
            console.log(this.tableData);
            this.$refs[name].validate(valid => {
              if (valid) {
                this.active += 1;
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    backSubmit() {
      this.active -= 1;
    },
    submit() {
      let superEmpId = !this.tableData[0] ? "" : this.tableData[0].empId;
      let superEmpName = !this.tableData[0] ? "" : this.tableData[0].empName;
      let superPlusEmpId = !this.tableData[1] ? "" : this.tableData[1].empId;
      let superPlusEmpName = !this.tableData[1]
        ? ""
        : this.tableData[1].empName;
      console.log(this.tableData[0] + "     " + this.tableData[1]);
      this.$axios
        .post("/employee-admin-server/leave/addLeave", {
          username: localStorage.getItem("employee_username"),
          empId: this.ruleForm.empId,
          empName: this.ruleForm.empName,
          startTime: this.ruleForm.startTime,
          endTime: this.ruleForm.endTime,
          leaveType: this.ruleForm.leaveType,
          leaveReason: this.ruleForm.leaveReason,
          superEmpId: superEmpId,
          superEmpName: superEmpName,
          superPlusEmpId: superPlusEmpId,
          superPlusEmpName: superPlusEmpName,
          procedureFlag: 1,
          leaveDetail: this.leaveDetail
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "提交请假申请成功，请耐心等待审批结果呦",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    }
  },
  created() {
    this.username = localStorage.getItem("employee_username");
  }
};
</script>

<style scoped></style>
