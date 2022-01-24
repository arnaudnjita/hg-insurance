<template>
    <div style="display:grid; height:100vh; width:100vw; ">
        <div class="box">
        <h1> Oops! :(</h1>
        <p class="marg">Sorry the {{resource}} you're looking for doesn't exist</p>
        <router-link class="marg" :to="{name: 'Dashboard'}">Back to Homepage</router-link>
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
    width:500px; padding:60px 0; background-color:white; display: grid; place-items:center; text-align:center; margin: auto; border-radius: 0 0 5px 5px; box-shadow: 3px 5px 15px #8e8e8e;
}
.marg {
    margin-top: 20px;
}
h1{
    font-size: xx-large;
}
p{
    color: grey;
}
</style>