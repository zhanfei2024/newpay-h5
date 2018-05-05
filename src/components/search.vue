<template>
    <div class="my-search mint-search">
      <div class="mint-searchbar">
        <div class="mint-searchbar-inner">
          <i class="mintui mintui-search" v-show="visible"></i>
          <input
          ref="input"
          @click="visible = true"
          type="search"
          v-model="currentValue"
          :placeholder="visible ? placeholder : ''"
          class="mint-searchbar-core">
        </div>
        <a
          class="mint-searchbar-cancel"
          @click="visible = false, currentValue = '',$emit('cancel')"
          v-show="visible"
          v-text="cancelText">
        </a>
        <slot name="extra"></slot>
        <label
          @click="visible = true, $refs.input.focus()"
          class="mint-searchbar-placeholder"
          v-show="!visible">
          <i class="mintui mintui-search"></i>
          <span class="mint-searchbar-text" v-text="placeholder"></span>
        </label>
      </div>
      <div class="mint-search-list" v-show="show || currentValue" ref="searchlist">
        <div class="mint-search-list-warp">
          <slot>
            <mt-cell v-for="(item, index) in result" :key="index" :title="item"></mt-cell>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'my-search',
  
    data() {
      return {
        visible: false,
        currentValue: this.value
      };
    },
  
    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },
  
      value(val) {
        this.currentValue = val;
      }
    },
  
    props: {
      value: String,
      autofocus: Boolean,
      show: Boolean,
      cancelText: {
        default: '取消'
      },
      placeholder: {
        default: '搜索'
      },
      paddingTop: {
        default: 0,
      },
      result: Array
    },
  
    mounted() {
      if(this.paddingTop) {
        this.$refs.searchlist.style = "padding-top:"+this.paddingTop+"px";
      }
      if(this.autofocus){
        console.log('autofocus');
        this.visible=true;
        this.$refs.input.focus();
      }
    }
  };
  </script>
  
  <style>
  .my-search .mint-searchbar{
    position: fixed;
    width: 100%;
  }
  .my-search .mint-search-list {
    padding-top: 92px;
  }
  .mint-searchbar-core{
    width: 100%;
  }
  </style>
  