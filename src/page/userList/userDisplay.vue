<template>
    <div>
        <div class="WrapBox">
            <p class="grayHeader">
                <i class="iconfont icon-home"></i>
                <span class="location">所在位置：</span>
                <span>用户管理</span>
                <span class="gt">&gt;</span>
                <span class="js-location now">详情</span>
            </p>
            <h1><!--用户信息--></h1><a class="fl hexagon" @click="back()">返回</a>
            <div class="newInfoBox">
                <div class="newInfoBoxHeader disib h30 lh30 w97p">
                    <p class="newInfoBoxHeaderContent bold h30 lh30 f16 disib">个人信息</p>
                </div>

                <div class="w100p bgcee mt30 pt30 pb30">
                    <p class="mb30"><span class="disib w160 tar">公司名称：</span><span>{{query.companyNameCn}}</span></p>
                    <p class="mb30"><span class="disib w160 tar">姓名：</span><span>{{query.user_name}}</span></p>
                    <p class="mb30"><span class="disib w160 tar">手机号码：</span><span>{{query.mobile}}</span></p>
                    <p class="mb30"><span class="disib w160 tar">用户ID：</span><span>{{query.user_id}}</span></p>
                    <p class="mb30"><span class="disib w160 tar">注册时间：</span><span>{{query.create_date}}</span></p>
                </div>
            </div>
            <div class="newInfoBox">
                <div class="newInfoBoxHeader disib h30 lh30 w97p">
                    <p class="newInfoBoxHeaderContent bold h30 lh30 f16 disib">审核结果</p>
                </div>
                <div class="w100p bgcee mt30 pt30 pb30">
                    <p class="mb40"><span style="margin-left: 100px">{{query.status}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {addUser,getUserInfo} from '../../service/getData'

    export default {
        data(){
            return{
                query:{
                    companyNameCn:'',
                    user_name:'',
                    mobile:'',
                    user_id:'',
                    create_date:'',
                    status:''
                }
            }
        },
        mounted(){
            this.$route.query ? (this.$route.query["user_id "] ? this.getUserInformation() : '') : '';
        },
        methods: {
            back(){
                this.$router.back();
            },
            getUserInformation(){
                let that = this;
                getUserInfo(Number(this.$route.query["user_id "])).then(function(res){
                    if(res.statusCode == 2000000){
                        that.query.companyNameCn = res.data[0].companyNameCn;
                        that.query.user_name = res.data[0].user_name;
                        that.query.mobile = res.data[0].mobile;
                        that.query.user_id = res.data[0].user_id;
                        that.query.create_date = res.data[0].create_date;

                        switch (res.data[0].status){
                            case 1 :
                                that.query.status = "待审核";
                                break;
                            case 2 :
                                that.query.status = "通过";
                                break;
                            case 3 :
                                that.query.status = "驳回";
                                break;
                        }
                    }
                });
            },
        }
    }
</script>

<style>
    @import '../../style/reset.css';
    @import '../../style/style.css';
</style>
