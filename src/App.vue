<template>
  <div class="app">
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
