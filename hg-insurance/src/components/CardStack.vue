<template>
    <!-- <div> -->
        <div v-for="a in infos" :key="a" class="full-card" >  
            <div class="card-l">
                <h1 style="text-align: right; margin-top: 20px">0</h1>
                <p>{{a.title}}</p>
            </div>
            <div class="card-s" :style="{'background-color':a.color}">
                <img :src="a.image"/>
            </div>
        </div>
    <!-- </div> -->
</template>

<style scoped>
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
    margin-top: 50px;
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

</style>

<script>
export default {
    data() {
      return {
        infos: [
            {title:'Insurance Active', image:'https://img.icons8.com/color/80/000000/get-cash.png',color: 'blue' },
            {title:'Cutomers', image:'https://img.icons8.com/fluency/70/000000/statistics.png',color: 'orange' },
            {title:'Insurance Expired', image:'https://img.icons8.com/color/70/000000/expired.png', color: 'red' },
            
        ]
      }
    }
}
</script>