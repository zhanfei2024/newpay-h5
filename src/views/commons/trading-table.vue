<template>
  <div class="box-merchant-money">
    <div class="money-item">
      <div class="item-top">$120</div>
      <div class="item-bottom">收款总额</div>
    </div>
    <div class="money-item">
      <div class="item-top">$120</div>
      <div class="item-bottom">收款总额</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "trade-table",
    data() {
      return {};
    },
    props:{
      datas:{
        type:Array,
        default:[]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box-merchant-money{
    position: relative;
    display: flex;
    
    .money-item{
      flex:1;
      text-align:center;
      .item-top{
        font-size: 0.32rem;
        font-weight: 700;
        padding:10px 0 2px;
        color:#505050;
      }
      .item-bottom{
        font-size: 0.22rem;
        color: #909090;
        line-height: 18px;
        padding-bottom:5px;
      }
    }
    &::before{
      content: '';
      position: absolute;
      top:10px;
      bottom:10px;
      left: 50%;
      width: 1px;
      transform: translate(50%,0,0);
      background: #d9d9d9;
    }
  }
</style>