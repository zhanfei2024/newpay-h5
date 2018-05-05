<template>
      <div class="box-details-list list-3" @click="fnGo(item)">
        <div class="box-order-list header">
          <div class="left-item single-over" style="width:65%">
            <span class="title-name">{{item.merchantName}}</span>
          </div>
          <!-- 审核状态 -->
          <div class="head-right-item" :style="`color:${color[item.merchantStatus]}`">{{merchantStatus[item.merchantStatus]}}</div>
        </div>
        <div class="box-half-border"></div>
        <div class="box-flex">
          <div class="box-flex-left">
            <div class="box-order-title">
              {{item.contactName}}
            </div>
            <div class="box-order-list header header-1" style="padding-bottom: 0">
              <div class="left-item">
                <span class="body-title-name">收款总额:2000.00万</span>
              </div>
              <div class="right-item">分润金额:2000</div>
            </div>
            <div class="box-order-list header header-1">
              <div class="left-item">
                <span class="body-title-name">联系人：{{item.contactName}}</span>
              </div>
              <div class="right-item single-over">地区：{{item.address}}</div>
              <!-- <div class="right-item" style="display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;">地区：{{item.address}}</div> -->
            </div>
          </div>
          <div class="box-flex-right">
            <svg class="icon" aria-hidden="true" slot="icon" style="height:20px;width:100%;fill:#b1b3b5;">
                <use xlink:href="#icon-arrow-right"></use>
            </svg>
          </div>
        </div>
        <div class="box-order-list footer">
          <div class="left-item" style="width:100%">
            <span class="body-title-name">注册时间 : </span>
            <span class="title-value price-1">{{item.createTime}} </span>
          </div>
          <!-- <div class="right-item"> -->
            <!-- <mt-button type="primary" size="small" style="height:27px;background:#0099FE">二维码收款</mt-button> -->
          <!-- </div> -->
        </div>
      </div>
  </template>
  <script>
    export default {
      name: "my-user-list",
      data() {
        return {
          merchantStatus:{
            '0':'未审核','1':'服务商审核中',
            '2':'支付机构审核中','3':'已通过',
            '-1':'未通过','-2':'被锁定'
          },
          color:{
            '0':'#F56C6C',
            '1':'#F56C6C',
            '2':'#F56C6C',
            '3':'#67C23A',
            '-1':'#E6A23C',
            '-2':'#E6A23C',
          }
        };
      },
      created () {
        console.log('rows:',this.rows);
      },
      methods:{
        fnGo(item){
          let href =this.to || '';
          this.$router.push(href);
          this.$store.dispatch('merchant/change_merchant',item)
        }
      },
      props: {
        item: {
          type: Object,
          required:true,
        },
        to:{
          type:String,
        },
        status:{  //是否是请求数据后的状态 防止刚进页面就会显示无数据的图片
          type:Boolean,
          default:false,
        }
      }
    }
  </script>
  <style lang="css" scoped>
    .box-flex{
      display: flex;
      padding:0;
    }
    .box-flex-left{
      flex:1;
    }
    .box-flex-right{
      width:40px;
      position: relative;
    }
    .box-flex-right svg.icon{
      position: absolute;
      top:50%;
      left:0;
      transform: translate(0,-50%)
    }
    .box-order-title{
      line-height: 18px;
      /* font-size: 12px; */
      font-size: 0.24rem;      
      color:#333;
      padding-top:6px;
    }
    .box-half-border{
      height: 1px;
      width: 100%;
      background: #d9d9d9;
      transform: scaleY(.5);
    }
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
      width: 50%;
      float: left;
      line-height: 24px;
      /* font-size: 12px; */
      overflow: hidden;
      color: rgb(107, 107, 107);
    }

    .box-order-list.header .left-item .title-name{
      font-size: 0.28rem;
      font-weight: 700
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

    .box-order-list .head-right-item {
      width: 35%;
      float: left;
      line-height: 24px;
      /* font-size: 12px; */
      overflow: hidden;
      color: rgb(107, 107, 107);
      text-align: right;
    }
    .box-order-list .head-right-item{
      font-size: 0.24rem;
    }
    .box-order-list .right-item {
      width: 50%;
      float: left;
      line-height: 24px;
      /* font-size: 12px; */
      overflow: hidden;
      color: rgb(107, 107, 107);
      text-align: left;
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