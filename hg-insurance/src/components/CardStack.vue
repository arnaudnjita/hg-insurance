<template>
    <!-- <div> -->
    <!-- <div v-for="(a, idx) in infos" :key="idx" class="full-card">  
            <div class="card-l">
                <h1 style="text-align: right; margin-top: 90px; font-size: 35px" v-if="a.title == 'Insurance Active'">{{activeinsurance}}</h1>
                <h1 style="text-align: right; margin-top: 90px; font-size: 35px" v-if="a.title == 'Cutomers'">{{customers}}</h1>
                <h1 style="text-align: right; margin-top: 90px; font-size: 35px" v-if="a.title == 'Insurance Expired'">{{expiredinsurance}}</h1>
                <p>{{a.title}}</p>
            </div>
            <div class="card-s" :style="{'background-color':a.color}">
                <img :src="a.image"/>
            </div>
    </div>-->
    <!-- </div> -->
    <div
        style="
            display:grid; grid-template-columns:auto auto auto; column-gap:2vw;  height:200px;"
    >
        <div class="card-l" v-for="(a, idx) in infos" :key="idx">
            <h1 class="card-n" v-show="a.title == 'Insurance Active'"><span>.</span>{{ activeinsurance }}</h1>

            <h1 class="card-n" v-show="a.title == 'Customers'"><span>.</span>{{ customers }}</h1>

            <h1 class="card-n" v-show="a.title == 'Insurance Expired'"><span>.</span>{{ expiredinsurance }}</h1>

            <p>{{ a.title }}</p>

            <div class="card-s" :style="{ 'background-color': a.color }">
                <img :src="a.image" />
            </div>
        </div>
    </div>
</template>

<!-- <style scoped>
.card-l{
    display: grid;
    text-align: left;
    width: 80%;
    height: 180px;
    background-color: #ffffff;
    grid-template-rows: auto auto auto;
    border-radius: 5px;
    box-shadow: 2px 3px 10px #8e8e8e;
    padding:15px 30px 15px 15px;
}
.full-card{
    justify-content: space-between;
}
.card-l > p {
    color: #3c3c3c;
    font-size: large;
    /* margin-top: 70px; */
}

.card-s{
    display: grid;
    place-items: center;
    width: 130px;
    height: 130px;
    background-color: blue;
    z-index: 1;
    margin: -210px 0 150px 15px;
    border-radius: 5px;
    box-shadow: 2px 3px 10px #8e8e8e;
   
}

</style> -->

<style scoped>
span {
  color: white;
}
.card-l {
    margin: 80px 20px 0 20px;
    background-color: blue;
    padding: 15px 30px 15px 15px;
    height: 180px;
    border-radius: 5px;
    box-shadow: 2px 3px 10px #8e8e8e;
    background-color: #ffffff;
}
.card-n {
    text-align: right;
    margin-top: 90px;
    /* position: relative; */
    bottom: 0;
    font-size: 35px;
}

.card-l > p {
    color: #3c3c3c;
    font-size: large;
    /* margin-top: 70px; */
}

.card-s {
    display: grid;
    place-items: center;
    width: 130px;
    height: 130px;
    z-index: 1;
    margin: -210px 0 150px 15px;
    border-radius: 5px;
    box-shadow: 2px 3px 10px #8e8e8e;
}
</style>

<script>
import axios from 'axios'
import NProgress from 'nprogress'

export default {
    data() {
        return {
            customers: '',
            activeinsurance: '',
            expiredinsurance: '',
            infos: [
                { title: 'Insurance Active', image: 'https://img.icons8.com/color/80/000000/get-cash.png', color: 'blue' },
                { title: 'Customers', image: 'https://img.icons8.com/fluency/70/000000/statistics.png', color: 'orange' },
                { title: 'Insurance Expired', image: 'https://img.icons8.com/color/70/000000/expired.png', color: 'red' },

            ]
        }
    },

    mounted() {
        this.getMe()
    },

    methods: {
        async getMe() {
            NProgress.start()
            await axios.get("customers", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    this.customers = response.data.count;
                }
            })
            .catch(error => {
                if (error.response && error.response == '404') {
                    console.log(error)
                    this.$router.push({
                        name: '404Resource',
                        params: { resource: 'customer' }
                    })
                }
                // else {
                //     this.$router.push({name: 'NetworkError'})
                // }
            })            

            await axios.get("active-activations", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    this.activeinsurance = response.data.count;
                }
            })
            .catch(error => {
                if (error.response && error.response == '404') {
                    console.log(error)
                    this.$router.push({
                        name: '404Resource',
                        params: { resource: 'customer' }
                    })
                }
            //     else {
            //         this.$router.push({name: 'NetworkError'})
            //     }
            })

            await axios.get("expired-activations", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    this.expiredinsurance = response.data.count;
                }
            })
            .catch(error => {
                if (error.response && error.response == '404') {
                    console.log(error)
                    this.$router.push({
                        name: '404Resource',
                        params: { resource: 'customer' }
                    })
                }
                // else {
                //     this.$router.push({name: 'NetworkError'})
                // }
            })
            NProgress.done()
        }
    },
}
</script>