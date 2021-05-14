// central state
export const state = () => ({
  _mainMarginLeft: '0px'
});

// page / component computed calls
export const getters = {
  getMainMarginLeft(state) {
      return state._mainMarginLeft
  }
}

// for external calls mutations / api calls
export const actions = {
  setMainMarginLeft({ commit }, margin) {
    commit('setMainMarginLeft', margin)
  },
}

// modify state
export const mutations = {
  setMainMarginLeft( state, payload ) {
    state._mainMarginLeft = payload;
  },
}
