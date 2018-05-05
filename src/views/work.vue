<template>
  <div class="height-all bg-white">
    <!-- <my-header title="首页" fixed>
    </my-header> -->
    <div>
      <div class="home-mine-block">
        <!-- <div class="home-img">
          <svg class="icon" aria-hidden="true" slot="icon" style="height:100%;width:100%;fill:#26a2ff;">
            <use xlink:href="#icon-gongzuotai"></use>
          </svg>
        </div> -->
          <div class="user-name">嘿嘿</div>
          <!-- <div>登录账号：嘿嘿</div> -->
        <i class="arrow-right"></i>
      </div>
      <div class="page-part">
        <my-block style="padding-top:0;" left>模块列表</my-block>
        <my-block></my-block>
        <my-grid>
          <my-grid-item to="/user">
            <my-icon slot="icon" href="yonghuguanli"></my-icon>
            用户管理
          </my-grid-item>
          <my-grid-item to="/merchant">
            <my-icon slot="icon" href="shanghu"></my-icon>
            商户管理
          </my-grid-item>
        </my-grid>
      </div>
    </div>
    <my-naviget-tab selected="work"></my-naviget-tab>
  </div>
</template>
<script>
  import myNavigetTab from './commons/navigate-tab.vue'
  export default {
    data() {
      return {
        
      }
    },
    components:{
      myNavigetTab
    },
    computed: {

    },
    mounted() {

    },
  }
</script>
<style scoped>
  .home-mine-block {
    position: relative;
    display: flex;
    padding: 40px 10px;
    /* background-color: #ffffff; */
    background: url('~assets/works.png');
    background-size: contain;
    color: #fff;

  }
  .user-name{
    width: 100%;
    display: block;
    font-size: 0.32rem;
    text-align: center;
  }
  .home-mine-block .home-img {
    height: 60px;
    width: 60px;
    margin-right: 10px;
    border-radius: 100%;
  }

  .home-mine-block>div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
  }

  .home-mine-block div:nth-child(2) div:first-child {
    flex: 1;
    font-size: 1.17em;
    font-weight: bold;
  }

  .home-mine-block div:nth-child(2) div:first-child:after {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
    content: "";
  }
</style>