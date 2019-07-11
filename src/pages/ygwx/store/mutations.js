/*
* Vuex同步修改
* */
import * as type from './mutations-type'

const Mutations = {
  [type.SET_USER_DATA] (state, data) {
    state.userData = data
  }
}

export default Mutations
