<template>
  <div>
    <my-header fixed :title="title">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <div>
      <mt-navbar class="my-tab-item">
        <mt-tab-item class="over" id="1" style="padding-left:6px" @click.native="betweenDateShow">
          <span v-if="!searchDateStatus">{{ DateFmt(defaultDateValue,'yyyy-MM')}}</span>
          <!-- <span v-else>{{ DateFmt(startDate,'yyyy-MM-dd')}}-{{DateFmt(endDate,'yyyy-MM-dd')}}</span> -->
          <span v-else>{{searchDateTime}}</span>
          <my-icon href="arrow-down" style="width:16px;height: 16px;fill:#a6a4a4"></my-icon>
        </mt-tab-item>
        <mt-tab-item id="2" @click.native="fnOrderPopupShow">
          <span>排序</span>
          <my-icon href="arrow-down" style="width:16px;height: 16px;fill:#a6a4a4"></my-icon>
        </mt-tab-item>
        <mt-tab-item id="3" @click.native="fnPopupPayShow">
          <span>支付方式</span>
          <my-icon href="arrow-down" style="width:16px;height: 16px;fill:#a6a4a4"></my-icon>
        </mt-tab-item>
        <my-search-box id="4" @click.native="fnSearchShow"></my-search-box>
      </mt-navbar>
    </div>
    <my-search-static :style="searchPopup ? 'opacity:1':'opacity:0;margin-top:-52px;position:relative;z-index:-1;'" ref="search" v-model="query.keyword"  cancel-text="取消" placeholder="搜索">
    </my-search-static>
    <div class="between-popup-box">
      <mt-popup v-model="betweenVisible" :modal="false" class="between-popup" popup-transition="popup-fade" position="left">
        <div class="comp-page">
          <div class="box-flex" @click="fnStartDateShow()">
            <div class="item">{{ DateFmt(query.startDate, 'yyyy-MM-dd')}}</div>
          </div>
          <div class="box-flex" @click="fnEndDateShow()">
            <div class="item">{{ DateFmt(query.endDate,'yyyy-MM-dd')}}</div>
          </div>
          <div class="box-flex">
            <mt-button size="large" @click.native="searchData" type="primary">确认</mt-button>
          </div>
        </div>
      </mt-popup>
      <!-- <between-date ref="betweenDate" :startDate="startDate" :endDate="endDate" @searchData="searchData"
         @startPopup="fnStartDateShow" @endPopup="fnEndDateShow"></between-date> -->
      <div class="v-modal" style="z-index:1000;" v-show="betweenVisible" @click="betweenDateShow"></div>
    </div>
    <div class="page-part">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="page-infinite-list">
        <div class="box-jiaoyi-info" @click="fnGoDetail(item)" v-for="item in tradeList">
          <div class="left-item">
            <div class="head">
              <span class="item">收款：￥{{ item.totalAmount}}</span>|
              <span class="item">分润：￥14.00</span>
            </div>
            <div class="body">
              <div class="item single-over">
                <my-icon href="shanghu" style="width:12px;height: 12px;fill:#b3b3b3"></my-icon>
                <span class="single-over">{{ item.licenseName }}</span>
              </div>
              <div class="item single-over">
                <my-icon href="mendian" style="width:12px;height: 12px;fill:#b3b3b3"></my-icon>
                <span class="single-over">{{ item.posName }}</span>
              </div>
            </div>
            <!-- <div class="body border-bottom">
            <div class="item">摘要说明：xxxxxx</div>
          </div> -->
            <div class="footer">
              <span class="item">{{ item.payTime }}</span>
              <span class="item">{{ item.seqNo }}</span>
            </div>
          </div>
          <div class="right-item">
            <my-icon href="zhifubao" size="28"></my-icon>
          </div>
        </div>
      </div>
    </div>
    <p :class="'page-infinite-loading'+(loadEnd?'-no':'')">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
    <div v-if="tradeList.length!==0" :class="'loadmore-end'+((showEnd&&loadEnd)?'':'-no')">我是有底线的</div>
    <!-- <mt-datetime-picker ref="datePicker" v-model="DateTimeValue" type="date" year-format="{value} 年" month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker> -->
    <div class="none-data" v-if="tradeList.length===0&&status">
        <img src="~assets/no-info.png" alt="">
      </div>
    <mt-datetime-picker ref="startDate" v-model="query.startDate" type="date" year-format="{value} 年" month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <mt-datetime-picker ref="endDate" v-model="query.endDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <my-bottom-popup ref="orderByPopup" align="right" v-model="orderBy" :options="orderByTypes">
    </my-bottom-popup>
    <my-bottom-popup ref="payPopup" align="right" v-model="query.payType" :options="payTypeData">
    </my-bottom-popup>
    <my-navigate-tab selected=""></my-navigate-tab>
  </div>
