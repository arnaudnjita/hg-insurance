<template>
  <div class="login-box">
    <nav>
      <a href>About</a>
      <va-button gradient :rounded="false" :color='"#ff7e1b"' class="signin-button" >Sign in</va-button>
    </nav>
    <va-form
      class="form-div"
      @submit.prevent="login"
    >
      <h2 class="display-3">Login</h2>
      <va-input 
        class="input"
        v-model="email" 
        type="email" 
        placeholder="Enter username" 
        :error="isError" 
        @click='isError=false; isAlert=false' />
      <va-input
        class="input"
        v-model="password"
        type="password"
        placeholder="Enter password"
        :error="isError"
        @click='isError=false; isAlert=false'
      />
      <p style="font-size:small" v-show="isAlert">Incorrect email or password</p>
      <va-button
        class="login-btn"
        gradient
        :color='"#ff7e1b"'
        @click="login()"
        :rounded = 'false'
        >Proceed</va-button
      >
      <router-link class="rl" to="/forgot-password"
        >Forgot password ?</router-link
      >
    </va-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      isError: false,
      isAlert: false
    };
  },
  methods: {
    async login() {
      await axios
        .post("login/", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.tokens.access);
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("staff", response.data.is_staff);
          localStorage.setItem("user_name", response.data.username);
          this.isError = false
          

          if (response.data.is_staff == true) {
            this.$router.push({ name: "Dashboard" });
          } else {
            this.$router.push({ name: "MyDashboard" });
          }
        })
        .catch((error) => {
          if (error.response) {
            this.isError = true
            this.isAlert = true
        }});
    },
  },
  mounted() {
    
  },
};
</script>

<style scoped>
.form-div > .rl {
  text-decoration: none;
  color: blue;
  font-size: small;
  opacity: 0.8;
}
nav {
  display: flex;
  height: 70px;
  box-shadow: 2px 3px 10px #8e8e8e;
  margin-bottom: 100px;
  align-items: center;
  justify-content: right;
  padding: 5px 20px;
  background-color: white;
}
nav > a {
  text-decoration: none;
  color: blue;
  margin-right: 10px;
}

.signin-button {
    padding: 12px 15px;
    font-size: medium;
    margin-left: 20px;
    color: white;
}
.login-box {
  text-align: center;
  height: 100vh;
}
.form-div {
  display: grid;
  width: 350px;
  margin: 0 auto 0 auto;
  padding: 40px 50px 40px 50px;
  box-shadow: 2px 3px 10px #8e8e8e;
  border-radius: 5px;
  background-color: white;
}
.form-div > .input {
  margin: 10px 0;
  /* padding: 3px 0; */
  border: none;
  border: 1px solid rgba(128, 128, 128, 0.179);
  border-radius: 5px;
  background-color: #0000ff10;
}
.login-btn {
  background-color: #ff7e1b;
  margin: 10px 0 20px 0;
  padding: 12px 15px;
}
.signin-btn {
  padding: 10px 20px;
  background-color: #ff7e1b;
  margin: 0 0 0 15px;
  border: none;
  border-radius: 5px;
  font-size: medium;
  color: white;
}
h2 {
  margin-bottom: 20px;
  opacity: 0.6;
}
</style>
