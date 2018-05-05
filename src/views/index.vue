<template>
    <div class="height-all">
      <mt-tab-container v-model="selectTab" class="height-all bg-white">
          <mt-tab-container-item id="action">
            <!-- <user-info to="merchant-info"></user-info> -->
            <action></action>
          </mt-tab-container-item>
          <mt-tab-container-item id="work">
            <!-- <user-info to="merchant-info"></user-info> -->
            <work></work>
          </mt-tab-container-item>
          <mt-tab-container-item id="tongji">
              <!-- <user-info to="merchant-store"></user-info> -->
              <my-census></my-census>
          </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </template>
  <script>
    import work from './work.vue'
    import action from './action.vue'
    import myCensus from './census/census.vue'
    export default {
      name: "my-navigate-tab",
      data() {
        return {
          // selectTab:'gongzuotai'
        };
      },
      created() {
        // this.selectedCur = this.selected;
      },
      methods:{
        // fnSelect(){
        //   this.selectedCur=item;
        // }
        changeTab(arg){
          this.$store.dispatch('sys/selectTab',arg);
        }
      },
      computed: {
        selectTab(){
          return this.$store.getters['sys/selectTab'];
        }
      },
      props: {
        selected: {
          type: String,
          default: 'action'
        }
      },
      components:{
        work,
        myCensus,
        action
      }
    }
  </script>
  <style lang="css" scoped>
    .mint-tabbar{
      background-color: #fff;
    }
  </style>