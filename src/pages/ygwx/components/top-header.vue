<template>
  <div class="top-header">
    <van-icon name="arrow-left" @touchstart="backPage" />
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'top-header',
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '会议申请'
    }
  },
  methods: {
    // 返回
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  .top-header{
    text-align: center;
    position: relative;
    padding:15px 0;
    background-color: #FFF;
    font-size:18px;
    color:#333;
    >.van-icon-arrow-left{
      position: absolute;
      left:5%;
      top:50%;
      z-index:2;
      font-size:20px;
      margin-top:-10px;
      color:#666;
    }
  }
</style>
