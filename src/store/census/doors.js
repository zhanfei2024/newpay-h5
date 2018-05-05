
import Vue from 'vue'
const state = {
  title: 'hello',
  merchantList:[],
  merchantSelect:{},
  storeList:[],
  storeSelect:{},
}

const getters ={
  title: state => state.title,
  merchantList: state => state.merchantList,
  merchantSelect: state => state.merchantSelect,
  storeList: state => state.storeList,
  storeSelect: state => state.storeSelect,

}

const actions ={
  /**
   * 请求商户管理列表
   * @param {*} param0 
   */
  request_merchant({state,commit},arg){
    let dataObj={
      "limit": 15,//每页条数
      "offset": 0,//当前页。
      "in": {
        "merchantStatus":arg.merchantStatus===undefined ? '' : arg.merchantStatus    //状态
      },
      "like": {
        "merchantName": "",
      },
    };
    dataObj.in=JSON.stringify(dataObj.in);
    dataObj.like=JSON.stringify(dataObj.like);
    // dataObj.between=JSON.stringify(dataObj.between);
    // dataObj.sort=JSON.stringify(dataObj.sort);
    // let dataObjStr= JSON.stringify(dataObj);
    return Vue.http.post(
      // "?xwl=v5-Server-Interface/merchantManage/getMerchantList",
      // "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/getMerchantList",
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
   * 获取门店信息
   * @param {*} param0 
   * @param {*} arg 
   */
  request_store({state,commit},arg){
    return Vue.http.post(
      // "?xwl=v5-Server-Interface/merchantManage/getMerchantList",
      // "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/getMerchantList",
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
  change_merchant({state,commit},dataSelect){
    state.merchantSelect = dataSelect
  }
}

const mutations ={
  changeTitle(state,title){
    state.title = title
  },
  changeMerchantList(state,body){
    console.log('body:',body.merchantList);
    state.merchantList=body;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}