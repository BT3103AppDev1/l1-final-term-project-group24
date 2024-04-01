<template>
  <AddMeal/>
  <Dashboard/>
</template>

<script>
import AddMeal from './components/AddMeal.vue'
import Dashboard from './components/DashBoard.vue'

export default {
  name: "App",
  components:{
    AddMeal,
    Dashboard
  },
  }
</script>

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