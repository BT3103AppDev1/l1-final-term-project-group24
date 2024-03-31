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


  </div>
</template>

<script>

import '@fortawesome/fontawesome-free/css/all.css'; 
import firebaseApp from '../firebase.js'; 
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc } from 'firebase/firestore';
const db = getFirestore(firebaseApp); 

export default {
  data() {
    return {
      showDropdown: false, 
      showModal: false,
      categoryName: '',  
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
      this.$emit('category-selected',category); 
    }


    /*//firestore code
    
    async addCategory(category) {
      if (!this.selectedCategories.includes(category)) {
        this.selectedCategories.push(category);
        try {
        // Assuming you have the user ID available, replace 'userId' with the actual user ID
          const docRef = await setDoc(doc(db, "users", "userId", "categories", category), {
            name: category,
          });
          console.log("Category saved:", category);
        } catch (error) {
          console.error("Error saving category:", error);
        }
      }
      this.showDropdown = false;
      this.$emit('category-selected', category);
    },*/


   
      
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
    border-top: 5px solid green; 
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
    display: block; 
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4); 
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
    border-radius: 20px; 
    border: 1px solid green; 
    color: #a0d18c; 
    width: 100%;
    height: 30px; 
    padding-left: 20px;
    box-sizing: border-box; 
  }

  input[type="text"]:focus {
    outline: none;
    border: 1px solid #a0d18c; 
    color: green; 
  }

</style>



