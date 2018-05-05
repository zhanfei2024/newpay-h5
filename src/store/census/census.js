// 统计状态管理
import Vue from 'vue'
import { Toast } from 'mint-ui'

const state = {
  title: '全部商户',
  merchantList:[],
  merchantSelect:{},
  storeList:[],
  storeSelect:{},
  censusData:{},
  merchantPage:1,
  merchantQuery:{
    startDate:moment(new Date()).startOf('month').format("YYYY-MM-DD"),
    endDate:moment(new Date()).endOf('month').format("YYYY-MM-DD"),
    keyword:'',
    orderBy:'',
    order:'',
    merchantId:'',
    pageNo:1,
    pageSize:10,
  },
  storeQuery:{
    startDate:moment(new Date()).startOf('month').format("YYYY-MM-DD"),
    endDate:moment(new Date()).endOf('month').format("YYYY-MM-DD"),
    keyword:'',
    orderBy:'',
    order:'',
    pageNo:1,
    pageSize:10,
  },
  tradeCountQuery:{
    merchantId:'',
    keyword:'',
    chartStatus:false,
  },
  searchDateStatus:false,  //是否启用时间搜索状态  商户统计
  storeDateStatus:false,  //是否启用时间搜索状态   门店
  cycleDateStatus:false,  //是否启用时间搜索状态   周期
  censusQuery:{
    startDate:DateFmt(new Date(),'yyyy-MM-dd'),
    endDate:DateFmt(new Date(),'yyyy-MM-dd'),
    dateStatus:false,        //是否启用时间搜索状态 统计
    selectActive:'benyue',
  },
  cycleList:[],
  merchantCycleList:[],
  tradeTotal:{},   //商户总交易额
  searchMerchant:[],
  chartOption:{},
  cycleListStatus:'', //统计里的按周期请求或者是商户管理的请求
}

const getters = {
  title: state => state.title,
  merchantList: state => state.merchantList,
  merchantSelect: state => state.merchantSelect,
  storeList: state => state.storeList,
  storeSelect: state => state.storeSelect,
  merchantQuery: state => state.merchantQuery,
  searchDateStatus: state => state.searchDateStatus,
  storeDateStatus: state => state.storeDateStatus,
  storeQuery: state => state.storeQuery,
  censusQuery: state => state.censusQuery,
  cycleList: state => state.cycleList,
  merchantCycleList: state => state.merchantCycleList,
  cycleDateStatus: state => state.cycleDateStatus,
  censusData: state => state.censusData,
  searchMerchant: state => state.searchMerchant,
  tradeTotal: state => state.tradeTotal,
  title: state => state.title,
  chartOption: state => state.chartOption,
  tradeCountQuery: state => state.tradeCountQuery,
  cycleListStatus: state => state.cycleListStatus,
}

