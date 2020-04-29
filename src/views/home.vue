<template>
  <div class="app-layout">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh" v-if="isLock">
      <a-layout-sider collapsible v-model="collapsed">
        <div class="logo">Hello</div>
        <a-menu theme="dark" :selectedKeys="[select]"  mode="inline">
          <a-menu-item  v-for="item in menuList" :key="item.key"  @click="changeMenu(item)">
            <a-icon type="pie-chart" />
            <span>{{item.name}}</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <a-layout-header style="background:rgb(48,48,49); padding: 0 10px" class="app-layout-header">
            <Header :lock="isLock" @changeIsLock="changeLock"></Header>
          </a-layout-header>
          <!--      <a-breadcrumb style="margin: 16px 0">-->
          <!--        <a-breadcrumb-item>User</a-breadcrumb-item>-->
          <!--        <a-breadcrumb-item>Bill</a-breadcrumb-item>-->
          <!--      </a-breadcrumb>-->
          <div :style="{background: '#000' }" class="app-content">
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <a-modal title="屏幕已锁定" v-model="visible" :maskClosable="false" :closable="false" :footer="null">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="doUnlock">
        <a-form-item label="输入密码解锁">
          <a-input
            v-decorator="['password', {rules: [{ required:true, message: '请输入密码' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            确认
          </a-button>
        </a-form-item>

      </a-form>
    </a-modal>

  </div>

</template>
<script>
    import Header from "@/components/Header";
    export default {
        name:'App',
        components:{
            Header
        },
        data() {
            return {
                isLock:true,
                collapsed: false,
                visible:false,
                select:'1',
                form: this.$form.createForm(this, { name: 'coordinated' }),
                menuList:[
                    {
                        key:'1',
                        name:'Grafana',
                        link:'/grafana'
                    },
                    {
                        key:'2',
                        name:'keepAlive',
                        link:'/keepalive'
                    },
                    {
                        key:'3',
                        name:'table',
                        link:'/table'
                    }
                ]
            }
        },
        mounted(){
            this.$router.push('/grafana')
        },
        methods:{
            doUnlock(){
                this.form.validateFields((err, values) => {
                    console.log(typeof values.password)
                    if(!err){
                        if(values.password === '123456') {
                            this.isLock = true
                            this.visible = false
                        } else {
                            this.$message.error('This is an error password')
                        }
                    }

                });
            },
            changeMenu(item){
                // console.log(item)
                this.select = item.key
                this.$router.push(`${item.link}`)
            },
            changeLock(status){
                console.log('status')
                this.isLock = !status
                this.visible=true
            }
        }
    };
</script>

<style>
  #components-layout-demo-side .logo {
    height: 32px;
    font-size: 20px;
    color:white;
    font-weight: bold;
    text-align: center;
    margin: 16px;
  }
  .app-layout-header{
    position: relative;
    z-index: 10;
  }
  .app-content{
    min-height: calc(100vh - 135px);
  }
  #components-layout-demo-side .ant-layout-footer{
    background:rgb(48,48,49);
    color:white;
  }
  #components-layout-demo-side .ant-layout-sider,#components-layout-demo-side .ant-layout{
    background:rgb(48,48,49);
  }
  #components-layout-demo-side .ant-menu-dark, #components-layout-demo-side .ant-menu-dark .ant-menu-sub{
    background: black;
  }
  #components-layout-demo-side .ant-menu.ant-menu-dark .ant-menu-item-selected,#components-layout-demo-side .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,#components-layout-demo-side .ant-layout-sider-trigger{
    background:rgba(255,255,255,.2);
  }

</style>
