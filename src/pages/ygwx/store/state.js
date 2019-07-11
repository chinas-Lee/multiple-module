/*
* Vuex状态
* */
import { _getLocalStorageObject } from '../assets/js/storage-methods'

const State = {
  userData: _getLocalStorageObject('userData') || {} // 登录者信息
}

export default State
