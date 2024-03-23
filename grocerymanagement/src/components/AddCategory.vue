<template>
  <div>
    <button @click="toggleDropdown" class="add-categories-btn" :class="{ rotate: showDropdown }">Add Categories</button>
    <div v-if="showDropdown" class="dropdown-menu">
      <a href="#" @click="addCategory('Breakfast Foods')">Breakfast Foods</a>
      <a href="#" @click="addCategory('Fruits')">Fruits</a>
      <a href="#" @click="addCategory('Vegatables')">Vegatables</a>
      <a href="#" @click="addCategory('Cooking Essentials')">Cooking Essentials</a>
      <a href="#" @click="toggleModal">+ Add Custom</a>

    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <form @submit.prevent="submitForm" class="form-container">
          <label for="categoryName">Category Name</label>
          <input type="text" id="categoryName" v-model="categoryName" required>
          <div class="button-container">
            <button type="button" @click="closeModal">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>

      </div>
    </div>

    <div v-for="(category, index) in selectedCategories" :key="index" class="category-item">
       <span class="category-name">{{ category }}</span>
       <button class="plus-button" @click="handlePlusButtonClick(index)">+</button>
       <button class="delete-button" @click="deleteCategory(index)">
        <i class="fas fa-trash"></i>
      </button>
    </div>

    <AddFood v-if="showForm" @close="closeFoodForm" @add-food="addFoodItem" :showForm="showForm"></AddFood>

    <div v-for="(item, index) in foodItems" :key="index" class="food-item"> 
      <p>Name : {{ item.name }}</p>
      <p>Qty : {{ item.quantity }}</p>
      <p>Exp : {{  item.expiryDate  }}</p>
    </div>

  </div>
</template>

<script>

import AddFood from './AddFood.vue'; 
import '@fortawesome/fontawesome-free/css/all.css'; 


  export default {

    components: {
      AddFood, 
    }, 

    data() {
      return {
        showDropdown: false, 
        showModal: false,
        categoryName: '', 
        selectedCategory: '', 
        selectedCategories: [], 
        showForm: false, 
        foodItems: [],   
        };
     
    },

    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      }, 
      toggleModal() {
        this.showModal = !this.showModal;
        if (this.showModal) {
          this.categoryName = ''; 
        }
      },
      closeModal() {
        this.showModal = false;
      },
      submitForm() {
        if (this.categoryName.trim() !== '') {
          this.addCategory(this.categoryName); 
          this.closeModal(); 
        }
      }, 

      addCategory(category) {
        if (!this.selectedCategories.includes(category)) {
          this.selectedCategories.push(category);
        }
        this.showDropdown = false; 
      }, 

      handlePlusButtonClick(index) {
        this.showForm = true; 
      }, 

      closeFoodForm() {
        this.showForm = false; 
      },

      addFoodItem(foodData) {
        this.foodItems.push(foodData); 
      }, 

      deleteCategory(index) {
        this.selectedCategories = this.selectedCategories.filter((category, i) => i !== index);
      }
      
    }
  }; 
</script>
 
 
<style scoped>
  .add-categories-btn {
    padding: 10px 20px;
    background-color: orange;
    color: green;
    border: none;
    cursor: pointer;
    border-radius: 20px; 
    border: 1px solid green; 
    position: relative; 
  }
 
  .add-categories-btn::after {
    content: '';
    position: absolute;
    right: 5px; /* Adjust as needed */
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid green; /* Triangle color */
    transition: transform 0.3s ease-in-out;
  }

  .add-categories-btn.rotate::after {
    transform: translateY(-50%) rotate(180deg);
  }


  .dropdown-menu {
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 20px; 
    border: 1px solid green; 
  }
 
  .dropdown-menu a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
 
  .dropdown-menu a:hover {
    background-color: #f1f1f1
  }

  .modal-overlay {
    display: block; /* Changed from 'none' to 'block' */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4); /* Semi-transparent overlay */
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .form-container {
    display: flex; 
    flex-direction: column; 
    gap: 10px; 
    align-items: center;
    justify-content: space-between;
  }

  .form-container label[for="categoryName"] {
    display: block; 
    text-align: center; 
  }

  .form-container button {
    padding: 2px 10px; 
    margin: 0 auto; 
    display: block; 
    background-color: orange; 
    color: green; 
    border: none; 
    cursor: pointer; 
    border-radius: 20px; 
  }

  .button-container {
    display: flex; 
    gap: 10px; 
  }

  input[type="text"] {
    border-radius: 20px; /* Adjust the value as needed to achieve the desired curvature */
    border: 1px solid green; /* Optional: Add a border if you want */
    color: #a0d18c; /* Optional: Change the text color */
    width: 100%; /* Optional: Set the width */
    height: 30px; /* Optional: Set the height */
    padding-left: 20px; /* Optional: Add padding to the left */
    box-sizing: border-box; 
  }

  input[type="text"]:focus {
    outline: none; /* Removes the default outline on focus */
    border: 1px solid #a0d18c; /* Optional: Change the border color on focus */
    color: green; /* Optional: Change the text color on focus */
  }

  .category-item {
    text-align: center;
    padding: 10px 0; 
    margin-bottom: 10px; 
    display: block; 
    width: 100%; 

  }

  .category-name {
    text-align: center; 
    position: relative; 
    display: inline-block; 
  }

  .category-name::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 130%; /* Adjust this value to make the underline longer than the text */
    height: 2px; /* Adjust the thickness of the underline */
    background-color: green; /* Color of the underline */
    transform: translateX(-10%); /* Adjust this value to center the underline */
  }

  .plus-button {
    background-color: transparent;
    border: none;
    color: black; /* Match the color of your plus button with the rest of your UI */
    cursor: pointer;
    font-size: 16px; /* Adjust size as needed */
    margin-left: 10px; /* Space between the category name and the plus button */
    
  }

  .plus-button:hover {
    background-color: green; /* Light grey background on hover */
    border: 1px solid green; /* Optional: Add a border on hover */
  }

  .food-item {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    border: 1px solid black; 
    padding: 10px; 
    margin-bottom: 10px; 
    border-radius: 40px; 
  }

  .food-info {
    display: flex; 
    justify-content: space-between; 
    width: 100%; 
  }


  .delete-button {
    background-color: transparent; 
    border: none; 
    color: black; 
    cursor: pointer; 
    font-size: 10px; 
    padding: 1px 1px; 
    transition: color 0.3s ease; 
  }


  .delete-button:hover {
    color: green; 
  }

</style>



