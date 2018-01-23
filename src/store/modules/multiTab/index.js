exports.state = {
  tabs: [],
  activeTab: ''
}

exports.mutations = {
  'ADD_TAB' (state, data) {
    state.tabs.push(data)
  },
  'REMOVE_TAB' (state, tabName) {
    if (tabName === 'dashBoard') return
    let index = 0
    state.tabs.forEach((tab, i) => {
      if (tab.route === tabName) index = i
    })
    state.activeTab = state.tabs[index + 1] ? state.tabs[state.tabs.length - 1].route : state.activeTab === tabName ? state.tabs[index - 1].route : state.activeTab
    state.tabs.splice(index, 1)
  },
  'SET_ACTIVE_TAB' (state, activeTab) {
    state.activeTab = activeTab
  }
}
