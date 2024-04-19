<script>
import SideBar from '@/components/SideBar.vue';
import MealPlan from '@/components/MealPlan.vue';
import PopUp from '@/components/PopUp.vue';

export default {
  components: {
      SideBar,
      MealPlan,
      PopUp
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
  <SideBar :totCalories="totalCal"/>
  <MealPlan :totCalories="totalCal" @update-total-calories = "handleUpdateData"/>
  <PopUp/>
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
