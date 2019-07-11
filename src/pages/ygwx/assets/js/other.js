import ConfigInfo from '../../utils/config'

const _formatMeetingTypeText = function (val) {
  try {
    if (!val) return false
    for (let i = 0, len = ConfigInfo.meetingTypeList.length; i < len; i++) if (ConfigInfo.meetingTypeList[i].value === +val) return ConfigInfo.meetingTypeList[i].text
  } catch (e) {
    console.log(e)
    return false
  }
}

export {
  _formatMeetingTypeText
}
