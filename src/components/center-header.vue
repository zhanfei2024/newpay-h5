<template>
  <div>
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <slot name="left"></slot>
      </div>
      <div class="mint-header-title">
        <slot name="center"></slot>
      </div>
      <div class="mint-header-button is-right">
        <slot name="right"></slot>
      </div>
    </header>
  </div>
</template>
<script>
  export default {
    name: "my-center-header",
    data() {
      return {};
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      fixed: Boolean,
    },
  }
</script>
<style lang="css" scoped>

</style>