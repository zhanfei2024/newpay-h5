<template>
  <div class="mint-tab-item search-box">
    <svg class="icon" aria-hidden="true" style="height:100%;width:100%;fill:#ddd;">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>
<script>
  export default {
    name: "my-search-box",
    data() {
      return {};
    },
    props:{

    }
  }
</script>
<style lang="css" scoped>
  .mint-tab-item.search-box {
    height: 24px;
    width: 60px;
    padding: 11px 0;
    flex: none
  }
</style>