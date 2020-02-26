<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="iconfont icon-wen-team"></i> 考勤管理</el-breadcrumb-item>
        <el-breadcrumb-item>下属考勤</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <span>请选择下属姓名：</span>
        <el-select v-model="subEmpId" placeholder="选择下属" class="handle-select mr10">
          <el-option v-for="(item,index) in subEmpNameArr" :key="item.empId" :value="item.empId" :label ="item.empName">
          </el-option>
        </el-select>
        <el-button type="primary" class="handle-del mr10" @click="querySubEmp">查看</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" :cell-style="cellStyle">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="empId" label="员工号" width="90">
        </el-table-column>
        <el-table-column prop="empName" label="员工名" width="90">
        </el-table-column>
        <el-table-column prop="attendanceTime" label="工作日期" width="100">
        </el-table-column>
        <el-table-column prop="startTime" label="签到时间" width="80">
        </el-table-column>
        <el-table-column prop="endTime" label="签退时间" width="80">
        </el-table-column>
        <el-table-column prop="startIp" label="签到电脑IP" width="120">
        </el-table-column>
        <el-table-column prop="endIp" label="签退电脑IP" width="120">
        </el-table-column>
        <el-table-column prop="absenceDutyFlag" label="考勤状态" width="80" :formatter="absenceDutyFlag">
        </el-table-column>
        <el-table-column prop="reason" label="缺勤原因">
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                username: '',
                page: 1,
                pageSize: 10,
                multipleSelection: [],
                subEmpId: '',
                subEmpNameArr: [],
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        mounted(){
            this.getSubEmp()
        },
        created() {
            this.username = localStorage.getItem('employee_username')
            this.getData()
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    // if (!is_del) {
                    //     if (d.address.indexOf(this.select_cate) > -1 &&
                    //         (d.username.indexOf(this.select_word) > -1 ||
                    //             d.address.indexOf(this.select_word) > -1)
                    //     ) {
                    //         return d;
                    //     }
                    // }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.page = val;
                this.getData();
            },
            getData() {
                this.$axios.post("/employee-admin-server/attendance/getSubEmpWorkAttendance", {
                    username: this.username,
                    page: this.page,
                    pageSize: this.pageSize
                }).then((res) => {
                    if (res.data.code == 200) {
                        // 数组复制
                        this.tableData = res.data.data.slice()
                        this.$message({
                            message: '恭喜你，成功获取员工考勤信息',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            getSubEmp(){
              this.$axios.post("/employee-admin-server/staffDept/getSubEmp",{
                username: this.username
              }).then((res)=>{
                if (res.data.code == 200) {
                        // 数组复制
                        this.subEmpNameArr = res.data.data.slice()
                    } else {
                        this.$message.error(res.data.msg)
                    }
              })
            },
            querySubEmp(){
              if (this.subEmpId != '' && this.subEmpId != null) {
                this.$axios.post("/employee-admin-server/attendance/getUserWorkAttendance", {
                    empId: this.subEmpId,
                    page: this.page,
                    pageSize: this.pageSize
                }).then((res) => {
                    if (res.data.code == 200) {
                        // 数组复制
                        this.tableData = res.data.data.slice()
                        this.$message({
                            message: '恭喜你，成功获取员工考勤信息',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
              } else {
                this.$message.error('请选择你想查看下属的名字哦！')
              }
            },
            search() {
                this.is_search = true;
            },
            absenceDutyFlag(row, column) {
                if(row.absenceDutyFlag === 0){
                    return '正常'
                }else if(row.absenceDutyFlag === 1){
                    return '缺勤'
                }else if(row.absenceDutyFlag === 2){
                    return '未签退'
                }else if(row.absenceDutyFlag === 2){
                    return '早退'
                }else if(row.absenceDutyFlag === 2){
                    return '迟到'
                }
            },
            cellStyle(row,column,rowIndex,columnIndex){
                if(row.row.absenceDutyFlag === 1){
                    return 'color:red'
                }else if(row.row.absenceDutyFlag === 2 || row.row.absenceDutyFlag === 3 || row.row.absenceDutyFlag === 4){
                    return 'color:green'
                }
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
  .content-message {
    color: #F70909;
    font-size: 16px;
  }

  .handle-box {
    /* margin-top: 20px; */
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .del-dialog-cnt {
    font-size: 16px;
    text-align: center
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }
</style>
