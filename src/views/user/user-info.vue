<template>
  <div>
    <my-header fixed title="用户信息">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <div class="user-header">
      <div class="user-title">用户名(正常)</div>
      <div class="user-label">
        <span class="label-item">注册手机号</span>
        <span class="value-item">13723440051</span>
      </div>
      <div class="user-label">
        <span class="label-item">绑定邮箱</span>
        <span class="value-item">82103@qq.com</span>
      </div>
    </div>
    <div class="page-part">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">商户</mt-tab-item>
        <mt-tab-item id="2">门店</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <div style="height:2px;background: #ddd"></div>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <user-info to="merchant-info"></user-info>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <user-info to="merchant-store"></user-info>
            <user-info></user-info>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import userInfo from '../commons/user-info-item.vue'
  export default {
    name: "component_name",
    data() {
      return {
        selected: '1',
      };
    },
    components: {
      userInfo:userInfo
    }
  }
</script>
<style lang="scss" scoped>
  .user-header {
    line-height: 28px;
    font-size: 13px;
    background: #fff;
    padding: 10px;
    .user-title {
      color: #505050
    }
    .user-label {
      font-size: 11px;
      color: #999;
      line-height: 18px;
    }
  }
</style>