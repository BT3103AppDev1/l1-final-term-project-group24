<script>
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue'
import MealPlan from '@/components/MealPlan.vue';

export default {
    components: {
        Header,
        SideBar,
        MealPlan
    }
}
</script>

<template>
  <Header/>
  <SideBar/>
  <MealPlan/>
</template>

<style scoped>
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: beige;
}

body {
  padding:0;
  margin: 0;
}
</style>
