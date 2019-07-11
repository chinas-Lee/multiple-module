<template>
  <div class="meeting-sign-up">
    <!--<top-header title="会议申请"></top-header>-->
    <div v-if="!showInfo.updateMeetingSuccess" class="form-box">
      <div class="form-list">
        <label class="form-left">会议类型</label>
        <div class="form-center">
          <van-field v-if="showInfo.isEdit" v-model="formInfo.type" readonly clickable placeholder="请选择" @click="showInfo.type = true"/>
          <van-field v-else v-model="formInfo.type" readonly clickable disabled placeholder="请选择"/>
          <van-popup v-model="showInfo.type" position="bottom">
            <van-picker show-toolbar :columns="$configInfo.meetingTypeList" @confirm="confirm('type', $event)" :default-index="selectInfo.type"  @cancel="showInfo.type = false"/>
          </van-popup>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="form-list">
        <label class="form-left">会议主题</label>
        <div class="form-center">
          <van-field v-model="formInfo.title" placeholder="请输入" maxlength="150" :disabled="!showInfo.isEdit"/>
        </div>
      </div>
      <div class="form-list">
        <label class="form-left">开始时间</label>
        <div class="form-center is-select">
          <van-field v-if="showInfo.isEdit"  v-model="formInfo.startTime" readonly clickable placeholder="请选择" @click="showInfo.startTime = true"/>
          <van-field v-else v-model="formInfo.startTime" readonly clickable disabled placeholder="请选择"/>
          <van-popup v-model="showInfo.startTime" position="bottom">
            <van-datetime-picker :value="formInfo.startTime ? new Date(formInfo.startTime) : new Date()"  show-toolbar type="datetime" @confirm="confirmTime('startTime', $event)" @cancel="showInfo.startTime = false"/>
          </van-popup>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="form-list">
        <label class="form-left">结束时间</label>
        <div class="form-center is-select">
          <van-field v-if="showInfo.isEdit"  v-model="formInfo.endTime" readonly clickable placeholder="请选择" @click="showInfo.endTime = true"/>
          <van-field v-else v-model="formInfo.endTime" readonly clickable disabled placeholder="请选择" />
          <van-popup v-model="showInfo.endTime" position="bottom">
            <van-datetime-picker :value="formInfo.endTime ? new Date(formInfo.endTime) : new Date()" show-toolbar type="datetime" @confirm="confirmTime('endTime', $event)"  @cancel="showInfo.endTime = false"/>
          </van-popup>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="form-list">
        <label class="form-left">举办城市</label>
        <div class="form-center is-select">
          <van-field v-if="showInfo.isEdit" v-model="formInfo.city" readonly clickable placeholder="请选择" @click="inputHandle('city')"/>
          <van-field v-else v-model="formInfo.city" readonly clickable disabled placeholder="请选择"/>
          <van-popup v-model="showInfo.city" position="bottom">
            <van-area :area-list="meetingCity" v-model="formInfo.city"  columns-num="3" @confirm="confirm('city', $event)" @cancel="showInfo.city = false" @change="changeCity"/>
          </van-popup>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="form-list">
        <label class="form-left">会议负责人</label>
        <div class="form-center">
          <van-field v-model="formInfo.person" placeholder="请输入" maxlength="50" :disabled="!showInfo.isEdit"/>
        </div>
      </div>
      <div class="form-list">
        <label class="form-left">负责人手机号</label>
        <div class="form-center">
          <van-field v-model="formInfo.mobile" type="number" placeholder="请输入" maxlength="11"  :disabled="!showInfo.isEdit"/>
        </div>
      </div>
      <div class="form-list">
        <label class="form-left">参会人数</label>
        <div class="form-center">
          <van-field v-model="formInfo.number" type="number" placeholder="请输入" maxlength="6"  :disabled="!showInfo.isEdit"/>
        </div>
      </div>
      <div class="form-list">
        <label class="form-left">讲义</label>
        <div class="form-center is-select">
          <van-field v-if="showInfo.isEdit" v-model="formInfo.handout" readonly clickable placeholder="请选择" @click="showInfo.handout = true"/>
          <van-field v-else v-model="formInfo.handout" readonly clickable disabled placeholder="请选择"/>
          <van-popup v-model="showInfo.handout" position="bottom">
            <van-picker show-toolbar :columns="handoutList" @confirm="confirm('handout', $event)" @cancel="showInfo.handout = false" />
          </van-popup>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="form-list form-text">
        <label class="form-text-left">是否独家赞助</label>
        <div class="form-text-right">{{formInfo.soleSponsor | formatSoleSponsor}}</div>
      </div>
      <div class="form-list form-text">
        <label class="form-text-left">被赞助方类型</label>
        <div class="form-text-right">{{formInfo.sponsorType | formatSponsorType}}</div>
      </div>
      <div class="form-list form-text">
        <label class="form-text-left">受支持方所在城市</label>
        <div class="form-text-right">{{formInfo.supportedCity}}</div>
      </div>
      <div class="btn-box">
        <van-button type="primary" @touchstart="submit" v-if="showInfo.isEdit">提交</van-button>
        <van-button type="primary" v-else :disabled="!showInfo.isEdit">提交</van-button>
      </div>
    </div>
    <update-meeting-success v-else></update-meeting-success>
    <v-loading v-show="showInfo.loading"></v-loading>

    <!--<van-button type="primary" @touchstart="fullScreen('ios', true)">IOS横屏</van-button>
    <van-button type="primary" @touchstart="fullScreen('ios', false)">IOS竖屏</van-button>
    <van-button type="primary" @touchstart="fullScreen('android', true)">安卓横屏</van-button>
    <van-button type="primary" @touchstart="fullScreen('android', false)">安卓竖屏</van-button>-->
  </div>
