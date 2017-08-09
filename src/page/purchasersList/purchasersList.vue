<template>
	<div>
		<p class="grayHeader"><i class="iconfont icon-fangdajing"></i>查询条件</p>
		<div class="content"  style="min-height: 800px;">
			<el-form  ref="query" :model="query" :inline="true" class="searchForm">
				<el-form-item label="公司名称">
					<el-input type="text" v-model="query.company_name_cn"></el-input>
				</el-form-item>
				<el-form-item label="注册手机号码">
					<el-input type="text" v-model="query.company_phone"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search('query')">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="operation_btn">
				<el-button type="text" style="padding-left: 20px" @click="jumpAddPurchases()">
					<em class="iconfont icon-add"></em>
					<span style="display: inline-block;padding-left: 10px;">新增采购商</span>
				</el-button>
			</div>
			<el-table :data="tableData" border style="width: 98%;margin: 0 15px;">
				<el-table-column label="公司名称" width="380" header-align="center" align="center">
					<template scope="scope">
						<span>{{ scope.row.company_name_cn }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建者" width="170" header-align="center" align="center">
					<template scope="scope">
						<span>{{scope.row.created_user_name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="注册资金" width="300" header-align="center" align="center">
					<template scope="scope">
						<span>{{ scope.row.registered_capital }}</span>
					</template>
				</el-table-column>
				<el-table-column label="注册手机号" width="300" header-align="center" align="center">
					<template scope="scope">
						<span>{{ scope.row.company_phone }}</span>
					</template>
				</el-table-column>
				<el-table-column label="所在地" width="300" header-align="center" align="center">
					<template scope="scope">
						<span>{{scope.row.address[0]}} - {{scope.row.address[1]}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" header-align="center" align="center">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block" style="text-align: center;">
				<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="pageNo"
						:page-sizes="pageSizes"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalCount">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {postSupplierListByPage} from '../../service/getData'

	export default {
		data(){
			return{
				query:{
					company_name_cn : '',
					company_phone : '',
					company_type : '1'
				},
				tableData:[],
				pageNo : 1, //当前页码 number
				pageSizes:[5,10, 20, 30, 50],
				pageSize:5, //显示的条数 number
				totalCount :50, //总条数 number
			}
		},
		mounted(){
			this.postPurchasesList();
		},
		components: {},
		props:[],
		methods: {
			jumpAddPurchases(){
				this.$router.push({path:'/purchasersEdit'});
			},
			handleEdit(index,row){
				this.$router.push({path:'/purchasersEdit?company_id=' + row.company_id});
			},
			//pageSize 改变时会触发
			handleSizeChange(val) {
				this.pageSize = val;
				this.postPurchasesList();
			},
			//pageNo 改变时会触发
			handleCurrentChange(val) {
				this.pageNo = val;
				this.postPurchasesList();
			},
			//点击搜索，获取搜索数据
			search(name){
				this.postPurchasesList();
			},
			postPurchasesList(){
				this.delNullData(this.query);
				postSupplierListByPage(this.pageNo,this.pageSize,this.query).then((res) => {
					if(res.statusCode == 2000000){
						this.tableData = res.data.list;
						this.totalCount = res.data.page.totalCount;
					}
				})
			},
			//删除对象中没有值的字段
			delNullData(data){
				for (let key in data) {
					data[key] ? '': delete data[key];
				}
			}
		}
	}
</script>

<style scoped>
	@import '../../style/reset.css';
	@import '../../style/style.css';
	 .content {
		background-color: white;
	}
	 .content .searchForm {
		height: 60px;
		padding: 25px 0 0 25px;
	}
	.content .operation_btn {
		background-color: #eee;
		height: 35px;
		line-height: 35px;
		width: 98%;
		margin: 0px 15px;
	}
	 .content .el-pagination {
		padding: 20px 5px;
	}

</style>
