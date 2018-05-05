
const state = {
  title: 'hello',
  selectTab:'work'
}

const getters ={
  title: state => state.title,
  selectTab: state => state.selectTab,
}

const actions ={
  changeTitle({state,commit},title){
    Vue.http.post(
      "cust-user/get-cpy-notes-info",
      {
        userID:userID
      },
      { emulateJSON: true }
    )
    state.title = title
  },
  changeTab({state,commit},arg){
    state.selectTab = arg;
  }
}

const mutations ={
  changeTitle(title){
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}