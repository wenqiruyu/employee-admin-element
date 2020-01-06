<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="iconfont icon-wen-home"></i> 系统首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="index-title">
                <span>启明星在线聊天室</span>
            </div>
            <div class="index-chat">
                <!-- 处于和我聊天状态用户列表 -->
                <div class="now-chat-list">
                    <el-card class="now-chat-list-card">

                    </el-card>
                </div>
                <div class="chat-center">
                    <!-- 当前聊天状态用户信息 -->
                    <div class="chat-user-info">
                        <el-card class="chat-user-info-card">


                        </el-card>
                    </div>
                    <!-- 聊天信息展示位置 -->
                    <div class="chat-content-show">
                        <el-card class="chat-content-show-card">
                            <div v-for="(value,key,index) in chatAllMessage" :key="index">
                                <div v-if="value.username == 'venus'" class="chat-content-show-card-tips">
                                    <span>{{value.chatMessage}}</span>
                                </div>
                                <div v-if="value.username == username" class="chat-content-show-card-msg">
                                    <el-tag type="success" style="float:right">
                                        {{value.username}}：{{value.chatMessage}}
                                    </el-tag>
                                    <br/>
                                </div>
                                <div v-if="value.username != username && value.username != 'venus'" class="chat-content-show-card-msg">
                                    <el-tag style="float:left">
                                        {{value.username}}：{{value.chatMessage}}
                                    </el-tag>
                                    <br/>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <!-- 聊天信息输入位置 -->
                    <div class="chat-content-input">
                        <el-card class="chat-content-input-card">
                            <div class="chat-content-input-message">
                                <el-input type="textarea" placeholder="请输入内容" v-model="chatMessage" maxlength="200" show-word-limit resize="none"
                                size="medium" rows="4">
                                </el-input>
                            </div>
                            <div class="chat-content-input-button">
                                <el-button type="text" class="button" @click="sendMessage">发送</el-button>
                            </div>
                        </el-card>
                    </div>
                </div>
                <!-- 用户好友列表 -->
                <div class="chat-user-list">
                    <el-card class="chat-user-list-card">


                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WeChat',
        data(){
            return {
                username: '',
                chatMessage: '',
                webSocket: null,
                chatAllMessage: [],
            }
        },
        created() {
            this.initWebSocket()
        },
        methods: {
            initWebSocket(){
                const $vm = this;
                this.username = localStorage.getItem("venus_username")
                this.webSocket = new WebSocket('ws://localhost:10001/venus-admin-server/chat/' + this.username)
                this.webSocket.onopen = function() {
                    console.log('WebSocket已连接')
                }

                this.webSocket.onmessage = evt => {
                    var result = JSON.parse(evt.data)
                    if(result.code == 200){
                        this.chatAllMessage.push(result.data)
                    }
                    console.log(evt.data)
                    console.log('数据已接收...')
                }

                this.webSocket.onclose = function () {
                    console.log('WebSocket连接已关闭...')
                }

                window.onbeforeunload = function() {
                    this.websocket.close();
                }
            },
            sendMessage(){
                if (this.chatMessage != '') {
                    this.webSocket.send(this.chatMessage)
                    this.chatMessage = ''
                }
            },
            /** 查找用户的好友列表 */
            userFriend(){
                this.$axios.post('/venus-admin-server/user/login',params).then((res) => {
                if(res.data.code == 200){
                    localStorage.setItem('venus_username',this.ruleForm.username)
                    localStorage.setItem('venus_token',res.data.data)
                    this.$router.push('/index')
                    }else{
                        this.msg = res.data.msg
                    }
                })
            }
        }
    }
</script>

<style>
    .container{
        height: 740px;
        /* background-image: url(../../assets/img/index-bg.jpg); */
    }
    .index-title{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #ff0000;
    }
    .index-chat{
        margin-left: 120px;
        margin-top: 10px;
    }
    /*处于和我聊天状态用户列表*/
    .now-chat-list{
        width: 15%;
        margin-top: 20px;
        float: left;
    }
    .now-chat-list-card{
        height: 680px;
    }
    .chat-center{
        float: left;
        width: 55%
    }
    /*当前聊天状态用户信息*/
    .chat-user-info{
        width: 100%;
        margin-top: 20px;
        margin-left: 5px;
        float: left;
    }
    .chat-user-info-card{
        height: 50px;
    }
    /*聊天信息展示位置*/
    .chat-content-show{
        width: 100%;
        margin-top: 5px;
        margin-left: 5px;
        float: left;
    }
    .chat-content-show-card{
        height: 450px;
    }
    /*聊天室用户加入和退出tips提示*/
    .chat-content-show-card-tips{
        border:3px solid #000;
        margin-top: -10px;
        text-align: center;
        width: 100%;
        font-size: 13px;
        color: #ff0000;
        float: left;
    }
    .chat-content-show-card-msg{
        width: 100%;
    }
    /*聊天信息输入位置*/
    .chat-content-input{
        width: 100%;
        margin-top: 5px;
        margin-left: 5px;
        float: left;
    }
    .chat-content-input-card{
        height: 165px;
    }
    .chat-content-input-message{
        height: 100px;
    }
    .chat-content-input-button{
        float: left;
        margin-left: 500px;
    }
    /*用户好友列表*/
    .chat-user-list{
        width: 20%;
        margin-top: 20px;
        margin-left: 10px;
        float: left;
    }
    .chat-user-list-card{
        height: 680px;
    }
</style>
