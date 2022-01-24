<template>
    <div style="display:grid; height:100vh; width:100vw; ">
        <div class="box">
        <h1> Uh-oh! :(</h1>
        <p class="marg">It looks like you're experiencing some network issues. Please take a breathe and <a href="#" @click="$router.go(-1)">Click here</a>to try again</p> or <router-link to="/">login</router-link>
        </div>
    </div>
</template>

<script>
export default{
    props: {
        resource:{
            type: String,
            required: true,
            default: 'page'
        }
    }
}
</script>

<style scoped>
*{
    padding: 3px;
    line-height: 1.5rem;
}
.box{
    width:500px; padding:60px 50px; background-color:white; display: grid; place-items:center; text-align:center; margin: auto; border-radius: 0 0 5px 5px; box-shadow: 3px 5px 15px #8e8e8e;
}
.marg {
    margin-top: 20px;
    font-size: medium;
}
h1{
    font-size: xx-large;
}
p{
    color: grey;
}
</style>