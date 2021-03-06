/**
 * Created by LCQ on 2019-05-13,0013.
 */
import Utils from './utils'
import Config from './config'
import InterfaceList from './../service/interface-list'

export default {
  install (Vue) {
    let VuePrototype = Vue.prototype
    // 工具函数
    VuePrototype.$utils = Utils
    // 配置公共信息
    VuePrototype.$configInfo = Config
    // 接口
    VuePrototype.$asyncAjax = InterfaceList
  }
}
