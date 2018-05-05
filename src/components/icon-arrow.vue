<template>
  <!-- <div> -->
  <svg class="icon my-icon" aria-hidden="true" slot="icon" :style="styles">
    <use :xlink:href="'#icon-'+href"></use>
  </svg>
  <!-- </div> -->
</template>
<script>
  export default {
    name: "my-icon",
    data() {
      return {
        styles: ''
      };
    },
    props: {
      href: {
        type: String,
        default: ''
      },
      // 长度和宽度的px
      size: {
        default: 0
      }
    },
    created() {
      let size = this.size;
      let sizeStr = size == 0 ? '' : 'height:' + size + 'px;' + 'width:' + size + 'px';
      this.styles =  sizeStr;
    },
  }
</script>
<style lang="css" scoped>
  .my-icon {
    height: 100%;
    width: 100%;
    fill:#26a2ff;
  }
</style>