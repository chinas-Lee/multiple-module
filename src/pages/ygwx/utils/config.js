/**
 * Created by LCQ on 2019-06-04,0004.
 */
/*
* 项目模块中配置信息
* */
const Config = {
  errorNetworkMsg: '服务器繁忙，请稍后重试',
  ajax: {
    header: {'Content-Type': 'application/json'},
    timeout: 20000,
    crossDomain: true // 强制使用5+跨域
  },
  isNeedWeChatAuth: true, // 是否微信认证
  tips: '温馨提示',
  meetingTypeList: [
    {
      text: '区域会',
      value: 0
    },
    {
      text: '院内会',
      value: 1
    },
    {
      text: '网络会',
      value: 2
    }
  ]
}

export default Config
