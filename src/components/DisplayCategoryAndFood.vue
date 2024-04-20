<template>
  <div>
    <div v-for="(category, index) in this.allCategories" :key="index">
      <div class="category-item">
        <span class="category-name">{{ category }}</span>
        <button class="plus-button" @click="handlePlusButtonClick(index)">+</button>
        <button class="delete-button" @click="deleteCategory(index)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div v-for="(foodItem, index2) in this.allFoods[index]" :key="index2">
        <div v-if="foodItem.id != 'EMPTY'" class="food-item">
          <p>{{ foodItem.name }}</p>
          <p>Qty : {{ foodItem.quantity }}</p>
          <p>Exp : {{ foodItem.expiryDate }}</p>
          <button class="edit-button" @click="editItem(foodItem)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button class="deleteItem-button" @click="deleteItem(foodItem)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
 
 
<script>

import { db } from '@/firebase'; 
import '@fortawesome/fontawesome-free/css/all.css'; 
import { doc, updateDoc, arrayUnion, collection, getDoc, getDocs } from 'firebase/firestore';

export default {
	props: ['userEmail'],

  data() {
    return {
      allCategories: [],
      allFoods: []
    }
  },

  // async mounted() {
  //   console.log("userEmail in Display:", this.userEmail);
  //   await this.fetchCategoryTitles();
  //   await this.fetchFoodItems();
  // },

  watch: {
    userEmail: {
      immediate: true,
      async handler(newVal, oldVal) {
        console.log("userEmail in Display:", newVal);
        await this.fetchCategoryTitles();
        await this.fetchFoodItems();
      }
    }
  },

	methods: {

    async fetchCategoryTitles() {
      const userDocRef = doc(db, this.userEmail, 'grocery-management');
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        // This assumes that your user document has a field called 'categoryTitles'
        console.log("These are the categories", userData.Categories);
        this.allCategories = userData.Categories || []; // return the array or an empty array if it doesn't exist
      } else {
        // Handle the case where the document does not exist
        console.log(`No categories yet`);
        this.allCategories = [];
      }
    },
    
    async fetchFoodItems() {
      console.log("Trying to fetch foods...")
  
      for (const category of this.allCategories) {
        try {
          const foodItemsRef = collection(db, `${this.userEmail}/grocery-management/${category}`);
          const foodItemsSnapshot = await getDocs(foodItemsRef);
          const foodItemsForCategory = foodItemsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('Fetched food items:', foodItemsForCategory);
          this.allFoods.push(foodItemsForCategory);
          // this.$set(this.foodItems, category, { category, items: foodItemsForCategory });
        } catch (error) {
          console.error('Error fetching food items for category:', category, error);
        }
      }
      console.log(this.allFoods);
    },
    

		async handlePlusButtonClick(index) {
      await this.fetchCategoryTitles();

      const categoryName = this.allCategories[index]; 
			this.$emit('show-form', true);
      this.$emit('category-selected', categoryName)
		},
		deleteCategory(index) {
			this.$emit('delete-category', index);
		}, 

    editItem(item) {
      this.$emit('edit-item', item); 
    }, 

    deleteItem(item) {
      this.$emit('delete-item', item); 
    }, 
  
  },

    mounted() {
      this.fetchFoodItems();
    },
    
};
</script>
 
<style scoped>
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
    width: 130%; 
    height: 2px; 
    background-color: green; 
    transform: translateX(-10%); 
  }

  .plus-button {
    background-color: transparent;
    border: none;
    color: black; 
    cursor: pointer;
    font-size: 16px; 
    margin-left: 10px; 
    
  }

  .plus-button:hover {
    background-color: green; 
    border: 1px solid green; 
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

  .food-item {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    border: 1px solid black; 
    padding: 10px; 
    margin-bottom: 10px; 
    border-radius: 40px; 
    background-color: rgba(255, 255, 255, 0.5);
  }

  .food-info {
    display: flex; 
    justify-content: space-between; 
    width: 100%; 
  }


  .edit-button {
    background-color: transparent; 
    border: none; 
    margin-left: 100px; 
    cursor: pointer; 
    color: black;
  }

  .edit-button:hover {
    color: green;
  }

  .deleteItem-button {
    background-color: transparent; 
    border: none;
    color: black; 
    cursor: pointer; 
    transition: color 0.3s ease; 
    margin-right: 100px; 

  }


  .deleteItem-button:hover {
    color:green; 
  }
</style>
 