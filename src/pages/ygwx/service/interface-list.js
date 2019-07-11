/*
* 接口列表
* */
import fetchData from '../service/fetch-data'

const interfaceList = {
  // 获取会议详情
  getMeetingDetails (bodyParams = {}, systemData) {
    return fetchData(`doctor.mobileazcase.meetingdetail`, bodyParams, '', 'POST', systemData)
  },
  // 查询省份
  getProvinceList () {
    return fetchData('frame.region.province')
  },
  // 查询省下的市
  getCityList (bodyParams) {
    return fetchData('frame.region.city', bodyParams)
  },
  // 查询市下的区
  getAreaList (bodyParams) {
    return fetchData('frame.region.area', bodyParams)
  },
  // 获取讲义列表
  getHandoutList (bodyParams) {
    return fetchData(`doctor.mobileazcase.pptlist`, bodyParams)
  },
  // 保存讲义
  saveHandout (bodyParams) {
    return fetchData(`doctor.mobileazcase.pptsave`, bodyParams)
  },
  // 保存会议
  updateMeeting (bodyParams) {
    return fetchData(`doctor.mobileazcase.meetingsave`, bodyParams)
  }
}

export default interfaceList
