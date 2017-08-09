<template>
    <div>
        <div class="WrapBox">
            <el-form  :model="query" ref="query" :rules="ruleInline" label-width="200px" class="addForm">
                <p class="grayHeader"><i class="iconfont icon-home"></i><span class="location">所在位置：</span><span
                >用户管理</span><span class="gt">&gt;</span><span class="now">新增用户</span></p>
                <h1>增加用户 </h1><a class="fl hexagon" @click="back()">返回</a>
                <div class="newInfoBox">
                    <div class="newInfoBoxHeader disib h30 lh30 w97p">
                        <p class="newInfoBoxHeaderContent bold h30 lh30 f16 disib">用户信息</p>
                    </div>
                    <div class="w100p bgcee mt30 pt30 pb30">
                        <p class="mb30 por">
                            <el-form-item label="公司名称：" prop="companyNameCn">
                                <el-input type="text" size="small" v-model="query.companyNameCn" placeholder="请输入公司名称"></el-input>
                            </el-form-item>
                        </p>
                        <p class="mb30 por">
                            <el-form-item label="姓名：" prop="user_name">
                                <el-input type="text" size="small" v-model="query.user_name" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                        </p>
                        <p class="mb30 por">
                            <el-form-item label="手机号码：" prop="mobile">
                                <el-input type="number" size="small" v-model="query.mobile" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                        </p>
                        <p class="mb30 por">
                            <el-form-item label="密码：" prop="password">
                                <el-input type="password" size="small" v-model="query.password" placeholder="输入6~16位密码"></el-input>
                            </el-form-item>
                        </p>
                        <p class="mb30">
                            <el-form-item label="邮箱：" prop="email">
                                <el-input type="email" size="small" v-model="query.email" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                        </p>
                    </div>
                </div>
                <div class="newInfoBox">
                    <div class="newInfoBoxHeader disib h30 lh30 w97p">
                        <p class="newInfoBoxHeaderContent bold h30 lh30 f16 disib">用户状态</p>
                    </div>
                    <div class="mt40 bgcee" style="padding: 30px 0px 10px">
                        <el-form-item label="" prop="passOrNoPass">
                            <el-radio-group v-model="query.passOrNoPass">
                                <el-radio class="radio"  label="2">通过</el-radio>
                                <el-radio class="radio"  label="3">驳回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="submit('query')">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {addUser,getUserInfo,putUser} from '../../service/getData'
    import {isChineseNumber,companyNameCheck,isChinese,isTelphone,strongPsw,isEmail} from '../../service/validate'

    export default {
        data(){
            return{
                query:{
                    companyNameCn:'',
                    user_name:'',
                    mobile:'',
                    password:'',
                    email:'',
                    passOrNoPass:''
                },
                ruleInline: {
                    companyNameCn: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                        { type: 'string', min: 6, message: '公司名称度不能小于6位', trigger: 'blur' },
                        { type: 'string', max: 50, message: '公司名称长度不能大于50位', trigger: 'blur' },
                        {validator:(rule,value,callback) => {
                            isChineseNumber(rule,value,callback,'公司名称只能输入中文和数字');
                        }, trigger:'blur'},
                        { validator:(rule,value,callback) => {
                            companyNameCheck(rule,value,callback,'公司名称已经被注册');
                        },trigger: 'blur' }
                    ],
                    user_name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 4,  message: '请输入2-4位中文', trigger: 'blur' },
                        {validator:(rule,value,callback) => {
                            isChinese(rule,value,callback,'姓名只能输入中文');
                        }, trigger:'blur'}
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        {validator:(rule,value,callback) => {
                            isTelphone(rule,value,callback,'请输入13/14/15/17/18开头的手机号');
                        }, trigger:'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16,  message: '请输入6-16位密码', trigger: 'blur' },
                        {validator:(rule,value,callback) => {
                            strongPsw(rule,value,callback,'密码必须包含字母、大小写、数字、特殊字符其中两种规则');
                        }, trigger:'blur'}
                    ],
                    email: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {validator:(rule,value,callback) => {
                            isEmail(rule,value,callback,'邮箱格式填写有误，请重新输入');
                        }, trigger:'blur'}
                    ]
                }
            }
        },
        mounted(){
            if(this.$route.query){
                if(this.$route.query["user_id "]){
                    this.getUserInformation();
                    this.query.user_id = this.$route.query["user_id "];
                }
            }
        },
        methods: {
            back(){
                this.$router.back();
            },
            getUserInformation(){
                getUserInfo(Number(this.$route.query["user_id "])).then((res) => {
                    if(res.statusCode == 2000000){
                        this.query.companyNameCn = res.data[0].companyNameCn,
                        this.query.user_name = res.data[0].user_name,
                        this.query.mobile = res.data[0].mobile,
                        this.query.password = res.data[0].password,
                        this.query.email = res.data[0].email,
                        this.query.passOrNoPass = res.data[0].status
                    }
                });
            },
            submit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(!this.query.user_id){
                            addUser(this.query).then((res) => {
                                if(res.statusCode == 2000000){
                                    this.dialogFormVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '添加用户成功'
                                    });
                                    this.$router.back();
                                }
                            });
                        }else{
                            putUser(this.query).then((res) => {
                                if(res.statusCode == 2000000){
                                    this.dialogFormVisible = false;
                                    this.$message({
                                        type: 'success',
                                        message: '修改用户成功'
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
    .addForm input{
        width:200px;
    }
</style>
