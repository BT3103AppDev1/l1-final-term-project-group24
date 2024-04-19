<template>
  <button @click="showModal = true" class="add-meal-button"> + Add Meal</button>
  <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
    <div class="modal">
      <div class="modal-header">
        <h2>Add Meal 🍅</h2>
        <button @click="showModal = false" class="close-button">&times;</button>
      </div>

      <div class="modal-body">
        <div class="field">
          <label for="meal-date">Select Date: </label>
          <input type="date" id="meal-date" v-model="mealDate">
        </div>

        <div class="field">
          <label for="meal-type">Meal Type: </label>
          <select id="meal-type" v-model="mealType">
            <option disabled value="">Select one</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snacks</option>
          </select>
        </div>

        <div class="field">
          <label for="meal-name">Meal Name: </label>
          <div class="field search-field">
            <input type="text" id="meal-name" v-model="mealName" placeholder="Type meal name">
            <button @click="inputMeal" class="button">Search Meal</button>
            {{ mealName }}: {{ calories }}
          </div>
        </div>

      <Customise @addedCus = "update"/>
      <div class="modal-footer">
        <button @click="addMeal" class="button">Add</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import firebaseApp from '../firebase.js';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Customise from './Customise.vue';
const db = getFirestore(firebaseApp);

export default {
  components: {
    Customise
  },

  data() {
    return {
      showModal: false,
      mealDate: new Date().toISOString().substr(0, 10),
      mealType: '',
      mealName: '',
      calories: null,
      searchResults: [], 
      selectedMeal: null,
      showError: false  
    };
  },
  methods: {
    async inputMeal() {
      axios.get(`https://api.calorieninjas.com/v1/nutrition?query=one person of ${this.mealName}`, {
        headers: { 'X-Api-Key': 'Ljn/8+fBf3VItM38d5R/cw==7qzsCiFXen3sEHi5' },
      })
      .then(response => {
        if (response.data.items.length > 0) {
          this.calories = response.data.items[0].calories;
          this.showError = false;  // Hide error message if items are found
        } else {
          this.calories = null;
          this.showError = true;  // Show error message if no items are found
        }
      })
      .catch(error => {
        console.error("Error fetching meal information: ", error);
        this.showError = true;  // Show error message on API error
      });
    },

    selectMeal(meal) {
      this.mealName = meal.name;
      this.calories = meal.calories;
    },

    async addMeal() {
      try {
        const docRef = await setDoc(doc(db, this.mealDate, this.mealType),{
        mealName: this.mealName, calories: this.calories
        })
        this.showModal = false
        this.$emit("added")
      }
      catch(error) {
        console.error("Error adding document: ", error);
      }
    },

    update() {
        this.$emit("added")
        this.showModal = false
    }
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal {
  background: #ffefd5; 
  padding: 20px;
  border-radius: 20px;
  width: 350px; 
  height: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; 
}

.close-button {
  position: absolute;
  right: 20px; 
  top: 20px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.search-field {
  display: flex;
  align-items: center; 
  gap: 10px; 
}

.search-field input[type="text"] {
  flex-grow: 1; 
}

.search-field button {
  flex-shrink: 0; 
}


.field label {
  margin-bottom: 5px;
}

.field input[type="date"],
.field select,
.field input[type="text"] {
  width: 100%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; 
}

.button {
  background-color: #FFA500; 
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px; 
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  width: 100%; 
}

.modal-footer .button {
  width: 100%; 
  margin-top: 10px; 
}
</style>