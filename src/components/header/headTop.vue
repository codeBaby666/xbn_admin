<template>
    <div class="xbn-header">
        <header id="top">
            <h1 class="fl">平台系统运营管理中心</h1>
            <p class="fl">WELCOME YOU!</p>
            <a  class="fr" @click="outLogin"><i class="iconfont icon-dianyuan"></i>退出</a >
        </header>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {singout} from '../../service/getData'

    export default {
    	data(){
            return{}
        },
        methods: {
            ...mapMutations([
                'OUT_LOGIN'
            ]),
            outLogin() {
                let that = this;
                //清除登录状态，跳转到登录页
                singout().then(function(res){
                    if(res.statusCode == 2000000){
                        that.OUT_LOGIN();
                        sessionStorage.removeItem('user');
                        that.$router.push({path:'/login'})
                    }
                })
            },
        }
    }

</script>

<style>
    @import '../../style/reset.css';
    @import '../../style/style.css';
</style>
