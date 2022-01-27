<template>
  <nav>
    <p style="margin-left: 50px; font-size: large; color: #3c3c3c">
      Welcome {{ username }} !
    </p>

    <a href="/" style="margin-left: auto">Home Page</a>
    <va-button
      gradient
      :color="'#ff7e1b'"
      :rounded="false"
      class="button"
      v-on:click="logout()"
      >Logout</va-button
    >
  </nav>
</template>

<style scoped>
* {
  margin: 0;
}

.button {
  padding: 12px 15px;
  font-size: medium;
  margin: 0 20px;
  color: white;
}
nav {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: white;
  margin: 10px 15px 40px 15px;
  padding: auto 50px;
  border-radius: 5px;
  box-shadow: 2px 3px 10px #8e8e8e;
  width: 100%;
}

nav > div > a {
  text-decoration: none;
  font-size: large;
  color: #2a2aff;
}
</style>

<script>
export default {
  name: "AppNav",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    this.username = localStorage.getItem("user_name");
  },
};
</script>
