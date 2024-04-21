<script>
import SideBar from '@/components/SideBar.vue';
import MealPlan from '@/components/MealPlan.vue';
import '@fortawesome/fontawesome-free/css/all.css'; 
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
      NavBar,
      SideBar,
      MealPlan,
  },

  data() {
    return {
      totalCal: 0
    };
  },

  methods: {
    handleUpdateData(newCal) {
      this.totalCal = newCal;
    }
  }
}
</script>

<template>
  <NavBar />
  <SideBar :totCalories="totalCal"/>
  <MealPlan :totCalories="totalCal" @update-total-calories = "handleUpdateData"/>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fuzzy Bubbles');

* {
  font-family: 'Fuzzy Bubbles';
}

#app {
  font-family: 'Fuzzy Bubbles';
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
