<template>
    <div>
        <el-menu theme="light" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="0">全部</el-menu-item>
            <el-menu-item index="1">办理中</el-menu-item>
            <el-menu-item index="6">完成</el-menu-item>
            <el-menu-item index="7">取消</el-menu-item>
        </el-menu>
        <p class="grayHeader" style="margin-top: 1px">
            <i class="iconfont icon-home"></i>
            <span class="location">所在位置：</span>
            <span class="now">通关结汇管理</span>
        </p>
        <div class="content"  style="min-height: 800px;">
            <el-form  ref="query" :model="query" :inline="true" class="searchForm">
                <el-form-item label="单号：">
                    <el-input type="text" v-model="query.form_number"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="create_date" type="daterange" placeholder="选择日期范围"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态：" v-if="activeIndex == 0">
                    <el-select v-model="status" placeholder="请选择">
                        <el-option v-for="item in statusList" :label="item.label" :value="item.key" :key="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search('query')">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 98%;margin: 0 15px;">
                <el-table-column label="单号" width="300" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.form_number }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="供应商名称" width="300" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.companyNameCn }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="出口口岸" width="250" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.customs_port }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="运抵国" width="200" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.trade_nation }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="250" header-align="center" align="center">
                    <template scope="scope">
                        <span>{{ scope.row.create_date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100" header-align="center" align="center">
                    <template scope="scope">
                        <span :filter-method="changeStatus(scope.$index, scope.row)">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleDetail(scope.$index, scope.row)" >详情</el-button>
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
    import {getClearanceList} from '../../service/getData'

    export default {
        data(){
            return{
                activeIndex:'0',
                query:{
                    form_number:'',
                    status:'',
                    create_date:''
                },
                create_date:'',
                status:'',
                statusList: [
                    {label:'已取消', key:'0'},
                    {label:'待审核', key:'1'},
                    {label:'待订舱', key:'2'},
                    {label:'待报关', key:'3'},
                    {label:'待结汇', key:'4'},
                    {label:'待退税', key:'5'},
                    {label:'已完成', key:'6'}
                ],
                tableData:[],
                pageNo : 1, //当前页码 number
                pageSizes:[5,10, 20, 30, 50],
                pageSize:5, //显示的条数 number
                totalCount :50, //总条数 number
            }
        },
        mounted(){
            this.postClearanceList();
        },
        components: {},
        props:[],
        methods: {
            inputChange(val){
                console.log(val)
            },
            //点击切换状态按钮，加载不同状态的数据
            handleSelect(key, keyPath) {
                this.activeIndex = key;
                if(key == 0){
                    this.query.status = '';
                }else if(key == 7){
                    this.query.status = '0';
                }else if(key == 1){
                    this.query.status = [1,5];
                }else{
                    this.query.status = key;
                }
                console.log(this.status)
                this.postClearanceList();
            },
            //点击跳转详情页面
            handleDetail(index, row){
                this.$router.push({path:'/clearanceDetail?export_form_id = '+ row.export_form_id});
            },
            //pageSize 改变时会触发
            handleSizeChange(val) {
                this.pageSize = val;
                this.postClearanceList();
            },
            //pageNo 改变时会触发
            handleCurrentChange(val) {
                this.pageNo = val;
                this.postClearanceList();
            },
            //点击搜索，获取搜索数据
            search(name){
                this.postClearanceList();
            },
            //获取数据
            postClearanceList(){
                this.status ? this.query.status = this.status : '';
                this.create_date ? this.query.create_date = this.create_date : '';
                this.delNullData(this.query);
                getClearanceList(this.pageNo,this.pageSize,this.query).then((res) => {
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
                    case 0 :
                        row.status = "已取消";
                        break;
                    case 1 :
                        row.status = "待审核";
                        break;
                    case 2 :
                        row.status = "待订舱";
                        break;
                    case 3 :
                        row.status = "待报关";
                        break;
                    case 4 :
                        row.status = "待结汇";
                        break;
                    case 5 :
                        row.status = "待退税";
                        break;
                    case 6 :
                        row.status = "已完成";
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
