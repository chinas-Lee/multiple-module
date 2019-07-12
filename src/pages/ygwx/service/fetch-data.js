import Mui from '../../../../static/lib/mui.min'
import {Toast} from 'vant'
import baseURL from './ip-config'
import { _getSign } from '../assets/js/auth-methods'
import ConfigInfo from '../utils/config'

/*
* 异步请求
* api - 接口名称
* bodyParams - 参数体
* headParams - URL后参数
* method - 请求类型
* systemData - 系统数据
* isNoLogin - 是否需要登录
* return Promise
* */
export default function fetchData (api = '', bodyParams = {}, headParams = '', type = 'POST', systemData = {}) {
  return new Promise((resolve, reject) => {
    let config = {
      url: baseURL.BASE_API_YG + headParams,
      type,
      dataType: 'json',
      crossDomain: ConfigInfo.ajax.crossDomain,
      contentType: 'application/json',
      headers: ConfigInfo.ajax.header,
      timeout: ConfigInfo.ajax.timeout,
      data: _getSign(api, bodyParams, systemData),
      success (result) {
        if (!result) {
          reject(ConfigInfo.errorNetworkMsg)
        }
        switch (+result.code) {
          case 0:
            resolve(result.data)
            break
          case -1:
            Toast(result.msg || ConfigInfo.errorNetworkMsg)
            reject(result.msg || ConfigInfo.errorNetworkMsg)
            break
          case -2:
            Toast(result.msg || ConfigInfo.errorNetworkMsg)
            reject(result.msg || ConfigInfo.errorNetworkMsg)
            break
          default:
            Toast(result.msg || ConfigInfo.errorNetworkMsg)
            reject(result.msg || ConfigInfo.errorNetworkMsg)
        }
      },
      error (err) {
        console.log(err)
        reject(ConfigInfo.errorNetworkMsg)
      }
    }
    Mui.ajax(config)
  })
}
