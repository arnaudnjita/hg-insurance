<template>
  <div class="login-box">
    <nav>
      <a href="">About</a>
      <button class="signin-btn">Sign in</button>
    </nav>
    <div class="form-div">
      <h2>Forgot Password</h2>

      <va-input
        class="input"
        v-model="email"
        type="email"
        placeholder="Enter email address"
      />
      <va-button
        gradient
        :color="'#ff7e1b'"
        :rounded="false"
        class="reset-btn"
        @click="resetPass()"
        >Reset</va-button
      >
      <va-button
        v-show="false"
        class="mr-2 mb-2"
        @click="$vaToast.init(successToast)"
        id="successToast"
        >Toast success</va-button
      >
      <router-link class="rl" to="/">Click here to login</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      successToast: {
        message: 'A link has been sent to you, check your email to reset your password',
        color: 'primary',
        position: 'top-right',
        duration: 6000,
        offsetY: 100
      },
    };
  },
  methods: {
    async resetPass() {
      await axios
        .post("reset-password-email/", {
          email: this.email,
        })
        .then((response) => {
          if (response.status == 200) {
            var elem = document.getElementById('successToast')
            elem.click()
            setTimeout(() => {
                this.$router.push({name: 'Login'})
                }, 3000);
          }
        })
        .catch((error) => {
          if (error.response) {
            var elem = document.getElementById('successToast')
            elem.click()
            this.successToast.message = "Please try again"
            this.successToast.color = "danger"
          }
        });
    },
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
  border: none;
  border: 1px solid rgba(128, 128, 128, 0.179);
  border-radius: 5px;
  background-color: #0000ff10;
}
.reset-btn {
  padding: 12px 15px;
  margin: 10px 0 20px 0;
  background-color: #ff7e1b;
  border: none;
  border-radius: 5px;
  font-size: medium;
  color: white;
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
