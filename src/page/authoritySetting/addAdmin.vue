 <template>
  <div>
      <div class="WrapBox hp100 mh900" >
          <p class="grayHeader"><i class="iconfont icon-home"></i><span class="location">所在位置：</span>
              <span class="now">角色管理</span><span class="gt">&gt;</span><span class="js-title">增加管理员</span></p>
          <h1>增加管理员</h1><a class="fl hexagon" @click="back()">返回</a>
          <div class="center">
              <el-form  :model="query" ref="query" :rules="ruleInline" label-width="200px">
                  <div class="eachRow pt30">
                      <div class="por fl">
                          <el-form-item label="登录名：" prop="admin_name">
                              <el-input type="text" v-model="query.admin_name"></el-input>
                          </el-form-item>
                      </div>
                      <div class="por fl">
                          <el-form-item label="登录密码：" prop="password">
                              <el-input type="password" size="small" v-model="query.password"></el-input>
                          </el-form-item>
                      </div>
                      <div class="por fl">
                          <el-form-item label="确认密码：" prop="cosPassword">
                              <el-input type="password" size="small" v-model="query.cosPassword"></el-input>
                          </el-form-item>
                      </div>
                  </div>
                  <div class="eachRow pt30">
                      <div class="fl">
                          <el-form-item label="角色：" prop="role_id">
                              <el-select v-model="query.role_id" placeholder="请选择">
                                  <el-option  v-for="item in roleList" :label="item.role_name" :value="item.role_id"></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                      <div class="fl por">
                          <el-form-item label="真实姓名：" prop="realname">
                              <el-input type="text" size="small" v-model="query.realname"></el-input>
                          </el-form-item>
                      </div>
                  </div>
                  <div class="mt60 ml60">
                      <el-form-item>
                          <el-button type="primary" @click="submit('query')">提交</el-button>
                      </el-form-item>
                  </div>
              </el-form>
          </div>
      </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {addAdministrator,putAdministrator,getRoleList,getAdminInfo} from '../../service/getData'
    import {strongPsw} from '../../service/validate'

    export default {
        data(){
            return{
                roleList: [],
                query:{
                    admin_name:'',
                    password:'',
                    role_id:'',
                    realname:'',
                    cosPassword:''
                },
                ruleInline: {
                    admin_name: [
                        { required: true, message: '请输入登录名', trigger: 'blur' },
                        { min: 2, max: 15,  message: '请输入2-15位', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16,  message: '请输入6-16位密码', trigger: 'blur' },
                        {validator:(rule,value,callback) => {
                            strongPsw(rule,value,callback,'密码必须包含字母、大小写、数字、特殊字符其中两种规则');
                        }, trigger:'blur'}
                    ],
                    cosPassword: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        {validator:(rule,value,callback) => {
                            if(value !== this.query.password){
                                callback(new Error('两次密码输入不一致'));
                            }else{
                                callback();
                            }
                        }, trigger:'blur'}
                    ],
                    role_id: [
                        { required: true, message: '请选择角色'}
                    ],
                    realname: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' },
                        { min: 2, max: 8,  message: '请输入2-4位真实姓名', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted(){
            this.postRoleList();
            if(this.$route.query){
                if(this.$route.query["admin_id "]){
                    this.getAdminInformation();
                    this.query.admin_id = this.$route.query["admin_id "];
                }
            }
        },
        components: {},
        methods: {
            back(){
                this.$router.back();
            },
            postRoleList(){
                getRoleList().then((res) =>{
                    if(res.statusCode == 2000000){
                        this.roleList = res.data.list;
                    }
                })
            },
            getAdminInformation(){
                getAdminInfo(Number(this.$route.query["admin_id "])).then((res) => {
                    if(res.statusCode == 2000000){
                        this.query.admin_name = res.data[0].admin_name;
                        this.query.password = res.data[0].password;
                        this.query.role_id = res.data[0].role_id;
                        this.query.realname = res.data[0].realname;
                    }
                })
            },
            submit(name){
                console.log(this.query)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        delete this.query.cosPassword;
                        if(!this.query.admin_id){
                            addAdministrator(this.query).then((res) => {
                                if(res.statusCode == 2000000){
                                    this.dialogFormVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '添加管理员成功'
                                    });
                                    this.$router.back();
                                }
                            });
                        }else{
                            putAdministrator(this.query).then((res) => {
                                if(res.statusCode == 2000000){
                                    this.dialogFormVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '修改管理员成功'
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
  
<style scoped>
    @import '../../style/reset.css';
    @import '../../style/style.css';
</style>
