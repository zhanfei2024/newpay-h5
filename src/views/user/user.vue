<template>
  <div>
    <my-header fixed title="用户管理">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <mt-navbar>
      <mt-tab-item id="1">已有商户</mt-tab-item>
      <mt-tab-item id="2">时间</mt-tab-item>
      <mt-tab-item id="3">注册时间</mt-tab-item>
      <my-search-box id="4"></my-search-box>
    </mt-navbar>
    <div class="page-part">
      <user-list></user-list>
    </div>
  </div>
</template>
<script>
  import userList from '../commons/user-list-item.vue'
  export default {
    data() {
      return {};
    },
    created() {
 
    },
    components: {
      userList:userList
    }
  }
</script>
<style lang="css" scoped>


  
</style>