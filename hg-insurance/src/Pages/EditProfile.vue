<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <h1>Edit Profile</h1>
    </div>
  </div>
</template>

<style>

</style>

<script>
  import AppNav from '../components/AppNav.vue'
  import SideBar from '../components/SideBar.vue'

  export default {
    data() {
      return {
        
      }
    },
    components: {
      AppNav,   
      SideBar
    } 
  }

</script>

