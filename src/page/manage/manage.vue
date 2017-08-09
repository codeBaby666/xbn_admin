<template>
    <div class="xbn-frame">
        <head-top></head-top>
        <div class="xbn-main">
            <el-row style="height: 100%;">
                <el-col :span="3"  style="min-height: 100%; background-color: #324057;">
                    <div class="xbn-menu">
                        <div class="menu logo">
                            <div class="info">
                                <img :src="userInfo.portrait_url" class="headPortrait js-avatar">
                                <p>{{userInfo.user_name}}</p>
                                <span class="t50">{{userInfo.realname}}</span>
                                <span class="poa t75 curp" @click="dialogFormVisible = true"><i class="iconfont icon-write mr5"></i><em>修改密码</em></span>
                            </div>
                            <el-dialog title="修改密码" v-model="dialogFormVisible">
                                <el-form :model="formInline" ref="formInline" :rules="ruleInline">
                                    <el-form-item prop="oldPas" label="原来密码" label-width="100px">
                                        <el-input type="password" v-model="formInline.oldPas" placeholder="请输入密码"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="newPas" label="设置密码" label-width="100px">
                                        <el-input type="password" v-model="formInline.newPas" placeholder="请输入密码"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="confirmPas" label="确认密码" label-width="100px">
                                        <el-input type="password" v-model="formInline.confirmPas" placeholder="请输入密码"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="changePassword('formInline')">确 定</el-button>
                                </div>
                            </el-dialog>
                        </div>
                        <p class="tac mt30 mb50 colcc">菜单栏目 / The menu item</p>
                        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                            <el-submenu v-for="(item, index) in menuList" :index="index+''">
                                <template slot="title"><i :class="item.icon_url" class="iconfont el-col-4"></i>{{item.menu_name}}</template>
                                <el-menu-item  v-for="menu in item.children" :index="menu.link">{{menu.menu_name}}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :span="21" style="height: 100%;overflow: hidden;background-color: #cccccc;">
                    <div class="xbn-contentContainer el-col-24">
                        <div class="xbn-content">
                            <router-view></router-view>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getMenuList,changePassword} from '../../service/getData'
    import headTop from '../../components/header/headTop'

    export default {
        data(){
            return {
                userInfo : {
                    portrait_url: '',
                    user_name: '',
                    realname: ''
                },
                menuList:[],
                dialogFormVisible: false,
                formInline: {
                    oldPas: '',
                    newPas: '',
                    confirmPas: ''
                },
                ruleInline: {
                    oldPas: [
                        { required: true, message: '请填写原来密码', trigger: 'blur' }
                    ],
                    newPas: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
                        { type: 'string', max: 16, message: '密码长度不能大于16位', trigger: 'blur' }
                    ],
                    confirmPas: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
                        { type: 'string', max: 16, message: '密码长度不能大于16位', trigger: 'blur' },
                        {validator:(rule,value,callback)=>{
                            if(value !== this.formInline.newPas){
                                callback(new Error("两次输入密码不一致"));
                            }else{
                                callback();
                            }
                        }, trigger:'blur'}
                    ]
                }
            }
        },
        mounted(){
            this.getMenuList();
            let user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.userInfo.portrait_url = user.portrait_url || '';
                this.userInfo.user_name = user.user_name || '';
                this.userInfo.realname = user.realname || '';
            }
        },
        computed: {
            defaultActive(){
                return this.$route.path.replace('/', '');
            }
        },
        components: {
            headTop
        },
        methods:{
            ...mapMutations([
                'GET_USERINFO',
            ]),
            //获取菜单数据
            getMenuList() {
                let that = this;
                getMenuList().then(function(res){
                    if(res.statusCode == 2000000){
                        that.menuList = res.data[0];
                    }
                });
            },
            //修改密码
            changePassword(name){
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //修改密码接口
                        changePassword(this.formInline.oldPas, this.formInline.newPas).then(function(res){
                            if(res.statusCode == 2000000){
                                that.dialogFormVisible = false;
                                that.$message({
                                    type: 'success',
                                    message: '修改密码成功'
                                });
                            }
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '../../style/reset.css';
    @import '../../style/style.css';
    .xbn-menu .el-menu {
        background-color: #2f3438;
    }
</style>
