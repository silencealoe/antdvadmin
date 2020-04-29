<template>
  <div>
    <div class="userInfo" @click="showDrawer">
      <span>Hi,{{username}}</span>
      <a-avatar style="color:black; backgroundColor: #fde3cf;margin-left: 10px">{{username.substring(0,1)}}</a-avatar>
    </div>
    <a-drawer
      title="个人中心"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :headerStyle="{background:'#000'}"
      :afterVisibleChange="afterVisibleChange"
    >
      <a-menu>
        <a-menu-item @click="lockScreen">
          <a-icon type="lock"/>
          锁定
        </a-menu-item>
        <a-menu-item>
          <a-icon type="key"/>
          修改密码
        </a-menu-item>
        <a-menu-item>
          <a-icon type="logout"/>
          注销
        </a-menu-item>
      </a-menu>
    </a-drawer>
  </div>
</template>

<script>
    export default {
        name: "Header",
        props:{
            isLock:{
                type:Boolean,
                default(){
                    return false
                }
            }
        },
        data(){
            return{
                visible: false,
                username:'陌生人'
            }
        },
        methods:{
            afterVisibleChange(val) {
                console.log('visible', val)
            },
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            lockScreen() {
                console.log('sdsfd')
                this.$emit('changeIsLock', true)

            }
        }
    }
</script>

<style scoped>
  .userInfo{
    color: white;
    float: right;
    cursor: pointer;
  }


</style>
