<template>
    <div>
        <el-menu theme="light" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="0">全部</el-menu-item>
            <el-menu-item index="1">待审核</el-menu-item>
            <el-menu-item index="2">通过</el-menu-item>
            <el-menu-item index="3">驳回</el-menu-item>
        </el-menu>
        <p class="grayHeader" style="margin-top: 1px">
            <i class="iconfont icon-home"></i>
            <span class="location">所在位置：</span>
            <span class="now">用户管理</span>
        </p>
        <div class="content"  style="min-height: 800px;">
            <el-form  ref="query" :model="query" :inline="true" class="searchForm">
                <el-form-item label="所属公司">
                    <el-input type="text" v-model="query.companyNameCn"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input type="text" v-model="query.mobile"></el-input>
                </el-form-item>
                <el-form-item label="状态" v-if="activeIndex == 0">
                    <el-select v-model="query.status" placeholder="请选择">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="待审核" value="1"></el-option>
                        <el-option label="通过" value="2"></el-option>
                        <el-option label="驳回" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input type="text" v-model="query.user_id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search('query')">搜索</el-button>
                </el-form-item>
            </el-form>
            <div class="operation_btn">
                <el-button type="text" style="padding-left: 20px" @click="jumpAddUser()">
                    <em class="iconfont icon-add"></em>
                    <span style="display: inline-block;padding-left: 10px;">新增用户</span>
                </el-button>
            </div>
            <el-table :data="tableData" border style="width: 98%;margin: 0 15px;">
                <el-table-column label="ID" width="150" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.user_id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号" width="300" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.mobile }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" width="180" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.user_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="所属公司" width="380" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.companyNameCn }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="注册时间" width="300" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.create_date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="150" header-align="center" align="center">
                    <template scope="scope">
                        <span :filter-method="changeStatus(scope.$index, scope.row)">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template scope="scope">
                        <el-button size="small" @click="jumpUserAudit(scope.$index, scope.row)" v-if="scope.row.status.length == 3">审核</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-else>详情</el-button>
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
    import {getUserList} from '../../service/getData'

    export default {
        data(){
            return{
                activeIndex:'0',
                query:{
                    companyNameCn:'',
                    mobile:'',
                    status:'',
                    user_id:'',
                },
                tableData:[],
                pageNo : 1, //当前页码 number
                pageSizes:[5,10, 20, 30, 50],
                pageSize:5, //显示的条数 number
                totalCount :50, //总条数 number
            }
        },
        mounted(){
            this.postUserList();
        },
        components: {},
        props:[],
        methods: {
            //点击切换状态按钮，加载不同状态的数据
            handleSelect(key, keyPath) {
                this.activeIndex = key;
                if(key ==0){
                    this.query.status = '';
                    this.postUserList({});
                }else{
                    this.query.status = key;
                    this.delNullData(this.query);
                    this.postUserList(this.query);
                }
            },
            jumpAddUser(){
                this.$router.push({path:'/userEdit'});
            },
            //点击跳转用户编辑页面
            jumpUserAudit(index,row){
                this.$router.push({path:'/userEdit?user_id = '+ row.user_id});
            },
            //点击跳转用户详情页面
            handleEdit(index, row){
                this.$router.push({path:'/userDisplay?user_id = '+ row.user_id});
            },
            //pageSize 改变时会触发
            handleSizeChange(val) {
                this.pageSize = val;
                this.postUserList({});
            },
            //pageNo 改变时会触发
            handleCurrentChange(val) {
                this.pageNo = val;
                this.postUserList({});
            },
            //点击搜索，获取搜索数据
            search(name){
                this.query.status == 0 ? delete this.query.status : '';
                this.delNullData(this.query);
                this.postUserList(this.query);
            },
            //获取数据
            postUserList(query){
                getUserList(this.pageNo,this.pageSize,query).then((res) => {
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
            changeStatus(value,row) {
                switch (row.status){
                    case 1 :
                        row.status = "待审核";
                        break;
                    case 2 :
                        row.status = "通过";
                        break;
                    case 3 :
                        row.status = "驳回";
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    @import '../../style/reset.css';
    @import '../../style/style.css';
    .el-menu {
        background-color: rgb(204, 204, 204);
        margin-left: 30px;
    }
    .el-menu-item {
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
    .el-menu-item.is-active {
        color: #fff;
        background-color: #00a0e9;
    }
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
