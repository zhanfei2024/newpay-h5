<template>
  <div>
    <div class="box-details-list list-3" @click="fnGo()">
      <div class="box-order-list header">
        <div class="left-item">
          <span class="head-title-name">我是用户名</span>
        </div>
        <div class="right-item">2017-11-11</div>
      </div>
      <div class="box-order-list header header-1">
        <div class="left-item">
          <span class="body-title-name">手机号:13723440051</span>
        </div>
        <div class="right-item">2017-11-11</div>
      </div>
      <div class="box-order-list footer">
        <div class="left-item">
          <span class="title-name">注册时间 : </span>
          <span class="title-value price-1">2017-10-10 </span>
        </div>
        <div class="right-item">
          <!-- <mt-button type="primary" size="small" style="height:27px;background:#0099FE">二维码收款</mt-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "my-user-list",
    data() {
      return {};
    },
    methods:{
      fnGo(){
        this.$router.push('user-info')
      }
    },
    props: {
      rows: {
        type: Array,
        default: []
      }
    }
  }
</script>
<style lang="css" scoped>
  .box-details-list {
    padding: 0 10px;
    position: relative;
    background: #fff;
    padding-bottom: 6px;
    margin-bottom: 8px;
  }

  .box-details-list.list-3::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: #d9d9d9;
  }

  .box-order-list {
    overflow: hidden;
    padding: 8px 0 3px;
    position: relative;
    font-size: 0.22rem;
  }

  .box-order-list.header.header-1{
    padding-top:0;
  }

  .box-order-list.footer {
    padding: 8px 0 3px;
  }

  .box-order-list .left-item {
    width: 65%;
    float: left;
    line-height: 24px;
    /* font-size: 14px; */
    overflow: hidden;
    color: rgb(107, 107, 107);
  }
  .box-order-list .left-item .head-title-name{
    font-size: 0.28rem;
  }
  .box-order-list .left-item .body-title-name{
    font-size: 0.24rem;
  }
  .box-order-list.footer .left-item {
    line-height: 27px;
  }

  .box-order-list.header .left-item {
    color: #6B6B6B;
  }

  .box-order-list.header .left-item span {
    vertical-align: middle;
    margin-top: -1px;
  }

  .box-order-list .right-item {
    width: 35%;
    float: left;
    line-height: 24px;
    font-size: 14px;
    overflow: hidden;
    color: rgb(107, 107, 107);
    text-align: right;
  }

  .box-order-list.footer .left-item {
    color: #6B6B6B;
  }

  .box-order-list.footer::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: #d4d4d4;
    transform: scaleY(.5);
  }

</style>