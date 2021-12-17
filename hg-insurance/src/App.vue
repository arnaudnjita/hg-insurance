<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  margin: 0;
  background-color: #ffe3ae48;
  height: 100vh;
}

.box-1 {
  height: 95vh;
  background-color: #ff7e1b;
  margin: 10px;
  border-radius: 5px;
  width: 100%;
}

.box-2 {
  height: 95vh;
  /* background-color: #ffa60051; */
  margin: 10px;
  padding: 10px 25px;
}

.container {
  display: grid;
  grid-template-columns: 20% 80%;
}
</style>

<script>
  export default {
    name: "App",
  };
</script>