</template>

<script>
import VLoading from '../components/v-loading'
import UpdateMeetingSuccess from '../components/update-meeting-success'
import { _formatMeetingTypeText } from '../assets/js/other'
import { androidMethods, iosMethods } from '../assets/js/app-methods'

export default {
  name: 'MeetingSignUp',
  data () {
    return {
      meetingCity: {
        province_list: {},
        city_list: {},
        county_list: {}
      }, // 省市区三级
      handoutList: [], // 讲义列表
      showInfo: {
        type: false,
        startTime: false,
        endTime: false,
        city: false,
        handout: false,
        loading: false,
        updateMeetingSuccess: false,
        isEdit: false
      },
      paramsInfo: this.$route.query, // app传递的登录信息
      formInfo: {
        type: '',
        title: '',
        startTime: '',
        endTime: '',
        city: '',
        person: '',
        mobile: '',
        number: null,
        handout: '',
        soleSponsor: '',
        sponsorType: '',
        supportedCity: '',
        patientMeeting: null,
        onlinePatientMeeting: null,
        speakers: [
          {
            pptType: null,
            pptId: ''
          }
        ]
      }, // 会议详情
      selectInfo: {
        type: null,
        province: '',
        city: '',
        county: ''
      }, // 选择值
      addressInfo: {
        province: [],
        city: [],
        county: []
      },
      appInfo: null,
      appInterval: null // app信息的定时器
    }
  },
  components: {
    VLoading,
    UpdateMeetingSuccess
  },
  created () {
    if (!this.paramsInfo.projectNo || !this.paramsInfo.messageId) {
      this.$toast('请选择正确的消息')
      return false
    }
    this.init()
  },
  watch: {
    // 监听IOS的信息获取
    appInfo (val) {
      // alert(val.token)
      // alert(val.oid)
      // alert(val.did)
      // alert(val.v)
      if (val && val.did && val.oid && val.v) {
        clearInterval(this.appInterval)
        this.initApp(val)
      }
    }
  },
  methods: {
    init () {
      // 将组件的方法定义至window上，让IOS调用
      window.pushAppInfo = this.pushAppInfo
      this.appInfo = iosMethods('getAppInfo', {action: 'appInfo'}) || androidMethods()
      // this.appInfo = {
      //   did: 'web_h8h1enw2414',
      //   v: '5.0.7',
      //   oid: 'du4135645770',
      //   token: 'fe195b03-7d50-4839-a7b7-1d6ad81a58dc'
      // }
    },
    // 初始化页面信息
    async initInfo () {
      try {
        this.showInfo.loading = true
        let resultAll = await Promise.all([
          this.$asyncAjax.getMeetingDetails({projectNo: this.paramsInfo.projectNo, messageId: this.paramsInfo.messageId}, {v: this.paramsInfo.v, did: this.paramsInfo.did, oid: this.paramsInfo.oid}),
          this.$asyncAjax.getProvinceList(),
          this.$asyncAjax.getHandoutList({projectNo: this.paramsInfo.projectNo, pageNum: 1, pageSize: 100})])
        this.showInfo.loading = false
        console.log(resultAll)
        this._tools._getDataType(resultAll[1]) !== 'Array' && (resultAll[1] = [])
        this._tools._getDataType(resultAll[2].list) !== 'Array' && (resultAll[2].list = [])
        // 取出有ID值讲义
        let tempHandoutList = resultAll[2].list.filter(item => {
          return item.id
        })
        tempHandoutList = tempHandoutList.concat(resultAll[2].list)
        // 通过fileName去重
        tempHandoutList = this._tools._uniqueArrayAttributes(tempHandoutList, 'fileName')
        let handoutList = tempHandoutList.map(item => {
          return {
            text: item.fileName,
            fileUrl: item.fileUrl,
            pptType: item.pptType,
            id: item.id
          }
        })
        // 无会议或审核失败
        !resultAll[0].id || resultAll[0].status === 2 ? this.showInfo.isEdit = true : this.showInfo.isEdit = false
        Object.assign(this.selectInfo, {
          type: resultAll[0].type
        })
        Object.assign(this.formInfo, {
          type: _formatMeetingTypeText(resultAll[0].type) || '',
          title: resultAll[0].theme,
          startTime: resultAll[0].startTime, // 无时间时为当前时间
          endTime: resultAll[0].endTime, // 无时间时为当前时间
          person: resultAll[0].leader,
          mobile: resultAll[0].mobile,
          number: resultAll[0].peopleNum,
          soleSponsor: resultAll[0].soleSponsor,
          sponsorType: resultAll[0].sponsorType,
          supportedCity: resultAll[0].supportedCity,
          patientMeeting: resultAll[0].patientMeeting,
          onlinePatientMeeting: resultAll[0].onlinePatientMeeting,
          city: resultAll[0].address,
          handout: resultAll[0].speakers[0] ? resultAll[0].speakers[0].fileName : '',
          speakers: [
            {
              pptType: resultAll[0].speakers[0] ? resultAll[0].speakers[0].pptType : '',
              pptId: resultAll[0].speakers[0] ? resultAll[0].speakers[0].pptId : ''
            }
          ]
        })
        this._customSortArray(resultAll[1], 'id')
        this.meetingCity.province_list = this.formatArea(resultAll[1])
        this.addressInfo.province = resultAll[1]
        this.handoutList = handoutList
        this.changeCity(null, [{code: resultAll[0].province || resultAll[1][0].code}], 0)
      } catch (e) {
        this.showInfo.loading = false
        console.log(e)
      }
    },
    // 初始化APP信息
    initApp (loginInfo) {
      Object.assign(this.paramsInfo, {
        did: loginInfo.did,
        v: loginInfo.v,
        oid: loginInfo.oid,
        token: loginInfo.token
      })
      this._tools._setLocalStorage('sn', this.paramsInfo.did)
      this._tools._setLocalStorage('v', this.paramsInfo.v)
      this._tools._setLocalStorage('openId', this.paramsInfo.oid)
      this._tools._setLocalStorage('token', this.paramsInfo.token)
      this.initInfo()
    },
    // 接收IOS的APP信息
    pushAppInfo (res) {
      this.appInfo = JSON.parse(res)
    },
    // 提交按钮
    async submit () {
      console.log(this.formInfo)
      let required = {
        type: '请选择项目类型',
        title: '请输入会议主题',
        startTime: '请选择开始时间',
        endTime: '请选择结束时间',
        city: '请选择举办城市',
        person: '请输入项目负责人',
        mobile: '请输入手机号',
        number: '请输入参会人数',
        handout: '请选择讲义'
      }
      for (let key in required) {
        if (!this.formInfo[key]) {
          this.$toast(required[key])
          return false
        }
      }
      if (!this._tools._checkPhone(this.formInfo.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      let params = {
        id: this.paramsInfo.meetingId,
        projectNo: this.paramsInfo.projectNo,
        type: this.selectInfo.type,
        theme: this.formInfo.title,
        startTime: this.formInfo.startTime,
        endTime: this.formInfo.endTime,
        address: this.formInfo.city,
        leader: this.formInfo.person,
        mobile: this.formInfo.mobile,
        peopleNum: this.formInfo.number,
        patientMeeting: this.formInfo.patientMeeting,
        onlinePatientMeeting: this.formInfo.onlinePatientMeeting,
        soleSponsor: this.formInfo.soleSponsor,
        sponsorType: this.formInfo.sponsorType,
        supportedCity: this.formInfo.supportedCity,
        messageId: this.paramsInfo.messageId,
        speakers: this.formInfo.speakers
      }
      console.log(params)
      try {
        this.showInfo.loading = true
        let saveResult = await this.$asyncAjax.updateMeeting(params)
        this.showInfo.loading = false
        console.log(saveResult)
        this.showInfo.updateMeetingSuccess = true
      } catch (e) {
        this.showInfo.loading = false
        console.log(e)
      }
    },
    // 时间确认按钮
    confirmTime (key, val) {
      this.formInfo[key] = this._tools._dateToDate(val, 'dateTime')
      this.showInfo[key] = false
    },
    // 确认按钮
    async confirm (key, val) {
      console.log(val)
      switch (key) {
        case 'city':
          if (!val[2]) {
            this.$toast({
              message: '请选择城市'
            })
            return false
          }
          this.formInfo.city = `${val[0].name}${val[1].name}${val[2].name}`
          Object.assign(this.selectInfo, {
            province: val[0].code,
            city: val[1].code,
            county: val[2].code
          })
          break
        case 'handout':
          if (val.id) {
            this.formInfo.handout = val.text
            break
          }
          try {
            let params = {
              fileUrl: val.fileUrl,
              fileName: val.text,
              projectNo: this.paramsInfo.projectNo
            }
            let handoutResult = await this.$asyncAjax.saveHandout(params)
            console.log(handoutResult)
            Object.assign(this.formInfo.speakers[0], {
              pptId: handoutResult,
              pptType: val.pptType
            })
            this.formInfo.handout = params.fileName
          } catch (e) {
            console.log(e)
          }
          break
        case 'type':
          this.formInfo.type = val.text
          this.selectInfo.type = val.value
          break
      }
      this.showInfo[key] = false
    },
    // 省市区改变
    async changeCity (picker, value, index) {
      console.log(value, index)
      switch (index) {
        // 省
        case 0:
          try {
            let parentId = this.formatAreaId(this.addressInfo.province, value[0].code)
            let cityResult = await this.$asyncAjax.getCityList({parentId})
            console.log(cityResult)
            this._tools._getDataType(cityResult) !== 'Array' && (cityResult = [])
            this._customSortArray(cityResult, 'id')
            this.meetingCity.city_list = this.formatArea(cityResult)
            this.addressInfo.city = cityResult
            this.changeCity(null, [null, {code: cityResult[0].code}], 1)
          } catch (e) {
            console.log(e)
          }
          break
        // 市
        case 1:
          try {
            let parentId = this.formatAreaId(this.addressInfo.city, value[1].code)
            let areaResult = await this.$asyncAjax.getAreaList({parentId})
            console.log(areaResult)
            this._tools._getDataType(areaResult) !== 'Array' && (areaResult = [])
            this.meetingCity.county_list = this.formatArea(areaResult)
            this.addressInfo.county = areaResult
          } catch (e) {
            console.log(e)
          }
          break
        case 2:
          break
      }
    },
    // 省市区选择
    async inputHandle (key) {
      switch (key) {
        case 'city':
          break
      }
      this.showInfo[key] = true
    },
    // 转化省市区
    formatArea (arr) {
      let res = {}
      arr.forEach(item => {
        item.code && (res[item.code] = item.name)
      })
      return res
    },
    // 转化省市区的ID
    formatAreaId (arr, code) {
      for (let i = 0, len = arr.length; i < len; i++) if (arr[i].code === code) return arr[i].id
    },
    // 讲义按钮
    async getHandoutList () {
      try {
        this.showInfo.loading = true
        let handoutResult = await this.$asyncAjax.getHandoutList({projectNo: this.paramsInfo.projectNo, pageNum: 1, pageSize: 100})
        this.showInfo.loading = false
        console.log(handoutResult)
        this._tools._getDataType(handoutResult.list) !== 'Array' && (handoutResult.list = [])
        handoutResult.list = this._tools._uniqueArrayAttributes(handoutResult.list, 'fileName')
        let handoutList = handoutResult.list.map(item => {
          return {
            text: item.pptType === 1 ? item.caseTitle : item.fileName,
            fileUrl: item.fileUrl
          }
        })
        this.handoutList = handoutList
        this.showInfo.handout = true
      } catch (e) {
        console.log(e)
        this.showInfo.loading = false
      }
    },
    // 数组去重
    _customSortArray (arrVal, indexVal) {
      try {
        arrVal.sort(
          (obj1, obj2) => {
            let val1 = obj1[indexVal]
            let val2 = obj2[indexVal]
            if (val1 < val2) {
              return -1
            } else if (val1 > val2) {
              return 1
            } else {
              return 0
            }
          }
        )
        return this
      } catch (err) {
        console.log(err)
        return false
      }
    }
  },
  filters: {
    // 是否独家赞助
    formatSoleSponsor (val) {
      switch (+val) {
        case 0:
          return '否'
        case 1:
          return '是'
        default:
          return '-'
      }
    },
    // 被赞助方类型
    formatSponsorType (val) {
      switch (+val) {
        case 0:
          return '专业协会'
        default:
          return '-'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/style/var";
  .form-box{
    margin: 10px auto;
    padding:0 2%;
  }
  .form-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid $four-border-color;
    .form-left{
      width:25%;
      font-size:$sm-size;
      color:$title-text-color;
    }
    .form-center{
      width: 75%;
      /deep/ .van-field__control{
        text-align: right;
      }
    }
    .is-select{
      .van-cell{
        padding:10px 5px;
      }
    }
  }
  .form-text{
    padding:10px 0;
    .form-text-left{
      width:30%;
      color:$title-text-color;
    }
    .form-text-right{
      width: 70%;
      text-align: right;
      color:$secondary-text-color;
      margin-right:15px;
    }
  }
  .btn-box{
    display: flex;
    justify-content: center;
    margin-top:20px;
    .van-button{
      width:80%;
      border-radius: 25px;
      background-color: $main-color;
      font-size: $md-size;
      border: none;
    }
  }
  .van-icon-arrow{
    color:$disabled-color;
  }
</style>
