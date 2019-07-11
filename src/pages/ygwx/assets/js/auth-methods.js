/*
* 认证信息方法
* */
import { _getLocalStorage, _setLocalStorage } from './storage-methods'
import projectConfig from '../../project-config'
import Md5 from 'js-md5'

// 获取用户toKen
const _getToken = () => {
  return {
    token: _getLocalStorage('token') || projectConfig.DEFAULT_TOKEN
  }
}

// 获取SN
const _getSN = () => {
  let resData = {
    SN: ''
  }
  try {
    resData.SN = _getLocalStorage('sn') || ''
    if (!resData.SN) {
      resData.SN = `web_${Math.random().toString(36).substr(2, 15)}`
      _setLocalStorage('sn', resData.SN)
    }
  } catch (e) {
    console.log(e)
  }
  return resData
}

/*
* 获取签名
* */
const _getSign = (api = '', data = {}, systemData) => {
  try {
    let { token } = _getToken()
    let { SN } = _getSN()
    let params = {
      v: systemData.v || _getLocalStorage('v') || projectConfig.CR_V,
      osv: _getLocalStorage('yige_osv') || '',
      dc: 'h5',
      did: systemData.did || _getLocalStorage('sn') || SN,
      m: api,
      paramlist: JSON.stringify(data),
      ts: +new Date(),
      at: 'd'
    }
    let openId = _getLocalStorage('openId')
    systemData.oid ? params.oid = systemData.oid : (openId ? params.oid = openId : params.oid = '')
    // 对参数的key进行排序
    let keyList = []
    for (let key in params) {
      key !== 'sign' && keyList.push(key)
    }
    keyList.sort()
    // 生成加密
    let content = ''
    keyList.forEach(item => {
      params[item].length !== 0 && (content += item + params[item])
    })
    content += token
    params.sig = Md5(content).toUpperCase()
    return params
  } catch (e) {
    console.log(e)
    return false
  }
}

export {
  _getToken,
  _getSign,
  _getSN
}