const actions = {
  /**
   * 请求商户管理列表
   * @param {*} param0 
   */
  request_merchant({state,commit},arg){
    let args = arg || {} ,payedTimeStart,payedTimeEnd
    console.log(args+'args')
    payedTimeStart = moment(new Date()).startOf('month').format("YYYY-MM-DD")
    payedTimeEnd = moment(new Date()).endOf('month').format("YYYY-MM-DD")
    let dataObj={
      "merchantId": args.merchantId || '',
      "payType": '',
      "startDate": '2017-1-31 00:00:00',
      "endDate":'2018-1-31 23:59:00',
      // startDate:args.payedTimeStart + " 00:00:00",
      // endDate:args.payedTimeEnd+ " 23:59:59",
      status: '',
      storeId:'',
      orderBy: args.orderBy || '',
      order: args.order || 'desc',
      pageNo: args.pageNo || 1,
      pageSize:10,
      groupBy: args.groupBy || 'merchantId',
    }
    return Vue.http.post(
      "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/payMerOrStoreCount",
      dataObj,
      { emulateJSON: true }
    ).then(res=>{
      if(!res.body) return
      if(res.body.success) {
        let body=res.body.data.rows;
        // let body=res.body.values.result;
        if(args.groupBy=='merchantId'){
          commit("changeMerchantList", body)
        }else{
          commit("changeStoreList", body)
        }
        if(body.length > 0){
          return false
        }else{
          return true
        }
      } else {
        Toast(res.body.msg)
        return true
      }
    })
  },

  /**
   * 获取统计信息
   * @param {*} param0 
   * @param {*} arg 
   */
  request_census({state,commit},arg){
    let payedTimeStart,payedTimeEnd,userId,merchantId,type,payType,pageSize,pageNo
    if(state.censusQuery.dateStatus){
      payedTimeStart = DateFmt(state.censusQuery.startDate,'yyyy-MM-dd')
      payedTimeEnd = DateFmt(state.censusQuery.endDate,'yyyy-MM-dd')
    }else{
      payedTimeStart = moment(new Date()).startOf('month').format("YYYY-MM-DD")
      payedTimeEnd = moment(new Date()).endOf('month').format("YYYY-MM-DD")
    }
    pageSize = 12
    console.log('startDate:',payedTimeStart);

    return Vue.http.post(
      // "?xwl=v5-Server-Interface/merchantManage/getMerchantList",
      // "/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/getMerchantList",
      '/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/totalCount',
      {
      userId:userId ,
      merchantId: merchantId,
      startDate: payedTimeStart + " 00:00:00",
      endDate: payedTimeEnd + " 23:59:59",
      },
      // {},
      { emulateJSON: true }
    ).then(res=>{
      if(res.body.success){
        let body=res.body.data.rows;
        state.censusData = res.body.data
        return body;
      }else{
        Toast(res.body.msg)
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
  },
  change_searchDateStatus({state,commit},arg){
    state.searchDateStatus = arg;
  },
  change_storeDateStatus({state,commit},arg){
    state.storeDateStatus = arg;
  },
  change_cycleDateStatus({state,commit},arg){
    state.cycleDateStatus = arg;
  },
  change_searchMerchant({state,commit},arg){
    state.searchMerchant = arg;
  },
  change_title({state,commit},arg){
    state.title = arg;
  },
  change_chartOption({state,commit},arg){
    state.chartOption = arg;
  },
  change_cycleListStatus({state,commit},arg){
    state.cycleListStatus = arg;
  },
  /**
   * 按周期统计
   */
  change_cycleList({state,commit},arg){
    let urls = '/ttx-manage/m?xwl=v5-Server-Interface/merchantManage/payCycleCount';
    return Vue.http.post(urls,
      arg, {
        emulateJSON: true
      }
    ).then(res => {
      let json = res.body,rows,seriesData=[],tradeTotal={},totalAmount=0,totalProfitAmount=0
      if (json.success === false) {
        Toast(json.msg)
        return res.body
      }
      rows=json.data.rows
      if(rows.length!==0){
        rows.forEach(x=>{
          totalAmount+=x.totalAmount
          totalProfitAmount+=x.totalProfitAmount
        })
        tradeTotal.totalAmount = totalAmount
        tradeTotal.totalProfitAmount = totalProfitAmount
      }
      console.log('tradeTotal.totalAmount:',tradeTotal.totalAmount)
      state.tradeTotal = tradeTotal
      if(state.cycleListStatus==='merchant'){
        state.merchantCycleList = rows
      }else{
        state.cycleList = rows
      }
      // state.cycleList = rows
      return res.body;
    })
  },
  clearMerchant({state},arg){
    state.merchantQuery.pageNo = 1
    state.merchantList = []
  },
  clearStore({state},arg){
    state.storeQuery.pageNo = 1
    state.storeList = []
  }
}

const mutations ={
  changeTitle(state,title){
    state.title = title
  },
  changeMerchantList(state,body){
    state.merchantList= state.merchantList.concat(body);
  },
  changeStoreList(state,body){
    state.storeList= state.storeList.concat(body);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}