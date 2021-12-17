<template>
    <nav>
        <a href="">Home Page </a>
        <router-link class="button" to="" v-on:click="logout">Logout</router-link>
    </nav>
</template>

<style scoped>
*{
    margin: 0;
}

.button{
    padding: 15px 30px;
    border: none;
    background-color: #ff7e1b;
    border-radius: 5px;
    font-size: medium;
    margin-left: 20px;
    color: white;
}
nav {
    display: flex;
    justify-content: right;
    align-items: center;
    height: 80px;
    background-color: white;
    align-content: center;
    margin: 10px 15px 50px 15px;
    padding: 0 50px;
    border-radius: 5px;
    box-shadow: 2px 3px 10px #8e8e8e;
    width: 100%;

}
span{
    color: black;
}
nav > a{
    text-decoration: none;
    font-size: large;
    color: rgb(42, 42, 255);
}
</style>

<script>
    // import mapGetters from 'vuex'
    export default{
        name:'AppNav',
        methods: {
            logout(){
                localStorage.removeItem('token');
                this.$router.push({name:"Login"});
            }
        },
        // computed: {
        //     ...mapGetters([user])
        // }
        
    }
</script>