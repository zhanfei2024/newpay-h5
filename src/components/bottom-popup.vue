<template>
  <mt-popup v-model="visible" position="bottom" class="my-popup" @change="$emit('change', currentValue)">
    <div class="item half-border-bottom"  @click="typeClick" v-for="item in options">
      <label class="mint-radiolist-label" slot="title">
        <span :class="{'is-right': align === 'right'}" class="mint-radio">
          <input class="mint-radio-input" type="radio" v-model="currentValue" :value="item.value===undefined ? item : item.value">
          <my-icon href="success" size="21" style="fill:#09BB07"></my-icon>
        </span>
        <span class="mint-radio-label" v-text="item.label || item"></span>
      </label>
    </div>
  </mt-popup>
</template>
<script>
  export default {
    name: "my-bottom-popup",
    data() {
      return {
        visible: false,
        currentValue: this.value
      };
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String,
      },
      align: String,
    },
    created () {
      console.log('options',this.options);
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },

      currentValue(val) {
        this.$emit('input', val);
      }
    },
    methods: {
      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      typeClick(item) {
        // this.value = item;
        this.visible = false;
      },
      searchData(){
      }
    }
  }
</script>
<style lang="scss" scoped>
  .my-popup {
    width: 100%;
    .item {
      background: #fff;
      position: relative;
      padding-left: 10px;
      line-height: 48px;
      text-align: left;
      font-size: 13px;
    }
  }

  span,
  svg {
    vertical-align: middle;
  }
  .mint-radio-input+svg{
    opacity: 0;
  }
  .mint-radio-input:checked+svg{
    opacity: 1;
  }
</style>