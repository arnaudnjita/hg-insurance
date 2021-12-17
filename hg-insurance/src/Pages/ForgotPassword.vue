<template>
    <div class="login-box">
        <nav>
            <a href="">About</a>
            <button class="signin-btn">Sign in</button>
        </nav>
        <div class="form-div">
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Enter email address">
            <button class="login-btn">Reset password</button>
            <router-link class="rl" to="./login">Click here to login</router-link>
        </div>
    </div>
    
</template>

<script>
export default {
    name:'Login'
}
</script>

<style scoped>
    .form-div > .rl{
        text-decoration: none;
        color: blue;
        font-size: small;
        opacity: 0.8;
    }
    nav{
        display: flex;
        height: 70px;
        box-shadow: 2px 3px 10px #8e8e8e;
        margin-bottom: 100px;
        align-items: center;
        justify-content: right;
        padding: 5px 20px;
        background-color: white;
    }
    nav > a{
        text-decoration: none;
        color: blue;
        margin-right: 10px;
    }
    .login-box{
        text-align: center;
        height: 100vh;
    }
    .form-div{
        display: grid;
        width: 350px;
        margin: 0 auto 0 auto;
        padding: 40px 50px 40px 50px;
        box-shadow: 2px 3px 10px #8e8e8e;
        border-radius: 5px;
        background-color: white;
    } 
    .form-div > input{
        margin: 10px 0;
        padding: 12px;
        border: none;
        border: 1px solid rgba(128, 128, 128, 0.179);
        border-radius: 5px;
        background-color: #0000ff10;
    }
    .login-btn{
        padding: 13px 0;
        margin: 10px 0 20px 0;
        background-color: #ff7e1b;
        border: none;
        border-radius: 5px;
        font-size: medium;
        color: white;
    }
    .login-btn:hover{
        box-shadow: 1px 2px 12px grey;
    }
    .login-btn:active{
        transform: scale(0.98);
        box-shadow: 1px 2px 8px grey;
    }
    .signin-btn{
        padding: 10px 20px;
        background-color: #ff7e1b;
        margin: 0 0 0 15px ;
        border: none;
        border-radius: 5px;
        font-size: medium;
        color: white;
    }
    h2{
        margin-bottom: 20px;
        opacity: 0.6;
    }
</style>