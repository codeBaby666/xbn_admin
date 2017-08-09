 <template>
     <div>
         <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="管理员" name="first">
                 <div class="content">
                     <div class="operation_btn">
                         <el-button type="text" style="padding-left: 20px" @click="jumpAddUser()">
                             <em class="iconfont icon-add"></em>
                             <span style="display: inline-block;padding-left: 10px;">新增管理员</span>
                         </el-button>
                     </div>
                     <el-table :data="tableData" border style="width: 98%;margin: 0 15px;">
                         <el-table-column label="登录名" width="250" header-align="center" align="center">
                             <template scope="scope">
                                 <span>{{ scope.row.admin_name }}</span>
                             </template>
                         </el-table-column>
                         <el-table-column label="上次登录时间" width="380" header-align="center" align="center">
                             <template scope="scope">
                                 <span>{{ scope.row.lastLoginTime }}</span>
                             </template>
                         </el-table-column>
                         <el-table-column label="上次登录IP" width="280" header-align="center" align="center">
                             <template scope="scope">
                                 <span>{{ scope.row.lastLoginIp }}</span>
                             </template>
                         </el-table-column>
                         <el-table-column label="登录次数" width="100" header-align="center" align="center">
                             <template scope="scope">
                                 <span>{{ scope.row.loginCount }}</span>
                             </template>
                         </el-table-column>
                         <el-table-column label="角色" width="300" header-align="center" align="center">
                             <template scope="scope">
                                 <span>{{ scope.row.role_name }}</span>
                             </template>
                         </el-table-column>
                         <el-table-column label="操作" header-align="center" align="center">
                             <template scope="scope">
                                 <el-button size="small" @click="jumpAdminEdit(scope.$index, scope.row)">编辑</el-button>
                                 <el-button size="small" @click="del(scope.$index, scope.row)">删除</el-button>
                             </template>
                         </el-table-column>
                     </el-table>
                     <div class="block" style="text-align: center;">
                         <el-pagination
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 :current-page="pageNo"
                                 :page-sizes="pageSizes"
                                 :page-size="pageSize"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="totalCount">
                         </el-pagination>
                     </div>
                 </div>
             </el-tab-pane>
             <el-tab-pane label="角色管理" name="second">
                 <div class="content">
                     <div class="operation_btn">
                         <el-button type="text" style="padding-left: 20px" @click="jumpAddRole()">
                             <em class="iconfont icon-add"></em>
                             <span style="display: inline-block;padding-left: 10px;">新增角色</span>
                         </el-button>
                     </div>
                     <el-table :data="tableData1" border style="width: 98%;margin: 0 15px;">
                         <el-table-column label="角色" width="500" header-align="center" align="center">
                             <template scope="scope">
                                 <span>{{ scope.row.role_name }}</span>
                             </template>
                         </el-table-column>
                         <el-table-column label="编辑" width="500" header-align="center" align="center">
                             <template scope="scope">
                                 <div class="iconfont icon-write" @click="jumpRoleEdit(scope.$index, scope.row)"></div>
                             </template>
                         </el-table-column>
                         <el-table-column label="操作" header-align="center" align="center">
                             <template scope="scope">
                                 <el-button size="small" @click="delRole(scope.$index, scope.row)">删除</el-button>
                             </template>
                         </el-table-column>
                     </el-table>
                     <div class="block" style="text-align: center;">
                         <el-pagination
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 :current-page="pageNo"
                                 :page-sizes="pageSizes"
                                 :page-size="pageSize"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="totalCount">
                         </el-pagination>
                     </div>
                 </div>
             </el-tab-pane>
         </el-tabs>
     </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getAdminList,getRoleListByPage,deleAdmin,deleRole} from '../../service/getData'

    export default {
        data(){
            return{
                activeName:'first',
                tableData:[],
                tableData1:[],
                pageNo : 1, //当前页码 number
                pageSizes:[5,10, 20, 30, 50],
                pageSize:5, //显示的条数 number
                totalCount :50, //总条数 number
            }
        },
        mounted(){
            if(this.activeName == 'first'){
                this.postAdminList();
            }else{
                this.postRoleList();
            }
        },
        components: {},
        props:[],
        methods: {
            //点击切换状态按钮，加载不同状态的数据
            handleClick(tab, event) {
                if(this.activeName == 'first'){
                    this.postAdminList();
                }else{
                    this.postRoleList();
                }
            },
            jumpAddRole(){
                this.$router.push({path:'/addRole'});
            },
            jumpRoleEdit(index,row){
                this.$router.push({path:'/addRole?role_id = '+ row.role_id});
            },
            jumpAddUser(){
                this.$router.push({path:'/addAdmin'});
            },
            jumpAdminEdit(index,row){
                this.$router.push({path:'/addAdmin?admin_id = '+ row.admin_id});
            },
            delRole(index,row){
                deleRole(row.role_id).then((res) => {
                    if(res.statusCode == 2000000){
                        this.dialogFormVisible = false;
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.postRoleList();
                    }
                });
            },
            del(index,row){
                deleAdmin(row.admin_id).then((res) => {
                    if(res.statusCode == 2000000){
                        this.dialogFormVisible = false;
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.postAdminList();
                    }
                });
            },
            //pageSize 改变时会触发
            handleSizeChange(val) {
                this.pageSize = val;
                if(this.activeName == 'first'){
                    this.postAdminList();
                }else{
                    this.postRoleList();
                }
            },
            //pageNo 改变时会触发
            handleCurrentChange(val) {
                this.pageNo = val;
                if(this.activeName == 'first'){
                    this.postAdminList();
                }else{
                    this.postRoleList();
                }
            },
            //获取角色列表
            postRoleList(){
                getRoleListByPage(this.pageNo,this.pageSize).then((res) => {
                    if(res.statusCode == 2000000){
                        this.tableData1 = res.data.list;
                        this.totalCount = res.data.page.totalCount;
                    }
                })
            },
            //获取管理员列表
            postAdminList(){
                getAdminList(this.pageNo,this.pageSize).then((res) => {
                    if(res.statusCode == 2000000){
                        this.tableData = res.data.list;
                        this.totalCount = res.data.page.totalCount;
                    }
                })
            }
        }
    }
</script>
  
<style scoped>
    @import '../../style/reset.css';
    @import '../../style/style.css';

    .content {
        background-color: white;
        padding-top: 30px;
        min-height: 800px;
    }
    .content .operation_btn {
        background-color: #eee;
        height: 35px;
        line-height: 35px;
        width: 98%;
        margin: 0px 15px;
    }
    .content .el-pagination {
        padding: 20px 5px;
    }
</style>
