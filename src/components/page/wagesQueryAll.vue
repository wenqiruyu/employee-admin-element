<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="iconfont icon-wen-book"></i> 薪资管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>薪资查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="请输入员工名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55" align="center">
        </el-table-column>-->
        <el-table-column prop="empId" label="员工号" width="150" align="center"></el-table-column>
        <el-table-column prop="empName" label="员工名" width="150" align="center"></el-table-column>
        <el-table-column prop="period" label="薪资发放期间" sortable width="180" align="center"></el-table-column>
        <el-table-column prop="baseWages" label="基本工资（元）" width="180" align="center"></el-table-column>
        <el-table-column prop="subsidy" label="补贴（元）" width="180" align="center"></el-table-column>
        <el-table-column prop="tax" label="税前扣款（元）" width="180" align="center"></el-table-column>
        <el-table-column prop="realWages" label="实发工资（元）" align="center"></el-table-column>
        <!-- <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="iconfont icon-wen-update1" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="iconfont icon-wen-custom-delete" class="red" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
          </template>
        </el-table-column>-->
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
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
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
      page: 1,
      pageSize: 10,
      multipleSelection: [],
      select_cate: '',
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
      // this.$axios.post(this.url, {
      //     page: this.cur_page
      // }).then((res) => {
      //     this.tableData = res.data.list;
      // })
      this.$axios
        .post('/employee-admin-server/wages/getAllWages', {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.data.code == 200) {
            // 数组复制
            this.tableData = res.data.data.slice()
            console.log(res.data.data)
            this.$message({
              message: '恭喜你，这是一条成功消息',
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
        .post('/employee-admin-server/wages/getWagesByEmpName', {
          empName: this.select_word
        })
        .then(res => {
          if (res.data.code == 200) {
            // 数组复制
            this.tableData = res.data.data.slice()
            console.log(res.data.data)
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    formatEmail(row, column) {
      return row.email === null ? '为绑定' : row.email
    },
    formatQQ(row, column) {
      return row.qq === null ? '为绑定' : row.qq
    },
    formatBirthday(row, column) {
      return row.birthday === null ? '为绑定' : row.birthday
    },
    formatSex(row, column) {
      return row.sex === 1 ? '男' : row.sex === 2 ? '女' : '保密'
    },
    formatDate(row, column) {
      return row.createTime
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

<style scoped>
.handle-box {
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
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
