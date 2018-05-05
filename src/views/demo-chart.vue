<template>
  <div>
    <!-- <mt-header title="统计图表" fixed>
      <a @click="$router.go(-1)" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>
    <div style="height:40px"></div> -->
    <!--<h1>{{ msg }}</h1>-->
    <div class="box-chart">
      <chart :options="options"></chart>
    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts.vue'
  // import polar from '../lib/data-echart.js'
  import 'echarts/theme/dark'

  export default {
    components: {
      chart: ECharts
    },
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        // polar
      }
    },
    props:{
      options:{
        type:Object,
        default:{}
      }
    },
    methods: {
      startHacking() {
        this.$toast('It Works!')
      }
    },
    created() {
      // console.log(polar);
    }
  }
</script>

<style lang="scss">
  .box-chart {
    width: 100%;
    .echarts {
      width: 99%;
      height: 300px;
    }
  }
</style>