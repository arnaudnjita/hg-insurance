<template>
  <div class="container">
    <div class="box-1">
      <SideBarCus></SideBarCus>
    </div>
    <div class="box-2">
      <AppNav></AppNav>
      <!-- <div class="cards-div">  -->
      <CardStackCus></CardStackCus>
      <!-- <div style="display:flex; flex-direction:row; width:100%"> -->

      <!-- <div style="
            display:grid; grid-template-columns:auto auto; width:80%; height:200px; column-gap:5vw">
        <div style="
              margin: 80px 20px 0 20px; background-color:blue; padding:15px 30px 15px 15px; height: 180px; border-radius: 5px;
              box-shadow: 2px 3px 10px #8e8e8e; background-color: #ffffff;">
        <h1 style="
              text-align: right; margin-top: 90px; font-size: 35px">5</h1>
        <p style="
            color: #3c3c3c;
            font-size: large;">Active insurances</p>
        <div
          style="
                  display: grid;
                  place-items: center;
                  width: 130px;
                  height: 130px;
                  background-color: yellow;
                  z-index: 1;
                  margin: -210px 0 150px 15px;
                  border-radius: 5px;
                  box-shadow: 2px 3px 10px #8e8e8e;"
        ></div>
        </div>
      </div> -->
    </div>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<style>
.cards-div {
  display: grid;
  grid-template-columns: auto auto;
  padding: 25px;
  margin-top: 80px;
}
</style>

<script>
import AppNav from '../components/AppNav.vue'
import CardStackCus from '../components_cus/CardStackCus.vue'
import SideBarCus from '../components_cus/SideBarCus.vue'

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
    SideBarCus,
    CardStackCus
  }
}

</script>

