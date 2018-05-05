import tradingTable from './trading-table.vue'
import searchBox from "./search-box.vue"
import navigateTab from './navigate-tab.vue'
export default function(Vue){
    Vue.component(searchBox.name, searchBox);
    Vue.component(tradingTable.name, tradingTable);
    Vue.component(navigateTab.name, navigateTab);
}
