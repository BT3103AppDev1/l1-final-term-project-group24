<template>
  <div>
    <div class="top-right-container">
    
      <button @click="toggleShowExpiringSoon" class="toggle-button">
        <span class="switch" :class="{ 'on': showExpiringSoon, 'off': !showExpiringSoon }"></span>
        <span class="tooltip">{{ toggleTooltipText }}</span>
      </button>
    </div>

    <div v-for="(category, index) in this.allCategories" :key="index">
      <div class="category-item">
        <div class="category-name">
          <span>{{ category }}</span>
          <button class="plus-button" @click="handlePlusButtonClick(index)">+</button>
          <button class="delete-button" @click="deleteCategory(index)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <table>
        <tr v-for="(foodItem, index2) in filteredFoodItems[index]" :key="index2" class="food-row" :class="{ 'expiring-soon-row': foodItem.isExpiringSoon, 'expired-row': foodItem.isExpired }">
          <td v-if="foodItem.id != 'EMPTY'">{{ foodItem.name }}</td>
          <td v-if="foodItem.id != 'EMPTY'">Qty: {{ foodItem.quantity }}</td>
          <td v-if="foodItem.id != 'EMPTY'">Exp: {{ this.convertDateFormat(foodItem.expiryDate) }}</td>
          <td v-if="foodItem.id != 'EMPTY'"><img v-if="foodItem.isExpired" src="/expiredstamp.png" alt="Expired" class="expired-icon"></td>
          <td v-if="foodItem.id != 'EMPTY'">
            <button class="edit-button" @click="editItem(foodItem)">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </td>
          <td v-if="foodItem.id != 'EMPTY'">
            <button class="deleteItem-button" @click="deleteItem(foodItem)">
              <i class="fas fa-times"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>  

    <div v-if="showExpiringSoon" class="expired-warning">
      <i class="fas fa-exclamation-triangle"></i> Please do not consume expired food items!
    </div>
  </div>
</template>
 
 
<script>

import { db } from '@/firebase'; 
import '@fortawesome/fontawesome-free/css/all.css'; 
import { doc, updateDoc, arrayUnion, collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';

export default {
	props: ['userEmail'],

  data() {
    return {
      allCategories: [],
      allFoods: [], 
      showExpiringSoon: false, 
      listeners: [], 
    }
  },

  // async mounted() {
  //   console.log("userEmail in Display:", this.userEmail);
  //   await this.fetchCategoryTitles();
  //   await this.fetchFoodItems();
  // },

  computed: {

    expiredFoodItems() {
      const allFoodItems = [].concat(...this.allFoods); 
      return allFoodItems.filter(item => item.isExpired || item.isExpiringSoon); 
    }, 

    filteredFoodItems() {
      return this.allCategories.map((category, index) => {
        if (this.showExpiringSoon) {
          return this.allFoods[index].filter(item => item.isExpiringSoon || item.isExpired );
        } else {
          return this.allFoods[index];
        }
      });
    }, 

    toggleTooltipText() {
      return this.showExpiringSoon ? 'Show all items' : 'Show expiring items';
    }

  }, 

  beforeUnmount() {
  // Remove all real-time listeners
    this.listeners.forEach(realTime => realTime());
  },

  watch: {
    userEmail: {
      immediate: true,
      async handler(newVal, oldVal) {
        console.log("userEmail in Display:", newVal);
        await this.fetchCategoryTitles();
        await this.fetchFoodItems();
      }
    }, 
    allFoods: {
      deep: true, // Watch for nested changes in the array
      handler() {
        /*const expiredAndExpiringItems = this.expiredFoodItems;
        this.$emit('expired-items-updated', expiredAndExpiringItems);*/ 
        const expiredItems = this.allFoods.flat().filter(item => item.isExpired);
        const expiringItems = this.allFoods.flat().filter(item => item.isExpiringSoon);
        this.$emit('expired-items-updated', expiredItems);
        this.$emit('expiring-items-updated', expiringItems);
      }
    },
  }, 

	methods: {

    async fetchCategoryTitles() {
      const userDocRef = doc(db, this.userEmail, 'grocery-management');
      const realTime = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          this.allCategories = userData.Categories || []; // Update the categories array in real-time
          // Call fetchFoodItems after updating allCategories
          this.fetchFoodItems();
        } else {
          console.log(`No categories yet`);
          this.allCategories = [];
        }
      });

      this.listeners.push(realTime);
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
            isExpiringSoon: this.isWithinFiveDays(new Date(doc.data().expiryDate)),
            isExpired: this.isExpired(new Date(doc.data().expiryDate))
          }));

          foodItemsForCategory.sort((a,b) => {
            const dateA = new Date(a.expiryDate); 
            const dateB = new Date(b.expiryDate); 
            return dateA - dateB; 
          }); 
          
          console.log('Fetched food items:', foodItemsForCategory);
          this.allFoods.push(foodItemsForCategory);
          // this.$set(this.foodItems, category, { category, items: foodItemsForCategory });
          
          const realTime = onSnapshot(foodItemsRef, (snapshot) => {
            const updatedFoodItemsForCategory = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              isExpiringSoon: this.isWithinFiveDays(new Date(doc.data().expiryDate)),
              isExpired: this.isExpired(new Date(doc.data().expiryDate))
            }));

            updatedFoodItemsForCategory.sort((a, b) => {
              const dateA = new Date(a.expiryDate);
              const dateB = new Date(b.expiryDate);
              return dateA - dateB;
            });

            // Update the corresponding category's food items in allFoods
            const categoryIndex = this.allCategories.indexOf(category);
            if (categoryIndex !== -1) {
              this.allFoods[categoryIndex] = updatedFoodItemsForCategory;
            }
          });

            this.listeners.push(realTime);
        } catch (error) {
          console.error('Error fetching food items for category:', category, error);
        }
      }
      console.log(this.allFoods);
    },

    isWithinFiveDays(expiryDate) {
      const currentDate = new Date(); 
      currentDate.setHours(0, 0, 0, 0);
      const fiveDaysLater = new Date(); 
      fiveDaysLater.setDate(currentDate.getDate() + 5); 
      return currentDate <= expiryDate && expiryDate <= fiveDaysLater; 
    }, 

    isExpired(expiryDate) {
      const currentDate = new Date(); 
      currentDate.setHours(0, 0, 0, 0);
      return expiryDate < currentDate; 
    },

    toggleShowExpiringSoon() {
      this.showExpiringSoon = !this.showExpiringSoon; 
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

    convertDateFormat(expiryDate) {
      const [year, month, date] = expiryDate.split('-');
      return `${date}/${month}/${year}`; 
    }
  
  },

    mounted() {
      this.fetchFoodItems();
    },
    
}; 
</script>
 
