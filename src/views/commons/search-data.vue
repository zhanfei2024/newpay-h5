<template>
  <div class="comp-page">
    <div class="box-flex">
      <div class="item">
        今天
      </div>
      <div class="item">
        昨天
      </div>
    </div>
    <div class="box-flex">
      <div class="item">
        本月
      </div>
      <div class="item">
        上月
      </div>
    </div>
    <div class="box-flex">
      <div class="item">
        本季度
      </div>
      <div class="item">
        上季度
      </div>
    </div>
    <div class="box-flex">
      <div class="item">
        本年
      </div>
      <div class="item">
        不限
      </div>
    </div>
    <div class="box-flex">
      <div class="item">开始日期</div>
    </div>
    <div class="box-flex">
      <div class="item">结束日期</div>
    </div>
    <div class="default-box">
      <div class="left-item">
        将选择设为默认
      </div>
      <div class="right-item">
        <mt-switch v-model="switchVal"></mt-switch>
      </div>
    </div>
    <div class="box-flex">
      <mt-button size="large" type="primary">确认</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "component_name",
    data() {
      return {
        switchVal:false,
      };
    }
  }
</script>
<style lang="scss" scoped>
  .comp-page {
    width: 100%;
    background: #e6e6e6;
    padding: 10px 0 0;
    overflow: hidden;
  }

  .box-flex {
    display: flex;
    margin-bottom: 10px;
    padding: 0 10px;
    .item {
      flex: auto;
      margin-right: 10px;
      background: #fff;
      line-height: 36px;
      text-align: center;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .default-box{
    line-height: 32px;
    overflow: hidden;
    padding: 0 10px;
    font-size: 12px;
    margin-bottom: 10px;
    .left-item{
      float:left;
      width:50%;
    }
    .right-item{
      float: right;
    }
  }
</style>