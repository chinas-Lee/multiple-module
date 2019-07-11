// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)
//
// export const store = new Vuex.Store({
//   state: {
//     roleType: '',
//     patientMeeting: ''
//   },
//   getters: {
//   },
//   mutations: {
//     changeType (state, data) {
//       state.roleType = data
//     },
//     changePatientType (state, data) {
//       state.patientMeeting = data
//     }
//   }
// })
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'
import createLogger from 'vuex/dist/logger' // 修改日志

const debugEnabled = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debugEnabled,
  plugins: debugEnabled ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
})
