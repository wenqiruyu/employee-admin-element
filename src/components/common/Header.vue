<template>
  <div class="header">
    <div class="logo">员工信息管理平台</div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <!-- 全屏显示 -->
    <div class="btn-fullscreen" @click="handleFullScreen">
      <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
        <i class="el-icon-rank"></i>
      </el-tooltip>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 员工签到签退-->
        <div>
          <el-button
            type="primary"
            round
            size="small"
            :disabled="isStart"
            @click="toStartAttendance"
          >{{startTitle}}</el-button>
          <el-button
            type="primary"
            round
            size="small"
            :disabled="isEnd"
            @click="toEndAttendance"
          >{{endTitle}}</el-button>
        </div>
        <!-- 消息中心 -->
        <!-- <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>-->
        <!-- 用户头像 -->
        <div class="user-avator">
          <img v-if="userface" :src="getImgUrl(this.userface)" class="avatar" @click="toIndex" />
          <img v-else src="../../assets/img/default_face.jpg" class="avatar" @click="toIndex" />
        </div>
        <!-- 用户名下拉菜单 -->
        <!-- <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="http://blog.gdfengshuo.com/about/" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
        </el-dropdown>-->
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../common/bus'
export default {
  data() {
    return {
      startTitle: '签到',
      endTitle: '签退',
      isStart: false,
      isEnd: true,
      collapse: false,
      fullscreen: false,
      name: 'linxin',
      message: 2,
      userface: null
    }
  },
  created() {
    this.getEmpWorkAttendance()
    this.getUserInfo()
  },
  computed: {
    username() {
      let username = localStorage.getItem('venus_username')
      return username ? username : this.name
    }
  },
  methods: {
    toIndex() {
      this.$router.push('/index')
    },
    // 获取头像信息
    getUserInfo() {
      this.$axios
        .post('/employee-admin-server/user/getUser', {
          username: localStorage.getItem('employee_username')
        })
        .then(res => {
          if (res.data.code == 200) {
            this.userface = res.data.data.userface
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    // 获取员工签到信息
    getEmpWorkAttendance() {
      if ('admin' != localStorage.getItem('employee_username')) {
        this.$axios
          .post('/employee-admin-server/attendance/getWorkAttendance', {
            username: localStorage.getItem('employee_username')
          })
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data.startTime != null) {
                this.startTitle = '已签到'
                this.isStart = true
                this.isEnd = false
                if (res.data.data.endTime != null) {
                  this.endTitle = '已签退'
                }
              }
            } else {
              this.isStart = true
              this.$message.error('签到信息出现异常，请联系管理员进行处理')
            }
          })
      } else {
        this.isStart = true
      }
    },
    // 员工签到
    toStartAttendance() {
      this.$axios
        .post('/employee-admin-server/attendance/addWorkAttendance', {
          username: localStorage.getItem('employee_username')
        })
        .then(res => {
          if (res.data.code == 200) {
            this.isStart = true
            this.isEnd = false
            this.$message({
              message: '已成功签到，今天是充满希望的一天',
              type: 'success'
            })
          } else {
            this.$message.error(data.data.msg)
          }
        })
    },
    getImgUrl(icon) {
      return require('@/assets' + icon)
    },
    // 员工签退
    toEndAttendance() {
      this.$axios
        .post('/employee-admin-server/attendance/addEndWorkAttendance', {
          username: localStorage.getItem('employee_username')
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: '已成功签退，今天您辛苦了',
              type: 'success'
            })
          } else {
            this.$message.error(data.data.msg)
          }
        })
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('venus_username')
        this.$router.push('/login')
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  margin-left: 10px;
  width: 195px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  float: left;
  margin-top: 20px;
  transform: rotate(45deg);
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
