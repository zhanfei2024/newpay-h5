<template>
  <div class="bg-grey merchant-manage">
    <my-header fixed title="商户管理">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </my-header>
    <mt-navbar style="position: fixed;top: 40px; left: 0;right: 0;z-index: 1111;border-bottom:1px solid #ccc">
      <mt-tab-item id="1" @click.native="fnPopupShow">
        <span>审核状态</span>
        <my-icon href="arrow-down" size="16" style="fill:#a6a4a4"></my-icon>
      </mt-tab-item>
      <mt-tab-item id="2" @click.native="orderByShow">
        <span>申请时间</span>
        <my-icon href="arrow-down" size="16" style="fill:#a6a4a4"></my-icon>
      </mt-tab-item>
      <my-search-box id="searchShow" autofocus ref="searchShow" @click.native="fnSearchShow"></my-search-box>
    </mt-navbar>
    <div style="height:46px"></div>

    <!-- <my-search v-show="searchPopup" v-model="keyword" style="height:auto;background: #fff;" cancel-text="取消" placeholder="搜索">
    </my-search> -->
    <my-search-static :style="searchPopup ? 'opacity:1':'opacity:0;margin-top:-52px;position:relative;z-index:-1;'" ref="search" v-model="keyword"  cancel-text="取消" placeholder="搜索">
    </my-search-static>
    <!-- <my-search-static ref="search" style="height:auto" cancel-text="取消" placeholder="搜索"></my-search-static> -->
    <!-- <div class="between-popup-box">
      <between-date ref="betweenDate" :startDate="startDate" :endDate="endDate" @startPopup="fnStartDateShow" @endPopup="fnEndDateShow"></between-date>
      <div class="v-modal" style="z-index:1000;" v-show="modalStatus" @click="betweenDateShow"></div>
    </div> -->
    <my-block></my-block>

    <!-- 商户列表显示开始 -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="page-infinite-list">
      <user-info to="merchant-info" v-for="item,index in merchantList" :key="index" :item="item"></user-info>
    </div>
    <p :class="'page-infinite-loading'+(loadEnd?'-no':'')">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
    <div class="none-data" v-if="merchantList.length==0&&propstatus">
      <img src="~assets/no-info.png" alt="">
    </div>
    <!-- 商户列表显示结束 -->
    <!-- <mt-cell title="商户名称" :value="data.value"></mt-cell> -->
    <mt-datetime-picker ref="startDate" v-model="startDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <mt-datetime-picker ref="endDate" v-model="endDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <my-bottom-popup ref="bottomPopups" align="right" v-model="popupValue" :options="types">
    </my-bottom-popup>
    <my-bottom-popup ref="orderByPopups" align="right" v-model="orderBy" :options="orderByTypes">
    </my-bottom-popup>
  </div>
</template>
<script>
  import handle from './handle.vue'
  import userInfo from '../commons/user-info-item.vue'
  import betweenDate from '../commons/between-date.vue'
  const orderByTypes = [{
      label: '申请时间从新到旧',
      value: 'createTime-desc'
    },
    {
      label: '申请时间从旧到新',
      value: 'createTime-asc'
    },
    {
      label: '开通时间从新到旧',
      value: 'updateTime-desc'
    },
    {
      label: '开通时间从旧到新',
      value: 'updateTime-asc'
    },
  ]
  export default {
    data() {
      return {
        autofocus:true,
        data: {
          value: '深圳同天下科技有限公司',
        },
        searchPop: false,
        types: [{
          label: '未审核',
          value: 0
        }, {
          label: '服务商审核中',
          value: 1
        }, {
          label: '支付机构审核中',
          value: 2
        }, {
          label: '已通过',
          value: 3
        }, {
          label: '未通过',
          value: -1
        }, {
          label: '被锁定',
          value: -2
        }],
        moneyTypes: ['收款时间从新到旧', '收款时间从旧到新', '收款金额从大到小', '收款金额从小到大'],
        popupValue: '',
        propstatus: false, //是否是请求数据后的状态 防止刚进页面就会显示无数据的图片
        modalStatus: false, //搜索时间开关状态
        searchPopup: false,
        orderBy: '',
        orderByTypes: orderByTypes,
        keyword: '',
        showEnd: false,
        loadEnd: true, //false加载中  true 加载完毕
      };
    },
    computed: {
      merchantList() {
        return this.$store.getters['merchant/merchantList']
      },
      query() {
        return this.$store.getters['merchant/merchantQuery']
      }
    },
    components: {
      'my-handle': handle,
      userInfo,
      betweenDate,
    },
    // updated(){
    //   if(this.searchPopup===true){
    //     document.getElementById('searchInput').focus()
    //   }
    // },
    mounted() {
      this.$store.dispatch('merchant/clearMerchant')
      this.fnReqMerchant()
      // let _this=this
      // document.getElementById('searchShow').onclick=function(){
      //   document.getElementById('searchInput').focus()
      //   _this.searchPopup=!_this.searchPopup
      // }
      // document.getElementById('searchShow').click()

      // this.$store.dispatch('merchant/request_merchant').then(res => {
      //   this.propstatus = true;
      // })
    },
    watch: {
      popupValue(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('merchant/clearMerchant')
          this.fnReqMerchant()
        }
      },
      orderBy(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('merchant/clearMerchant')
          this.fnReqMerchant()
        }
      },
      keyword(val, oldVal) {
        if (val !== oldVal) {
          this.$store.dispatch('merchant/clearMerchant')
          this.fnQueryMerchant(this.fnReqMerchant)
        }
      }
    },
    methods: {
      fnReqMerchant(loadmore) {
        let arg = {};
        arg.keyword = this.keyword
        this.loadEnd = !this.loadEnd;
        if (this.popupValue !== '') {
          arg.merchantStatus = this.popupValue
        }
        if (this.orderBy !== '') {
          arg.orderBy = this.orderBy.split('-')[0]
          arg.order = this.orderBy.split('-')[1]
        }
        if (loadmore) { //加载更多  上拉加载
          arg.pageNo = this.query.pageNo++
        }
        this.$store.dispatch('merchant/request_merchant', arg).then(res => {
          this.propstatus = true;
          this.loadEnd = !this.loadEnd;
          if (loadmore) {
            this.showEnd = res
          }
        })
      },
      loadMore() {
        this.fnReqMerchant(true)
      },
      fnQueryMerchant(method,context){
        clearTimeout(method.Id)
        method.Id=setTimeout(()=>{
          method.call(context)
        },350)
      },
      fnPopupShow() {
        this.$refs.bottomPopups.open();
      },
      fnEndDateShow() {
        this.$refs.endDate.open();
      },
      fnStartDateShow() {
        this.$refs.startDate.open();
      },
      orderByShow() {
        this.$refs.orderByPopups.open()
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
</style>
<style lang="css" scoped>
  span,
  svg {
    vertical-align: middle;
  }
</style>