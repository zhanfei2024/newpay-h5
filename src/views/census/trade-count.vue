<template>
  <div>
    <my-center-header>
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
      <div class="my-center-title single-over" slot="center" @click="searchClick">
        <span>{{title}}</span>
        <my-icon href="arrow-down" style="height:14px;width:14px;fill:#fff"></my-icon>
      </div>
    </my-center-header>
    <div style="height: 40px"></div>
    <!-- <trade-table style="background: #fff"></trade-table> -->
    <div class="all-title" v-show="allTitlePopup" @click="fnCheckAll">
      全部商户
    </div>
    <div class="jiaoyi-content" style="background: #fff;">
      <div class="box-merchant-money" @click="fnGoTotal">
        <div class="money-item">
          <div class="item-top">￥{{tradeTotal.totalAmount | cny}}</div>
          <!-- <div class="item-top">111元</div> -->
          <div class="item-bottom">交易总额</div>
        </div>
        <div class="money-item">
          <div class="item-top">￥{{tradeTotal.totalProfitAmount}}</div>
          <!-- <div class="item-top">222元</div> -->
          <div class="item-bottom">分润总额</div>
        </div>
      </div>
    </div>
    <div class="default-box">
      <div class="left-item">
        交易额趋势
      </div>
      <div class="right-item" @click="fnDateShow">
        <span>
          {{selectVal}}
          <my-icon href="arrow-down" size="16" style="fill:grey"></my-icon>
        </span>

      </div>
    </div>
    <div class="popup-box">
      <mt-popup v-model="searchDatePop" class="my-popup" popup-transition="popup-fade" position="left">
        <div class="query-box">
          <div class="left-item">
            <div :class="searchSelect ==index ? 'item active':'item'" v-for="item,index in searchData.tab" @click="fnSearchSelect(index)">{{item}}</div>
          </div>
          <div class="right-item">
            <div class="page-picker-wrapper" v-if="searchSelect==0">
              <mt-picker :slots="searchData.value[0]" @change="onProgerssChange" :visible-item-count="3"></mt-picker>
            </div>
            <div class="item" @click="fnSearchSelect">确认</div>
          </div>
        </div>
      </mt-popup>
    </div>
    <!-- 等路由渲染的页面dom渲染完成后再加载此组件 -->
    <chart v-if="query.chartStatus" :options="options"></chart>
    <div class="tongji-title">
      <div class="tongji-title-item">日期</div>
      <div class="tongji-title-item">总收金额</div>
      <div class="tongji-title-item">分润金额</div>
    </div>
    <div class="tongji-value" v-for="item in cycleList" @click="fnGo(item)">
      <div class="tongji-value-item">{{item.title}}</div>
      <div class="tongji-value-item">￥{{item.totalAmount | wan}}</div>
      <div class="tongji-value-item">￥{{item.totalProfitAmount | cny}}</div>
      <!-- <div class="tongji-value-item">12月</div>
      <div class="tongji-value-item">201万</div>
      <div class="tongji-value-item">1.00</div> -->
    </div>
    <div class="none-data" v-if="cycleList.length==0&&status">
      <img src="~assets/no-info.png" alt="">
    </div>
    <mt-header title="选择商户" v-show="searchPopupStatus" fixed style="z-index:2100">
      <a slot="left">
        <mt-button icon="back" @click="searchPopupStatus=!searchPopupStatus">返回</mt-button>
      </a>
    </mt-header>

    <mt-popup v-model="searchPopupStatus" popup-transition="popup-fade" position="left" class="my-popup-right">
      <div style="height:40px"></div>
      <mt-search class="my-search" v-model="query.keyword" show autofocus cancel-text="取消" placeholder="搜索">
        <mt-cell :title="item.merchantName" @click.native="fnSelectMerchant(item)" :key="index" v-for="item,index in searchMerchant">
        </mt-cell>
      </mt-search>
    </mt-popup>
    <!-- <mt-datetime-picker ref="startDate" v-model="query.startDate" type="date" year-format="{value} 年" month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker> -->
  </div>
