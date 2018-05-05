<template>
  <div>
    <my-header fixed title="门店排行">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <mt-navbar class="my-tab-item">
      <mt-tab-item id="1" @click.native="betweenVisible=!betweenVisible">
        <span>收款时间</span>
        <my-icon href="arrow-down" style="width:16px;height: 16px;fill:#a6a4a4"></my-icon>
      </mt-tab-item>
      <mt-tab-item id="2" @click.native="fnMoneyShow()">
        <span>收款金额</span>
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
      <div class="v-modal" style="z-index:1000;" v-show="betweenVisible" @click="betweenDateHide"></div>
    </div>
    <my-block></my-block>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="page-infinite-list">
      <div class="box-items-info door" v-for="item in storeList" @click="fnGo(item,'door-trade-list')">
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
    <div v-if="storeList" :class="'loadmore-end'+((showEnd&&loadEnd)?'':'-no')">我是有底线的</div>
    <div class="none-data" v-if="storeList.length==0&&loadEnd">
      <img src="~assets/no-info.png" alt="">
    </div>
    <mt-datetime-picker ref="startDate" v-model="query.startDate" type="date" year-format="{value} 年" month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <mt-datetime-picker ref="endDate" v-model="query.endDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <mt-popup v-model="moneyTypePop" position="bottom" class="my-popup">
      <div class="item half-border-bottom" @click="fnMoneyTypeSelect(item)" v-for="item in moneyTypes">
        {{item}}
      </div>
    </mt-popup>
  </div>
</template>
<script>
  // import searchData from '../../commons/search-data.vue'
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
        DateTimeValue: new Date(),
        moneyTypePop: false,
        moneyTypeSelect: '',
        orderByTypes,
        orderBy: '',
        betweenVisible: false,
        searchPopup: false,
      };
    },
    watch: {
      orderBy(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('census/clearStore')
          this.query.orderBy = val.split('-')[0]
          this.query.order = val.split('-')[1]
          this.fnRequestData()
        }
      },
      'query.keyword'(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('census/clearStore')
          this.fnKeyword(this.fnRequestData)
        }
      },
    },
    computed: {
      moneyTypes() {
        let val = ['收款金额从大到小', '收款金额从小到大'];
        return val
      },
      storeList() {
        return this.$store.getters['census/storeList']
      },
      actualAmount() {
        let actualAmount = this.storeList.totalAmount - this.storeList.totalFeeAmount
        return actualAmount
      },
      query() {
        return this.$store.getters['census/storeQuery']
      },
      //是否启用时间搜索状态
      searchDateStatus() {
        return this.$store.getters['census/storeDateStatus']
      },
    },
    created() {
      this.$store.dispatch('census/clearStore')
      this.query.groupBy = "storeId"
      this.fnRequestData(true)
    },
    methods: {
      fnRequestData(bool) {
        let arg =this.query
        this.loadEnd = !this.loadEnd;
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
          // if (!x.success) {
          //   this.$toast(x.msg)
          // }
        })
      },
      loadMore() {
        if (this.loadEnd && !this.showEnd) {
          this.loadEnd = !this.loadEnd;
          let arg = this.query
          arg.pageNo = this.query.pageNo ++
          this.$store.dispatch('census/request_merchant', arg).then(x => {
            this.showEnd = x
            this.loadEnd = !this.loadEnd;
          })

        }
      },
      fnGo(item,url){
        this.$router.push({name:'trade-info',query:{id:item.storeId,name:'store'}})
      },
      fnMoneyShow() {
        this.moneyTypePop = true;
      },
      fnStartDateShow() {
        this.$refs.startDate.open()
      },
      fnEndDateShow() {
        this.$refs.endDate.open()
      },
      betweenDateHide() {
        this.betweenVisible = false
      },
      fnMoneyTypeSelect(item) {
        this.moneyTypeSelect = item;
        this.moneyTypePop = false;
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
          method.call(context)
        },350)
      },
      searchData() {
        this.$store.dispatch('census/change_storeDateStatus', true)
        this.$store.dispatch('census/clearStore')
        this.betweenVisible = false
        this.fnRequestData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .my-popup {
    width: 100%;
    .item {
      background: #fff;
      position: relative;
      padding-left: 10px;
      line-height: 40px;
      text-align: left;
      font-size: 13px;
    }
  }
</style>