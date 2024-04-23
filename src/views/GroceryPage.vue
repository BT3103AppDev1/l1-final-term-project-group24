<template> 
  <div> 
    <AddCategory :userEmail="userEmail"  @category-selected="handleCategorySelected" @show-form="handleShowForm"/> 
    <h1>My Groceries</h1>
    <DisplayCategoryAndFood :userEmail="userEmail" @show-form="handleShowForm" @category-selected="handleCategorySelected" @delete-category="deleteCategory" @edit-item="handleEditItem" @delete-item="handleDeleteItem" @expired-items-updated="handleExpiredItemsUpdated" @expiring-items-updated="handleExpiringItemsUpdated" />
    <AddFood :userEmail="userEmail" :selectedCategory="selectedCategory" :show-form="showForm" @close="handleCloseForm" @add-food="addFoodItem"/>
    <EditFood :userEmail="userEmail" :show-edit-form="showEditForm" :selectedCategory="this.selectedCategory" :itemToEdit="this.itemToEdit" @update-item="handleUpdateItem" @close-edit-form="handleCloseEditForm"></editFood>
    <ExpiredFoodPopup :show="showExpiredFoodPopup" :expiredFoodItems="expiredFoodItems" :expiringFoodItems="expiringFoodItems" @close="handleClosePopup"></ExpiredFoodPopup>
  </div>
</template>


<script> 
import AddCategory from '@/components/AddCategory.vue'; 
import AddFood from '@/components/AddFood.vue'; 
import DisplayCategoryAndFood from '@/components/DisplayCategoryAndFood.vue'
import EditFood from '@/components/editFood.vue'; 
import ExpiredFoodPopup from '@/components/ExpiredFoodPopup.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { updateDoc, arrayUnion, setDoc, getDoc, deleteDoc, getDocs, doc, collection } from 'firebase/firestore';
import { db } from '@/firebase'; 

