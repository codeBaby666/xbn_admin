<template>
    <div style="background-color: white">
        <p class="grayHeader">
            <i class="iconfont icon-home"></i>
            <span class="location">所在位置：</span>
            <span class="now">通关结汇处理</span>
            <span class="gt">&gt;</span>
            <span>编辑</span>
        </p>
        <el-form  :model="query" ref="query" :inline="true" label-width="175px">
            <div class="ml80 pb80">
                <h1 class="pt120 tac mb50 f16">申请海关</h1>
                <div>
                    <p class="mb50">
                        <span class="f16">收汇方式</span>
                        <span class="f12 col66">/  THE METHOD OF SETTLEMENT</span>
                    </p>
                    <div class="pl40">
                        <div class="perDetail">
                            <el-form-item label="收汇方式：">
                                <el-select v-model="query.exchange_method" placeholder="请选择">
                                    <el-option v-for="item in exchange_methodList" :label="item.label" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="perDetail">
                            <label class="col66"><em class="f18 redFont mr5 vat"></em>预付条款：</label>
                            <el-form-item label="预付款(%)：">
                                <el-input type="text" v-model="query.advance" @change="calculateFinal_payment"></el-input>
                            </el-form-item>
                            <el-form-item label="尾款(%)：">
                                <el-input type="text" v-model="query.final_payment" disabled></el-input>
                            </el-form-item>
                        </div>
                        <div class="perDetail ">
                            <label class="col66 vat">结汇/退税收款账户：</label>
                            <div style="margin-top: 20px;width: 1200px;">
                                <el-form-item label="开户名：">
                                    <el-input type="text" v-model="query.account_name"></el-input>
                                </el-form-item>
                                <el-form-item label="开户行：">
                                    <el-input type="text" v-model="query.bank_name"></el-input>
                                </el-form-item>
                                <el-form-item label="银行账号：">
                                    <el-input type="text" v-model="query.bank_account"></el-input>
                                </el-form-item>
                                <el-form-item label="财务联系人：">
                                    <el-input type="text" v-model="query.bank_contacts"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式：">
                                    <el-input type="text" v-model="query.bank_phone_number"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱：">
                                    <el-input type="text" v-model="query.bank_im_email"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="perDetail ">
                            <label class="col66 vat">本单联系人：</label>
                            <div style="margin-top: 20px;width: 1200px;">
                                <el-form-item label="联系人：">
                                    <el-input type="text" v-model="query.contacts"></el-input>
                                </el-form-item>
                                <el-form-item label="手机：">
                                    <el-input type="text" v-model="query.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话：">
                                    <el-input type="text" v-model="query.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱：">
                                    <el-input type="text" v-model="query.email"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="perDetail ">
                            <el-form-item label="出口口岸：">
                                <el-input type="text" v-model="query.customs_port"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <hr size="3" color="#eee" width="88%" class="mt40 mb50">
                </div>
                <div>
                    <p class="mb50">
                        <span class="f16">货品信息</span>
                        <span class="f12 col66">/ BIDDING ITEM LISTING</span>
                    </p>
                    <div class="pl40">
                        <div class="perDetail">
                            <el-form-item label="报关币种：">
                                <el-select v-model="query.currency" placeholder="请选择">
                                    <el-option v-for="item in currencyList" :label="item.label" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="perDetail mb0">
                            <el-form-item label="价格条款：">
                                <el-radio-group v-model="query.price_term">
                                    <el-radio v-for="item in price_termList" :label="item.key">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <div class="ml20" v-if="query.price_term == 3">
                                <el-select v-model="query.price_term_other" placeholder="请选择">
                                    <el-option v-for="item in price_term_otherList" :label="item.label" :value="item.key"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="perDetail" v-if="query.price_term == 1 || query.price_term == 2">
                            <el-form-item label="运费：">
                                <el-input type="text" v-model="query.fare"></el-input>
                            </el-form-item>
                        </div>
                        <div class="perDetail" v-if="query.price_term == 1">
                            <el-form-item label="保费：">
                                <el-input type="text" v-model="query.premium"></el-input>
                            </el-form-item>
                        </div>
                        <div class="perDetail mb0">
                            <el-form-item label="价格条款：">
                                <el-radio-group v-model="query.package_type">
                                    <el-radio v-for="item in package_typeList" :label="item.key">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div class="perDetail bordashed">
                            <label class="col66">出货清单：</label>
                            <div class="ml20">
                                <goods :good="item" :edit="true" @editHandle="editGoodHandle" v-for="item in query.goods"></goods>
                            </div>
                            <el-dialog title="修改货品" v-model="dialogFormVisible">
                                <el-form :model="formInline" ref="formInline">
                                    <el-form-item label="货品名称" label-width="100px">
                                        <el-input type="text" v-model="formInline.name_cn" placeholder="请输入货品名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="英文名称" label-width="100px">
                                        <el-input type="text" v-model="formInline.name_en" placeholder="请输入英文名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="HSCode" label-width="100px">
                                        <el-input type="text" v-model="formInline.hs_code" placeholder="请输入HSCode"></el-input>
                                    </el-form-item>
                                    <el-form-item label="货品属性" label-width="100px">
                                        <el-select v-model="formInline.attribute" placeholder="请选择">
                                            <el-option v-for="item in attributeList" :label="item.label" :value="item.key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="原产国" label-width="100px">
                                        <el-input type="text" v-model="formInline.origin_country" placeholder="请输入原产国"></el-input>
                                    </el-form-item>
                                    <el-form-item label="种类" label-width="100px">
                                        <el-input type="text" v-model="formInline.category" placeholder="请输入种类"></el-input>
                                    </el-form-item>
                                    <el-form-item label="品牌" label-width="100px">
                                        <el-input type="text" v-model="formInline.brand" placeholder="请输入品牌"></el-input>
                                    </el-form-item>
                                    <el-form-item label="型号" label-width="100px">
                                        <el-input type="text" v-model="formInline.model" placeholder="请输入型号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="材质" label-width="100px">
                                        <el-input type="text" v-model="formInline.texture" placeholder="请输入材质"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用途" label-width="100px">
                                        <el-input type="text" v-model="formInline.usage" placeholder="请输入用途"></el-input>
                                    </el-form-item>
                                    <el-form-item label="开票公司名称" label-width="100px">
                                        <el-input type="text" v-model="formInline.drawer_county" placeholder="请输入开票公司名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="包装/托盘尺寸" label-width="100px">
                                        <el-input type="text" v-model="formInline.goods_size" placeholder="请输入包装/托盘尺寸"></el-input>
                                    </el-form-item>
                                    <el-form-item label="最大包装数" label-width="100px">
                                        <el-input type="text" v-model="formInline.package_count" placeholder="请输入最大包装数"></el-input>
                                    </el-form-item>
                                    <el-form-item label="总净重量（KG）" label-width="100px">
                                        <el-input type="text" v-model="formInline.net_weight" placeholder="请输入总净重量（KG）"></el-input>
                                    </el-form-item>
                                    <el-form-item label="总毛重量（KG）" label-width="100px">
                                        <el-input type="text" v-model="formInline.gros_weight" placeholder="请输入总毛重量（KG）"></el-input>
                                    </el-form-item>
                                    <el-form-item label="数量" label-width="100px">
                                        <el-input type="text" v-model="formInline.quantity" placeholder="请输入数量" @change="calculatePackageValue"></el-input>
                                    </el-form-item>
                                    <el-form-item label="单位" label-width="100px">
                                        <el-input type="text" v-model="formInline.unit" placeholder="请输入单位"></el-input>
                                    </el-form-item>
                                    <el-form-item label="单价" label-width="100px">
                                        <el-input type="text" v-model="formInline.unit_price" placeholder="请输入单价" @change="calculatePackageValue"></el-input>
                                    </el-form-item>
                                    <el-form-item label="货值" label-width="100px">
                                        <el-input type="text" v-model="formInline.package_value" disabled placeholder="请输入货值"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="changeGood">确 定</el-button>
                                </div>
                            </el-dialog>
                            <div class="mt10 w86p tar ml20 mb20" v-if="query.goods.length">
                                <div class="ib">
                                    <label>该批总净重(KG):</label>
                                    <span>{{query.total_net_weight}}</span>
                                </div>
                                <div class="ib">
                                    <label>总毛重(KG):</label>
                                    <span>{{query.total_gros_weight}}</span>
                                </div>
                                <div class="ib">
                                    <label>总产品数量:</label>
                                    <span>{{query.total_goods_count}}</span>
                                </div>
                                <div class="ib">
                                    <label>总货值:</label>
                                    <span>{{query.total_value}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="perDetail ib">
                            <label class="col66">货品数量：</label>
                            <span>{{query.package_number}}</span>
                        </div>
                        <div class="perDetail bordashed disb">
                            <el-form-item label="整体包装种类：">
                                <el-select v-model="query.packaging_material" placeholder="请选择">
                                    <el-option v-for="item in packaging_materialList" :label="item.label" :value="item.key"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div v-if="query.packaging_material == 4">
                            <el-form-item label="托盘类型：">
                                <el-radio-group v-model="query.tray_type">
                                    <el-radio v-for="item in tray_typeList" :label="item.key">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div class="perDetail">
                            <div class="mt_25">
                                <el-form-item label="产品信息是否确定：">
                                    <el-radio-group v-model="query.detail_confirmed">
                                        <el-radio v-for="item in detail_confirmedList" :label="item.key">{{item.label}}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <p class="w88p ml150 colcc">如提交的产品数量或重量需装车后才能明确，请选择“产品信息未确定”。该状态的订单需修改产品信息后，才能进入报关审核环节。</p>
                            </div>
                        </div>
                        <hr size="3" color="#eee" width="88%" class="mb50 mt40">
                    </div>
                </div>
                <div class="perInfo anchor">
                <p class="mb50">
                    <span class="f16">报关信息</span>
                    <span class="f12 col66">/  Customs information</span>
                </p>
                <div class="pl40">
                    <div class="customsInformation">
                        <el-form-item label="预计出货日期：">
                            <el-date-picker
                                    v-model="query.shipment_date"
                                    type="date"
                                    placeholder="输入日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="customsInformation">
                        <el-form-item label="运抵国（贸易国/地区）：">
                            <el-input type="text" v-model="query.trade_nation"></el-input>
                        </el-form-item>
                    </div>
                    <div class="customsInformation">
                        <el-form-item label="指运港（境外接货港）：">
                            <el-input type="text" v-model="query.target_nation"></el-input>
                        </el-form-item>
                    </div>
                    <div class="customsInformation">
                        <label class="col66 vat">境外贸易商：</label>
                        <div style="margin-top: 20px;width: 1200px;">
                            <el-form-item label="姓名：">
                                <el-input type="text" v-model="query.international_trader.contacts"></el-input>
                            </el-form-item>
                            <el-form-item label="国家：">
                                <el-input type="text" v-model="query.international_trader.nation"></el-input>
                            </el-form-item>
                            <el-form-item label="地址：">
                                <el-input type="text" v-model="query.international_trader.address"></el-input>
                            </el-form-item>
                            <el-form-item label="电话：">
                                <el-input type="text" v-model="query.international_trader.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="传真：">
                                <el-input type="text" v-model="query.international_trader.fax"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="customsInformation">
                        <el-form-item label="最终目的国：">
                            <el-input type="text" v-model="query.destination_country"></el-input>
                        </el-form-item>
                    </div>
                    <div class="customsInformation">
                        <el-form-item label="境内货源地：">
                            <el-input type="text" v-model="query.domestic_source"></el-input>
                        </el-form-item>
                    </div>
                    <div class="customsInformation">
                        <label class="col66">提货地址：</label>
                        <div style="margin-top: 20px;width: 1200px;">
                            <el-form-item label="地址：">
                                <el-cascader
                                        size="small"
                                        :options="options"
                                        v-model="query.delivery_address.address"
                                        @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="存放地址：">
                                <el-input type="text" v-model="query.delivery_address.detail_address"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人：">
                                <el-input type="text" v-model="query.delivery_address.contacts"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话：">
                                <el-input type="text" v-model="query.delivery_address.phone"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="customsInformation">
                        <el-form-item label="合同类型：">
                            <el-select v-model="query.contract_type" placeholder="请选择">
                                <el-option v-for="item in contract_typeList" :label="item.label" :value="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="customsInformation" v-if="query.contract_type !== 2">
                        <el-form-item label="合同号：">
                            <el-input type="text" v-model="query.contract_number"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <hr size="3" color="#eee" width="88%" class="mb50 mt40">
            </div>
                <div class="perInfo">
                    <p class="mb50">
                        <span class="f16">附件</span>
                        <span class="f12 col66">/  Enclosure</span>
                    </p>
                    <p class="col66 ml20">请上传附件，文件大小20M以内，每一项数量最多5张。</p>
                    <div class="listTable ml20 mt10 mb80">
                        <h2 class="h30 lh30">SO（Shipping Order/SO）：</h2>
                        <div class="mb20 w160">
                            <el-upload
                                    class="upload-demo"
                                    :action="action"
                                    :data="fileData3"
                                    :on-success="uploadSuccess"
                                    :on-remove="removeFile"
                                    :file-list="query.orderAttachments">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </div>
                    <div class="listTable ml20 mt70 mb80">
                        <h2 class="h30 lh30">内贸合同：</h2>
                        <div class="mb20 w160">
                            <el-upload
                                    class="upload-demo"
                                    :action="action"
                                    :data="fileData4"
                                    :on-success="uploadSuccess"
                                    :on-remove="removeFile"
                                    :file-list="query.domesticTradeContractAttachments">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </div>
                    <div class="listTable ml20 mt70 mb80">
                        <h2 class="h30 lh30">其他附件：</h2>
                        <div class="mb50 w160">
                            <el-upload
                                    class="upload-demo"
                                    :action="action"
                                    :data="fileData5"
                                    :on-success="uploadSuccess"
                                    :on-remove="removeFile"
                                    :file-list="query.otherAttachments">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </div>
                    <hr size="3" color="#eee" width="88%" class="mb50 mt30">
                    <div class="perInfo tac mt60">
                        <el-form-item>
                            <el-button type="primary" @click="submit('query')">提交</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="back()">取消</el-button>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getClearanceInfo,putCompany,getGoodInfo,putGoodInfo,putClearanceInfo} from '../../service/getData'
    import { provinceAndCityData  } from 'element-china-area-data'
    import goods from '../../components/common/goods'
    import {baseUrl} from './../../config/env'

    export default {
        data(){
            return{
                options: provinceAndCityData,
                detail_confirmedList:[
                    {key:'0',label:'已确定（产品信息确定的状态下，下单成功后进入报关审核环节）'},
                    {key:'1',label:'未确定（产品信息未确定的状态下，下单后不会立即报关，客户需确认签函才能进入报关审核环节）'}
                ],
                attributeList:[
                    {key:'0',label:'自产'},
                    {key:'1',label:'委托加工'},
                    {key:'2',label:'外购'}
                ],
                tray_typeList:[
                    {key:'0',label:'人造板'},
                    {key:'1',label:'实木'},
                    {key:'2',label:'塑料'}
                ],
                packaging_materialList:[
                    {key:'0',label:'木箱'},
                    {key:'1',label:'纸箱'},
                    {key:'2',label:'桶装'},
                    {key:'3',label:'散装'},
                    {key:'4',label:'托盘'},
                    {key:'5',label:'其它'}
                ],
                package_typeList:[
                    {key:'0',label:'整装（同一包装中只含单项产品）'},
                    {key:'1',label:'混装（任一包装中含两种或以上产品）'}
                ],
                price_termList:[
                    {key:'0',label:'FOB'},
                    {key:'1',label:'CIF'},
                    {key:'2',label:'C&F'},
                    {key:'3',label:'其它'}
                ],
                price_term_otherList:[
                    {key:'4',label:"EXW"},
                    {key:'',label:"FAS"},
                    {key:'6',label:"FCA"},
                    {key:'7',label:"CPT"},
                    {key:'8',label:"CIP"},
                    {key:'9',label:"DES"},
                    {key:'10',label:"DAF"},
                    {key:'11',label:"DEQ"},
                    {key:'12',label:"DDP"},
                    {key:'13',label:"DDU"}
                ],
                currencyList:[
                    {key:'0',label:'USD'},
                    {key:'1',label:'HKD'},
                    {key:'2',label:'EUR'},
                    {key:'3',label:'CNY'},
                    {key:'4',label:'GBP'},
                    {key:'5',label:'AED'},
                    {key:'6',label:'AUD'},
                    {key:'7',label:'CAD'},
                    {key:'8',label:'CHF'},
                    {key:'9',label:'JPY'},
                    {key:'10',label:'NZD'},
                    {key:'11',label:'EK'},
                    {key:'12',label:'SGD'}
                ],
                exchange_methodList:[
                    {label:'电汇（T/T）', key:'0'},
                    {label:'托收（D/P,D/A）', key:'1'},
                    {label:'信用证（L/C）', key:'2'},
                    {label:'信汇（M/T）', key:'3'},
                    {label:'票汇（D/D）', key:'4'}
                ],
                contract_typeList:[
                    {key:'0',label:'客户提供合同号'},
                    {key:'1',label:'商检合同号'},
                    {key:'2',label:'系统自动分配'}
                ],
                query:{
                    exchange_method:'',
                    advance:'',
                    final_payment:'',
                    account_name:'',
                    bank_name:'',
                    bank_account:'',
                    bank_contacts:'',
                    bank_phone_number:'',
                    bank_im_email:'',
                    contacts:'',
                    phone:'',
                    email:'',
                    mobile:'',
                    customs_port:'',
                    currency:'',
                    price_term:'',
                    price_term_other:'',
                    fare:'',
                    premium:'',
                    package_type:'',
                    goods:[],
                    total_net_weight:'',
                    total_gros_weight:'',
                    total_goods_count:'',
                    total_value:'',
                    package_number:'',
                    packaging_material:'',
                    tray_type:'',
                    shipment_date:'',
                    trade_nation:'',
                    target_nation:'',
                    international_trader:{
                        address:'',
                        nation:'',
                        contacts:'',
                        phone:'',
                        fax:''
                    },
                    delivery_address:{
                        address:[],
                        detail_address:'',
                        contacts:'',
                        phone:''
                    },
                    destination_country:'',
                    domestic_source:'',
                    contract_type:'',
                    contract_number:'',
                    orderAttachments:[],
                    domesticTradeContractAttachments:[],
                    otherAttachments:[]
                },
                formInline:{},
                action: baseUrl +'/upload/upload',
                export_form_id:'',
                export_goods_id:'',
                fileData3:{
                    fileType:'0'
                },
                fileData4:{
                    fileType:'1'
                },
                fileData5:{
                    fileType:'2'
                },
                dialogFormVisible:false,
                pickerOptions0:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
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
            handleChange(value){
                console.log(value)
            },
            calculatePackageValue(){
                this.formInline.package_value = this.formInline.quantity * this.formInline.unit_price;
            },
            calculateFinal_payment(){
                this.query.advance > 100 ? this.query.advance = 100 : '';
                this.query.advance < 0 ? this.query.advance = 0 : '';
                this.query.final_payment = 100 - this.query.advance
            },
            uploadSuccess(response, file, fileList){
                switch (response.data.type) {
                    case '0':
                        this.query.orderAttachments.push(response.data);
                        break;
                    case '1':
                        this.query.domesticTradeContractAttachments.push(response.data);
                        break;
                    case '2':
                        this.query.otherAttachments.push(response.data);
                        break;
                }
            },
            removeFile(file, fileList){
                switch (file.type) {
                    case '0':
                        this.query.orderAttachments = fileList;
                        break;
                    case '1':
                        this.query.domesticTradeContractAttachments = fileList;
                        break;
                    case '2':
                        this.query.otherAttachments = fileList;
                        break;
                }
            },
            editGoodHandle(val){
                getGoodInfo(val).then((res) =>{
                    this.export_goods_id = val;
                    if(res.statusCode == 2000000){
                        this.formInline = res.data[0];
                        this.dialogFormVisible = true;
                    }
                })
            },
            changeGood(){
                putGoodInfo(this.export_goods_id,this.formInline).then((res) =>{
                    if(res.statusCode == 2000000){
                        this.postClearanceInfo();
                        this.dialogFormVisible = false;
                    }
                })
            },
            postClearanceInfo(){
                getClearanceInfo(this.export_form_id).then((res) =>{
                    if(res.statusCode == 2000000){
                        this.query = res.data[0];
                    }
                })
            },
            submit(name){
                if(this.query.price_term == 3){
                    this.query.price_term = this.query.price_term_other;
                }
                putClearanceInfo(this.export_form_id,this.query).then((res) =>{
                    if(res.statusCode == 2000000){
                        this.$message({
                            type: 'success',
                            message: '修改报关单成功'
                        });
                        this.$router.back();
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
