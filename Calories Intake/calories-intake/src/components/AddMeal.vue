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
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { Datepicker },
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