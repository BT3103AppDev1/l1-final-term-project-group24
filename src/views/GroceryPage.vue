<template> 
  <div> 
    <AddCategory @category-selected="handleCategorySelected" @show-form="handleShowForm"/> 
    <DisplayCategoryAndFood :selectedCategories="selectedCategories" :foodItems="foodItems" :userId="userId" @show-form="handleShowForm" @category-selected="handleCategorySelected" @delete-category="deleteCategory" @edit-item="handleEditItem" @delete-item="handleDeleteItem" />
    <AddFood :selectedCategory="selectedCategory" :show-form="showForm" :userId="userId" @close="handleCloseForm" @add-food="addFoodItem"/>
    <editFood :show-edit-form="showEditForm" :item="itemToEdit" :selectedCategory="this.selectedCategory" :userId="userId" :itemToEdit="this.itemToEdit" @update-item="handleUpdateItem" @close-edit-form="handleCloseEditForm"></editFood>
  </div>
</template>


<script> 
import AddCategory from '@/components/AddCategory.vue'; 
import AddFood from '@/components/AddFood.vue'; 
import DisplayCategoryAndFood from '@/components/DisplayCategoryAndFood.vue'
import editFood from '@/components/editFood.vue'; 
import { updateDoc, arrayUnion, getDoc, deleteDoc, getDocs, doc, collection } from 'firebase/firestore';
import { db } from '@/firebase'; 

export default {
  components: {
    AddCategory, 
    DisplayCategoryAndFood,
    AddFood, 
    editFood, 
  }, 

  data() {
    return {
      selectedCategory: '', 
      selectedCategories: [], 
      allCategories: [],
      showForm: false, 
      foodItem: '', 
      foodItems: [], 
      showEditForm: false, 
      itemToEdit: null, 
      userId: 'yourUserId'
    };
  }, 

  methods: {
    async fetchCategoryTitles() {
      const userDocRef = doc(db, 'users', this.userId);
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

    handlePlusButtonClick(show, categoryName) {
      this.showForm = show;
      this.selectedCategory = categoryName; 
    }, 


   
    async deleteCategory(index) {
      await this.fetchCategoryTitles();

      const categoryToDelete = this.allCategories[index];

      // Delete the category from the array of categories
      this.allCategories.splice(index, 1); 
      const userDocRef = doc(db, 'users', this.userId);
      // Add a new category title to the "categoryTitles" array field
      // If the document or field does not exist, it will be created
      await updateDoc(userDocRef, {
        Categories: this.allCategories
      });

      // Deleting all food items in the category
      const categoryRef = collection(db, `users/${this.userId}/${categoryToDelete}`); 
      const foodItemsSnapshot = await getDocs(categoryRef); 
      const deletePromises = foodItemsSnapshot.docs.map(snapshot => deleteDoc(snapshot.ref));
      await Promise.all(deletePromises);
      console.log('All items in the category deleted successfully');
      this.foodItems = this.foodItems.filter(foodCategory => foodCategory.category !== categoryToDelete);

    }, 


    /*deleteCategory(index) {
      const categoryToDelete = this.selectedCategories[index]; 
      this.selectedCategories.splice(index, 1); 
      this.foodItems = this.foodItems.filter(foodCategory => foodCategory.category !== categoryToDelete); 
      //this.selectedCategories = this.selectedCategories.filter((category, i) => i !== index);
    }, */ 


		async handleCategorySelected(categoryName) {
      await this.fetchCategoryTitles();
      console.log('Received category name:', categoryName);

      const userDocRef = doc(db, 'users', this.userId);
      if (!this.allCategories.includes(categoryName)) {
        await updateDoc(userDocRef, {
          Categories: this.allCategories
        });
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

    /*addFoodItem(food) {
      console.log('Searching for category:', this.selectedCategory);
      console.log('Categories in foodItems:', this.foodItems.map(cat => cat.category));
      const categoryIndex = this.foodItems.findIndex(cat => cat.category === this.selectedCategory);
      console.log('Category index:', categoryIndex);

      if (categoryIndex !== -1) {
        // Category exists, add the item to the existing category
        this.foodItems[categoryIndex].items.push(food.item);
        console.log('category found', categoryIndex); 
        console.log('Categories in foodItems:', this.foodItems.map(cat => cat.category));

      } else {
        // Category does not exist, create a new category with the item
        this.foodItems.push({category: this.selectedCategory, items: [food.item]});
        console.log('category not found')
      }
    }, */

  

    handleEditItem(item) {
      console.log(item); 
      this.itemToEdit = item; //i think this is the issue i cant update correctly
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


    /*handleUpdateItem(updatedItem) {
      console.log('received updateditem', updatedItem); 
      console.log('Categories in foodItems:', this.foodItems.map(cat => cat.category));
      // Find the index of the category that contains the item to be updated
      const categoryIndex = this.foodItems.findIndex(cat => cat.category === this.selectedCategory);
      console.log(categoryIndex);
      console.log(this.selectedCategory); 
      console.log('Item names in foodItems:', this.foodItems[categoryIndex].items.map(item => item.id));
      console.log('Updated item name:', updatedItem.id);

      if (categoryIndex !== -1) {
        // Find the index of the item within the category's items array
        const itemIndex = this.foodItems[categoryIndex].items.findIndex(item => item.id === updatedItem.id);

        if (itemIndex !== -1) { //can find food item
          this.foodItems[categoryIndex].items[itemIndex] = updatedItem;
          console.log('Item updated successfully in', updatedItem.category);
        } else {
          console.log('Item not found within the category');
        }
      } else {
        console.log('Category not found');
      }
    }, */ 

    async handleDeleteItem(item) {
      // Construct the reference to the item in Firestore
      const itemRef = doc(db, `users/${this.userId}/${item.category}`, item.id);

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

    /*handleDeleteItem(itemToDelete) {
      const category = this.foodItems.find(category => category.items.includes(itemToDelete)); 
      if (category) {
        category.items = category.items.filter(item => item !== itemToDelete); 
      }
    },*/ 

    handleCloseEditForm() {
      this.showEditForm = false; 
    },
  },
}; 


</script>



