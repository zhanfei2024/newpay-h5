<template>
  <div>
    <my-header fixed title="商户收款排行">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <mt-navbar class="my-tab-item">
      <mt-tab-item id="1" @click.native="betweenVisible=!betweenVisible">
        <span>收款时间</span>
        <my-icon href="arrow-down" style="width:16px;height: 16px;fill:#a6a4a4"></my-icon>
      </mt-tab-item>
      <mt-tab-item id="2" @click.native="fnPopupShow">
        <span v-text="popupValue || '收款金额'"></span>
        <my-icon href="arrow-down" style="width:16px;height: 16px;fill:#a6a4a4"></my-icon>
      </mt-tab-item>
      <my-search-box @click.native="fnSearchShow"></my-search-box>
    </mt-navbar>
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
    <my-block></my-block>
    <!-- <div @click="fnGo({storeId:'1111'},'merchant-trade-list')">111111111fdsafafadsfsa</div> -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="page-infinite-list">
      <div class="box-items-info merchant" v-for="item in merchantList" @click="fnGo(item,'merchant-trade-list')">
        <div class="title">{{item.licenseName}}</div>
        <div class="body">
          <div class="item">
            <div class="left-item">总款收金额：</div>
            <div class="right-item first-item">{{item.totalAmount}}元</div>
          </div>
          <div class="item">
            <div class="left-item">分润金额：</div>
            <div class="right-item">{{item.totalProfitAmount}}元</div>
          </div>
          <div class="item">
            <div class="left-item">实收金额：</div>
            <div class="right-item">{{ item.totalAmount-item.totalProfitAmount }}元</div>
          </div>
          <div class="item">
            <div class="left-item">创建者：</div>
            <div class="right-item">{{ item.contactName }}</div>
          </div>
          <div class="item">
            <div class="left-item">开通时间：</div>
            <div class="right-item">2010-10-10 19：19</div>
          </div>
        </div>
      </div>
    </div>
    <p :class="'page-infinite-loading'+(loadEnd?'-no':'')">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
    <div v-if="merchantList.length!==0" :class="'loadmore-end'+((showEnd&&loadEnd)?'':'-no')">我是有底线的</div>
    <div class="none-data" v-if="merchantList.length===0&&loadEnd">
        <img src="~assets/no-info.png" alt="">
      </div>
    <mt-datetime-picker ref="startDate" v-model="query.startDate" type="date" year-format="{value} 年" month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <mt-datetime-picker ref="endDate" v-model="query.endDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <my-bottom-popup ref="bottomPopup" align="right" v-model="orderBy" :options="orderByTypes"></my-bottom-popup>
  </div>
</template>
<script>
  let orderByTypes = [
    // {
    //   label: '收款时间从新到旧',
    //   value: 'createTime-desc'
    // },
    // {
    //   label: '收款时间从旧到新',
    //   value: 'createTime-asc'
    // },
    {
      label: '收款金额从大到小',
      value: 'totalAmount-desc'
    },
    {
      label: '收款金额从小到大',
      value: 'totalAmount-asc'
    },
  ];
  export default {
    name: "component_name",
    data() {
      return {
        showEnd: false,
        loadEnd: true, //false加载中  true 加载完毕
        orderByTypes,
        popupValue: '',
        searchPopup: false,
        DateTimeValue: new Date(),
        // merchantList,
        betweenVisible: false,
        orderBy: '',

      };
    },
    created() {
      this.$store.dispatch('census/clearMerchant')
      this.query.groupBy = "merchantId"
      this.fnRequestData(true)
    },
    watch: {
      orderBy(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('census/clearMerchant')
          this.query.orderBy = val.split('-')[0]
          this.query.order = val.split('-')[1]
          this.fnRequestData()
        }
      },
      'query.keyword'(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('census/clearMerchant')
          this.fnKeyword(this.fnRequestData)
        }
      },
    },
    computed: {
      merchantList() {
        return this.$store.getters['census/merchantList']
      },
      //是否启用时间搜索状态
      searchDateStatus() {
        return this.$store.getters['census/searchDateStatus']
      },
      actualAmount() {
        // let actualAmount = this.merchantList.totalAmount - this.merchantList.totalFeeAmount
        // return actualAmount
      },
      query() {
        return this.$store.getters['census/merchantQuery']
      },

    },
    methods: {
      fnPopupShow() {
        let popupValue = this.popupValue
        this.$refs.bottomPopup.open()
      },
      fnRequestData(bool) {
        let arg = this.query
        this.loadEnd = !this.loadEnd
        // if (!bool) {
        //   if (this.searchDateStatus) {
        //     arg.payedTimeStart = DateFmt(this.query.startDate, 'yyyy-MM-dd') + ' 00:00:00'
        //     arg.payedTimeEnd = DateFmt(this.query.endDate, 'yyyy-MM-dd') + ' 23:59:59'
        //   }
        //   if (this.orderBy !== '') {
        //     console.log('this.orderBy:', this.orderBy)
        //     arg.orderBy = this.orderBy.split('-')[0]
        //     arg.order = this.orderBy.split('-')[1]
        //   }
        // }
        this.$store.dispatch('census/request_merchant', arg).then(x => {
          this.loadEnd = !this.loadEnd;
        })
      },
      loadMore() {
        if (this.loadEnd && !this.showEnd) {
          this.loadEnd = !this.loadEnd
          let arg = this.query
          arg.pageNo = this.query.pageNo ++
          this.$store.dispatch('census/request_merchant', arg).then(x => {
            this.showEnd = x
            this.loadEnd = !this.loadEnd;
            // if (!x.success) {
            //   this.$toast(x.msg)
            // }
          })

        }
      },
      fnGo(item, url) {
        // this.$router.push({
        //   name: url,
        //   query: {
        //     id: item.merchantId
        //   }
        // })
        this.$router.push({name:'trade-info',query:{id:item.merchantId,name:'merchant'}})
      },
      //时间搜索显示
      fnStartDateShow() {
        this.$refs.startDate.open()
      },
      fnEndDateShow() {
        this.$refs.endDate.open()
      },
      fnDateShow() {
        // this.betweenVisible = !
      },
      betweenDateShow() {
        this.betweenVisible = false
      },
      fnSearchShow(){
        this.searchPopup=!this.searchPopup
        if(this.searchPopup){
          this.$refs.search.open()
        }else{
          this.$refs.search.blur()
        }
      },
      fnKeyword(method,context){
        clearTimeout(method.Id)
        method.Id=setTimeout(()=>{
          this.$store.dispatch('merchant/clearMerchant')
          method.call(context)
        },350)
      },
      searchData() {
        this.$store.dispatch('census/clearMerchant')
        this.$store.dispatch('census/change_searchDateStatus', true)
        this.fnRequestData()
      },
    }
  }
</script>
<style lang="scss" scoped>
  .box-items-info .body .item .first-item {
    font-size: 0.32rem;
  }
</style>