<template>
    <nav>
        <p style="margin-left:50px; font-size:large; color:#3c3c3c">Welcome {{ username }} !</p>

        <div style="text-align:right; margin-right:50px">
            <a href>Home Page</a>
            <router-link class="button" to v-on:click="logout">Logout</router-link>
        </div>
    </nav>
</template>

<style scoped>
* {
    margin: 0;
}

.button {
    padding: 15px 30px;
    border: none;
    background-color: #ff7e1b;
    border-radius: 5px;
    font-size: medium;
    margin-left: 20px;
    color: white;
}
nav {
    display: grid;
    grid-template-columns: auto auto;
    /* justify-content: right; */
    /* align-items: center; */
    height: 80px;
    background-color: white;
    align-content: center;
    margin: 10px 15px 50px 15px;
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
// import mapGetters from 'vuex'
export default {
    name: 'AppNav',
    data() {
        return {
            username: ""
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: "Login" });
        }
    },
    mounted() {
        let response = localStorage.getItem("token");
        if (response == null) {
            this.$router.push({ name: "Login" });
        }
        
        this.username = localStorage.getItem("user_name");
    },
    // computed: {
    //     ...mapGetters([user])
    // }

}
</script>