<template>
  <div>
    <div>
      <el-tree :data="deptList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
    export default {
        name: "deptList",
        data() {
            return {
                deptList: [{
                    deptName: '公司组织架构',
                    children: []
                }],
                defaultProps: {
                    children: 'children',
                    label: 'deptName'
                }
            };
        },
        created() {
            this.getAllDept();
        },
        methods: {
            getAllDept(){
                this.$axios.post("/employee-admin-server/dept/getAllDept").then((res) => {
                    if (res.data.code == 200) {
                        // 数组复制
                        this.deptList[0].children = res.data.data.slice()
                        console.log(res.data.data)
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
                console.log(data);
            }
        }
    }
</script>

<style scoped>

</style>
