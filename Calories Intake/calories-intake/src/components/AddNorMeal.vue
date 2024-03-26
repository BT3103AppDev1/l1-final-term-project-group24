<template>
    <div class ="date">
      <label for="Date">Date: </label>
      <datepicker id="Date" v-model="date" :format="'yyyy-MM-dd'"/>
      <h1>{{ date }}</h1>
    </div>

    <div class ="mealtype">
        <form id="selection">
            <label for="mealType">Meal Type: </label>
            <select name="mealType" id="mealType">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
            </select>
        </form>
    </div>

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
    async inputMeal() {
      axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${document.getElementById("mealName").value}`, {
      headers: { 'X-Api-Key': 'Ljn/8+fBf3VItM38d5R/cw==7qzsCiFXen3sEHi5' },
      })
      .then(response => {
        this.calories = response.data.items[0].calories;
        this.mealName = document.getElementById("mealName").value;
      });
    },
  
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