<template>
  <div class="height-all bg-white">
    <my-header title="动态" fixed>
    </my-header>

    <div class="action-page">
      <div class="action-page-wrapper">
        <div class="action-item">
          <router-link :to="'/merchant-apply'" class="action-title clearfix">
              <i class="material-icons icon iconfont">domain</i>
              <span class="user-info">
                <span class="nick-name">我是用户昵称</span>
                <span class="user-commit">提交了</span>
              </span>
              <a class="commit-title">开通申请</a>
          </router-link>
          <router-link :to="'/merchant-apply'" class="action-content-wrapper">
            <div class="action-content">
              <p class="merchant-name">{{test | slice}}</p>
              <p class="merchant-info">
                <span class="merchant-location">地区：广东&nbsp;|&nbsp;深圳</span>  
                <span class="apply-time">2017-01-10 &nbsp;19：45</span>
              </p>          
            </div>
            <div class="reload-more">
              <i class="material-icons icon iconfont">chevron_right</i>
            </div>
          </router-link>

        </div>
      </div>

    </div>

    <my-naviget-tab selected="action"></my-naviget-tab>
  </div>
</template>
<script>
  import myNavigetTab from './commons/navigate-tab.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'action',
    data() {
      return {
        test: '我是商户名称我是商户名称'
      }
    },
    components:{
      myNavigetTab
    },
    computed: mapGetters({
        merchants: 'merchantList'
    }),
    // methods: mapActions([
    //   // 'setMerchants'
    // ]),
    created() {
      this.$store.dispatch('request_merchant')
      console.log(this.merchants, '-----------')
    },
  }
</script>

<style lang="scss" scoped>
@import './action.scss';
</style>