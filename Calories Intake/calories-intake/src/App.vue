<script>
import AddMeal from './components/AddMeal.vue'

export default {
  name: "App",
  components:{
    AddMeal
  },
  }
</script>

<template>
  <AddMeal/>
</template>

<style>
  #app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 30px;
  }
</style>