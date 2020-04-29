<template>
  <div class="app-login">
    <div class="login_box">
      <h2>Hello world</h2>
      <a-form layout="vertical" :form="form" @submit="doLogin">
        <a-form-item :colon="true" >
          <a-input
            v-decorator="['userName',{ rules: [{ required: true,max:10, pattern: new RegExp(/^(?!_)\w{3,9}/),message: 'error' }] }]"
            :help="userNameError() || '' "
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>

  </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    // import store from '../store/index'
    export default {
        name: "login",
        data(){
            return{
                form: this.$form.createForm(this, { name: 'horizontal_login' }),
            }
        },
        computed:{
            ...mapState('login',{
                username:state=>state.username
            })
        },
        mounted() {
          // console.log('userdsjfhksdj',this.$store.state.login.username)
          console.log('userdsjfhksdj',this.username)
        },
        methods:{
            ...mapMutations('login',['setUsernameAndPassword']),
            doLogin(){
                console.log(this.form.getFieldValue('password'))  // 获取password输入框的值
                console.log(this.form.getFieldsValue())  // 获取所有输入框的值
                const res = this.form.getFieldsValue()
                if(res.userName==='root' && res.password==='123456'){
                    const payload={ ...res }
                    this.setUsernameAndPassword(payload)
                    this.$router.replace('/')
                  // this.$store.commit('login/setUsernameAndPassword', payload)

                }

            },
            userNameError() {
                const { getFieldError, isFieldTouched } = this.form;
                console.log('usernameERR', isFieldTouched('userName'));
                console.log('username', getFieldError('userName')); // 获取输入框的错误信息
                // return isFieldTouched('userName') && getFieldError('userName');
                return '错误';
            },
        }
    }
</script>

<style scoped>
  .app-login{
    overflow: hidden;
    width:100%;
    height: 100vh;
    background: url('../assets/images/login/bg_login.jpg') no-repeat center top;
  }
  .login_box{
    margin:100px auto;
    width:500px;
    height: 240px;
    padding:20px 40px;
    background: rgba(255,255,255,.2);
    border-radius: 20px;
    -webkit-box-reflect:left 5px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.7)));
  }
  .login_box h2{
    text-align: center;
    font-weight: bold;
  }

</style>
