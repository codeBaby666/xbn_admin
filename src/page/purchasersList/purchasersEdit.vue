<template>
	<div class="js-purchases">
		<div class="WrapBox">
			<p class="grayHeader">
				<i class="iconfont icon-home"></i><span class="location">所在位置：</span><span class="now">采购商管理</span>
				<span class="gt">&gt;</span><span>增加采购商</span>
			</p>
			<el-form  :model="query" ref="query" :inline="true" label-width="125px">
				<h1>增加采购商</h1><a class="fl hexagon" @click="back">返回</a>
				<div class="infoBox">
					<p class="grayHeader">采购商信息</p>
					<div class="detailInfoBox ">
						<h3>采购商基本信息</h3>
						<div>
							<el-form-item label="公司名称：" prop="company_name_cn">
								<el-input type="text" size="small" v-model="query.company_name_cn" placeholder="请输入公司名称"></el-input>
							</el-form-item>
							<el-form-item label="用户ID：" prop="user_id">
								<el-input type="text" size="small" v-model="query.user_id" placeholder="请输入用户ID"></el-input>
							</el-form-item>
							<el-form-item label="注册资金（万）：" prop="registered_capital">
								<el-input type="text" size="small" v-model="query.registered_capital" placeholder="请输入注册资金"></el-input>
							</el-form-item>
							<el-form-item label="公司电话：" prop="company_phone">
								<el-input type="text" size="small" v-model="query.company_phone" placeholder="电话格式010-2625334"></el-input>
							</el-form-item>
							<el-form-item label="所在地：">
								<el-cascader
										size="small"
										:options="options"
										v-model="query.address"
										@change="handleChange">
								</el-cascader>
							</el-form-item>
							<el-form-item label="详细地址：" prop="detail_address">
								<el-input type="text" size="small" v-model="query.detail_address" placeholder="请输入详细地址"></el-input>
							</el-form-item>
						</div>
					</div>
				</div>
				<div class="infoBox">
					<p class="grayHeader">营业执照 / 统一社会信用代码</p>
					<!--  新增采购商 -->
					<div class="js-licenseAdd">
						<div style="margin: 20px 50px;">
							<el-checkbox v-model="query.threeToOne">三证合一</el-checkbox>
						</div>
						<p style="margin-left: 50px;"><i class="iconfont icon-gantanhao"></i>上传文件支持PNG\JPG\GIF格式，文件小于20M。请保证图片各项内容清晰，有盖章。</p>
						<!-------------------------三证------------------------>
						<div class="threeCertificate">
							<div class="perOfThree  por" v-if="query.threeToOne">
									<div class="fl">
										<el-upload
												class="avatar-uploader"
												:action="action"
												:data="fileData"
												:show-file-list="false"
												:on-success="handleAvatarSuccess"
												:before-upload="beforeAvatarUpload">
											<img v-if="license.threeToOneCertificate.imageUrl" :src="license.threeToOneCertificate.imageUrl" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									</div>
									<div class="fl">
										<h3>社会统一信用代码</h3>
										<div class="eachRow">
											<el-form-item label="证件编号：">
												<el-input type="text" size="small" v-model="license.threeToOneCertificate.number" placeholder="输入证件编号"></el-input>
											</el-form-item>
											<el-form-item label="发证日期：">
												<el-date-picker
														v-model="license.threeToOneCertificate.issuedDate"
														type="date"
														placeholder="输入发证日期"
														:picker-options="pickerOptions0">
												</el-date-picker>
											</el-form-item>
											<el-form-item label="证件所在地：">
												<el-cascader
														size="small"
														:options="options"
														v-model="license.threeToOneCertificate.address"
														@change="handleChange">
												</el-cascader>
											</el-form-item>
										</div>
									</div>
								</div>
							<div v-if="!query.threeToOne">
								<div class="perOfThree  por">
									<div class="fl">
										<el-upload
												class="avatar-uploader"
												:action="action"
												:data="fileData"
												:show-file-list="false"
												:on-success="businessLicenseAvatarSuccess"
												:before-upload="beforeAvatarUpload">
											<img v-if="license.businessLicense.imageUrl" :src="license.businessLicense.imageUrl" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									</div>
									<div class="fl">
										<h3>营业执照</h3>
										<div class="eachRow">
											<el-form-item label="证件编号：">
												<el-input type="text" size="small" v-model="license.businessLicense.number" placeholder="输入证件编号"></el-input>
											</el-form-item>
											<el-form-item label="证件所在地：">
												<el-cascader
														size="small"
														:options="options"
														v-model="license.businessLicense.address"
														@change="handleChange">
												</el-cascader>
											</el-form-item>
											<el-form-item label="发证日期：">
												<el-date-picker
														v-model="license.businessLicense.issuedDate"
														type="date"
														placeholder="输入发证日期"
														:picker-options="pickerOptions0">
												</el-date-picker>
											</el-form-item>
										</div>
									</div>
								</div>
								<div class="clear"></div>
								<div class="perOfThree por">
									<div class="fl">
										<el-upload
												class="avatar-uploader"
												:action="action"
												:data="fileData"
												:show-file-list="false"
												:on-success="organizationAvatarSuccess"
												:before-upload="beforeAvatarUpload">
											<img v-if="license.organizationCertificate.imageUrl" :src="license.organizationCertificate.imageUrl" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									</div>
									<div class="fl">
										<h3>组织机构代码证</h3>
										<div class="eachRow">
											<el-form-item label="证件编号：">
												<el-input type="text" size="small" v-model="license.organizationCertificate.number" placeholder="输入证件编号"></el-input>
											</el-form-item>
										</div>
									</div>
								</div>
								<div class="clear"></div>
								<div class="perOfThree por">
									<div class="fl">
										<el-upload
												class="avatar-uploader"
												:action="action"
												:data="fileData"
												:show-file-list="false"
												:on-success="taxRegistrationAvatarSuccess"
												:before-upload="beforeAvatarUpload">
											<img v-if="license.taxRegistrationCertificate.imageUrl" :src="license.taxRegistrationCertificate.imageUrl" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									</div>
									<div class="fl">
										<h3>税务登记证</h3>
										<div class="eachRow">
											<el-form-item label="证件编号：">
												<el-input type="text" size="small" v-model="license.taxRegistrationCertificate.number" placeholder="输入证件编号"></el-input>
											</el-form-item>
										</div>
									</div>
								</div>
								<div class="clear"></div>
							</div>
							<hr size="4" width="92%" color="#eee">
							<div class="perOfThree por">
								<div class="fl">
									<el-upload
											class="avatar-uploader"
											:action="action"
											:data="fileData"
											:show-file-list="false"
											:on-success="entryPermitAvatarSuccess"
											:before-upload="beforeAvatarUpload">
										<img v-if="license.entryPermitCertificate.imageUrl" :src="license.entryPermitCertificate.imageUrl" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
								<div class="fl">
									<h3>入驻许可电子证</h3>
								</div>
							</div>
							<div class="clear"></div>
						</div>
						<!-------------------------三证------------------------>
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
	import {addCompany,getSupplierInfo,putCompany} from '../../service/getData'
	import { regionData  } from 'element-china-area-data'
	import {baseUrl} from './../../config/env'

	export default {
		data(){
			return{
				options: regionData,
				query: {
					company_name_cn:'',
					user_id:'',
					registered_capital:'',
					company_phone:'',
					detail_address:'',
					address: [],
					threeToOne:''
				},
				action: baseUrl +'/upload/upload',
				fileData:{
					fileType:'0'
				},
				license: {
					threeToOneCertificate:{
						imageUrl:'',
						number:'',
						issuedDate:'',
						address:[],
						license_type: 1
					},
					entryPermitCertificate:{
						imageUrl:'',
						license_type: 5
					},
					businessLicense:{
						imageUrl:'',
						number:'',
						issuedDate:'',
						address:[],
						license_type: 2
					},
					organizationCertificate:{
						imageUrl:'',
						number:'',
						license_type: 3
					},
					taxRegistrationCertificate:{
						imageUrl:'',
						number:'',
						license_type: 4
					},
				},
				company_id: '',
				pickerOptions0:{
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				}
			}
		},
		mounted(){
			if(this.$route.query){
				if(this.$route.query["company_id"]){
					this.company_id = this.$route.query["company_id"];
					this.getPurchaserInformation();
				}
			}
		},
		components: {},
		props:[],
		methods: {
			back(){
				this.$router.back();
			},
			handleChange (value) {
				console.log(value)
			},
			taxRegistrationAvatarSuccess(res, file){
				if(res.statusCode == 2000000){
					this.license.taxRegistrationCertificate.imageUrl = baseUrl +'/'+ res.data.url;
				}
			},
			organizationAvatarSuccess(res, file){
				if(res.statusCode == 2000000){
					this.license.organizationCertificate.imageUrl = baseUrl +'/'+ res.data.url;
				}
			},
			businessLicenseAvatarSuccess(res, file){
				if(res.statusCode == 2000000){
					this.license.businessLicense.imageUrl = baseUrl +'/'+ res.data.url;
				}
			},
			handleAvatarSuccess(res, file) {
				if(res.statusCode == 2000000){
					this.license.threeToOneCertificate.imageUrl = baseUrl +'/'+ res.data.url;
				}
			},
			entryPermitAvatarSuccess(res, file){
				if(res.statusCode == 2000000){
					this.license.entryPermitCertificate.imageUrl = baseUrl +'/'+ res.data.url;
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = /image.(png|jpg|jpeg|gif)/.test(file.type);
				const isLt20M = file.size / 1024 / 1024 < 20;

				if (!isJPG) {
					this.$message.error('上传图片只能是 PNG/JPG/JPEG/GIF 格式!');
				}
				if (!isLt20M) {
					this.$message.error('上传图片大小不能超过 20MB!');
				}
				return isJPG && isLt20M;
			},
			getPurchaserInformation(){
				getSupplierInfo(this.company_id).then((res) =>{
					if(res.statusCode == 2000000){
						this.query.company_name_cn = res.data[0].company_name_cn;
						this.query.user_id= res.data[0].user_id;
						this.query.registered_capital= res.data[0].registered_capital;
						this.query.company_phone= res.data[0].company_phone;
						this.query.detail_address= res.data[0].detail_address;
						this.query.address = res.data[0].address;
						this.query.threeToOne= res.data[0].threeToOne;
					    this.license.threeToOneCertificate = res.data[0].threeToOneCertificate;
						this.license.businessLicense = res.data[0].businessLicense;
						this.license.taxRegistrationCertificate = res.data[0].taxRegistrationCertificate;
						this.license.organizationCertificate = res.data[0].organizationCertificate;
						this.license.entryPermitCertificate = res.data[0].entryPermitCertificate;
					}
				})
			},
			submit(name){
				if(!this.company_id){
					addCompany(this.query,this.license).then((res) => {
						if(res.statusCode == 2000000){
							this.dialogFormVisible = false;
							this.$message({
								type: 'success',
								message: '添加采购商成功'
							});
							this.$router.back();
						}
					})
				}else{
					const query = this.query;
					query.threeToOneCertificate = this.license.threeToOneCertificate;
					query.threeToOneCertificate = this.license.businessLicense;
					query.threeToOneCertificate = this.license.taxRegistrationCertificate;
					query.threeToOneCertificate = this.license.organizationCertificate;
					query.threeToOneCertificate = this.license.entryPermitCertificate;
					putCompany(this.company_id,query).then((res) => {
						if(res.statusCode == 2000000){
							this.dialogFormVisible = false;
							this.$message({
								type: 'success',
								message: '修改采购商成功'
							});
							this.$router.back();
						}
					})
				}
			}
		}
	}
</script>

<style>
	@import '../../style/reset.css';
	@import '../../style/style.css';

	.js-purchases .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.js-purchases .avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	.js-purchases .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.js-purchases .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
