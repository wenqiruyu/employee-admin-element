<template>
    <div class="page-my-info">
        <!-- 用户头像 -->
        <div class="user-info-face">
            <Upload ref="upload" :format="['jpg','jpeg','png']" :max-size="2048" multiple
                action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;border-radius: 50%;">
                <div style="width: 100px;height:100px;line-height: 100px;float: left;">
                    <img v-bind:src="userInfo.user.face" alt="图片被怪物吃辣">
                </div>
            </Upload>
        </div>
        <div class="user-info-form">
            <Form :model="formItem" :label-width="110">
                <FormItem label="昵称" class="formitem">
                    <Input v-model="userInfo.user.username" size="large" v-bind:placeholder="userInfo.username" style="width: 180px;float: left;margin-left: 15px;"></Input>
                </FormItem>
                <FormItem label="绑定手机号" class="formitem">
                    <!-- <Input v-model="formItem.input" v-bind:placeholder="user.name"></Input> -->
                    <div style="float: left;font-size: 14px;color: #CCD0D7;margin-left: 15px;" @click="showPhone">
                        <span v-if=" userInfo.phone == null ">未绑定手机号</span>
                        <span v-else-if="isShow">{{userInfo.phone}}</span>
                        <span v-else>{{userInfo.userPhone}}</span>
                    </div>
                </FormItem>
                <FormItem label="绑定邮箱" class="formitem">
                    <div style="float: left;font-size: 14px;color: #CCD0D7;margin-left: 15px;">
                        <span v-if=" userInfo.email == null ">未绑定邮箱</span>
                        <span v-else>{{userInfo.email}}</span>
                    </div>
                </FormItem>
                <FormItem label="生日" class="formitem">
                    <Row>
                        <Col span="11">
                            <DatePicker v-if="userInfo.user.birthday == null" type="date" placeholder="不想告诉其他人" :value="chooseDate" @on-change="changeDate" :clearable="isClear"></DatePicker>
                            <DatePicker v-else type="date" :placeholder="userInfo.user.birthday" :value="chooseDate" @on-change="changeDate" :clearable="isClear"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别" class="formitem">
                    <RadioGroup v-model="userInfo.userSex" style="float: left;margin-left: 15px;">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                        <Radio label="保密">保密</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="签名" class="formitem">
                    <Input v-model="userInfo.user.signature" type="textarea" :autosize="{minRows: 3,maxRows: 4}" v-bind:maxlength="maxLen" placeholder="说出你想说的吧" style="float: left;margin-left: 15px;width: 380px;"></Input>
                </FormItem>
                <div style="margin-left: 150px;">
                    <FormItem>
                        <Button type="primary" size="large" @click="toSave">保存修改</Button>
                    </FormItem>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isClear: false,
                isShow: false,
                isChange: false,
                chooseDate: '',
                maxLen: 80,
                formItem: { 
                }
            }
        },
        created(){

        },
        props:{
            userInfo: {},
            requierd: true
        },
        methods:{
            getUserInfo(){
                this.$axios.get('/employee-admin-server/user/getUser',{
                            params:{
                                username: this.userInfo.user.username
                            }
                        }).then((data)=>{
                        if(data.data.status == 1){
                            this.isChange = true
                            this.userInfo.userName = this.userInfo.user.username
                            this.verifyOther()
                            this.updateData()
                        }else{
                            this.isChange = false
                            this.userInfo.user.username = this.userInfo.userName
                            this.$Notice.error({
                                title: '提示',
                                desc: data.data.msg
                            })
                        }
                    })
            },
            toSave(){
                var isShowMsg = true
                // 还要考虑用户再更改用户名的时候，是否重名
                if(this.userInfo.userName != this.userInfo.user.username){
                    // 进行数据库进行查询是否重名
                    this.$axios.get('/user-server/user/register',{
                            params:{
                                username: this.userInfo.user.username
                            }
                        }).then((data)=>{
                        if(data.data.status == 1){
                            this.isChange = true
                            this.userInfo.userName = this.userInfo.user.username
                            this.verifyOther()
                            this.updateData()
                        }else{
                            this.isChange = false
                            this.userInfo.user.username = this.userInfo.userName
                            this.$Notice.error({
                                title: '提示',
                                desc: data.data.msg
                            })
                        }
                    })
                }else{
                    this.verifyOther()
                    this.updateData()
                }
            },
            verifyOther(){
                if(this.chooseDate != this.userInfo.user.birthday && this.chooseDate != null && this.chooseDate != ''){
                    this.isChange = true
                    this.userInfo.user.birthday = this.chooseDate
                }
                if(this.userInfo.userSignature != this.userInfo.user.signature){
                    this.isChange = true
                    this.userInfo.userSignature = this.userInfo.user.signature
                }
                if(this.userInfo.userSex == '保密'){
                    if(this.userInfo.user.sex != 0){
                        this.isChange = true
                    }
                    this.userInfo.user.sex = 0
                }else if(this.userInfo.userSex == '男'){
                    if(this.userInfo.user.sex != 1){
                        this.isChange = true
                    }
                    this.userInfo.user.sex = 1
                }else{
                    if(this.userInfo.user.sex != 2){
                        this.isChange = true
                    }
                    this.userInfo.user.sex = 2
                }
            },
            updateData(){
                if(this.isChange){
                    this.$axios.put('/user-server/user',{
                        id: this.userInfo.user.id,
                        username: this.userInfo.user.username,
                        birthday: this.userInfo.user.birthday,
                        sex: this.userInfo.user.sex,
                        signature: this.userInfo.user.signature
                    }).then((data)=>{
                        this.isChange = false
                        var data = data.data
                        if(data.status == 1){
                            this.$Notice.success({
                                title: '提示',
                                desc: data.data
                            })
                        }else{
                            this.$Notice.error({
                                title: '提示',
                                desc: data.data
                            })
                        }
                    })
                }else{
                    this.$Notice.error({
                        title: '提示',
                        desc: '请勿提交未修改的信息哦'
                    })
                }
            },
            changeDate(date){
                this.chooseDate = date
            },
            showPhone(){
                if(this.isShow){
                    this.isShow = false
                }else{
                    this.isShow = true
                }
            }
        }
    }
</script>


<style scoped>
    .user-info-face{
        float: left;
        margin-left: 120px;
        margin-top: 30px;
    }
    .user-info-form{
        float: left;
        margin-top: 60px;
        margin-left: 150px;
        width: 630px;
    }
    .formitem > :first-child{
        font-size: 14px;
    }
    .user-info-face img{
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }
</style>