<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="iconfont icon-wen-team"></i> 流程管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>流程查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        :cell-style="cellStyle"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="empId" label="员工号" width="120" fixed>
        </el-table-column>
        <el-table-column prop="empName" label="员工名" width="120" fixed>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="100">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="100">
        </el-table-column>
        <el-table-column
          prop="procedureFlag"
          label="流程状态"
          width="100"
          :formatter="formatProcedureFlag"
        >
        </el-table-column>
        <el-table-column prop="leaveDetail" label="请假详情"> </el-table-column>
        <el-table-column prop="createTime" width="100" label="创建时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      active: 1,
      maxLen: 80,
      tableData: [],
      leaveDetail: "",
      userInfo: {},
      username: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    backSubmit() {
      this.active -= 1;
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      console.log(row.row.procedureFlag);
      if (row.row.procedureFlag === 0) {
        return "color:red";
      } else if (
        row.row.procedureFlag === 1 ||
        row.row.procedureFlag === 2 ||
        row.row.procedureFlag === 3
      ) {
        return "color:green";
      }
    },
    formatProcedureFlag(row, column) {
      if (row.procedureFlag == 0) {
        return "审批未通过";
      } else if (row.procedureFlag == 1) {
        return "直属上级未审批";
      } else if (row.procedureFlag == 2) {
        return "直属上级审批通过上级未审批";
      } else if (row.procedureFlag == 3) {
        return "审批通过";
      }
    },
    getData() {
      this.$axios
        .post("/employee-admin-server/leave/getEmpAllLeave", {
          username: localStorage.getItem("employee_username")
        })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.slice();
            console.log(this.tableData);
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
