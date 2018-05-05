import Vue from 'vue'
import { Toast } from 'mint-ui'
import axios from 'axios'

/* state */
const state = {
  title: 'hello',
  merchantList:[],
  merchantSelect:{},
  storeList:[],
  storeSelect:{},
  tradeCountQuery:{
    merchantId:'',
    keyword:'',
    chartStatus:false,
  },
  merchantQuery:{
    pageNo:1,
  }
}

/* getters */
const getters ={
  title: state => state.title,
  merchantList: state => state.merchantList,
  merchantSelect: state => state.merchantSelect,
  storeList: state => state.storeList,
  storeSelect: state => state.storeSelect,
  tradeCountQuery: state => state.tradeCountQuery,
  merchantQuery: state => state.merchantQuery,
}

/* actions */
const actions = {
  // 查询商户列表
  async request_merchant({commit}, arg) {
    arg = arg || {};
    console.log(arg+'arg')
    // 请求参数
    let filterObj = {
      "status": '1',
      "appId": '50001',
      "sign": '88888888',
      "timestamp": "2018-03-02 14:42:15",
      "limit": 50,//每页条数
      "offset": arg.pageNo || 1, //当前页。
      "in": {
        "merchantStatus": arg.merchantStatus === undefined ? '' : arg.merchantStatus
      },
      "like": {
        "merchantName": arg.keyword || ""
      },
      orderBy:arg.orderBy || '',
      order:arg.order || 'asc'
    };

    filterObj.in = JSON.stringify(filterObj.in);
    filterObj.like = JSON.stringify(filterObj.like);

    await axios({
      method: 'post',
      url: '/host/merchant/queryList',
      data: filterObj
    }).then(res => {
      console.log(res, 'res')
    }).catch(err => {
      console.log(err)
    })
    // return Vue.http.post(
    //   "http://vutest.op110.com.cn/newpay-service/merchant/queryList", { params: filterObj}, {emulateJSON: true}
    // ).then( res => {
    //   if(res.body.success) {
    //     let body = res.body.data.rows;
    //     commit("changeMerchantList",body);
    //     if(body.length>0) {
    //       return false
    //     } else {
    //       return true
    //     }
    //   } else {
    //     Toast(res.body.msg || '异常错误')
    //     return true
    //   }
    // })
  },



  /**
   * 获取门店信息
   * @param {*} param0 
   * @param {*} arg 
   */
  request_store({state,commit},arg){
    return Vue.http.post(
      // "?xwl=v5-Server-Interface/merchantManage/getMerchantList",
      "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/getMerchantList",
      {
        params:dataObj
      },
      // {},
      { emulateJSON: true }
    ).then(res=>{
      if(res.body.success){
        let body=res.body.data.rows;
        // let body=res.body.values.result;
        commit("changeMerchantList",body);
        console.log('body:',body);
        return body;
      }else{
        return res.body
      }

    })
  },
  /**
   * 选中商户对象，商户详情界面所需要的值 
   * @param {*} param0 
   * @param {*} dataSelect 
   */
  change_merchant({state, commit},dataSelect){
    dataSelect.merchantStatus=3
    state.merchantSelect = dataSelect
  },
  clearMerchant({state, commit}){
    state.merchantQuery.pageNo = 1
    state.merchantList = []
  }
}

/* 同步方法 */
const mutations ={
  /* 设置state.merchantList */
  setMerchants(state, merchants) {
    state.merchantList = merchants
  },
  changeTitle(state,title){
    state.title = title
  },
  changeMerchantList(state,body){
    console.log('body:',body.merchantList);
    state.merchantList = state.merchantList.concat(body);
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}