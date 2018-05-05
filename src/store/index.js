import Vuex from 'vuex'

/* 
  import Store
 */
import sys from './sys'
import census from './census/census'
import doors from './census/doors'
import trade from './census/trade'
import merchant from './merchant/merchant'


export default new Vuex.Store({
  modules:{
    sys,
    merchant,
    census,
    doors,
    trade,
    census
  }
})