<template>
  <div style="margin-top: 100px;">
    <div style="width: 600px; margin-left: 600px;">
      <el-steps :active="active">
        <el-step title="员工基本信息" description=""></el-step>
        <el-step title="平台用户注册" description=""></el-step>
        <el-step title="补充员工信息" description=""></el-step>
      </el-steps>
    </div>
    <div style="margin-top: 60px;">
      <div v-if="active == 1">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="750px">
          <el-form-item label="员工姓名" prop="empName" style="margin-left: 15px">
            <el-input v-model="ruleForm.empName" @change="changeName()" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="员工号" prop="empId" style="margin-left: 15px">
            <el-input v-model="ruleForm.empId" :disabled="true" :placeholder="ruleForm.empId"
                      style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard" style="margin-left: 15px">
            <el-input v-model="ruleForm.idCard" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" style="margin-left: 15px">
            <el-input v-model="ruleForm.phone" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="户籍所在地">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-form-item style="float: left;width: 120px;" prop="province">
                <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                  <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left;width: 120px;" prop="city">
                <el-select v-model="ruleForm.city" placeholder="城市" @change="changeCity">
                  <el-option v-for="(item,index) in citiesArr" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left;width: 120px;" prop="county">
                <el-select v-model="ruleForm.county" placeholder="区县">
                  <el-option v-for="(item,index) in countyArr" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 2">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="500px">
          <el-form-item label="平台用户名" prop="username" style="margin-left: 15px;">
            <el-input v-model="ruleForm.username" autocomplete="off" :disabled="true" style="width: 240px;">
              {{this.ruleForm.username}}
            </el-input>
          </el-form-item>
          <el-form-item label="平台用户密码" prop="password" style="margin-left: 15px;">
            <el-input v-model="ruleForm.password" autocomplete="off" style="width: 240px;">
              {{this.ruleForm.username}}
            </el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex" style="margin-left: 15px;">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
              <el-radio :label="2">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="平台用户邮箱" prop="email" style="margin-left: 15px;">
            <el-input v-model="ruleForm.email" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 3">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="500px">
          <el-form-item label="紧急联系电话" prop="username" style="margin-left: 15px;">
            <el-input v-model="ruleForm.username" autocomplete="off" :disabled="true" style="width: 240px;">
              {{this.ruleForm.username}}
            </el-input>
          </el-form-item>
          <el-form-item label="详细户籍地址" prop="password" style="margin-left: 15px;">
            <el-input v-model="ruleForm.password" autocomplete="off" style="width: 240px;">
              {{this.ruleForm.username}}
            </el-input>
          </el-form-item>
          <el-form-item label="现居住地址" prop="password" style="margin-left: 15px;">
            <el-input v-model="ruleForm.password" autocomplete="off" style="width: 240px;">
              {{this.ruleForm.username}}
            </el-input>
          </el-form-item>
          <el-form-item label="所属党派">
            <div style="float: left;margin-left: 15px;width: 360px;">
                <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                  <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value">
                    {{ item.label }}
                  </el-option>
                </el-select>
            </div>
          </el-form-item>
          <el-form-item label="所属民族">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value">
                  {{ item.label }}
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="婚姻状态">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value">
                  {{ item.label }}
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="个人学历">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value">
                  {{ item.label }}
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            var regPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
            var regIdCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
            var regEmail = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不能为空'));
                } else if (!regPhone.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            const validateEmpName = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('员工姓名不能为空'));
                } else {
                    callback();
                }
            };
            const validateIdCard = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('身份证号不能为空'));
                } else if (!regIdCard.test(value)) {
                    callback(new Error('请输入正确的身份证号'));
                } else {
                    callback();
                }
            };
            const validateProvince = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('户籍省级不能为空'));
                } else {
                    callback();
                }
            };
            const validateCity = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('户籍市级不能为空'));
                } else {
                    callback();
                }
            };
            const validateCounty = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('户籍县级不能为空'));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                if (value != '' && !regEmail.test(value)) {
                    callback(new Error('请输入正确的邮箱号'));
                }
            }
            return {
                active: 2,
                empId: '',
                provinceArr: [],
                citiesArr: [],
                countyArr: [],
                ruleForm: {
                    empName: '',
                    idCard: '',
                    phone: '',
                    empId: '',
                    username: '',
                    email: '',
                    pass: '',
                    checkPass: '',
                    age: '',
                    province: '',
                    city: '',
                    county: ''
                },
                rules: {
                    empName: [
                        {validator: validateEmpName, trigger: 'blur'}
                    ],
                    idCard: [
                        {validator: validateIdCard, trigger: 'blur'}
                    ],
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    province: [
                        {validator: validateProvince, trigger: 'blur'}
                    ],
                    city: [
                        {validator: validateCity, trigger: 'blur'}
                    ],
                    county: [
                        {validator: validateCounty, trigger: 'blur'}
                    ],
                    email: [
                        {validator: validateEmail, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            this.getEmpId()
            this.getProvince()
        },
        created() {

        },
        methods: {
            getProvince() {
                this.$axios.get('http://localhost:22346/static/json/provinces.json').then((res) => {
                    this.provinceArr = res.data.data
                })
            },
            changeProvince(val) {
                for (var i = 0; i < this.provinceArr.length; i++) {
                    if (val == this.provinceArr[i].value) {
                        this.citiesArr = this.provinceArr[i].children
                        this.ruleForm.city = ''
                        this.ruleForm.county = ''
                        this.countyArr = []
                    }
                }
            },
            changeCity(val) {
                for (var i = 0; i < this.citiesArr.length; i++) {
                    if (val == this.citiesArr[i].value) {
                        this.countyArr = this.citiesArr[i].children
                    }
                }
            },
            getEmpId() {
                this.$axios.post("/employee-admin-server/emp/getEmpId").then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data.empId != null) {
                            this.ruleForm.empId = res.data.data.empId
                        } else {
                            this.$message.error("员工号获取失败，请联系开发人员进行排查问题")
                        }
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            changeName() {
                this.ruleForm.username = this.ruleForm.empName + this.ruleForm.empId
                console.log(this.ruleForm.username + "111")
            },
            submitForm(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.active += 1
                    }
                })
            },
            handleSubmit(name) {
                var self = this
                this.remindMsg = ''
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 验证用户名是否存在
                        this.$axios.get('/user-server/user/register', {
                            params: {
                                username: this.user.username
                            }
                        }).then((data) => {
                            var data = data.data
                            if (data.status == 1) {
                                this.$axios.post('/user-server/user/register', {
                                    name: this.user.username,
                                    password: this.user.password,
                                    phone: this.user.phone,
                                    verify: this.user.verify
                                }).then((data) => {
                                    var data = data.data
                                    if (data.status == 1) {
                                        //路由跳转
                                        // self.$router.push({path: '/login'})
                                        window.location.href = "/login"
                                    } else {
                                        this.remindMsg = '* ' + data.msg
                                    }
                                })
                            } else {
                                this.remindName = true
                                this.$refs.user.validateField('username')
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style>
  .register {
    background-image: url('/src/assets/img/index-bg.jpg');
  }
</style>
