<template>
  <div class="height-all bg-white">
    <my-header fixed title="统计">
      <!-- <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button> -->
    </my-header>
    <div class="box-jianbao">
      <div class="left-item">简报</div>
      <div class="right-item" @click="searchPop=!searchPop">
        <span>本月</span>
      </div>
    </div>
    <div class="box-jiaoyi-money">
      <!-- <div class="search-data-box" v-show="searchPop">
        <search-data></search-data>
      </div> -->
      <mt-popup v-model="searchPop" :modal="false" class="my-popup" popup-transition="popup-fade" position="left">
        <div class="comp-page">
          <div class="box-queue">
            <div class="item" v-for="item,index in queueDate" :style="query.selectActive==item.value?'background:#ccc':''" @click="fnSelectDate(item.value)">
              {{item.label}}
            </div>
            <!-- <div class="item" :style="query.selectActive=='zuotian'?'background:#ccc':''" @click="fnSelectDate('zuotian')">
              昨天
            </div> -->
          </div>
          <div class="box-flex">
            <div class="item"   @click="fnStartDateShow()">开始日期</div>
          </div>
          <div class="box-flex">
            <div class="item"  @click="fnEndDateShow()">结束日期</div>
          </div>
          <div class="default-box">
            <div class="left-item">
              将选择设为默认
            </div>
            <div class="right-item">
              <mt-switch v-model="switchVal"></mt-switch>
            </div>
          </div>
          <div class="box-flex">
            <mt-button size="large" @click.native="fnConfirm" type="primary">确认</mt-button>
          </div>
        </div>
      </mt-popup>
      <div class="v-modal" v-if="searchPop" @click="searchPop=!searchPop"></div>
      <div class="jiaoyi-content">
        <div class="box-merchant-money">
          <div class="money-item">
            <div class="item-top">{{censusData.totalAmount}}元</div>
            <div class="item-bottom">交易总额</div>
          </div>
          <div class="money-item">
            <div class="item-top">{{censusData.totalProfitAmount}}元</div>
            <div class="item-bottom">分润总额</div>
          </div>
        </div>
        <div class="box-merchant-money">
          <div class="money-item">
            <div class="item-top">{{censusData.storeRegisterCount}}个</div>
            <div class="item-bottom">新注册用户数</div>
          </div>
          <div class="money-item">
            <div class="item-top">{{censusData.merchantRegisterCount}}个</div>
            <div class="item-bottom">建立商户数</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <my-grid>
        <my-grid-item to="/trade-count" class="bg-white">
          <my-icon slot="icon" href="yonghuguanli"></my-icon>
          交易统计
        </my-grid-item>
        <my-grid-item to="/trade-info" class="bg-white">
          <my-icon slot="icon" href="shanghu"></my-icon>
          交易明细
        </my-grid-item>
        <my-grid-item to="/merchant-rank" class="bg-white">
          <my-icon slot="icon" href="shanghu"></my-icon>
          商户排行
        </my-grid-item>
        <my-grid-item to="/door-rank" class="bg-white">
          <my-icon slot="icon" href="shanghu"></my-icon>
          门店排行
        </my-grid-item>
      </my-grid>
    </div>
    <mt-datetime-picker ref="startDate" v-model="query.startDate" type="date" year-format="{value} 年" month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <mt-datetime-picker ref="endDate" v-model="query.endDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <my-navigate-tab selected="census"></my-navigate-tab>
  </div>
