exports.state = {
  isInput: ''
}

exports.mutations = {
  'SET_IS_INPUT': (state, isInput) => {
    state.isInput = isInput
  }
}

exports.getters = {
  getIsInput: state => state.isInput
}