</template>
<script>
  var options = {
    // title:{
    //   text:'交易额趋势'
    // },
    legend: {
      // data:[{name:'交易金额',textStyle:{color:'#333'}}],
      // backgroundColor:'#ccc'
    },
    color: ['#999'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value',
    }],
    series: [{
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      // data: [10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330]
      data: []
      // data:[0,0,0,0,0,0,0,0,0,0,0,0]
    }]
  };
  var option = {}
  import tongjiTable from '../commons/tongji-table.vue'
  import chart from '../demo-chart.vue'
  export default {
    name: "component_name",
    data() {
      return {
        merchantData: [{
            title: '标题1'
          },
          {
            title: '标题2'
          },
          {
            title: '标题3'
          },
        ],
        keyword: '',
        searchPopupStatus: false,
        searchDatePop: false,
        searchSelect: 0,
        selectVal: new Date().getFullYear(),
        // options: option,
        allTitlePopup:false,
        status:false,
        // rightData:['2017']
      };
    },
    computed: {
      query() {
        return this.$store.getters['census/tradeCountQuery']
      },
      tradeQuery() {
        return this.$store.getters['trade/query']
      },
      title(){
        return this.$store.getters['census/title']
      },
      options(){
        return this.$store.getters['census/chartOption']
      },
      searchMerchant(){
        return this.$store.getters['census/searchMerchant']
      },
      merchantList() {
        return this.$store.getters['census/merchantList']
      },
      cycleList() {
        return this.$store.getters['census/cycleList']
      },
      tradeTotal() {
        return this.$store.getters['census/tradeTotal']  //商户交易总额
      },
      cycleDateStatus() {
        return this.$store.getters['census/cycleDateStatus']
      },
      cycleStatus(){
        return this.$store.getters['census/cycleListStatus']
      },
      searchData() {
        let arr, year
        year = new Date().getFullYear()
        arr = [year - 2, year - 1, year]
        return {
          tab: ['年份'],
          value: [
            [{
              flex: 1,
              values: arr,
              className: 'slot1',
              defaultIndex: arr.indexOf(year)
            }],
          ]
        }
      },
    },
    watch:{
      'query.keyword'(val){
        this.fnQueryMerchant(this.fnRequestMerchant)
      }
    },
    mounted(){
      if(this.cycleList.length===0&&this.cycleStatus!=='trade'){
        this.$store.dispatch('census/change_cycleListStatus','trade')
        this.fnRequestData()
      }
    },
    methods: {
      fnRequestData(bool) {
        let arg = {}
        let startDate
        let endDate, type, payType, pageSize, storeId, merchantId
        merchantId = this.query.merchantId || null
        storeId = null
        payType = null
        type = 'M'
        // if (this.cycleDateStatus) {
        startDate = this.selectVal + '-01-01 00:00:00'
        endDate = this.selectVal + '-12-31 23:59:59'
        // }

        const cycleObj = {
          // userId: "100001",
          merchantId: merchantId,
          startDate: startDate,
          endDate: endDate,
          type: type,
          storeId: storeId,
          payType: payType,
          pageSize: 100,
        }
        this.$store.dispatch('census/change_cycleList', cycleObj).then(res => {
          this.status=true
          if(res.success ===false){
            return
          }
          res=res.data.rows
          if(res.length===0){
            this.query.chartStatus=false
            return
          }
          this.query.chartStatus=true  
          let seriesData = []
          res.forEach(x => {
            seriesData.push(x.totalAmount)
          })
          console.log('seriesdata:',options)
          options.series[0].data = seriesData
          this.$store.dispatch('census/change_chartOption',options)
          console.log('this.options',this.options)
          // this.options = options
        })
      },
      onProgerssChange(picker, val) {
        this.selectVal = val[0]
      },
      searchClick() {
        let title='全部商户'
        if(this.title!==title){
          this.allTitlePopup=true
          return
        }
        this.fnRequestMerchant()
        this.searchPopupStatus = !this.searchPopupStatus
      },
      fnQueryMerchant(method,context){
        console.log(1111)
        clearTimeout(method.Id)
        method.Id=setTimeout(()=>{
          method.call(context)
        },300)
      },
      fnRequestMerchant(arg) {
        let merchantName = this.query.keyword || ''
        let dataObj = {
          "limit": 100, //每页条数
          "offset": 0, //当前页。
          "in": {
            "merchantStatus":undefined  //状态
          },
          "like": {
            "merchantName": merchantName,
          },
          orderBy: '',
          order: '',
        };
        dataObj.in = JSON.stringify(dataObj.in);
        dataObj.like = JSON.stringify(dataObj.like);

        this.$http.post(
          "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/getMerchantList",
           {
            params: dataObj
          }, 
          {
            emulateJSON: true
          }
        ).then(res => {
          if(res.body.success){
            let body=res.body.data.rows;
            // let body=res.body.values.result;
            console.log(body)
            this.$store.dispatch('census/change_searchMerchant',body)
          }else{
            this.$toast(res.body.msg || '数据异常')
          }

        })
      },
      fnCheckAll(){
        this.$store.dispatch('census/change_title',"全部商户")
        this.query.merchantId = null
        this.allTitlePopup = false
        this.fnRequestData()
      },
      fnSelectMerchant(arg){
        this.query.merchantId=arg.merchantId
        // this.title=arg.merchantName
        this.$store.dispatch('census/change_title',arg.merchantName)
        this.searchPopupStatus = false
        this.fnRequestData()
      },
      fnSearchSelect(i) {
        if (i == 1) {
          this.searchDatePop = false;
        }
        this.$store.dispatch('census/change_cycleDateStatus', true)
        this.searchDatePop = false;
        this.fnRequestData()
        // this.searchSelect = i;
      },
      fnDateShow() {
        console.log(1111)
        this.searchDatePop = !this.searchDatePop
      },
      fnNext(item){
        this.$router.push({name:'trade-info',query:{id:item.merchantId,name:'merchant'}})
      },
      fnGo(item){
        let years= this.selectVal
        if(item.title.indexOf('月')>-1){
          let month=item.title.split('月')[0]
        }
        this.tradeQuery.startDate =moment(years+'-'+month+'-1').startOf('month').format("YYYY-MM-DD")
        this.tradeQuery.endDate =moment(years+'-'+month+'-1').endOf('month').format("YYYY-MM-DD")
        this.fnNext(item)
      },
      fnGoTotal(){
        let years= this.selectVal
        this.tradeQuery.startDate =moment(years+'-1-1').startOf('month').format("YYYY-MM-DD")
        this.tradeQuery.endDate =moment(years+'-12-1').endOf('month').format("YYYY-MM-DD")
        this.fnNext({merchantId:this.query.merchantId})
      }
    },
    components: {
      tongjiTable,
      chart,
    },

  }
</script>
<style lang="scss" scoped>
  .my-center-title {
    span,
    svg {
      vertical-align: middle;
    }
  }

  .my-popup {
    width: 100%;
    transform: initial;
    position: absolute;
  }
</style>
<style lang="css">
  .all-title{
    position: absolute;
    top:40px;
    left: 0;
    right: 0;
    line-height: 44px;
    text-align: center;
    z-index: 100;
    font-size: 0.26rem;
    border-bottom: 1px solid #ccc;
    background: #fff;
  }
  .popup-box {
    position: relative;
  }

  .popup-box .v-modal {
    opacity: 0;
  }

  svg,
  span {
    vertical-align: middle;
  }

  .my-search .mint-search-list {
    padding-top: 92px;
    background: #f4f4f4;
  }

  .my-popup-right {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: var(--background-color);
  }

  .my-search .mint-searchbar {
    position: fixed;
    width: 100%;
  }

  .my-search .mint-search-list {
    padding-top: 92px;
  }

  .mint-searchbar-core {
    width: 100%;
  }
</style>