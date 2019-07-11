// 安卓登录
const androidLogin = function () {
  try {
    // 登录动作
    window.bandroid.toLogin()
    let loginCount = 0
    // 每隔0.5秒请求是否登录
    let isLogin = setInterval(() => {
      try {
        loginCount++
        let res = window.bandroid.getAppInfo()
        res && JSON.parse(res).oid && clearInterval(isLogin)
        // 请求20次后则不再请求
        loginCount > 20 && isLogin && clearInterval(isLogin)
      } catch (e) {
        console.log(e)
        clearInterval(isLogin)
      }
    }, 500)
  } catch (e) {
    console.log(e)
    return false
  }
}

// IOS登录
const iosLogin = function () {
  try {
    // 登录动作
    window.webkit.messageHandlers.tologin.postMessage({tologin: 'tologin'})
    let loginCount = 0
    // 每隔0.5秒请求是否登录
    let isLogin = setInterval(() => {
      try {
        loginCount++
        let res = window.webkit.messageHandlers.getAppInfo.postMessage()
        res && JSON.parse(res).oid && clearInterval(isLogin)
        // 请求20次后则不再请求
        loginCount > 20 && isLogin && clearInterval(isLogin)
      } catch (e) {
        console.log(e)
        clearInterval(isLogin)
      }
    }, 500)
  } catch (e) {
    console.log(e)
    return false
  }
}

// 调用安卓方法
const androidMethods = function (key = 'getAppInfo', params = '') {
  try {
    let res = window.bandroid[key](params)
    if (res && JSON.parse(res)) {
      return JSON.parse(res)
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

// 调用IOS方法
const iosMethods = function (key = 'getAppInfo', params = {}) {
  console.log(arguments)
  try {
    let res = window.webkit.messageHandlers[key].postMessage(params)
    if (res && JSON.parse(res)) {
      return JSON.parse(res)
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export {
  androidLogin,
  iosLogin,
  androidMethods,
  iosMethods
}
