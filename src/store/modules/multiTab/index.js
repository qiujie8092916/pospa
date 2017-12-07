exports.state = {
  tabs: [],
  activeTab: ''
};

exports.mutations = {
  setActiveTab(state, activeTab) {
    state.activeTab = activeTab;
  },
  setTabs(state, tabs) {
    state.tabs = tabs;
  },
  addTab(state, data) {
    state.tabs.push(data);
  },
  removeTab(state, tabName) {
    if (tabName === 'dashBoard') {
      return;
    }
    let index = 0;
    state.tabs.forEach((tab, i) => {
      if (tab.route === tabName) {
        index = i;
      }
    });
    state.activeTab = state.tabs[index + 1] ? state.tabs[state.tabs.length - 1].route : state.tabs[index - 1].route;
    state.tabs.splice(index, 1);
  }
};