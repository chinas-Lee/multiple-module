<template>
  <div class="update-meeting-success">
    <div class="icon">
      <img src="../assets/imgs/success.svg">
    </div>
    <p class="tips-text">您的会议申请成功，请等待审核</p>
  </div>
</template>

<script>

export default {
  name: 'UpdateMeetingSuccess'
}
</script>

<style scoped lang="scss">
  @import "../assets/style/var";
  .update-meeting-success{
    text-align: center;
    >.icon{
      margin:0 auto;
      margin-top:60px;
      width:64px;
      height:64px;
      >img{
        width:100%;
        height:100%;
      }
    }
    >.tips-text{
      margin:20px 0 0 0;
      color:$title-text-color;
      font-size: $md-size;
    }
  }
</style>
