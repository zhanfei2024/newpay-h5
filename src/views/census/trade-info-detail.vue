<template>
  <div>
    <my-header fixed title="收款详情">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <mt-cell title="交易流水号" :value="trade.seqNo"></mt-cell>
    <mt-cell title="收款账户" :value="trade.accountNumber"></mt-cell>
    <mt-cell title="支付流水号" :value="trade.seqNo"></mt-cell>
    <my-block left bottom>分润信息</my-block>
    <mt-cell title="系统编号" :value="trade.totalAmount"></mt-cell>
    <mt-cell title="创建者" :value="trade.createUserName"></mt-cell>
    <mt-cell title="收款金额" :value="trade.totalAmount"></mt-cell>
    <mt-cell title="实收金额" :value="trade.totalAmount"></mt-cell>
    <mt-cell title="第三方费率金额" :value="trade.totalAmount"></mt-cell>
    <mt-cell title="分润金额" :value="trade.totalAmount"></mt-cell>
    <my-block left bottom>付款信息</my-block>
    <my-cell class="newline" title="商户名" :value="trade.licenseName"></my-cell>
    <my-cell class="newline" title="商户编号" :value="trade.merchantId"></my-cell>
    <my-cell class="newline" @click.native="fnGo(trade.merchantId,'merchant')" title="所属商户" is-link :value="trade.licenseName"></my-cell>
    <my-cell class="newline" @click.native="fnGo(trade.storeId,'store')" title="所属门店" is-link :value="trade.posName"></my-cell>
    <my-cell class="newline" title="商品名" :value="trade.totalAmount"></my-cell>
    <mt-cell title="交易状态" :value="trade.status"></mt-cell>
    <mt-cell title="发起时间" :value="trade.createTime"></mt-cell>
    <mt-cell title="发起人" :value="trade.createUserName"></mt-cell>
    <mt-cell title="付款时间" :value="trade.payTime"></mt-cell>
    <mt-cell title="付款方式" :value="trade.payType"></mt-cell>
    <mt-cell title="费率" :value="trade.totalAmount"></mt-cell>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
export default {
  name: "component_name",
  data () {
    return {
    };
  },
  methods:{
    fnGo(id,name){
      if(id===undefined || name === undefined){
        Toast('参数无效')
        return
      }
      this.$router.push({name:'trade-info',query:{id,name}})}
  },
  computed: {
    trade(){
      return this.$store.getters['trade/tradeSelect']
    }
  }
}
</script>
<style lang="css" scoped>
</style>