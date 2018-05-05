<template>
    <div>
      <div class="tongji-title">
        <div class="tongji-title-item">日期</div>
        <div class="tongji-title-item">总收金额</div>
        <div class="tongji-title-item">分润金额</div>
      </div>
      <div class="tongji-value" @click="$router.push('merchant-trade-list')">
        <div class="tongji-value-item">12月</div>
        <div class="tongji-value-item">201万</div>
        <div class="tongji-value-item">1.00</div>
      </div>
      <div class="tongji-value">
        <div class="tongji-value-item">12月</div>
        <div class="tongji-value-item">201万</div>
        <div class="tongji-value-item">1.00</div>
      </div>
      <div class="tongji-value">
        <div class="tongji-value-item">12月</div>
        <div class="tongji-value-item">201万</div>
        <div class="tongji-value-item">1.00</div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "component_name",
    data () {
      return {
      };
    }
  }
  </script>
  <style lang="scss" scoped>
    .tongji-title{
      display: flex;
      background: #ccc;
      height: 40px;
      line-height: 40px;
      .tongji-title-item{
        flex:1;
        text-align:center;
      }
    }
    .tongji-value{
      display: flex;
      height:40px;
      line-height: 40px;
      background: #fff;
      position: relative;
      .tongji-value-item{
        flex:1;
        text-align:center;
      }
      &::before{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #d9d9d9;
      }
    }
  </style>