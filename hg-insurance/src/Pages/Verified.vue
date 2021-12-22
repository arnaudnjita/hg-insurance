<template>
    <div class="main">
        <div class="half">
            <h1>HG INSURANCE</h1>
        </div>
        <div class="overlay">
            <h1>Your account has been verified successfully</h1>
            <p>Click the button below to login</p>
            <button class="login-btn">Login</button>
        </div>
    </div>
    
</template>

<style scoped>
    .half{
        width: 100vw;
        height: 50vh;
        background-color: #ff7e1b;
    }
    .half > h1{
        font-size: 40px;
        color: white;
        text-align: center;
        padding-top: 50px;
    }
    .overlay{
        width: 500px;
        background-color: white;
        text-align: center;
        padding: 60px 20px;
        border-radius: 5px;
        box-shadow: 3px 5px 15px #414141;
        margin: -25vh auto 0 auto;
        
    }
    .overlay > h1{
        font-size: 20px;
        margin: 20px 0 15px 0;
        color: rgb(5, 150, 5);
    }
    .main{
        display: grid;
        text-align: center;
        width: 100vw;
    }
    .login-btn {
  padding: 13px 0;
  margin: 40px 0 20px 0;
  text-decoration: none;
  background-color: #ff7e1b;
  border: none;
  border-radius: 5px;
  font-size: medium;
  color: white;
  width: 150px;
}
.login-btn:hover {
  box-shadow: 1px 2px 12px grey;
}
.login-btn:active {
  transform: scale(0.98);
  box-shadow: 1px 2px 8px grey;
}
</style>

<script>
export default {

}
</script>