<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="iconfont icon-wen-book"></i> 薪资管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>发放薪资</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="content-message">
        <span>公司规定为每月的28号进行工资的发放，有效期为一个月，请按规定操作并且不要拖欠员工工资哦！</span>
      </div>
      <div class="container-head">
        <span class="demonstration">需发放薪资的月份</span>
        <el-date-picker
          v-model="wagesGrantTime"
          type="month"
          placeholder="请选择薪资发放月份"
          value-format="yyyy-MM"
          @change="changeGrantTime"
        ></el-date-picker>
        <el-button type="primary" @click="submitForm">生成最新一期的员工薪资</el-button>
      </div>
      <div v-if="this.wagesGrantTime !== '' && this.tableData.length != 0" class="content-message">
        <span>{{this.wagesGrantTime}}还未发放薪资的员工如下</span>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="empId" label="员工号" width="130"></el-table-column>
        <el-table-column prop="empName" label="员工名" width="120"></el-table-column>
        <el-table-column prop="period" label="薪资发放期间" width="130"></el-table-column>
        <el-table-column prop="baseWages" label="基本工资（元）" width="130"></el-table-column>
        <el-table-column prop="subsidy" label="补贴（元）" width="130"></el-table-column>
        <el-table-column prop="tax" label="个人扣税（元）" width="130"></el-table-column>
        <el-table-column prop="realWages" label="实发工资（元）"></el-table-column>
      </el-table>
      <div class="content-message">
        <div>
          <span>还未实现银行卡转账功能!</span>
        </div>
        <span>补贴：</span>
        <el-input v-model="select_word" placeholder="设置当月补贴" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="backSubmit">全部发放</el-button>
      </div>
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
  name: 'basetable',
  data() {
    return {
      url: './vuetable.json',
      wagesGrantTime: '',
      tableData: [],
      cur_page: 1,
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
  created() {},
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
      this.cur_page = val
      this.getData()
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === 'development') {
        this.url = '/ms/table/list'
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list
        })
    },
    search() {
      this.is_search = true
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
    changeGrantTime() {
      let date = new Date()
      let year = date.getFullYear()
      let month =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      let day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
      if (this.wagesGrantTime == null || this.wagesGrantTime == '') {
        this.$message.error('请先选择需发放薪资的月份')
      } else {
        let falg = true
        let dateArr = this.wagesGrantTime.split('-')
        let wagesGrantYear = dateArr[0] //获取当前日期的年份
        let wagesGrantMonth = dateArr[1]
        if (wagesGrantYear == year) {
          if (wagesGrantMonth == month) {
            if (day < 28) {
              falg = false
              this.$message.error('需要到28号才能发放这个月的工资呢')
            }
          } else if (wagesGrantMonth == (month - 1 == 0 ? 12 : month - 1)) {
            falg = true
          } else {
            falg = false
            this.$message.error('选择的发放薪资的月份需为当前月份或上一个月')
          }
        } else if (wagesGrantYear == year - 1) {
          if (wagesGrantMonth == (month - 1 == 0 ? 12 : month - 1)) {
            falg = true
          } else {
            falg = false
            this.$message.error('选择的发放薪资的月份需为当前月份或上一个月')
          }
        }
        if (!falg) {
          this.wagesGrantTime = ''
        }
      }
    },
    backSubmit() {
      var tag = this.select_word
      if (this.tableData.length != 0) {
        this.tableData.forEach(function(e) {
          e.deleteFlag = 0
          e.subsidy = tag == '' ? e.subsidy : tag
        })
        this.$axios
          .post('/employee-admin-server/wages/updateAllWages', {
            staffWagesVOS: this.tableData
          })
          .then(res => {
            if (res.data.code == 200) {
              // 数组复制
              this.tableData = []
              this.wagesGrantTime = ''
              console.log(res.data.data)
              this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
      } else {
        this.$message.error('请设置薪资发放月份')
      }
    },
    submitForm() {
      if (this.wagesGrantTime == null || this.wagesGrantTime == '') {
        this.$message.error('请先选择需发放薪资的月份')
      } else {
        this.$axios
          .post('/employee-admin-server/wages/addAllUserWages', {
            period: this.wagesGrantTime
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
      }
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
.container-head {
  margin-bottom: 30px;
}

.content-message {
  color: #f70909;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
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

.handle-input {
  width: 150px;
  display: inline-block;
}

.mr10 {
  margin-right: 10px;
}
</style>
