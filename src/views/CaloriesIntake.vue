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
  <div id="calorie-container">
    <div id="side-bar">
      <SideBar :totCalories="totalCal"/>
    </div>
    <div id="meal-plan">
      <MealPlan :totCalories="totalCal" @update-total-calories = "handleUpdateData"/>
    </div>
  </div>
</template>

<style scoped>

</style>
