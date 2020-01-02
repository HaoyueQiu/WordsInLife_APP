<template>
  <div class="container">
    <h1>账号密码登录</h1>
    <div class="wrapper">
      <div>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="loginForm.username" class="form-control"
                   v-bind:class="{'is-invalid': loginForm.usernameError}" id="username" placeholder="">
            <div v-show="loginForm.usernameError" class="invalid-feedback">{{ loginForm.usernameError }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="loginForm.password" class="form-control"
                   v-bind:class="{'is-invalid': loginForm.passwordError}" id="password" placeholder="">
            <div v-show="loginForm.passwordError" class="invalid-feedback">{{ loginForm.passwordError }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
      </div>
      <div>
        <p class="middleText">-其它方式-</p>
        <p class="middleText">微信登录</p>
        <p class="middleText">QQ登录</p>
      </div>
    </div>
    <br>
    <p> New User?
      <router-link to="/register">Click to Register!</router-link>
    </p>
    <p>
      Forgot your password?
      <!--重置密码功能
        。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
      -->
      <a href="#">Click to Reset It!</a>
    </p>
  </div>
</template>

<script>
  import axios from 'axios'
  import Alert from './Alert'
  import store from '../store.js'

  export default {
    name: 'Login',
    components: {},
    data() {
      return {
        sharedState: store.state,
        alertVariant: 'info',
        alertMessage: 'Congratulations, welcome to Words In life!',
        loginForm: {
          username: '',
          password: '',
          submitted: false,
          errors: 0,
          usernameError: null,
          passwordError: null
        }
      }
    },
    methods: {
      onSubmit(e) {
        console.log('login submit');
        this.loginForm.submitted = true;  // 先更新状态
        this.loginForm.errors = 0;
        if (!this.loginForm.username) {
          this.loginForm.errors++;
          this.loginForm.usernameError = 'Username required.'
        } else {
          this.loginForm.usernameError = null
        }
        if (!this.loginForm.password) {
          this.loginForm.errors++;
          this.loginForm.passwordError = 'Password required.'
        } else {
          this.loginForm.passwordError = null
        }
        if (this.loginForm.errors > 0) {
          // 表单验证没通过时，不继续往下执行
          return false
        }
        //通过 axios 连接前后端，能够调用后端API，以下实现了auth，获得token
        //const path = 'http://localhost:5000/api/tokens'
        const path = '/tokens';
        // axios 实现Basic Auth需要在config中设置 auth 这个属性即可
        this.$axios.post(path, {}, {
          auth: {
            'username': this.loginForm.username,
            'password': this.loginForm.password,
          }
        }).then((response) => {
          //handle success;
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('info:username', this.loginForm.username);
          // store.resetNotNewAction()
          store.state.username = this.loginForm.username;
          //虚假权限管理，后期修改！
          if (this.loginForm.username == "root") {
            store.state.authority = true;
          }
          store.loginAction();
          this.$router.push({path: '/wordsSubject'})
          //this.$router.push({path:`/profile${this.loginForm.username}`})
        })
          .catch((error) => {
            //handle error
            this.loginForm.passwordError = 'password Error!';
            console.log(error.response);
          })

      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: 66.7% 33.3%;
  }

  .middleText{
    text-align: center;
  }
</style>
