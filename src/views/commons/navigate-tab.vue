<template>
  <div>
    <mt-tabbar v-model="selectedCur">
      <mt-tab-item id="action" @click.native="$router.push('/action')">
          <svg class="icon"  aria-hidden="true" slot="icon" style="height:100%;width:100%;fill:#26a2ff;">
            <use xlink:href="#icon-line-dongtai"></use>
          </svg>
          动态
        </mt-tab-item>
      <mt-tab-item id="gongzuotai" @click.native="$router.push('/')">
        <svg class="icon" aria-hidden="true" slot="icon" style="height:100%;width:100%;fill:#26a2ff;">
          <use xlink:href="#icon-gongzuotai"></use>
        </svg>
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        工作台
      </mt-tab-item>
      <mt-tab-item id="census" @click.native="$router.push('/census')">
        <svg class="icon" aria-hidden="true" slot="icon" style="height:100%;width:100%;fill:#26a2ff;">
          <use xlink:href="#icon-tongji"></use>
        </svg>
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        统计
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>

  export default {
    name: "my-navigate-tab",
    data() {
      return {
        selectedCur: 'gongzuotai'
      };
    },
    created() {
      this.selectedCur = this.selected;
    },
    props: {
      selected: {
        type: String,
        default: 'gongzuotai'
      }
    },
    components:{

    }
  }
</script>
<style lang="css" scoped>
.mint-tabbar{
  position: fixed;
}
</style>