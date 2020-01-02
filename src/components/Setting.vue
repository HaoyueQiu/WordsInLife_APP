<template>
  <div>
    <p> this is setting</p>
    <button id="logoutButton" @click="handlerLogout">Logout</button>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    name: "Setting",
    data() {

    },
    methods: {
      handlerLogout(e) {
        store.logoutAction();
        //this.$toasted.show('you have been logged out.',{icon:'fingerprint'})
        this.$router.push('/login');
      },
    }
  }
</script>

<style scoped>

</style>
