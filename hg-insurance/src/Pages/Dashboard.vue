<template>
  <div class="container">
    <div class="box-1">
      <SideBar></SideBar>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <!-- <div class="cards-div">  -->
        <CardStack></CardStack>
      <!-- </div> -->
    </div>
  </div>
</template>

<style>
  .cards-div{
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 25px;
    margin-top: 80px;
  }
</style>

<script>
  import AppNav from '../components/AppNav.vue'
  import CardStack from '../components/CardStack.vue'
  import SideBar from '../components/SideBar.vue'

  export default {
    data() {
      return {
        info: {
          info: ['Insurance Active', 'Cutomers', 'Insurance Expired'],
          images: ['https://img.icons8.com/ios-glyphs/30/000000/money--v1.png', 
          'https://img.icons8.com/fluency/48/000000/statistics.png', 
          'https://img.icons8.com/pastel-glyph/64/000000/graph--v1.png'],
          colors: ['blue', 'orange', 'red']
        }
        
      }
    },
    components: {
      AppNav,   
      SideBar,
      CardStack 
    },
    mounted() {
      
    },
  }

</script>

