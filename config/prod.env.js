'use strict'
// 获取npm打包参数
const currentArea = process.argv.splice(2)[0] || null
// 默认DEV环境
const AREA = currentArea ? `"${currentArea}"` : '"DEV"'
console.log(AREA)
module.exports = {
  NODE_ENV: '"production"',
  AREA: AREA
}
