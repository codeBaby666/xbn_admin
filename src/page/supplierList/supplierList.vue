<template>
    <div class="js-supplierList">
        <el-menu theme="light" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="">全部</el-menu-item>
            <el-menu-item index="0">待审核</el-menu-item>
            <el-menu-item index="1">通过</el-menu-item>
            <el-menu-item index="2">驳回</el-menu-item>
        </el-menu>
        <p class="grayHeader" style="margin-top: 1px">
            <i class="iconfont icon-home"></i>
            <span class="location">所在位置：</span>
            <span class="now">供应商管理</span>
        </p>
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
            <el-table :data="tableData" border style="width: 98%;margin: 0 15px;">
                <el-table-column label="公司名称" width="350" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.company_name_cn }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="注册手机号" width="250" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.company_phone }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="注册资金" width="250" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.registered_capital }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="注册时间" width="250" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.create_date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="会员类型" width="100" header-align="center" align="center">
                    <template scope="scope">
                        <span :filter-method="changeMember_type(scope.$index, scope.row)">{{scope.row.member_type}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="所在地" width="200" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{scope.row.city}} - {{scope.row.province}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100" header-align="center" align="center">
                    <template scope="scope">
                        <span :filter-method="changeStatus(scope.$index, scope.row)">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
                activeIndex:'',
                query:{
                    company_name_cn:'',
                    company_phone:'',
                    status:'',
                    company_type : '0'
                },
                tableData:[],
                pageNo : 1, //当前页码 number
                pageSizes:[5,10, 20, 30, 50],
                pageSize:5, //显示的条数 number
                totalCount :50, //总条数 number
            }
        },
        mounted(){
            this.postSupplierList();
        },
        components: {},
        props:[],
        methods: {
            //点击切换状态按钮，加载不同状态的数据
            handleSelect(key, keyPath) {
                this.activeIndex = this.query.status = key;
                this.postSupplierList();
            },

            //点击跳转supplier详情页面
            handleEdit(index, row){
                this.$router.push({path:'/supplierDisplay?company_id = '+ row.company_id});
            },
            //pageSize 改变时会触发
            handleSizeChange(val) {
                this.pageSize = val;
                this.postSupplierList();
            },
            //pageNo 改变时会触发
            handleCurrentChange(val) {
                this.pageNo = val;
                this.postSupplierList();
            },
            //点击搜索，获取搜索数据
            search(name){
                this.postSupplierList();
            },
            //获取数据
            postSupplierList(){
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
            },
            changeMember_type(value,row) {
                switch (row.member_type){
                    case "0" :
                        row.member_type = "普通会员";
                        break;
                    case "1" :
                        row.member_type = "付费会员";
                        break;
                }
            },
            changeStatus(value,row) {
                switch (row.status){
                    case "0" :
                        row.status = "待审核";
                        break;
                    case "1" :
                        row.status = "通过";
                        break;
                    case "2" :
                        row.status = "驳回";
                        break;
                }
            }
        }
    }
</script>

<style>
    @import '../../style/reset.css';
    @import '../../style/style.css';
    .js-supplierList .el-menu {
        background-color: rgb(204, 204, 204);
        margin-left: 30px;
    }
    .js-supplierList .el-menu-item {
        margin-right: 20px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: white;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-size: 15px;
        color: #00a0e9;
    }
    .js-supplierList .el-menu-item.is-active {
        color: #fff;
        background-color: #00a0e9;
    }
    .js-supplierList .content {
        background-color: white;
    }
    .js-supplierList .content .searchForm {
        height: 60px;
        padding: 25px 0 0 25px;
    }
    .js-supplierList .content .el-pagination {
        padding: 20px 5px;
    }
</style>