</template>
<script>
  let payTypeData = [{
    label: '支付宝',
    value: '1'
  }, {
    label: '微信',
    value: '2'
  }, {
    label: '银联',
    value: '3'
  }];
  let orderByTypes = [{
      label: '收款时间从新到旧',
      value: 'createTime-desc'
    },
    {
      label: '收款时间从旧到新',
      value: 'createTime-asc'
    },
    {
      label: '收款金额从大到小',
      value: 'updateTime-desc'
    },
    {
      label: '收款金额从小到大',
      value: 'updateTime-asc'
    },
  ];
  import betweenDate from '../commons/between-date.vue'
  export default {
    name: "component_name",
    data() {
      return {
        showEnd: false,
        loadEnd: true, //false加载中  true 加载完毕
        defaultDateValue: DateFmt(new Date(), 'yyyy-MM'),
        payTypeData: payTypeData,
        // startDate: DateFmt(new Date(), 'yyyy-MM-dd'),
        // endDate: DateFmt(new Date(), 'yyyy-MM-dd'),
        betweenVisible: false,
        startDateValue: DateFmt(new Date(), 'yyyy-MM-dd', 'y-10'),
        endDatesValue: DateFmt(new Date(), 'yyyy-MM-dd', 'y+10'),
        modalStatus: false,
        orderBy: '',
        orderByTypes: orderByTypes,
        title:'交易明细',
        status:false,
        searchPopup:false,
      }
    },
    computed: {
      tradeList() {
        return this.$store.getters['trade/tradeList']
      },
      query() {
        return this.$store.getters['trade/query']
      },
      // startDate(){
      //   return this.$store.getters['trade/startDate'];
      // },
      // endDate(){
      //   return this.$store.getters['trade/endDate']
      // },
      //是否启用时间搜索状态
      searchDateStatus() {
        return this.$store.getters['trade/searchDateStatus']
      },
      searchDateTime() {
        let dateTime = DateFmt(this.query.startDate, 'yyyy-MM-dd') + '-' + DateFmt(this.query.endDate, 'yyyy-MM-dd')
        if (dateTime.length > 10) {
          dateTime = dateTime.substring(0, 8) + '...'
        }
        return dateTime
      },
    },
    created() {
      let { name , id} = this.$route.query
      this.$store.dispatch('trade/clearTrade')
      if(name==='merchant'){
        this.title='商户收款列表'
        this.query.merchantId=id
        this.query.storeId=''
      }
      if(name==='store'){
        this.title='门店收款列表'
        this.query.merchantId=''
        this.query.storeId=id
      }
      // this.$store.dispatch('trade/request_trade').then(x => {})
      this.fnReqTrade()
    },
    components: {
      betweenDate
    },
    watch: {
      'query.payType'(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('trade/clearTrade')
          this.fnReqTrade()
        }
      },
      'query.keyword'(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('trade/clearTrade')
          this.fnReqTrade()
        }
      },
      orderBy(val, oldVal) {
        if (val !== oldVal) {
          this.query.orderBy = val.split('-')[0]
          this.query.order = val.split('-')[1]
          this.$store.dispatch('trade/clearTrade')
          this.fnReqTrade()
        }
      },
    },
    methods: {
      fnReqTrade() {
        let arg = {},route=this.$route.query
        // arg.query.payType = this.query.payType;
        this.loadEnd = !this.loadEnd;
        // if (this.orderBy !== '') {
        //   arg.orderBy = this.orderBy.split('-')[0]
        //   arg.order = this.orderBy.split('-')[1]
        // }
        // if(route.name==='store'){
        //   arg.storeId=route.id
        // }
        // if(route.name==='merchant'){
        //   arg.merchantId=route.id
        // }
        // console.log('this.searchDateStatus:', this.searchDateStatus)
        // if (this.searchDateStatus) {
          // arg.payedTimeStart = DateFmt(this.query.startDate, 'yyyy-MM-dd')+''
          // arg.payedTimeEnd = DateFmt(this.query.endDate, 'yyyy-MM-dd')
        // }

        this.$store.dispatch('trade/request_trade').then(x => {
          this.loadEnd = !this.loadEnd;
          this.status = true
        })
      },
      loadMore(){
        // let arg = {},route=this.$route.query
        // arg.query.payType = this.query.payType;
        // this.loadEnd = !this.loadEnd;
        // if (this.orderBy !== '') {
        //   arg.orderBy = this.orderBy.split('-')[0]
        //   arg.order = this.orderBy.split('-')[1]
        // }
        // if (this.searchDateStatus) {
        //   // console.log('startDate:',this.startDate);
        //   arg.payedTimeStart = DateFmt(this.query.startDate, 'yyyy-MM-dd')
        //   // arg.payedTimeStart = this.query.startDate
        //   arg.payedTimeEnd = DateFmt(this.query.endDate, 'yyyy-MM-dd')
        // }
        // if(route.name==='store'){
        //   arg.storeId=route.id
        // }
        // if(route.name==='merchant'){
        //   arg.merchantId=route.id
        // }
        // arg.pageNo = this.query.pageNo++
        this.$store.dispatch('trade/request_trade').then(x => {
          this.loadEnd = !this.loadEnd
          this.showEnd = x
        })
      },
      fnOrderPopupShow() {
        this.$refs.orderByPopup.open()
      },
      fnPopupPayShow() {
        this.$refs.payPopup.open()
      },
      fnDateShow() {
        this.$refs.datePicker.open()
      },
      fnGoDetail(item) {
        this.$store.dispatch('trade/change_trade', item)
        this.$router.push('trade-info-detail')
      },
      //时间搜索显示
      fnStartDateShow() {
        this.$refs.startDate.open()
      },
      fnEndDateShow() {
        this.$refs.endDate.open()
      },
      betweenDateShow() {
        this.betweenVisible = !this.betweenVisible
      },
      betweenDateClose() {
        this.$refs.betweenDate.close()
      },
      //按时间搜索
      searchData() {
        // this.
        this.betweenDateShow()
        this.$store.dispatch('trade/clearTrade')
        this.$store.dispatch('trade/change_searchDateStatus', true)
        this.fnReqTrade()
      },
      fnSearchShow(){
        this.searchPopup=!this.searchPopup
        if(this.searchPopup){
          this.$refs.search.open()
        }else{
          this.$refs.search.blur()
        }
      },
    }
  }
