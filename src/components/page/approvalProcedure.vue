<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="iconfont icon-wen-team"></i> 流程管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>流程审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="margin-top: 40px;">
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
          <el-table-column prop="leaveDetail" label="请假详情">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="submit(scope.$index, scope.row)"
                >同意请假</el-button
              >
              <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
                >不允请假</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  inject: ["reload"],
  data() {
    return {
      active: 1,
      maxLen: 80,
      tableData: [],
      ruleForm: {},
      leaveDetail: "",
      userInfo: {},
      username: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .post("/employee-admin-server/leave/getSubEmpLeave", {
          username: localStorage.getItem("employee_username")
        })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.slice();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    submit(index, row) {
      console.log(this.tableData[index].id);
      this.$axios
        .post("/employee-admin-server/leave/updateEmpLeave", {
          id: this.tableData[index].id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "审批成功",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    handleEdit(index, row) {
      this.$confirm("是否确认不允该员工的请假申请通过?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .post("/employee-admin-server/leave/updateEmpLeaveError", {
            id: this.tableData[index].id
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "审批成功",
                type: "success"
              });
              this.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          });
      });
    }
  },
  created() {
    this.username = localStorage.getItem("employee_username");
  }
};
</script>

<style scoped></style>
