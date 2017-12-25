exports.state = {
  isInput: ''
};

exports.mutations = {
  setIsInput: (state, isInput) => {
    state.isInput = isInput;
  }
};

exports.getters = {
  getIsInput: state => state.isInput
};