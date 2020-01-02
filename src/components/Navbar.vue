<template>
  <div>
    <link rel="stylesheet" href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <mu-container class="bottomNavigation">
      <mu-bottom-nav >
        <mu-bottom-nav-item title="单词" icon="restore" to="/wordsSubject"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="游戏" icon="favorite" to="/game"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="统计" icon="timeline" to="/statistics"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="设置" icon="settings" to="/setting"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>

  import store from '../store.js'

  export default {
    name: 'Navbar',  //this is the name of the componen
    data() {
      return {
        username: store.state.username,
      }
    },
    methods: {}
  }
</script>


<style>
  .bottomNavigation{
    padding-left: 0 !important;
    padding-right:0;

  }
</style>