</template>
<script>
  import myNavigateTab from '../commons/navigate-tab.vue'
  //时间筛选组件search-data
  import searchData from '../commons/search-data.vue'
  // import {
  //   censusData
  // } from '../../store/jsontest'
  const totalObj = {
    userId: 100001,
    merchantId: 36,
    startDate: "2017-01-01 00:00:00",
    endDate: "2018-11-01 23:59:59",

  }
  const cycleObj = {
    // userId: "100001",
    merchantId: "36",
    startDate: "2017-01-01 00:00:00",
    endDate: "2018-11-01 23:59:59",
    type: "M",
    storeId: "dta904store01",
    payType: "1,2",
  }
  const tDate = new Date()
  const year = tDate.getFullYear()
  var fnDate = function (arg, type, years) {
    years = years || year
    if (type === 'start') {
      return moment(years + arg).startOf('month').format("YYYY-MM-DD")
    }
    return moment(years + arg).endOf('month').format("YYYY-MM-DD")
  }
  const quarterDate = [{
      startDate: fnDate('-1-1', 'start'),
      endDate: fnDate('-3-1')
    },
    {
      startDate: fnDate('-4-1', 'start'),
      endDate: fnDate('-6-1')
    },
    {
      startDate: fnDate('-7-1', 'start'),
      endDate: fnDate('-9-1')
    },
    {
      startDate: fnDate('-10-1', 'start'),
      endDate: fnDate('-12-1')
    },
    {
      startDate: fnDate('-10-1', 'start', year - 1),
      endDate: fnDate('-12-1', 'end', year - 1)
    }, //上年最后一季度
  ]
  const queueDateArr = [
    {value:'today',label:'今天'},
    {value:'zuotian',label:'昨天'},
    {value:'benyue',label:'本月'},
    {value:'shangyue',label:'上月'},
    {value:'benji',label:'本季度'},
    {value:'shangji',label:'上季度'},
    {value:'bennian',label:'本年'},
    {value:'buxian',label:'不限'},
  ]
  export default {
    name: "component_name",
    data() {
      return {
        searchPop: false,
        queueDate:queueDateArr
        // censusData,
      };
    },
    computed: {
      query() {
        return this.$store.getters['census/censusQuery']
      },
      censusData(){
        return this.$store.getters['census/censusData']
      }
    },
    mounted() {
      // let totalUrl = 'http://192.168.110.203:8080/tradeSeq/getTradeSeqByStoreCount'
      let totalUrl = '/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/totalCount'
      this.$store.dispatch('census/request_census')

    },
    methods: {
      fnRequestData(){
        this.query.dateStatus = true
        this.$store.dispatch('census/request_census')
      },
      fnConfirm(){
        this.searchPop = !this.searchPop
        this.fnRequestData()
      },
      fnSelectDate(arg) {
        let startDate, endDate, spring = 0,
          summer = 1,
          fall = 2,
          winter = 3,
          date = new Date()
        this.query.selectActive=arg
        if (arg === 'today') {
          startDate = DateFmt(date, 'yyyy-MM-dd')
          endDate = DateFmt(date, 'yyyy-MM-dd')
        }
        if (arg === 'zuotian') {
          startDate = DateFmt(date, 'yyyy-MM-dd', 'd-1')
          endDate = DateFmt(date, 'yyyy-MM-dd', 'd')
        }
        if (arg === 'benyue') {
          startDate = moment(date).startOf('month').format("YYYY-MM-DD")
          endDate =  moment(date).endOf('month').format("YYYY-MM-DD")
        }
        if (arg === 'shangyue') {
          startDate = moment(DateFmt(date, 'yyyy-MM-dd', 'M-1')).startOf('month').format("YYYY-MM-DD")
          endDate = moment(DateFmt(date, 'yyyy-MM-dd', 'M')).endOf('month').format("YYYY-MM-DD")
          console.log('shangyue:', endDate)
        }
        if (arg === 'benji') {
          let month = date.getMonth()
          startDate = quarterDate[fnMonth(month)].startDate
          endDate = quarterDate[fnMonth(month)].endDate
          console.log('benji:', startDate)
          console.log('benji:', endDate)
        }
        if (arg === 'shangji') {
          let month = date.getMonth()
          if (fnMonth(month) - 1 < 0) {
            startDate = quarterDate[4].startDate
            endDate = quarterDate[4].endDate
          } else {
            startDate = quarterDate[fnMonth(month) - 1].startDate
            endDate = quarterDate[fnMonth(month) - 1].endDate
          }
          console.log('shangji:', startDate)
          console.log('shangji:', endDate)
        }
        if (arg === 'bennian') {
          startDate = DateFmt(date, 'yyyy') + '-01-01'
          endDate = DateFmt(date, 'yyyy') + '-12-31'
        }
        if (arg === 'buxian') {
          startDate = ''
          endDate = ''
        }
        this.query.startDate = startDate
        this.query.endDate = endDate
        console.log('startDate:',this.query.startDate);

        function fnMonth(month) {
          return Math.floor(month / 3)
        }
      },
      //时间搜索显示
      fnStartDateShow() {
        this.$refs.startDate.open()
      },
      fnEndDateShow() {
        this.$refs.endDate.open()
      },
    },
    components: {
      myNavigateTab,
      searchData,
    }
  }
</script>
<style lang="css">
  .box-jiaoyi-money .v-modal {
    opacity: 0;
  }
  
</style>
<style lang="scss" scoped>
  svg path{
    fill:#26a2ff
  }
  .my-popup {
    width: 100%;
    /* height: auto; */
    /* overflow: scroll; */
    transform: initial;
    position: absolute;
    top: 10px;
  }


  .box-jianbao {
    background: #26a2ff;
    padding: 6px 10px 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    color: #fff;
    .left-item {
      flex: 1;
      /* font-size: 14px; */
      font-size: 0.28rem;
    }
    .right-item {
      flex: 1;
      /* font-size: 14px;     */
      font-size: 0.28rem;
      span {
        float: right;
        display: block;
        width: 100px;
        text-align: center;
        border-radius: 15px;
        border: 1px solid #fff;
        height: 30px;
        box-sizing: border-box;
      }
    }
  }

  .box-jiaoyi-money {
    background: #26a2ff;
    padding: 10px;
    position: relative;
    .jiaoyi-content {
      background: #fff;
      border-radius: 4px;
    }
  }

  .search-data-box {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  /**/

  .comp-page {
    width: 100%;
    background: #e6e6e6;
    padding: 10px 0 0;
    overflow: hidden;
  }

  .box-queue {
    /* display: flex; */
    padding: 0 10px;
    margin-bottom:0;
    .item{
      width:calc(50% - 5px);
      float:left;
      background: #fff;
      line-height: 36px;
      margin-bottom: 10px;
      text-align: center;
      &.active{
        background: #ccc
      }
      &:nth-of-type(odd){
        margin-right: 10px;
      }
    }

  }
  .box-flex {
    /* display: flex; */
    padding: 0 10px;
    .item{
      width:100%;
      float:left;
      background: #fff;
      line-height: 36px;
      text-align: center;
    }

  }


  .default-box {
    line-height: 32px;
    overflow: hidden;
    padding: 0 10px;
    font-size: 12px;
    margin-bottom: 10px;
    .left-item {
      float: left;
      width: 50%;
    }
    .right-item {
      float: right;
    }
  }
</style>