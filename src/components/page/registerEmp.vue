<template>
  <div style="margin-top: 40px;">
    <div style="width: 600px; margin: 0 auto;">
      <el-steps :active="active">
        <el-step title="员工基本信息" description="此处信息必填"></el-step>
        <el-step title="分配部门及直属上级" description="此处信息必填"></el-step>
        <el-step title="平台用户注册" description="性别、邮箱信息选填"></el-step>
        <el-step title="补充员工信息" description="此处信息选填"></el-step>
      </el-steps>
    </div>
    <div style="margin-top: 40px;">
      <div v-if="active == 1" style="width: 600px; margin: 0 auto;">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px">
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
          <el-form-item label="入职时间" prop="participateTime">
            <el-date-picker v-model="ruleForm.participateTime" type="date" value-format="yyyy-MM-dd" v-bind:placeholder="ruleForm.participateTime" style="width: 180px;float: left;margin-left: 15px;"/>
          </el-form-item>
          <el-form-item label="户籍所在地">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-form-item style="float: left;width: 120px;" prop="province">
                <el-select v-model="ruleForm.province" placeholder="省份" @change="changeProvince">
                  <el-option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value" :label ="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left;width: 120px;" prop="city">
                <el-select v-model="ruleForm.city" placeholder="城市" @change="changeCity">
                  <el-option v-for="(item,index) in citiesArr" :key="item.value" :value="item.value" :label ="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: left;width: 120px;" prop="county">
                <el-select v-model="ruleForm.county" placeholder="区县">
                  <el-option v-for="(item,index) in countyArr" :key="item.value" :value="item.value" :label ="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item style="margin-left: 15px;">
            <el-button type="primary" @click="nextSubmit('ruleForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 2" style="width: 600px; margin: 0 auto;">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px">
          <el-form-item label="员工部门">
            <div style="float: left;margin-left: 15px;width: 360px;">
                <el-select v-model="ruleForm.deptId" placeholder="选择员工部门" @change="changeDept">
                  <el-option v-for="(item,index) in deptArr" :key="item.deptId" :value="item.deptId" :label ="item.deptName">
                  </el-option>
                </el-select>
            </div>
          </el-form-item>
          <el-form-item label="员工职位">
            <div style="float: left;margin-left: 15px;width: 360px;">
                <el-select v-model="ruleForm.empPosition" placeholder="选择员工职位">
                  <el-option v-for="(item,index) in positionArr" :key="item.positionName" :value="item.positionName" :label ="item.positionName">
                  </el-option>
                </el-select>
            </div>
          </el-form-item>
          <el-form-item label="员工上级领导名" style="margin-left: 15px">
            <el-input v-model="ruleForm.superEmpName" style="width: 222px;"></el-input>
          </el-form-item>
          <el-form-item label="员工上级领导员工号" style="margin-left: 15px">
            <el-input v-model="ruleForm.superEmpId" style="width: 222px;"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 15px;">
            <el-button type="primary" @click="nextSubmit('ruleForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 3" style="width: 600px; margin: 0 auto;">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px">
          <el-form-item label="平台用户名" style="margin-left: 15px;">
            <el-input v-model="ruleForm.username" autocomplete="off" :disabled="true" style="width: 240px;">
              {{this.ruleForm.username}}
            </el-input>
            <div style="margin-bottom: -30px;color: #727D81;font-size: 12px;"><span>*新用户用户名默认为员工姓名 + 员工号</span></div>
          </el-form-item>
          <el-form-item label="平台用户密码" style="margin-left: 15px;">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" :disabled="true" style="width: 240px;">
              {{this.ruleForm.password}}
            </el-input>
            <div style="margin-bottom: -30px;color: #727D81;font-size: 12px;"><span>*新用户默认密码为Ad + 身份证后六位</span></div>
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
          <el-form-item style="margin-left: 15px;">
            <el-button type="primary" @click="nextSubmit('ruleForm')">下一步</el-button>
            <el-button type="primary" @click="backSubmit">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 4" style="width: 600px; margin: 0 auto;">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px">
          <el-form-item label="紧急联系电话" prop="telephone" style="margin-left: 15px;">
            <el-input v-model="ruleForm.telephone" autocomplete="off" style="width: 222px;">
              {{this.ruleForm.telephone}}
            </el-input>
          </el-form-item>
          <el-form-item label="详细户籍地址" prop="address" style="margin-left: 15px;">
            <el-input v-model="ruleForm.address" autocomplete="off" style="width: 222px;">
              {{this.ruleForm.address}}
            </el-input>
          </el-form-item>
          <el-form-item label="现居住地址" prop="currentAddress" style="margin-left: 15px;">
            <el-input v-model="ruleForm.currentAddress" autocomplete="off" style="width: 222px;">
              {{this.ruleForm.currentAddress}}
            </el-input>
          </el-form-item>
          <el-form-item label="所属党派">
            <div style="float: left;margin-left: 15px;width: 360px;">
                <el-select v-model="ruleForm.politics" placeholder="选择所属党派">
                  <el-option v-for="(item,index) in politicsArr" :key="item.value" :value="item.value" :label ="item.label">
                  </el-option>
                </el-select>
            </div>
          </el-form-item>
          <el-form-item label="所属民族">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-select v-model="ruleForm.national" placeholder="选择所属民族">
                <el-option v-for="(item,index) in nationalArr" :key="item.value" :value="item.value" :label ="item.label">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="婚姻状态">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-select v-model="ruleForm.marriage" placeholder="选择婚姻状态">
                <el-option v-for="(item,index) in marriageArr" :key="item.value" :value="item.value" :label ="item.label">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="个人学历">
            <div style="float: left;margin-left: 15px;width: 360px;">
              <el-select v-model="ruleForm.education" placeholder="选择个人学历">
                <el-option v-for="(item,index) in educationArr" :key="item.value" :value="item.value" :label ="item.label">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="primary" @click="backSubmit">上一步</el-button>
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
                }else if (value != '' && regEmail.test(value)){
                  callback();
                }
                if(value == ''){
                  callback();
                }
            }
            const validateParticipateTime = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('入职时间不能为空'));
              } else {
                callback();
              }
            }
            return {
                active: 1,
                empId: '',
                deptArr:[],
                positionArr: [],
                provinceArr: [],
                citiesArr: [],
                countyArr: [],
                politicsArr: [
                  {
                    "value": "群众",
                    "label": "群众"
                  },{
                    "value": "中共党员",
                    "label": "中共党员"
                  },{
                    "value": "无党派民主人士",
                    "label": "无党派民主人士"
                  },{
                    "value": "民革党员",
                    "label": "民革党员"
                  },{
                    "value": "民盟党员",
                    "label": "民盟党员"
                  },{
                    "value": "农工党员",
                    "label": "农工党员"
                  },
                ],
                nationalArr: [
                  {
                    "value": "汉族",
                    "label": "汉族"
                  },
                  {
                    "value": "蒙古族",
                    "label": "蒙古族"
                  },
                  {
                    "value": "回族",
                    "label": "回族"
                  },
                  {
                    "value": "藏族",
                    "label": "藏族"
                  },
                  {
                    "value": "维吾尔族",
                    "label": "维吾尔族"
                  },
                  {
                    "value": "苗族",
                    "label": "苗族"
                  },
                  {
                    "value": "彝族",
                    "label": "彝族"
                  },
                  {
                    "value": "壮族",
                    "label": "壮族"
                  },
                  {
                    "value": "布依族",
                    "label": "布依族"
                  },
                  {
                    "value": "朝鲜族",
                    "label": "朝鲜族"
                  },
                  {
                    "value": "满族",
                    "label": "满族"
                  },
                  {
                    "value": "侗族",
                    "label": "侗族"
                  },
                  {
                    "value": "瑶族",
                    "label": "瑶族"
                  },
                  {
                    "value": "白族",
                    "label": "白族"
                  },
                  {
                    "value": "土家族",
                    "label": "土家族"
                  },
                  {
                    "value": "哈尼族",
                    "label": "哈尼族"
                  },
                  {
                    "value": "哈萨克族",
                    "label": "哈萨克族"
                  },
                  {
                    "value": "傣族",
                    "label": "傣族"
                  },
                  {
                    "value": "黎族",
                    "label": "黎族"
                  },
                  {
                    "value": "傈僳族",
                    "label": "傈僳族"
                  },
                  {
                    "value": "佤族",
                    "label": "佤族"
                  },
                  {
                    "value": "畲族",
                    "label": "畲族"
                  },
                  {
                    "value": "高山族",
                    "label": "高山族"
                  },
                  {
                    "value": "拉祜族",
                    "label": "拉祜族"
                  },
                  {
                    "value": "水族",
                    "label": "水族"
                  },
                  {
                    "value": "东乡族",
                    "label": "东乡族"
                  },
                  {
                    "value": "纳西族",
                    "label": "纳西族"
                  },
                  {
                    "value": "景颇族",
                    "label": "景颇族"
                  },
                  {
                    "value": "柯尔克孜族",
                    "label": "柯尔克孜族"
                  },
                  {
                    "value": "土族",
                    "label": "土族"
                  },
                  {
                    "value": "达斡尔族",
                    "label": "达斡尔族"
                  },
                  {
                    "value": "仫佬族",
                    "label": "仫佬族"
                  },
                  {
                    "value": "羌族",
                    "label": "羌族"
                  },
                  {
                    "value": "布朗族",
                    "label": "布朗族"
                  },
                  {
                    "value": "撒拉族",
                    "label": "撒拉族"
                  },
                  {
                    "value": "毛难族",
                    "label": "毛难族"
                  },
                  {
                    "value": "仡佬族",
                    "label": "仡佬族"
                  },
                  {
                    "value": "锡伯族",
                    "label": "锡伯族"
                  },
                  {
                    "value": "阿昌族",
                    "label": "阿昌族"
                  },
                  {
                    "value": "普米族",
                    "label": "普米族"
                  },
                  {
                    "value": "塔吉克族",
                    "label": "塔吉克族"
                  },
                  {
                    "value": "怒族",
                    "label": "怒族"
                  },
                  {
                    "value": "乌孜别克族",
                    "label": "乌孜别克族"
                  },
                  {
                    "value": "俄罗斯族",
                    "label": "俄罗斯族"
                  },
                  {
                    "value": "鄂温克族",
                    "label": "鄂温克族"
                  },
                  {
                    "value": "崩龙族",
                    "label": "崩龙族"
                  },
                  {
                    "value": "保安族",
                    "label": "保安族"
                  },
                  {
                    "value": "裕固族",
                    "label": "裕固族"
                  },
                  {
                    "value": "京族",
                    "label": "京族"
                  },
                  {
                    "value": "塔塔尔族",
                    "label": "塔塔尔族"
                  },
                  {
                    "value": "独龙族",
                    "label": "独龙族"
                  },
                  {
                    "value": "鄂伦春族",
                    "label": "鄂伦春族"
                  },
                  {
                    "value": "赫哲族",
                    "label": "赫哲族"
                  },
                  {
                    "value": "门巴族",
                    "label": "门巴族"
                  },
                  {
                    "value": "珞巴族",
                    "label": "珞巴族"
                  },
                  {
                    "value": "基诺族",
                    "label": "基诺族"
                  }
                ],
                marriageArr: [
                  {
                    "value": "未婚",
                    "label": "未婚"
                  },{
                    "value": "已婚",
                    "label": "已婚"
                  },{
                    "value": "丧偶",
                    "label": "丧偶"
                  },{
                    "value": "其他",
                    "label": "其他"
                  }
                ],
                educationArr: [
                  {
                    "value": "小学",
                    "label": "小学"
                  },{
                    "value": "初中",
                    "label": "初中"
                  },{
                    "value": "高中",
                    "label": "高中"
                  },{
                    "value": "本科",
                    "label": "本科"
                  },{
                    "value": "研究生",
                    "label": "研究生"
                  },{
                    "value": "博士",
                    "label": "博士"
                  }
                ],
                ruleForm: {
                    empName: '',
                    idCard: '',
                    phone: '',
                    empId: '',
                    username: '',
                    password: '',
                    email: '',
                    sex: '',
                    province: '',
                    city: '',
                    county: '',
                    telephone: '',
                    address: '',
                    currentAddress: '',
                    politics: '',
                    national: '',
                    marriage: '',
                    education: '',
                    deptId: '',
                    empPosition: '',
                    superEmpName: '',
                    superEmpId: '',
                    participateTime: ''
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
                    ],
                    participateTime: [
                      {validator: validateParticipateTime, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
          this.getAllDept()
          this.getEmpId()
          this.getProvince()
        },
        created() {

        },
        methods: {
          getAllDept(){
            this.$axios.post('/employee-admin-server/dept/getAllDept').then((res) =>{
                if (res.data.code == 200) {
                    this.deptArr = res.data.data
                    console.log(this.deptArr)
                } else {
                  this.$message.error(res.data.msg)
                }
            })
          },
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
          changeDept(val) {
            this.positionArr = []
            for (var i = 0; i < this.deptArr.length; i++) {
              if (val == this.deptArr[i].deptId) {
                this.positionArr = this.deptArr[i].position
                this.ruleForm.empPosition = ''
                
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
            },
            nextSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.active += 1
                      if(this.active == 2 && this.ruleForm.idCard != ''){
                        this.ruleForm.password = 'Aa' + this.ruleForm.idCard.slice(-6)
                      }
                      if(this.active == 2 && this.ruleForm.sex == ''){
                        this.ruleForm.sex = 2
                      }
                    }
                })
            },
            backSubmit(){
              this.active -= 1
            },
            submitForm(name) {
                var self = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 验证用户名是否存在
                        this.$axios.post('/employee-admin-server/emp/addEmp', {
                            params: {
                                staffBase: {
                                  empId : this.ruleForm.empId,
                                  empName: this.ruleForm.empName,
                                  participateTime: this.ruleForm.participateTime
                                },
                                staffDept: {
                                  empId: this.ruleForm.empId,
                                  deptId: this.ruleForm.deptId,
                                  empPosition: this.ruleForm.empPosition,
                                  superEmpName: this.ruleForm.superEmpName,
                                  superEmpId: this.ruleForm.superEmpId,
                                },
                                staffDetail: {
                                  idCard: this.ruleForm.idCard,
                                  phone: this.ruleForm.phone,
                                  username: this.ruleForm.username,
                                  password: this.ruleForm.password,
                                  email: this.ruleForm.email,
                                  sex: this.ruleForm.sex,
                                  province: this.ruleForm.province,
                                  city: this.ruleForm.city,
                                  county: this.ruleForm.county,
                                  telephone: this.ruleForm.telephone,
                                  address: this.ruleForm.address,
                                  currentAddress: this.ruleForm.currentAddress,
                                  politics: this.ruleForm.politics,
                                  national: this.ruleForm.national,
                                  marriage: this.ruleForm.marriage,
                                  education: this.ruleForm.education
                                }
                            }
                        }).then((res) => {
                          console.log(res.data.data)
                          if(res.data.code == 200){
                            this.$message({
                                message: '该员工信息录入成功',
                                type: 'success'
                            })
                            window.location.href = "/registerEmp"
                          }else {
                            this.$message.error(res.data.msg)
                          }
                          //路由跳转
                          // self.$router.push({path: '/login'})
                          // window.location.href = "/login"
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
