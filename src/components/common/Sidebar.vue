<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subMenu">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>

                        <template v-for="subItem in item.subMenu">
                            <!--如果存在三层-->
                            <el-submenu v-if="subItem.subMenu" :index="subItem.subIndex" :key="subItem.subIndex">
                                <template slot="title">{{ subItem.subTitle }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subMenu" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.subIndex" :key="subItem.subIndex">
                                {{ subItem.subTitle }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: null
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 获取菜单列表
            this.getUserMenus()
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods: {
            getUserMenus(){
                this.$axios.post('/employee-admin-server/menu/getMenu', {
                    username: localStorage.getItem('employee_username')
                }).then((res)=>{
                        console.log(res)
                        if(res.data.code == 200){
                            this.items = res.data.data
                        }else{
                            this.$message.error(data.data.msg);
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 195px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
