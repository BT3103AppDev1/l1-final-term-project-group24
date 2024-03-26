<template>
    <div class ="date">
      <label for="Date">Date: </label>
      <datepicker id="Date" v-model="date" :format="'yyyy-MM-dd'"/>
    </div>
    <div class ="mealtype">
        
        <form id="selection">
            
            <!-- <date-pick v-model="date" :displayFormat="'DD.MM.YYYY'"></date-pick> -->

            <label for="mealType">Meal Type: </label>
            <select name="meal" id="mealType">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
            </select>

        </form>
    </div>
<<<<<<< HEAD:Calories Intake/calories-intake/src/components/AddNorMeal.vue

    <div class="calories">
      <label for="mealName">Meal: </label>
      <input type="text" id="mealName" required="" placeholder="Search meal">
      <button id="searchbutton" type="button" v-on:click="inputMeal"> Search </button>
      <pre>{{ calories }} {{ mealName }}</pre>
    </div>
    <button id="addMealButton" type="button" v-on:click="addMeal"> Add </button>

    <!-- <div class="addMeal"> 
      

      <router-link to="/addCusMeal" tag="button" custom v-slot="{ navigate }"
    >
        <button @click="navigate" role="link"> Add Customise Meal </button>
      </router-link>
    </div> -->
=======
>>>>>>> parent of d9f439f (add meal done):Calories Intake/calories-intake/src/components/AddMeal.vue
</template>

<script>
import axios from '@/components/CaloriesAPI.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { 
    Datepicker 
  },
  data() {
    return {
      date: null,
    };
  },

  mounted() {
    async function changeDateFormat(date) {}
  }
}
</script>

<style>
</style>