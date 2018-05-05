<template>
    <div class="my-block" :style="blockStyle">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'my-block',
    data () {
      return {
        blockStyle: "",
      }
    },
    created() {
      if (this.top) {
        this.blockStyle += "padding-top: 12px;"
      }
      if (this.left) {
        this.blockStyle += "padding-left: 12px;"
      }
      if (this.right) {
        this.blockStyle += "padding-right: 12px;"
      }
      if (this.bottom) {
        this.blockStyle += "padding-top: 14px;padding-bottom: 4px;"
      }
  
    },
    props: {
      top: {
        type: Boolean,
        default: true,
      },
      left: {
        type: Boolean,
        default: false,
      },
      right: {
        type: Boolean,
        default: false,
      },
      bottom: {
        type: Boolean,
        default: false,
      },
    }
  }
  </script>
  
  <style>
    .my-block {
      color: #888;
      font-size: 0.24rem;
    }
  </style>
  