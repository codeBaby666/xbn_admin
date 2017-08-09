<template>
    <div class="WrapBox">
        <p class="grayHeader">
            <i class="iconfont icon-home"></i>
            <span class="location">所在位置：</span>
            <span class="now">通关结汇处理</span>
            <span class="gt">&gt;</span>
            <span>详情</span>
        </p>
        <a class="fl hexagon mt100" @click="back">返回</a>
        <div class="ml60 mt100">
            <el-steps :space="200" :active="clearance.status" finish-status="success">
                <el-step :title="item" v-for="item in stepList"></el-step>
            </el-steps>
        </div>
        <br>
        <h1 class="mt100 tac mb50">申请海关</h1>
        <div class="clear tac pt120" v-if="clearance.status == 0">
            <img src="../../images/cancelled.png">
        </div>
        <div class="ml80 js-wrapPreview">
            <h2 class="header f14 por mb40 mt20">
                <div class="fileWrap bgcYe ml30">
                    <i class="iconfont icon-file"></i>
                </div>
            </h2>
            <!--收汇方式-->
            <div>
                <p class="mb50">
                    <span class="f16">收汇方式</span>
                    <span class="f12 col66">/  THE METHOD OF SETTLEMENT</span>
                </p>
                <div class="w100p mw1028 bsb pl40 mb10">
                    <div class="perDetail w33p">
                        <label class="col66 w27p">收汇方式：</label><span>{{clearance.exchange_method}}</span>
                    </div>
                    <div class="perDetail w33p">
                        <label class="col66 w27p">预付条款：</label><label>预付款(%)：<span>{{clearance.advance}}</span></label><label>尾款(%)：<span>{{clearance.final_payment}}</span></label>
                    </div>
                    <div class="perDetail w33p">
                        <label class="col66 w27p">结汇/退税收款账户：</label>
                        <i>开户名：</i><em class="mr30">{{clearance.account_name}}</em>
                        <i>开户行：</i><em class="mr30">{{clearance.bank_name}}</em>
                        <i>银行账号：</i><em class="mr30">{{clearance.bank_account}}</em>
                        <i v-if="clearance.bank_contacts">财务联系人：</i><em class="mr10">{{clearance.bank_contacts}}</em>
                        <em>{{clearance.bank_phone_number}}</em>
                        <em>{{clearance.bank_im_email}}</em>
                    </div>
                    <div class="perDetail w33p">
                        <label class="col66 w27p">出口口岸：</label><span>{{clearance.customs_port}}</span>
                    </div>
                    <div class="perDetail w33p">
                        <label class="col66 w27p">本单联系人：</label>
                        <em class="mr30">{{clearance.contacts}}</em>
                        <em class="mr30">{{clearance.phone}}</em>
                        <em class="mr30">{{clearance.mobile}}</em>
                        <em class="mr30">{{clearance.email}}</em>
                    </div>
                </div>
                <hr size="3" color="#ccc" width="95%" class="mt40 mb50">
            </div>
            <!--货品信息-->
            <div>
                <p class="mb50">
                    <span class="f16">货品信息</span>
                    <span class="f12 col66">/  GOODS NFORMATIONS</span>
                </p>
                <div class="w100p mw1028 bsb ">
                    <div class="perDetail">
                        <label class="col66 w27p">币种：</label><span>{{clearance.currency}}</span>
                    </div>
                </div>
                <div class="w100p mw1028 bsb pl40">
                    <div class="perDetail">
                        <label class="col66 w27p">价格条款：</label><span>{{clearance.price_term}}</span>
                    </div>
                </div>
                <div class="w100p mw1028 bsb pl40 js-fareData none">
                    <div class="perDetail">
                        <label class="col66 w27p">运费：</label><span>{{clearance.fare}}</span>
                    </div>
                </div>
                <div class="w100p mw1028 bsb pl40 js-premiumData none">
                    <div class="perDetail">
                        <label class="col66 w27p">保费：</label><span>{{clearance.premium}}</span>
                    </div>
                </div>
                <div class="w100p mw1028 bsb pl40">
                    <div class="perDetail">
                        <label class="col66 w27p">包装方式：</label><span>{{clearance.package_type}}</span>
                    </div>
                </div>
                <div class="w100p mw1028 bsb pl40">
                    <div class="perDetail">
                        <label class="col66 w27p">出货清单：</label>
                    </div>
                </div>
                <div class="disibni ml20" v-for="item in clearance.goods">
                    <goods :good="item"></goods>
                </div>
                <p class="w86p mt10 tar ml20 mb40">
                    <label class="col66">该批总净重(KG)：</label><span class="mr60">{{clearance.total_net_weight}}</span>
                    <label class="col66">总毛重(KG)：</label><span class="mr60">{{clearance.total_gros_weight}}</span>
                    <label class="col66">总产品数量：</label><span class="mr60">{{clearance.total_goods_count}}</span>
                    <label class="col66">总货值(<span>{{clearance.currency}}</span>)：</label><span>{{clearance.total_value}}</span>
                </p>
                <p class="ml145 mt20 ml20"><label class="col66">整体包装件数：</label><span>{{clearance.package_number}}</span></p>
                <p class="ml145 mt20 ml20"><label class="col66">整体包装种类：</label><span>{{clearance.packaging_material}}</span></p>
                <p class="ml145 mt20 ml20" v-if="clearance.tray_type"><label class="col66">托盘类型：</label><span>{{clearance.tray_type}}</span></p>
                <p class="ml145 mt20 mb40 ml20"><label class="col66">产品信息是否确定：</label><span>{{clearance.detail_confirmed}}</span></p>
                <hr size="3" color="#ccc" width="95%" class="mt40 mb50">
            </div>
            <!--报关信息-->
            <div>
                <p class="mb50">
                    <span class="f16">报关信息</span>
                    <span class="f12 col66">/  Customs information</span>
                </p>

                <div class="w100p mw1028 bsb pl40 mb10">
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>预计出货日期：</label><span>{{clearance.shipment_date}}</span>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>运抵国（贸易国/地区）：</label><span>{{clearance.trade_nation}}</span>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>指运港（境外接货港）：</label><span>{{clearance.target_nation}}</span>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>境外贸易商：</label>
                        <span>{{clearance.international_trader.address}}</span>
                        <span>{{clearance.international_trader.nation}}</span>
                        <span>{{clearance.international_trader.contacts}}</span>
                        <span>{{clearance.international_trader.phone}}</span>
                        <span>{{clearance.international_trader.fax}}</span>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>最终目的国：</label><span>{{clearance.destination_country}}</span>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>境内货源地：</label><span>{{clearance.domestic_source}}</span>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>提货地址：</label>
                        <span>{{clearance.delivery_address.address[0]}}-{{clearance.delivery_address.address[1]}}</span>
                        <span>{{clearance.delivery_address.detail_address}}</span>
                        <span>{{clearance.delivery_address.contacts}}</span>
                        <span>{{clearance.delivery_address.phone}}</span>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>合同类型：</label><span>{{clearance.contract_type}}</span>
                    </div>
                    <div class="customsInformation js-contractNumberReview">
                        <label class="col66 "><em class="f18 redFont mr5 vat"></em>指定报关合同号：</label><span>{{clearance.contract_number}}</span>
                    </div>
                </div>
                <hr size="3" color="#ccc" width="95%" class="mt40 mb50">
            </div>
            <!--附件-->
            <div>
                <p class="mb50">
                    <span class="f16">附件</span>
                    <span class="f12 col66">/  Enclosure</span>
                </p>

                <p class="ml20">SO（Shipping Order/SO）：</p>
                <div class="ml20 mt10">
                    <div class="grayBlock mr10 mb15" v-for="item in clearance.orderAttachments">
                        <a :href="[download+'/upload/download?file_path='+ item.file_path + '&file_name='+ item.file_name]" class="underline c009add">{{item.file_name}}</a>
                    </div>
                </div>
                <p class="ml20 mt40">内贸合同：</p>
                <div class="ml20 mt10">
                    <div class="grayBlock mr10 mb15" v-for="item in clearance.domesticTradeContractAttachments">
                        <a :href="[download+'/upload/download?file_path='+ item.file_path + '&file_name='+ item.file_name]" class="underline c009add">{{item.file_name}}</a>
                    </div>
                </div>
                <p class="ml20 mt40">其他附件：</p>
                <div class="ml20 mt10">
                    <div class="grayBlock mr10 mb15" v-for="item in clearance.otherAttachments">
                        <a :href="[download+'/upload/download?file_path='+ item.file_path + '&file_name='+ item.file_name]" class="underline c009add">{{item.file_name}}</a>
                    </div>
                </div>
                <hr size="3" color="#ccc" width="95%" class="mt40 mb50">
            </div>
            <div class="mt40 tac">
                <a class="default_button  mr40 w100" @click="handleEdit" v-if="clearance.status !== 0 && clearance.status !== 6">编辑</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getClearanceInfo} from '../../service/getData'
    import goods from '../../components/common/goods'
    import {baseUrl} from '../../config/env'

    export default {
        data(){
            return{
                clearance:{
                    status:1,
                    delivery_address : {
                        address:[],
                        detail_address:'',
                        contacts:'',
                        phone:''
                    },
                    international_trader : {
                        address:'',
                        nation:'',
                        contacts:'',
                        phone:'',
                        fax:''
                    },
                    orderAttachments:[],
                    domesticTradeContractAttachments:[],
                    otherAttachments:[]
                },
                download:baseUrl,
                export_form_id:'',
                stepList:["待审核","待订舱","待报关","待结汇","待退税","已完成"],
            }
        },
        mounted(){
            if(this.$route.query){
                if(this.$route.query["export_form_id "]){
                    this.export_form_id = this.$route.query["export_form_id "];
                    this.postClearanceInfo();
                }
            }
        },
        components: {goods},
        props:[],
        methods: {
            back(){
                this.$router.back();
            },
            handleEdit(){
                this.$router.push({path:'/clearanceEdit?export_form_id = '+ this.export_form_id});
            },
            postClearanceInfo(){
                getClearanceInfo(this.export_form_id).then((res) =>{
                    if(res.statusCode == 2000000){
                        this.clearance = res.data[0];
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import '../../style/reset.css';
    @import '../../style/style.css';
</style>
