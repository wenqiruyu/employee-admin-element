<template>
  <div class="page-my-info">
    <!-- 用户头像 -->
    <div class="user-info-face">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:22345/employee-admin-server/user/uploadImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="userInfo.userface != null" :src="getImgUrl(userInfo.userface)" class="avatar" />
        <img v-else src="../../assets/img/default_face.jpg" class="avatar" />
      </el-upload>
      <div style="margin-top: 15px;">
        <el-button type="primary" round size="small" @click="loginout">退出登录</el-button>
      </div>
    </div>
    <div class="user-info-form">
      <el-form ref="form" :model="userInfo" label-width="110px">
        <el-form-item label="昵称" class="formitem">
          <el-input
            v-model="userInfo.username"
            size="large"
            v-bind:placeholder="userInfo.username"
            style="width: 180px;float: left;margin-left: 15px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定手机号" class="formitem">
          <el-input
            v-model="userInfo.phone"
            v-bind:placeholder="userInfo.phone"
            style="width: 180px;float: left;margin-left: 15px;"
          ></el-input>
          <div
            style="float: left;font-size: 14px;color: #CCD0D7;margin-left: 15px;"
            @click="showPhone"
          >
            <span v-if=" userInfo.phone == null ">未绑定手机号</span>
            <span v-else-if="isShow">{{userInfo.phone}}</span>
            <span v-else>{{userInfo.phone}}</span>
          </div>
        </el-form-item>
        <el-form-item label="绑定邮箱" class="formitem">
          <el-input
            v-model="userInfo.email"
            v-bind:placeholder="userInfo.email"
            style="width: 180px;float: left;margin-left: 15px;"
          ></el-input>
          <div style="float: left;font-size: 14px;color: #CCD0D7;margin-left: 15px;">
            <span v-if=" userInfo.email == null ">未绑定邮箱</span>
            <span v-else>{{userInfo.email}}</span>
          </div>
        </el-form-item>
        <el-form-item label="出生日期" class="formitem">
          <el-date-picker
            v-if="userInfo.birthday == null"
            v-model="userInfo.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="不想告诉其他人"
            :clearable="isClear"
            style="width: 180px;float: left;margin-left: 15px;"
          />
          <el-date-picker
            v-else
            v-model="userInfo.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            v-bind:placeholder="userInfo.birthday"
            :clearable="isClear"
            style="width: 180px;float: left;margin-left: 15px;"
          />
        </el-form-item>
        <el-form-item label="性别" class="formitem">
          <el-radio :label="1" v-model="userInfo.sex" style="margin-left: 15px;">男</el-radio>
          <el-radio :label="0" v-model="userInfo.sex">女</el-radio>
          <el-radio :label="2" v-model="userInfo.sex">保密</el-radio>
        </el-form-item>
        <el-form-item label="签名" class="formitem">
          <el-input
            v-model="userInfo.remark"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 4}"
            v-bind:maxlength="maxLen"
            placeholder="说出你想说的吧"
            style="float: left;margin-left: 15px;width: 380px;"
          ></el-input>
        </el-form-item>
        <div>
          <el-form-item style="margin-left: 150px;">
            <el-button type="primary" size="large" @click="toSave">保存修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      isClear: false,
      isShow: false,
      isChange: false,
      maxLen: 80,
      oldInfoStr: '',
      userInfo: {
        username: '',
        phone: '',
        email: '',
        birthday: null,
        sex: '',
        remark: ''
      },
      formItem: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  props: {
    requierd: true
  },
  methods: {
    getImgUrl(icon) {
      return require('@/assets' + icon)
    },
    loginout() {
      localStorage.removeItem('employee_username')
      this.$router.push('/login')
    },
    getUserInfo() {
      this.$axios
        .post('/employee-admin-server/user/getUser', {
          username: localStorage.getItem('employee_username')
        })
        .then(res => {
          if (res.data.code == 200) {
            this.userInfo = res.data.data
            this.oldInfoStr =
              this.userInfo.birthday +
              this.userInfo.phone +
              this.userInfo.sex +
              this.userInfo.remark
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    toSave() {
      var isShowMsg = true
      var oldUserName = localStorage.getItem('employee_username')
      // 还要考虑用户再更改用户名的时候，是否重名
      if (this.userInfo.username != oldUserName) {
        // 进行数据库进行查询是否重名
        this.$axios
          .post('/employee-admin-server/user/getUser', {
            username: this.userInfo.username
          })
          .then(data => {
            // 状态码两百表示数据库中有该用户
            if (data.data.code != 200) {
              this.isChange = true
              this.verifyOther()
              this.updateData()
            } else {
              this.isChange = false
              this.userInfo.username = oldUserName
              this.$message.error('该用户名已经存在了哦')
            }
          })
      } else {
        this.verifyOther()
        this.updateData()
      }
    },
    verifyOther() {
      var newInfoStr =
        this.userInfo.birthday +
        this.userInfo.phone +
        this.userInfo.sex +
        this.userInfo.remark

      if (newInfoStr != this.oldInfoStr) {
        this.isChange = true
      }
    },
    updateData() {
      if (this.isChange) {
        this.$axios
          .post('/employee-admin-server/user/updateUser', this.userInfo)
          .then(data => {
            var data = data.data
            if (data.code == 200) {
              localStorage.setItem('employee_username', this.userInfo.username)
              this.isChange = false
              this.oldInfoStr =
                this.userInfo.birthday +
                this.userInfo.phone +
                this.userInfo.sex +
                this.userInfo.remark
              this.$message({
                message: '成功修改个人信息',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: data.data,
                type: 'error'
              })
            }
          })
      } else {
        this.$message({
          showClose: true,
          message: '请勿提交未修改的信息哦',
          type: 'error'
        })
      }
    },
    showPhone() {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    /** 头像上传 */
    handleAvatarSuccess(res, file) {
      this.userInfo.userface = URL.createObjectURL(file.raw)
      console.log(res)
      if (res.code == 200) {
        this.$axios
          .post('/employee-admin-server/user/updateUserFace', {
            destFileName: res.data.destFileName,
            fileName: res.data.fileName,
            username: this.userInfo.username
          })
          .then(data => {
            var data = data.data
            if (data.code == 200) {
              this.$message({
                message: '修改头像成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: data.data,
                type: 'error'
              })
            }
          })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>


<style>
.user-info-face {
  float: left;
  margin-left: 120px;
  margin-top: 30px;
}
/** 用户头像上传 */
.el-upload--text {
  width: 178px;
  height: 178px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.user-info-form {
  float: left;
  margin-top: 60px;
  margin-left: 150px;
  width: 630px;
}
.formitem > :first-child {
  font-size: 14px;
}
</style>
