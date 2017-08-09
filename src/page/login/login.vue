<template>
    <div class="wrapper js-login" style="position: absolute">
        <div class="top">
            <h1>电商系统运营管理中心</h1>
            <span>Business system operations management center</span>
        </div>
        <div class="content login">
            <el-form  ref="formInline" :model="formInline" :rules="ruleInline" class="loginBox">
                <p class="LoginBoxHeader">用户登录</p>
                <el-form-item prop="user_name" label="账号">
                    <el-input type="text" v-model="formInline.user_name" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="formInline.password" placeholder="请输入6~16位密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="userAccountLogin('formInline')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="bottom">
                <a href="#">站点前台</a><span>|</span>
                <a href="#">供应商后台</a><span>|</span>
                <a href="#">采购商后台</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {accountLogin} from '../../service/getData'

    export default {
        data(){
            return {
                userInfo: null, //用户信息
                formInline: {
                    user_name: '',
                    password: ''
                },
                ruleInline: {
                    user_name: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
                        { type: 'string', max: 16, message: '密码长度不能大于16位', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {},
        computed: {},
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //发送登录信息
            userAccountLogin(name){
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //用户名登录
                        accountLogin(this.formInline.user_name, this.formInline.password).then(function(res){
                            if(res.statusCode == 2000000){
                                that.RECORD_USERINFO(res.data[0]);
                                sessionStorage.setItem('user', JSON.stringify(res.data[0]));
                                that.$router.push({path:'/userList'});
                            }
                        });
                    }
                })
            }
        }
    }

</script>

<style>
    @import '../../style/reset.css';
    @import '../../style/style.css';
    .js-login .el-form .el-form-item .el-form-item__content{
        text-align: center!important;
    }
    .js-login .content .el-form-item__content .el-input{
        width: 90%;
    }
    .js-login .content .el-form-item__content .el-form-item__error{
        left:20px;
    }

</style>
