<template>
    <div class="WrapBox">
        <p class="grayHeader"><i class="iconfont icon-home"></i><span class="location">所在位置：</span><span class="now">供应商管理</span><span class="gt">&gt;</span><span class="js-location">供应商信息</span></p>
        <h1 class="js-location">供应商信息</h1><a class="fl hexagon" @click="back()">返回</a>

        <div class="newInfoBox">
            <div class="newInfoBoxHeader disib h30 lh30 w97p">
                <p class="newInfoBoxHeaderContent bold h30 lh30 f16 disib">个人信息</p>
            </div>

            <div class="w100p bgcee mt30 pt30 pb30">
                <p class="mb30"><span class="disib w160 tar">姓名：</span><span>{{user_name}}</span></p>
                <p class="mb30"><span class="disib w160 tar">手机号码：</span><span>{{mobile}}</span></p>
            </div>
        </div>


        <div class="newInfoBox">
            <div class="newInfoBoxHeader disib h30 lh30 w97p">
                <p class="newInfoBoxHeaderContent bold h30 lh30 f16 disib">企业信息</p>
            </div>
            <div class="w100p bgcee mt30 pt30 pb30">
                <p class="mb30"><span class="disib w160 tar">公司名称：</span><span>{{company_name_cn}}</span></p>
                <p class="mb30"><span class="disib w160 tar">公司地址：</span><span>{{province}} - {{city}} - {{district}}</span></p>
                <p class="mb30"><span class="disib w160 tar">公司电话：</span><span>{{company_phone}}</span></p>
                <p class="mb30"><span class="disib w160 tar">员工人数：</span><span>{{employees}}</span></p>
                <p class="mb30"><span class="disib w160 tar">注册资金(万)：</span><span>{{registered_capital}}</span></p>
            </div>
        </div>


        <!--详情的审核结果-->
        <div class="needChangeResult">
            <div class="newInfoBox ">
                <div class="newInfoBoxHeader disib h30 lh30 w97p">
                    <p class="newInfoBoxHeaderContent bold h30 lh30 f16 disib">处理结果</p>
                </div>

                <div class="perInfo bgcee mt30 pt30 pl30 pr30">
                    <p class="pb30">
                        <span>会员种类：</span>
                        <span class="disib w100">{{member_type_1}}</span>
                        <el-button type="text" @click="dialogTypeFormVisible = true">修改</el-button>

                        <el-dialog title="会员种类修改" :visible.sync="dialogTypeFormVisible">
                            <el-form :model="formType">
                                <el-form-item label="">
                                    <el-radio-group v-model="query.member_type">
                                        <el-radio class="radio"  label="0">普通会员</el-radio>
                                        <el-radio class="radio"  label="1">付费会员</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogTypeFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="changeMemberType">确 定</el-button>
                            </div>
                        </el-dialog>

                    </p>
                </div>
                <div class="perInfo bgcee pb30 pl30 pr30">
                    <span>审核结果：</span>
                    <span class="disib w100">{{status_1}}</span>
                    <el-button type="text" @click="dialogFormVisible = true">修改</el-button>

                    <el-dialog title="审核结果修改" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item label="">
                                <el-radio-group v-model="query.status">
                                    <el-radio class="radio"  label="1">通过</el-radio>
                                    <el-radio class="radio"  label="2">驳回</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input type="textarea" v-model="query.last_audit_logging" v-if="query.status == 2"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="changeMemberType">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
        <!--详情的审核结果-->

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getSupplierInfo,putSupplier} from '../../service/getData'

    export default {
        data(){
            return{
                user_name: '',
                mobile: '',
                company_name_cn: '',
                province : '',
                city : '',
                district : '',
                company_phone : '',
                employees : '',
                registered_capital : '',
                query : {
                    status : '',
                    member_type : '',
                    last_audit_logging : ''
                },
                status_1 : '',
                member_type_1 : '',
                dialogTypeFormVisible : false,
                dialogFormVisible : false,
                formType: {},
                form : {}
            }
        },
        mounted(){
            this.$route.query ? (this.$route.query["company_id "] ? this.postSupplierInfo() : '') : '';
        },
        components: {},
        props:[],
        methods: {
            back(){
                this.$router.back()
            },
            changeMemberType(){
                putSupplier(Number(this.$route.query["company_id "]),this.query).then((res) => {
                    if(res.statusCode == 2000000){
                        this.query.last_audit_logging = res.data[0].last_audit_logging;
                        this.query.member_type = res.data[0].member_type;
                        this.member_type_1 = this.changeMember_type(res.data[0].member_type);
                        this.query.status = res.data[0].status;
                        this.status_1 = this.changeStatus(res.data[0].status);
                        this.dialogTypeFormVisible == true ?  this.dialogTypeFormVisible = false : '';
                        this.dialogFormVisible == true ?  this.dialogFormVisible = false : '';
                    }
                })
            },
            postSupplierInfo(){
                getSupplierInfo(Number(this.$route.query["company_id "])).then((res) => {
                    if(res.statusCode == 2000000){
                        this.user_name = res.data[0].user_name;
                        this.mobile = res.data[0].mobile;
                        this.company_name_cn = res.data[0].company_name_cn;
                        this.province = res.data[0].province;
                        this.city = res.data[0].city;
                        this.district = res.data[0].district;
                        this.company_phone = res.data[0].company_phone;
                        this.employees = res.data[0].employees;
                        this.registered_capital = res.data[0].registered_capital;
                        this.query.last_audit_logging = res.data[0].last_audit_logging;
                        this.query.member_type = res.data[0].member_type;
                        this.query.status = res.data[0].status;
                        this.member_type_1 = this.changeMember_type(res.data[0].member_type);
                        this.status_1 = this.changeStatus(res.data[0].status);
                    }
                })
            },
            //删除对象中没有值的字段
            delNullData(data){
                for (let key in data) {
                    data[key] ? '': delete data[key];
                }
            },
            changeMember_type(row) {
                switch (row){
                    case "0" :
                        return "普通会员";
                        break;
                    case "1" :
                        return "付费会员";
                        break;
                }
            },
            changeStatus(row) {
                switch (row){
                    case "0" :
                        return "待审核";
                        break;
                    case "1" :
                        return "通过";
                        break;
                    case "2" :
                        return "驳回";
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    @import '../../style/reset.css';
    @import '../../style/style.css';
</style>
