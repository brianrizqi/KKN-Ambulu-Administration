<template>
  <div>

  </div>
</template>

<script>
  import store from '@/store';

  export default {
    name: "Logout",
    created() {
      store.dispatch('authLogout');
      this.$router.push({
        name: 'Login'
      })
    }
  }
</script>

<style scoped>

</style>
