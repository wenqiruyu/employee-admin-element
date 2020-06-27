<template>
  <div>
    <div class="dept-tree">
      <el-tree
        :data="deptList"
        node-key="deptName"
        :default-expanded-keys="['公司组织架构']"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="dept-user">
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
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'deptList',
  data() {
    return {
      conheight: {
        height: ''
      },
      tableData: [],
      oldTableData: [],
      page: 1,
      pageSize: 10,
      deptList: [
        {
          deptName: '公司组织架构',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'deptName'
      }
    }
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
    this.getAllDept()
    this.getUserData()
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.page = val
      this.getData()
    },
    getHeight() {
      this.conheight.height = window.innerHeight - 170 + 'px'
    },
    getAllDept() {
      this.$axios.post('/employee-admin-server/dept/getAllDept').then(res => {
        if (res.data.code == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.deptList[0].children.push({
              deptId: res.data.data[i].deptId,
              deptName: res.data.data[i].deptName,
              deptDescription: res.data.data[i].deptDescription,
              principalEmpId: res.data.data[i].principalEmpId,
              principalName: res.data.data[i].principalName,
              children: []
            })
            for (let j = 0; j < res.data.data[i].position.length; j++) {
              this.deptList[0].children[i].children.push({
                deptName: res.data.data[i].position[j].positionName,
                positionDesc: res.data.data[i].position[j].positionDesc
              })
            }
          }
          // 数组复制
          // this.deptList[0].children = res.data.data.slice()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getUserData() {
      this.$axios
        .post('/employee-admin-server/user/getAllUser', {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.data.code == 200) {
            // 数组复制
            this.tableData = res.data.data.slice()
            this.oldTableData = this.tableData
            this.$message({
              message: '恭喜你，成功获取员工信息',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    handleNodeClick(data) {
      console.log(data.deptName)
      if ('公司组织架构' != data.deptName) {
        this.$axios
          .post('/employee-admin-server/user/getUserByDept', {
            page: this.page,
            pageSize: this.pageSize,
            deptName: data.deptName
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
      } else {
        this.tableData = this.oldTableData
      }
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
        date: item.date,
        address: item.address
      }
      this.editVisible = true
    },
    handleDelete(index, row) {
      this.idx = index
      this.delVisible = true
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
    }
  }
}
</script>

<style>
.dept-tree {
  float: left;
  width: 250px;
  height: 100%;
  overflow: hidden;
}
.el-tree {
  height: 100%;
}
.dept-user {
  float: left;
  widows: 60px;
}
</style>
