<template>
  <div class="v-loading">
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>

<script>
export default {
  name: 'VLoading'
}
</script>

<style scoped lang="scss">
  .v-loading{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
    background-color: rgba(0,0,0,.06);
    .van-loading{
      text-align: center;
      margin-top:80%;
    }
    /deep/ .van-loading__spinner{
      width:60px;
      height:60px;
    }
  }
</style>
