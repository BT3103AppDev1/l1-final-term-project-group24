<template>
    <div class="modal-body">
      <label for="meal-date">Select Date: </label>
        <input type="date" id="meal-date" v-model="mealDate">
      </div>

    <div class="meal-type">
      <label for="meal-type">Meal Type: </label>
      <select id="meal-type" v-model="mealType">
        <option disabled value="">Select one</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snacks</option>
      </select>
    </div>

    <div class="meal-name">
      <label for="meal-name">Meal Name: </label>
      <input type="text" id="meal-name" required="" placeholder="Enter meal name" v-model="mealName">
    </div>

    <div class="meal-calories">
      <label for="meal-calories">Meal Calories: </label>
      <input type="text" id="meal-calories" required="" placeholder="Enter meal name" v-model="calories">
    </div>

    <div class="addMeal"> 
      <button id="addMealButton" type="button" v-on:click="addMeal"> Add </button>
    </div>
</template>

<script>

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc} from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
  components: { 
    Datepicker
  },
  data() {
    return {
      date: null,
      calories: null,
      mealType: null,
      mealName: null
    };
  },
  methods: {
      async addMeal() {
      this.mealType = document.getElementById("mealType").value;
      try{
        const docRef = await setDoc(doc(db, "Calories", (this.date + this.mealType)),{
        Date: this.date, mealType: this.mealType, mealName: this.mealName
        })
        console.log(docRef)
      }
      catch(error) {
        console.error("Error adding document: ", error);
      }
    }
  },

  mounted() {
    async function changeDateFormat(date) {}
  }
}
</script>

<style>
</style>