<template>
  <div class="sidebar">
    <div class="logo">
      <img class="img" src="../assets/logo-mdb-vue-small.png" alt="" />
    </div>
    <router-link to="/dashboard" class="links">Dashboard</router-link>
    <router-link to="/insurance" class="links">Insurance</router-link>
    <router-link to="/customers" class="links">Customers</router-link>
    <router-link to="/activations" class="links">Activations</router-link>
    <router-link to="/edit-profile" class="links">Edit Profile</router-link>
  </div>
</template>

<style scoped>
.img {
  width: 160px;
}
.logo {
  text-align: center;
  margin-bottom: 20px;
  font-size: x-large;
  font-weight: bolder;
}
.sidebar {
  display: grid;
  width: 100%;
  background-color: #ff7e1b;
  border-radius: 5px;
  padding: 50px 0;
}
.links {
  padding: 20px 0;
  margin: 10px 0;
  text-align: center;
  text-decoration: none;
  color: white;
}

.router-link-active {
  background-color: #fff7e8;
  border-radius: 50px 0 0 50px;
  margin-left: 5px;
  color: teal;
  font-weight: bold;
}
.links:hover {
  background-color: #fff7e890;
  border-radius: 50px 0 0 50px;
  margin-left: 5px;
  color: teal;
}
</style>

<script>
export default {
  name: "SideBar",
  data() {
    return {};
  },
};
</script>
