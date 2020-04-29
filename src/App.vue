<template>
  <div class="app">
    <h2>测试git 测试commit</h2>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
      data(){
          return{

          }
      },
      mounted() {
          console.log('sdfsdg', this.$store.state)
      }

  }
</script>
<style>
  .app{
    width:100%;
    min-height: 100vh;
  }
</style>
