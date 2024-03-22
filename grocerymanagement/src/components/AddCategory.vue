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
    </div>


    <div v-if="showFoodForm" class="food-form-overlay">
      <div class="food-form-content">
        <h2>Adding New Food</h2>
        <form @submit.prevent="submitFoodForm" class="food-form-container">
          <div class="form-group">
            <label for="foodName">Food:</label>
            <input type="text" id="foodName" v-model="foodName" required placeholder="Enter your Food">
          </div>
          <div class="form-group">
            <label for="foodQuantity">Quantity:</label>
            <input type="number" id="foodQuantity" v-model="foodQuantity" required placeholder="Enter the Quantity">
          </div>
          <div class="form-group">
            <label for="foodExpiryDate">Expiry Date:</label>
            <input type="date" id="foodExpiryDate" v-model="foodExpiryDate" required placeholder="Enter the Expiry Date">
          </div>
          <div class="button-container">
            <button type="button" @click="closeFoodForm">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>

      </div>
    </div>

</div>
</template>

<script>
  export default {
    data() {
      return {
        showDropdown: false, 
        showModal: false,
        categoryName: '', 
        selectedCategory: '', 
        selectedCategories: [], 
        showFoodForm: false, 
        foodName: '', 
        foodQuantity: '', 
        foodExpiryDate: '', 

        };
     
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      }, 
      toggleModal() {
        this.showModal = !this.showModal;
      },
      closeModal() {
        this.showModal = false;
      },
      submitForm() {
        console.log(this.categoryName);
        this.closeModal();
      }, 

      addCategory(category) {
        if (!this.selectedCategories.includes(category)) {
          this.selectedCategories.push(category);
        }
        this.showDropdown = false; 
      }, 

      handlePlusButtonClick(index) {
        this.showFoodForm = true; 
      }, 

      submitFoodForm() {
        console.log('Food Name:', this.foodName);
        console.log('Food Quantity:', this.foodQuantity);
        console.log('Food Expiry Date:', this.foodExpiryDate);
        // Here you can add logic to handle the submitted food data
        this.closeFoodForm(); // Close the form after submission
      },

      closeFoodForm() {
        this.showFoodForm = false; // Hide the food form popup
      },
      
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


  .food-form-overlay {
    display: block;
    position: fixed;
    z-index: 2; /* Ensure it's above other elements */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4); /* Semi-transparent overlay */
  }

  .food-form-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 40px; 
  }

  .food-form-container .form-group {
    display: flex;
    align-items: center; 
    gap: 10px;
    margin-bottom: 10px; 


  
  }

  .food-form-container .form-group label {
    flex: 1; /* Take up available space */
    text-align: right; /* Align text to the right */
    margin-right: 10px; /* Space between the label and input */
  }

  .food-form-container .form-group input {
    flex: 2; /* Take up more space than the label */
  }
  .food-form-container button {
    padding: 5px 10px; 
    margin: 0 5px; 
    background-color: orange; 
    color: green; 
    border: none; 
    cursor: pointer; 
    border-radius: 20px; 
    width: auto; 
  }

  .food-form-container .button-container {
    display: flex;
    justify-content: center; /* Center the buttons */
    gap: 10px; /* Space between buttons */
  }



  .food-form-content h2 {
    text-align: center; 
  }

  .food-form-container input[type="text"],
  .food-form-container input[type="number"],
  .food-form-container input[type="date"] {
    border-radius: 20px; /* Adjust the value as needed to achieve the desired curvature */
    border: 1px solid green; /* Optional: Add a border if you want */
    color: #a0d18c; /* Optional: Change the text color */
    width: 100%; /* Optional: Set the width */
    height: 30px; /* Optional: Set the height */
    padding-left: 20px; /* Optional: Add padding to the left */
    box-sizing: border-box; 
  }

  .food-form-container input[type="text"]:focus,
  .food-form-container input[type="number"]:focus,
  .food-form-container input[type="date"]:focus {
    outline: none; /* Removes the default outline on focus */
    border: 1px solid #a0d18c; /* Optional: Change the border color on focus */
    color: green; /* Optional: Change the text color on focus */
  }


</style>



