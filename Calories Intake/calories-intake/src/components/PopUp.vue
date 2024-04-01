<template>
    <button @click="showModal = true" class="add-meal-button"> + Add Meal</button>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal">
            <div class="modal-header">
                <h2>Add Meal 🍅</h2>
                <button @click="showModal = false" class="close-button">&times;</button>
            </div>

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

            <div class="meal-selection">
                <label for="meal-selection">Select Meal: </label>
            </div>
        <div class="modal-footer">
        <button @click="addMeal">Add</button>
    </div>
    </div>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showModal = ref(false);
    const mealDate = ref(new Date().toISOString().substr(0, 10));
    const mealType = ref('');
    const selectedMeal = ref('');
    const meals = ref([]); // This should be populated with API data

    const addMeal = () => {
      // Implement API call to add meal
      console.log(`Adding meal: ${selectedMeal.value} on ${mealDate.value} for ${mealType.value}`);
      // After adding the meal, close the modal and reset fields
      showModal.value = false;
      mealDate.value = new Date().toISOString().substr(0, 10);
      mealType.value = '';
      selectedMeal.value = '';
    };

    return {
      showModal,
      mealDate,
      mealType,
      selectedMeal,
      meals,
      addMeal
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
  width: 350px; /* Adjust the width as necessary */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; /* Relative positioning for the close button */
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
  flex-direction: column; /* Stack children vertically */
  margin-bottom: 10px; /* Space between each field */
}

.field label {
  margin-bottom: 5px; /* Space between label and input */
}

.field input[type="date"],
.field select,
.field input[type="text"] {
  width: 100%; /* Full width of the container */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* To include padding and border in the width */
}

.button {
  background-color: #FFA500; /* Orange color for the buttons */
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px; /* Additional space above the button */
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  width: 100%; /* Full width of the container */
}

.modal-footer .button {
  width: 100%; 
  margin-top: 10px; 
}
</style>