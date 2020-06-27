<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="iconfont icon-wen-team"></i> 员工管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>员工列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="content-message">
        <span>此处信息包含员工隐私信息，请勿外传，若有违规行为，后果自负！</span>
      </div>
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="请输入用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="empId" label="员工号" width="90" fixed></el-table-column>
        <el-table-column prop="empName" label="员工名" width="90" fixed></el-table-column>
        <el-table-column prop="deptName" label="所属部门" width="100"></el-table-column>
        <el-table-column prop="superEmp" label="直属上级" width="140" :formatter="superEmp"></el-table-column>
        <el-table-column prop="username" label="用户名" width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="160" :formatter="formatEmail"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="110"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50" :formatter="formatSex"></el-table-column>
        <el-table-column prop="birthday" label="生日" width="100" :formatter="formatBirthday"></el-table-column>
        <el-table-column prop="province" label="户籍所在地" width="170" :formatter="formatProvince"></el-table-column>
        <el-table-column prop="address" label="户籍详细地址"></el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
            <el-button type="text" class="red" @click="handleDelete(scope.$index, scope.row)">员工离职</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="详情" :visible.sync="editVisible" width="50%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="户籍地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="form.empPosition"></el-input>
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

    <!-- 分配上级弹出框-->
    <el-dialog title="请重新分配改离职员工的下级的直属上级" :visible.sync="updateVisible" width="30%">
      <el-form ref="superForm" :model="superForm" label-width="90px">
        <el-form-item label="上级员工号" prop="empId" style="margin-left: 15px;">
          <div style="float: left;width: 360px;">
            <el-select v-model="superForm.empId" placeholder="选择员工上级员工号">
              <el-option
                v-for="(item,index) in empArr"
                :key="item.empId"
                :value="item.empId"
                :label="item.empId"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="上级姓名" prop="empName" style="margin-left: 15px;">
          <div style="float: left;width: 360px;">
            <el-select v-model="superForm.empName" placeholder="选择员工上级姓名">
              <el-option
                v-for="(item,index) in empArr"
                :key="item.empName"
                :value="item.empName"
                :label="item.empId + '-' + item.empName"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUpdateSuper">确 定</el-button>
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
      ind: 0,
      chooseData: {},
      empArr: [],
      page: 1,
      pageSize: 10,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      updateVisible: false,
      form: {
        name: '',
        date: '',
        address: ''
      },
      superForm: {
        empId: '',
        empName: ''
      },
      idx: -1
    }
  },
  created() {
    this.getData()
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
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
      this.page = val
      this.getData()
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      // if (process.env.NODE_ENV === 'development') {
      //     this.url = '/ms/table/list';
      // };
      this.$axios
        .post('/employee-admin-server/user/getAllUser', {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.data.code == 200) {
            // 数组复制
            this.tableData = res.data.data.slice()
            this.$message({
              message: '恭喜你，成功获取员工信息',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    search() {
      this.is_search = true
      this.$axios
        .post('/employee-admin-server/user/getUserByName', {
          empName: this.select_word
        })
        .then(res => {
          if (res.data.code == 200) {
            // 数组复制
            this.tableData = res.data.data.slice()
            this.$message({
              message: '恭喜你，成功获取员工信息',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    superEmp(row, column) {
      return row.superEmpId === null || row.superEmpName === null
        ? '无直属上级'
        : row.superEmpId + ' ' + row.superEmpName
    },
    formatEmail(row, column) {
      return row.email === null ? '未绑定' : row.email
    },
    formatBirthday(row, column) {
      return row.birthday === null ? '未绑定' : row.birthday
    },
    formatSex(row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '保密'
    },
    formatProvince(row, column) {
      return row.province === null || row.city === null || row.county == null
        ? '请提醒员工提供正确户籍信息'
        : row.province + ' ' + row.city + ' ' + row.county
    },
    filterTag(value, row) {
      return row.tag === value
    },
    handleEdit(index, row) {
      this.idx = index
      const item = this.tableData[index]
      this.form = {
        name: item.name,
        empPosition: item.empPosition,
        address: item.address
      }
      this.editVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('请再次确认该员工是否离职？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '放弃'
      })
        .then(() => {
          this.ind = index
          this.chooseData = row
          // 确定删除员工，需分配员工下属
          if (row.superEmpId != 'JXNC0001') {
            this.delEmp(index, row)
          } else {
            this.$axios
              .post('/employee-admin-server/user/getAllSuperEmp')
              .then(res => {
                if (res.data.code == 200) {
                  // 数组复制
                  this.empArr = res.data.data.slice()
                  // 剔除
                  let ones
                  this.empArr.forEach((item, ind, array) => {
                    if (row.empId == item.empId) {
                      ones = ind
                    }
                  })
                  this.empArr.splice(ones, 1)
                  this.updateVisible = true
                  console.log(this.empArr)
                } else {
                  this.$message.error(res.data.msg)
                }
              })
          }
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message:
              action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面'
          })
        })
    },
    delEmp(index, row) {
      this.$axios
        .post('/employee-admin-server/user/deleteUser', {
          empId: row.empId,
          userId: row.userId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.tableData.splice(index, 1)
            this.$message({
              message: '已成功删除该员工信息',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    delAll() {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form)
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1)
      this.$message.success('删除成功')
      this.delVisible = false
    },
    saveUpdateSuper() {
      var flag = true
      this.empArr.forEach((item, index, array) => {
        console.log(item)
        console.log(this.superForm.empId + this.superForm.empName)
        if (
          this.superForm.empId == item.empId &&
          item.empName == this.superForm.empName
        ) {
          flag = false
          this.$axios
            .post('/employee-admin-server/staffDept/updateEmpSuper', {
              superEmpId: this.superForm.empId,
              superEmp: this.superForm.empName,
              empId: this.chooseData.empId
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success('修改员工上级成功')
                // 进行调用
                this.delEmp(this.ind, this.chooseData)
                this.updateVisible = false
                this.ind = 0
                this.chooseData = {}
              } else {
                this.$message.error(res.data.msg)
              }
            })
        }
      })
      if (flag) {
        this.$message.error('上级员工的员工号和姓名不匹配')
      }
    }
  }
}
</script>

<style scoped>
.content-message {
  color: #f70909;
  font-size: 16px;
}

.handle-box {
  margin-top: 20px;
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 150px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.table {
  width: 100%;
  font-size: 14px;
}

.mr10 {
  margin-right: 10px;
}
</style>