export default {
  components: {
    AddCategory, 
    DisplayCategoryAndFood,
    AddFood, 
    EditFood, 
    ExpiredFoodPopup, 
  }, 

  data() {
    return {
      userEmail: 'users',
      selectedCategory: '', 
      allCategories: [],
      showForm: false, 
      foodItem: '', 
      foodItems: [],
      showEditForm: false, 
      itemToEdit: null, 
      showExpiredFoodPopup: true, 
      expiredFoodItems: [], 
      expiringFoodItems: [], 
    };
  }, 


  async mounted() {
    await this.fetchUserProfile();
    await this.fetchFoodItems();
    console.log("mounted", this.userEmail);
    if (!localStorage.getItem('hasShownExpiredFoodPopup')) {
      this.showExpiredFoodPopup = true;
    }

  },


  methods: {

    handleClosePopup() {
      // Set a flag in localStorage to indicate the popup has been shown
      localStorage.setItem('hasShownExpiredFoodPopup', 'true');
      this.showExpiredFoodPopup = false;
    },

    handleExpiredItemsUpdated(expiredItems) {
       console.log("Expired items:", expiredItems);
       this.expiredFoodItems = expiredItems; 
    // Handle expired items here
    },
    
    handleExpiringItemsUpdated(expiringItems) {
      console.log("Expiring items:", expiringItems);
      this.expiringFoodItems = expiringItems;
    // Handle expiring items here
    },


    fetchUserProfile() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
            this.userEmail = String(user.email);
        }
      });
    },

    async checkAndCreateDocument(userEmail) {
      // Construct the document reference
      const docRef = doc(db, userEmail, 'grocery-management');

      // Try to get the document
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Document does not exist, create it
        console.log('Document does not exist, creating...');
        await setDoc(docRef, {
          Categories: [], // Example field, adjust according to your needs
        });
        console.log('Document created successfully.');
      }
    },

    async fetchCategoryTitles() {
      const userDocRef = doc(db, this.userEmail, 'grocery-management');
      console.log("FETCHING", userDocRef);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
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
            isExpiringSoon: this.isWithinFiveDays(new Date(doc.data().expiryDate))
          }));
          foodItemsForCategory.sort((a,b) => {
            const dateA = new Date(a.expiryDate); 
            const dateB = new Date(b.expiryDate); 
            return dateA - dateB; 
          }); 
          console.log('Fetched food items:', foodItemsForCategory);
          this.allFoods.push(foodItemsForCategory);
          const realTime = onSnapshot(foodItemsRef, (snapshot) => {
            const updatedFoodItemsForCategory = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));

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

    handlePlusButtonClick(show, categoryName) {
      this.showForm = show;
      this.selectedCategory = categoryName; 
    }, 


   
    async deleteCategory(index) {
      await this.fetchCategoryTitles();

      const categoryToDelete = this.allCategories[index];

      // Delete the category from the array of categories
      this.allCategories.splice(index, 1); 
      const userDocRef = doc(db, this.userEmail, 'grocery-management');
      // If the document or field does not exist, it will be created
      await updateDoc(userDocRef, {
        Categories: this.allCategories
      });

      // Deleting all food items in the category
      const categoryRef = collection(db, `${this.userEmail}/grocery-management/${categoryToDelete}`); 
      const foodItemsSnapshot = await getDocs(categoryRef); 
      const deletePromises = foodItemsSnapshot.docs.map(snapshot => deleteDoc(snapshot.ref));
      await Promise.all(deletePromises);
      console.log('All items in the category deleted successfully');
      this.foodItems = this.foodItems.filter(foodCategory => foodCategory.category !== categoryToDelete);

    }, 

		async handleCategorySelected(categoryName) {
      await this.fetchCategoryTitles();

      console.log('Received category name:', categoryName);

      const userDocRef = doc(db, this.userEmail, 'grocery-management');
      if (!this.allCategories.includes(categoryName)) {
        this.allCategories.push(categoryName);
        
        await updateDoc(userDocRef, {
          Categories: this.allCategories
        });

        //Add category with empty item
        const emptyItem = {
          id: "EMPTY", 
          category: categoryName, 
        }; 
        const categoryRef = collection(db, `${this.userEmail}/grocery-management/${categoryName}`);
        await setDoc(doc(categoryRef, "EMPTY"), emptyItem); 
        console.log('Empty item added to firestore', emptyItem); 
        console.log('Emitting add-food empty event with:', {item: emptyItem });

      }
      this.selectedCategory = categoryName; 
    },

    handleShowForm(show) {{    
      this.showForm = show; 
    }}, 

    handleCloseForm() { 
      this.showForm = false; 
    }, 

    addFoodItem(foodItem) {
      console.log('New food item added:', foodItem);
      // Update your foodItems data structure as needed
      // For example, if you're storing food items by category:
      const categoryIndex = this.foodItems.findIndex(cat => cat.category === this.selectedCategory);
      if (categoryIndex != -1) {
        this.foodItems[categoryIndex].items.push(foodItem);
        console.log('category found', categoryIndex); 
        console.log('Categories in foodItems:', this.foodItems.map(cat => cat.category));
      } else {
        this.foodItems.push({category: this.selectedCategory, items: [foodItem]});
        console.log('category not found')
      }
    },  

    handleEditItem(item) {
      console.log("editItem",item); 
      this.itemToEdit = item;
      this.selectedCategory = item.category; 
      this.showEditForm = true; 
    }, 

    handleUpdateItem(updatedItem) {
    // Find the index of the category that contains the item to be updated
    const categoryIndex = this.foodItems.findIndex(cat => cat.category === this.selectedCategory);

    if (categoryIndex !== -1) {
        // Find the index of the item within the category's items array
        const itemIndex = this.foodItems[categoryIndex].items.findIndex(item => item.id === updatedItem.id);

        if (itemIndex !== -1) { // Item found
            this.foodItems[categoryIndex].items[itemIndex] = updatedItem;
            console.log('Item updated successfully in', updatedItem.category);
        } else {
            console.log('Item not found within the category');
        }
    } else {
        console.log('Category not found');
    }
  },

    async handleDeleteItem(item) {
      // Construct the reference to the item in Firestore
      const itemRef = doc(db, `${this.userEmail}/grocery-management/${item.category}`, item.id);

      // Delete the item from Firestore
      try {
        await deleteDoc(itemRef);
        console.log('Item successfully deleted from Firestore');
      } catch (error) {
        console.error('Error deleting item:', error);
      }

      // Update the local state to remove the item
      const categoryIndex = this.foodItems.findIndex(cat => cat.category === item.category);
      if (categoryIndex !== -1) {
        this.foodItems[categoryIndex].items = this.foodItems[categoryIndex].items.filter(i => i.id !== item.id);
      }
    },

    handleCloseEditForm() {
      this.showEditForm = false; 
    },
  },
}; 


</script>



