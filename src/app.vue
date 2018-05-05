<template>
  <div class="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import iconfont from './lib/iconfont.js'
  import Vue from 'vue'
  export default {
    data() {
      return {

      }
    },
    created() {
      // Vue.http.interceptors.push((req, next) => {
      //   next((res) => {
      //     this.httpStatus=true
      //     console.log('httpstuats:',this.httpStatus)
      //     return res
      //   })

      // })
    },

  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    height: 100%;
    background-color: #f0f0f0;
    margin: 0;
    font-size: 0.24rem;
  }
  
  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  .page-part {
    margin-top: 15px;
  }

  .mint-cell:first-child .mint-cell-wrapper {
    background-origin: border-box;
  }

  .mint-cell:last-child {
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  .page-infinite-loading {
    text-align: center;
    display: block;
  }

  .page-infinite-loading>span>div {
    margin: 0 auto;
  }

  .page-infinite-loading-no {
    display: none;
  }

  .loadmore-end {
    color: #888;
    text-align: center;
    display: block;
    font-size: 0.8em;
    margin: 12px 0px;
  }

  .loadmore-end-no {
    display: none;
  }
</style>