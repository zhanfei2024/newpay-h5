<template>
  <div>
    <my-header fixed title="商户信息">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <div class="">
      <mt-navbar v-model="selected" style="position: fixed;top: 40px; left: 0;right: 0;z-index: 1111;">
        <mt-tab-item v-if="merchantSelect.merchantStatus==3" id="1">商户统计</mt-tab-item>
        <mt-tab-item id="2">商户详情</mt-tab-item>
        <mt-tab-item v-if="merchantSelect.merchantStatus==3" id="3">门店列表</mt-tab-item>
      </mt-navbar>
      <div style="height:46px"></div>
      <!-- tab-container -->
      <div style="height:2px;background: #ddd"></div>
      <mt-tab-container v-model="selected">
        <!-- 商户统计 -->
        <mt-tab-container-item id="1" v-if="merchantSelect.merchantStatus==3">
          <div class="box-merchant-money">
            <div class="money-item">
              <div class="item-top">{{tradeTotal.totalAmount}}元</div>
              <!-- <div class="item-top">111元</div> -->
              <div class="item-bottom">交易总额</div>
            </div>
            <div class="money-item">
              <div class="item-top">{{tradeTotal.totalProfitAmount}}元</div>
              <!-- <div class="item-top">222元</div> -->
              <div class="item-bottom">分润总额</div>
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
          <!-- <user-info></user-info> -->
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
        </mt-tab-container-item>
        <!-- 商户详情 -->
        <mt-tab-container-item id="2">
          <merchant-detail :dataObj="merchantSelect"></merchant-detail>
        </mt-tab-container-item>
        <!-- 门店列表 -->
        <mt-tab-container-item id="3" v-if="merchantSelect.merchantStatus==3">
          <user-info to="merchant-store" :rows="storeList"></user-info>
          <!-- <user-info></user-info> -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import userInfo from '../commons/store-info-item.vue'
  import merchantDetail from './components/merchant-detail.vue'
  import tongjiTable from './components/merchant-tongji-table.vue'
  import chart from '../demo-chart.vue'
  var options = {
    title: {
      text: '收款金额',
      // top: 'bottom',
      // left: 'right',
      right:'5px',
      bottom:'5px',
      textStyle:{
        color:'#999',
        fontSize:'16px',
      }
    },
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
      bottom: '10%',
      top:'8%',
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
  export default {
    name: "component_name",
    data() {
      return {
        selected: '1',
        selectVal: new Date().getFullYear(),
        searchDatePop: false,
        searchSelect: 0,
      };
    },
    computed: {
      merchantSelect() {
        return this.$store.getters['merchant/merchantSelect']
      },
      merchantList() {
        return this.$store.getters['merchant/merchantList']
      },
      storeList() {
        return this.$store.getters['census/storeList']
      },

      options() {
        return this.$store.getters['census/chartOption']
      },
      query() {
        return this.$store.getters['merchant/tradeCountQuery']
      },
      cycleList() {
        return this.$store.getters['census/merchantCycleList']
      },
      tradeTotal() {
        return this.$store.getters['census/tradeTotal'] //商户交易总额
      },
      cycleStatus() {
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
      }
    },
    mounted() {
      window.scroll(0, 0)
      if (this.merchantSelect.merchantStatus != 3) {
        this.selected = '2'
      } else {
        this.selected = '1'
      }
      if (this.selected == '1') {
        let reqStatus = this.merchantSelect.merchantId === this.query.merchantId && this.cycleStatus === 'merchant'
        if (!reqStatus) {
          this.$store.dispatch('census/change_cycleListStatus', 'merchant')
          // 记录本次商户Id 下次进入页面时与其判断是否需要再次请求统计接口
          this.query.merchantId = this.merchantSelect.merchantId
          this.fnRequestData()
        }
      }
      // if(this.cycleList.length===0&&this.cycleStatus!=='merchant'){
      //   this.$store.dispatch('census/change_cycleListStatus','merchant')
      //   this.fnRequestData()
      // }
    },
    watch: {
      selected(val) {
        console.log('val:', val)
        if (val == '3') {

          if (this.storeList.length === 0) {

            this.fnRequestStore()
          }
        }
      }
    },
    methods: {
      fnRequestData(bool) {
        let arg = {}
        let startDate
        let endDate, type, payType, pageSize, storeId, merchantId
        merchantId = this.merchantSelect.merchantId || null
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
          this.status = true
          if (res.success === false) {
            return
          }
          res = res.data.rows
          if (res.length === 0) {
            this.query.chartStatus = false
            return
          }
          this.query.chartStatus = true
          let seriesData = []
          res.forEach(x => {
            seriesData.push(x.totalAmount)
          })
          console.log('seriesdata:', options)
          options.series[0].data = seriesData
          this.$store.dispatch('census/change_chartOption', options)
          console.log('this.options', this.options)
          // this.options = options
        })
      },
      fnRequestStore(bool) {
        let arg = {}
        arg.groupBy = "storeId"
        // this.loadEnd = !this.loadEnd;
        arg.merchantId = this.merchantSelect.merchantId
        this.$store.dispatch('census/request_merchant', arg).then(x => {
          // this.loadEnd = !this.loadEnd;
          // if (!x.success) {
          //   this.$toast(x.msg)
          // }
        })
      },
      fnRequestMerchant(arg) {
        // let merchantName = this.query.keyword || ''
        let dataObj = {
          "limit": 100, //每页条数
          "offset": 0, //当前页。
          "in": {
            "merchantStatus": undefined //状态
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
          "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/getMerchantList", {
            params: dataObj
          }, {
            emulateJSON: true
          }
        ).then(res => {
          if (res.body.success) {
            let body = res.body.data.rows;
            // let body=res.body.values.result;
            console.log(body)
            this.$store.dispatch('census/change_searchMerchant', body)
          } else {
            this.$toast(x.msg || '数据异常')
          }
        })
      },
      onProgerssChange(picker, val) {
        this.selectVal = val[0]
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
        this.searchDatePop = !this.searchDatePop
      },
      fnGo(item) {
        let query = this.$store.getters['trade/query'];
        query.startDate = moment(item.payTime).startOf('month').format("YYYY-MM-DD HH:mm:ss")
        query.endDate = moment(item.payTime).endOf('month').format("YYYY-MM-DD HH:mm:ss")
        this.$router.push({
          name: 'trade-info',
          query: {
            id: item.merchantId,
            name: 'merchant'
          }
        })
      },
    },
    components: {
      userInfo,
      merchantDetail,
      tongjiTable,
      chart,
    }
  }
</script>
<style lang="css">
  .popup-box {
    position: relative;
  }

  .popup-box .v-modal {
    opacity: 0;
  }
</style>
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

  .box-merchant-money {
    position: relative;
    display: flex;
    background: #fff;

    .money-item {
      flex: 1;
      text-align: center;
      .item-top {
        font-size: 18px;
        font-weight: 700;
        padding: 10px 0 2px;
        color: #505050;
      }
      .item-bottom {
        font-size: 12px;
        color: #909090;
        line-height: 18px;
        padding-bottom: 5px;
        transform: scale(0.8);
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 50%;
      width: 1px;
      transform: translate(50%, 0, 0);
      background: #d9d9d9;
    }
  }
</style>