<template>
    <mt-popup v-model="visible" :modal="false" class="between-popup" popup-transition="popup-fade" position="left">
        <div class="comp-page">
          <div class="box-flex" @click="fnStartDateShow()">
            <div class="item" >{{ DateFmt(startDates,'yyyy-MM-dd') || '开始日期'}}</div>
          </div>
          <div class="box-flex" @click="fnEndDateShow()">
          <div class="item">{{ DateFmt(endDates,'yyyy-MM-dd') || '结束日期'}}</div>
          </div>
          <div class="box-flex">
            <mt-button size="large" @click.native="searchData" type="primary">确认</mt-button>
          </div>
        </div>
      </mt-popup>
</template>
<script>
  export default {
    name: "component_name",
    data() {
      return {
        switchVal: false,
        visible:false,
      };
    },
    props:{
      startDate:{
        default:''
      },
      endDate:{
        default:''
      },
    },
    created(){
      let startDate=this.startDate;
      console.log('start:',startDate);
    },
    computed: {
      startDates(){
        let startDate=this.startDate;
        return startDate
      },
      endDates(){
        let endDate=this.endDate;
        return endDate
      },
    },
    methods: {
      fnStartDateShow() {
        this.$emit('startPopup')
      },
      fnEndDateShow() {
        this.$emit('endPopup')
      },
      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      searchData(){
        this.$emit('searchData')
        this.close()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>