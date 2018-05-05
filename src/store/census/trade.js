import Vue from "vue"
import { Toast } from 'mint-ui'
const state = {
  title: "hello",
  tradeList: [],
  tradeSelect: {},
  startDate:new Date(),
  endDate:DateFmt(new Date(), 'yyyy-MM-dd'),
  searchDateStatus:false,  //是否启用时间搜索状态
  query:{
    startDate:moment(new Date()).startOf('month').format("YYYY-MM-DD HH:mm:ss"),
    endDate:moment(new Date()).endOf('month').format("YYYY-MM-DD HH:mm:ss"),
    pageNo:1,
    keyword:'',
    orderBy:'',
    order:'desc',
    storeId:'',
    merchantId:'',
    payType:'',
  }
}

const getters = {
  title: state => state.title,
  tradeList: state => state.tradeList,
  tradeSelect: state => state.tradeSelect,
  startDate: state => state.startDate,
  endDate: state => state.endDate,
  searchDateStatus: state => state.searchDateStatus,
  query: state => state.query,
}

const actions = {
  /**
   * 获取交易信息
   * @param {*} param0
   * @param {*} arg
   */
  request_trade({ state, commit }, arg) {
    let args = arg || {},payedTimeStart,payedTimeEnd
    payedTimeStart = moment(new Date()).startOf('month').format("YYYY-MM-DD HH:mm:ss")
    payedTimeEnd = moment(new Date()).endOf('month').format("YYYY-MM-DD HH:mm:ss")
    let { startDate, endDate,pageNo, keyword,
       orderBy , order , storeId,merchantId , payType} =state.query
    let dataObj = {
      limit:'',  //每页条数
      offset: pageNo,  //当前页。
      merchantId: merchantId, //商户id
      storeId: storeId,  //门店id
      seqNo:'',  //流水号，模糊查询
      orderNo:'', //交易单号，模糊查询
      payType,  //支付方式  
      payTimeStart:'', //支付起始时间
      payTimeEnd:'', //支付结束时间
      minAmount:'',  //最小金额
      maxAmount:'', //最大金额
      payedTimeStart: startDate,
      payedTimeEnd:endDate,
      orderBy,
      order,
    }
    return Vue.http.post(
        "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/getTradeList",
        // "/tradeSeq/query",
        dataObj,
        // {},
        { emulateJSON: true }
      )
      .then(res => {
        // return res.body.values.result
        if (res.body.success) {
          let body = res.body.data.rows
          // let body=res.body.values.result;
          commit("changeTradeList", body)
          if(body.length>0){
            state.query.pageNo++
            return false
          }else{
            return true
          }
          // console.log("body:", body)
          // return body
        } else {
          Toast(res.body.msg)
          return true
        }
      })
  },
  /**
   * 
   * @param {*} param0 
   * @param {*} arg 
   */
  change_trade({ state, commit }, arg) {
    state.tradeSelect = arg;
  },
  change_startDate({state,commit},arg){
    state.startDate = arg
  },
  change_endDate({state,commit},arg){
    state.endDate = arg
  },
  change_searchDateStatus({state,commit},arg){
    state.searchDateStatus = arg;
  },
  clearTrade({state},arg){
    state.query.pageNo = 1
    state.tradeList = []
  },
}

const mutations = {
  changeTitle(state, title) {
    state.title = title
  },
  changeTradeList(state,arg){
    state.tradeList = state.tradeList.concat(arg);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
