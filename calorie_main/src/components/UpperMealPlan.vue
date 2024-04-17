<template>
    <MealPlan @up="handleReset" :key="componentKey" />
</template>
  
<script>
import MealPlan from './MealPlan.vue'
  
export default {
    components: {
      MealPlan
    },
    data() {
      return {
        componentKey: 0,
      };
    },
    methods: {
      handleReset() {
        this.componentKey += 1; // Increment key to force re-render
      }
    }
  }
  </script>