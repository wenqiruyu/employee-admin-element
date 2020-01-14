<template>
  <div>
    <div class="dept-tree">
      <el-tree :data="deptList" node-key="deptName" :default-expanded-keys="['公司组织架构']" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
    export default {
        name: "deptList",
        data() {
            return {
                conheight: {
                    height:''
                },
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
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
            this.getAllDept();
        },
        methods: {
            getHeight(){
                this.conheight.height=window.innerHeight-170+'px';
            },
            getAllDept(){
                this.$axios.post("/employee-admin-server/dept/getAllDept").then((res) => {
                    if (res.data.code == 200) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.deptList[0].children.push({
                                deptId: res.data.data[i].deptId,
                                deptName: res.data.data[i].deptName,
                                deptDescription: res.data.data[i].deptDescription,
                                principalEmpId: res.data.data[i].principalEmpId,
                                principalName: res.data.data[i].principalName,
                                children: []
                            })
                            for(let j = 0; j < res.data.data[i].position.length; j++){
                                this.deptList[0].children[i].children.push({
                                    deptName: res.data.data[i].position[j].positionName,
                                    positionDesc: res.data.data[i].position[j].positionDesc
                                })
                            }
                        }
                        // 数组复制
                        // this.deptList[0].children = res.data.data.slice()
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

<style>
  .dept-tree{
    width: 300px;
    height: 100%;
    overflow:hidden;
  }
  .el-tree{
    height: 100%;
  }
</style>