<style scoped>
table {
  width: 100%;
  /* table-layout: fixed; */
  border-collapse: separate;
  border-spacing: 0px 10px;
  margin-top: -20px;
  margin-bottom: 20px;
}

.food-row td {
  background-color: rgba(255, 255, 255, 1);
  height: 40px;
  padding: 10px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  box-shadow: 5px 2px 4px rgba(0,0,0,0.5);
}

.food-row td:first-child {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-left: 1px solid black;
  box-shadow: 5px 2px 4px rgba(0,0,0,0.5);
}

.food-row td:last-child {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  box-shadow: 5px 2px 4px rgba(0,0,0,0.5);
}

.food-row td:nth-child(5), .food-row td:nth-child(6) {
  width: 7.5%;
}

.food-row td:nth-child(2) {
  width: 10%;
}

.food-row td:nth-child(4) {
  width: 20%;
}

.food-row td:nth-child(1) {
  width: 25%;
}

.food-row td:nth-child(3) {
  width: 30%;
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
  font-size: 20px;
}

.category-name::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 120%; 
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
  /* background-color: green;  */
  /* border: 1px solid green;  */
  color: green;
  transform: scale(1.5);
}

.delete-button {
  background-color: transparent; 
  border: none; 
  color: black; 
  cursor: pointer; 
  font-size: 15px; 
  padding: 1px 1px; 
  transition: color 0.3s ease; 
  margin-bottom: 0 px;
  background-color: none;
}


.delete-button:hover {
  color: green; 
  transform: scale(1.3);
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

.food-item .food-name,
.food-item .food-quantity,
.food-item .food-exp-date {
margin-right: 20px; 
}


.edit-button {
  background-color: transparent; 
  border: none; 
  cursor: pointer; 
  color: black;
}

.edit-button:hover {
  color: green;
  transform: scale(1.5);
}

.deleteItem-button {
  background-color: transparent; 
  border: none;
  color: black; 
  cursor: pointer; 
  transition: color 0.3s ease; 
}


.deleteItem-button:hover {
  color:green; 
  transform: scale(1.5);
}


.expiring-soon-row {
  color: red; 
}

.expiring-soon-row .fa-pencil,
.expiring-soon-row .fa-times {
  color: red; 
}

.expired-row {
  color: red; 
  /*white-space: nowrap;*/
}

.expired-row .fa-pencil,
.expired-row .fa-times {
  color: red; 
}

.top-right-container {
  position: absolute;
  top: 165px;
  right: 550px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}


.date-display {
  margin-bottom: 10px; 
  font-size: 18px;
}

.toggle-button {
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tooltip {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%; 
  left: 50%;
  margin-left: -60px; 
  opacity: 0;
  transition: opacity 0.3s;
}

.toggle-button:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.switch {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.switch.on {
  transform: translateX(26px);
  background-color: #4CAF50;
}

.switch.off {
  background-color: #FFB356;
}


.expired-warning {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.expired-warning i {
  color: red;
  margin-right: 5px;
}

.expired-icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
</style>