</script>
<style lang="css">
  .between-popup-box .v-modal {
    opacity: 0;
  }

  .over .mint-tab-item-label {
    overflow: hidden;
    position: relative;
  }

  .custom-tab {
    position: absolute;
    top: 0;
    left: 0;
    right: 12px;
    font-size: 0.24rem;
    line-height: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
<style lang="scss" scoped>
  .border-bottom {
    padding-bottom: 3px;
  }

  .border-bottom::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    right: 0;
    background: #e6e6e6;
    height: 1px;
    transform: scaleY(.5)
  }

  .box-jiaoyi-info {
    display: flex;
    padding: 8px 10px;
    background: #fff;
    margin-bottom: 10px;
    .left-item {
      flex: 1;
      .head {
        color: #a4a4a4;
        font-weight: 700;
        .item {
          font-size: 0.28rem;
          margin-right: 10px;
        }
      }

      .body {
        overflow: hidden;
        font-size: 0.24rem;
        color: #b3b3b3;
        position: relative;
        line-height: 26px;
        width: 100%;
        .item {
          width: 50%;
          box-sizing: border-box;
          padding-right: 10px;
          float: left;
          span,
          svg {
            vertical-align: middle;
          }
        }
      }

      .footer {
        color: #b3b3b3;

        .item {
          display: inline-block;
          margin-right: 10px;
          /* font-size: 11px; */
          font-size: 0.22rem;
        }
      }
    }
    .right-item {
      width: 40px;
      text-align: center;
      span {
        width: 30px;
        height: 30px;
        float: right;
        background: #ccc;
        border-radius: 100%;
      }
    }
  }
</style>