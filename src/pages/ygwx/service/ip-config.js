import DevConfig from '../project-config/dev' // dev配置
import ProConfig from '../project-config/pro' // pro配置
import ApiConfig from '../project-config/api' // 线上配置

let baseUrl = {
  YG_WX_APP_ID: '', // 医格微信APP_ID
  HJB_WX_APP_ID: '', // 罕见病微信APP_ID
  DOMAIN: '', // 域名
  BASE_API_YG: '', // 医格基础API
  BASE_API_YW: '' // 叶问基础API
}

// 各类配置环境
switch (process.env.AREA) {
  case 'DEV':
    baseUrl = {
      YG_WX_APP_ID: DevConfig.YG_WX_APP_ID,
      HJB_WX_APP_ID: DevConfig.HJB_WX_APP_ID,
      DOMAIN: DevConfig.DOMAIN,
      BASE_API_YG: DevConfig.BASE_API_YG,
      BASE_API_YW: DevConfig.BASE_API_YW
    }
    break
  case 'PRO':
    baseUrl = {
      YG_WX_APP_ID: ProConfig.YG_WX_APP_ID,
      HJB_WX_APP_ID: ProConfig.HJB_WX_APP_ID,
      DOMAIN: ProConfig.DOMAIN,
      BASE_API_YG: ProConfig.BASE_API_YG,
      BASE_API_YW: ProConfig.BASE_API_YW
    }
    break
  case 'API':
    baseUrl = {
      YG_WX_APP_ID: ApiConfig.YG_WX_APP_ID,
      HJB_WX_APP_ID: ApiConfig.HJB_WX_APP_ID,
      DOMAIN: ApiConfig.DOMAIN,
      BASE_API_YG: ApiConfig.BASE_API_YG,
      BASE_API_YW: ApiConfig.BASE_API_YW
    }
    break
  default:
    baseUrl = {
      YG_WX_APP_ID: DevConfig.YG_WX_APP_ID,
      HJB_WX_APP_ID: DevConfig.HJB_WX_APP_ID,
      DOMAIN: DevConfig.DOMAIN,
      BASE_API_YG: DevConfig.BASE_API_YG,
      BASE_API_YW: DevConfig.BASE_API_YW
    }
}

export default baseUrl
