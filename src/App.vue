<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <div v-if="$route.meta.navbarActive">
      <navbar id="navigation"></navbar>
      <router-view/>
    </div>
    <div v-if="!$route.meta.navbarActive">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  //import Login from './components/Login'
  //export 和 export default均用于导出，但是export在引用时要加花括号，而export default可以直接被引用
  //https://www.jianshu.com/p/edaf43e9384f
  export default {
    name: 'App',
    //运训组件模板递归地调用自身，且便于调试，报错时会报名字，方便定位。
    // https://cn.vuejs.org/v2/api/#name
    components: {
      navbar: Navbar,
    }
  }

</script>

<style>
  #navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
