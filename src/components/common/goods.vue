<template>
    <div class="bgcee lh30 w85p p20 mt10 por mw735">
        <p class="mb10 borbw" ><span>{{good.name_cn}}</span><span v-if="edit" class="colBlue curp" @click="editHandle(good.export_goods_id)">编辑</span></p>
        <p class=" mt5 current">
            <label v-if="good.package_count" class="ml10"><span class="td_r">最大包装件数：</span>
                <span>{{good.package_count}}</span>
            </label>
            <label v-if="good.net_weight" class="ml10"><span class="td_r">总净重（KG）：</span>
                <span>{{good.net_weight}}</span>
            </label>
            <label v-if="good.gros_weight" class="ml10"><span class="td_r">总毛重量（KG)：</span>
                <span>{{good.gros_weight}}</span>
            </label>
            <label v-if="good.quantity" class="ml10"><span class="td_r">数量和单位：</span>
                <span>{{good.quantity}}-{{good.unit}}</span>
            </label>
            <label v-if="good.unit_price" class="ml10"><span class="td_r">单价：</span>
                <span>{{good.unit_price}}</span>
            </label>
            <label v-if="good.package_value" class="ml10"><span class="td_r">货值：</span>
                <span>{{good.package_value}}</span>
            </label>
            <label v-if="good.hs_code" class="ml10"><span class="td_r">HSCode：</span>
                <span>{{good.hs_code}}</span>
            </label>
            <label v-if="good.name_en" class="ml10"><span class="td_r">英文名称：</span>
                <span>{{good.name_en}}</span>
            </label>
            <label v-if="good.brand" class="ml10"><span class="td_r">品牌：</span>
                <span>{{good.brand}}</span>
            </label>
            <label v-if="good.model" class="ml10"><span class="td_r">型号：</span>
                <span>{{good.model}}</span>
            </label>
            <label v-if="good.origin_country" class="ml10"><span class="td_r">原产国：</span>
                <span>{{good.origin_country}}</span>
            </label>
            <label v-if="good.drawer_company" class="ml10"><span class="td_r">开票公司名称：</span>
                <span>{{good.drawer_county}}</span>
            </label>
            <label v-if="good.category" class="ml10"><span class="td_r">种类：</span>
                <span>{{good.category}}</span>
            </label>
            <label v-if="good.texture" class="ml10"><span class="td_r">材质：</span>
                <span>{{good.texture}}</span>
            </label>
            <label v-if="good.usage" class="ml10"><span class="td_r">用途：</span>
                <span>{{good.usage}}</span>
            </label>
            <label v-if="good.attribute" class="ml10"><span class="td_r">属性：</span>
                <span>{{good.attribute}}</span>
            </label>
            <label v-if="good.goods_size" class="ml10"><span class="td_r">包装/托盘尺寸：</span>
                <span>{{good.goods_size}}</span>
            </label>
        </p>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {singout} from '../../service/getData'

    export default {
    	data(){
            return{}
        },
        props:['good','edit'],
        methods: {
            editHandle(id){
                this.$emit('editHandle',id)
            }
        }
    }

</script>

<style scoped>
    @import '../../style/reset.css';
    @import '../../style/style.css';
</style>
