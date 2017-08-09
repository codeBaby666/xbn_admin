 <template>
  <div>
      <div class="WrapBox js-addRole">
          <el-form  :model="query" ref="query" :rules="ruleInline" label-width="125px">
              <p class="grayHeader"><i class="iconfont icon-home"></i><span class="location">所在位置：</span><span class="now">角色管理</span><span class="gt">&gt;</span><span class="js-title">增加角色</span></p>
              <h1>增加角色</h1><a class="fl hexagon" @click="back()">返回</a>
              <div>
                  <el-form-item label="角色名称：" prop="role_name">
                      <el-input type="text" size="small" v-model="query.role_name"></el-input>
                  </el-form-item>
              </div>
              <div class="infoBox">
                  <p class="grayHeader">角色权限选项</p>
                  <div class="wrapRole">
                      <el-checkbox-group v-model="operationIds">
                          <el-checkbox :label="role.operation_id" v-for="(role, index) in roleList" :key="index" :ref=" 'check_'+ index" @change="setAllChecked(index)">
                              <div style="margin-bottom: 10px;display: inline-block">{{role.operation_name}}</div>
                              <div class="js-wrapRole" v-if="role.childOperations">
                                  <el-checkbox-group v-model="operationIds">
                                      <el-checkbox :label="roleChild.operation_id" v-for="roleChild in role.childOperations">{{roleChild.operation_name}}</el-checkbox>
                                  </el-checkbox-group>
                              </div>
                          </el-checkbox>
                      </el-checkbox-group>
                  </div>
              </div>
              <div class="tac">
                  <el-form-item>
                      <el-button type="primary" @click="submit('query')">提交</el-button>
                  </el-form-item>
              </div>
          </el-form>
      </div>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {addRole,getRolePermissionsList,getRoleInfo,putRole} from '../../service/getData'

    export default {
        data(){
            return{
                query:{
                    role_name:''
                },
                ruleInline: {
                    role_name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'}
                    ]
                },
                roleList:[],
                operationIds:[],
                role_id:''
            }
        },
        mounted(){
            this.getRoleContentList();
            if(this.$route.query){
                if(this.$route.query["role_id "]) {
                    this.role_id = this.$route.query["role_id "];
                    this.getRoleIdInfo();
                }
            }
        },
        components: {},
        computed: {},
        methods: {
            back(){
                this.$router.back();
            },
            setAllChecked(index){
                this.$nextTick(() => {
                    if(this.$refs['check_'+ index][0].isChecked){
                        this.$refs['check_'+ index][0].$children[0].$children.forEach((item) => {
                            this.operationIds.push(item.label);
                        })
                    }else{
                        this.$refs['check_'+ index][0].$children[0].$children.forEach((item) => {
                            this.roleCheckedList.forEach((it,index) => {
                                if(item.label == it){
                                    this.operationIds.splice(index,1)
                                }
                            })
                        })
                    }
                    console.log(this.operationIds)
                })
            },
            getRoleContentList(){
                getRolePermissionsList().then((res) =>{
                    if(res.statusCode == 2000000){
                        this.roleList = res.data;
                    }
                })
            },
            getRoleIdInfo(){
                getRoleInfo(this.role_id).then((res) => {
                    if(res.statusCode == 2000000){
                        this.query.role_name = res.data[0].role_name;
                        this.operationIds = res.data[0].operationIds;
                    }
                })
            },
            submit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(!this.role_id){
                            addRole(this.query.role_name , this.operationIds).then((res) => {
                                if(res.statusCode == 2000000){
                                    this.dialogFormVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '添加角色成功'
                                    });
                                    this.$router.back();
                                }
                            });
                        }else{
                            putRole(this.role_id,this.query.role_name , this.operationIds).then((res) => {
                                if(res.statusCode == 2000000){
                                    this.dialogFormVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '修改角色成功'
                                    });
                                    this.$router.back();
                                }
                            });
                        }
                    }
                });
            }
        }
    }
</script>
  
<style>
    @import '../../style/reset.css';
    @import '../../style/style.css';
    .js-addRole .el-form-item__content{
        margin-left: 175px !important;
    }
    .js-addRole .el-form-item .el-input{
        width: 20%;
    }
    .js-addRole .el-checkbox{
        width: 50%;
    }
    .js-wrapRole .el-checkbox{
        width: 25% !important;
    }
    .wrapRole{
        padding: 20px;
    }
    .wrapRole .el-checkbox:first-of-type{
        margin-left: 15px;
    }
</style>
