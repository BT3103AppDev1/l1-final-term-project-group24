<template> 
  <div> 
    <AddCategory @category-selected="handleCategorySelected" @show-form="handleShowForm"/> 
    <DisplayCategoryAndFood :selectedCategories="selectedCategories" :foodItems="foodItems" @show-form="handleShowForm" @category-selected="handleCategorySelected" @delete-category="deleteCategory" @edit-item="handleEditItem" @delete-item="handleDeleteItem" />
    <AddFood :selectedCategory="selectedCategory" :show-form="showForm" @close="handleCloseForm" @add-food="addFoodItem"/>
    <editFood :show-edit-form="showEditForm" :item="itemToEdit" :selectedCategory="this.selectedCategory" :itemToEdit="this.itemToEdit" @update-item="handleUpdateItem" @close-edit-form="handleCloseEditForm"></editFood>
  </div>
</template>


<script> 
import AddCategory from '@/components/AddCategory.vue'; 
import AddFood from '@/components/AddFood.vue'; 
import DisplayCategoryAndFood from '@/components/DisplayCategoryAndFood.vue'
import editFood from '@/components/editFood.vue'; 

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
      showForm: false, 
      foodItem: '', 
      foodItems: [], 
      showEditForm: false, 
      itemToEdit: null, 
    };
  }, 

  methods: {

    handlePlusButtonClick(show, categoryName) {
      this.showForm = show;
      this.selectedCategory = categoryName; 
    }, 

    deleteCategory(index) {
      const categoryToDelete = this.selectedCategories[index]; 
      this.selectedCategories.splice(index, 1); 
      this.foodItems = this.foodItems.filter(foodCategory => foodCategory.category !== categoryToDelete); 
      //this.selectedCategories = this.selectedCategories.filter((category, i) => i !== index);
    }, 


		handleCategorySelected(categoryName) {
      console.log('Received category name:', categoryName);
      if (!this.selectedCategories.includes(categoryName)) {
        this.selectedCategories.push(categoryName);
      }
      this.selectedCategory = categoryName; 
    },

    handleShowForm(show) {{    
      this.showForm = show; 
    }}, 

    handleCloseForm() { 
      this.showForm = false; 
    }, 

    addFoodItem(food) {
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
    }, 

  

    handleEditItem(item) {
      console.log(item); 
      this.itemToEdit = item; //i think this is the issue i cant update correctly
      this.showEditForm = true; 
    }, 


    //current problem now is the id is not being passed so i cant see the updateditem id because they do not have 
    //but should have since i created a shallow copy of original food item before i updated the item.. it should stay the same just like the category. 

    handleUpdateItem(updatedItem) {
      console.log('received updateditem', updatedItem); 
      console.log('Categories in foodItems:', this.foodItems.map(cat => cat.category));
      // Find the index of the category that contains the item to be updated
      const categoryIndex = this.foodItems.findIndex(cat => cat.category === this.selectedCategory);
      console.log(categoryIndex); 
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
    }, 

    handleDeleteItem(itemToDelete) {
      const category = this.foodItems.find(category => category.items.includes(itemToDelete)); 
      if (category) {
        category.items = category.items.filter(item => item !== itemToDelete); 
      }
    },

    handleCloseEditForm() {
      this.showEditForm = false; 
    },
  },
}; 


    /*handleUpdateItem(updatedItem) {
      // Find the category that contains the item to be updated
      //debugging: currently my category is undefined .... 
      console.log('updating', updatedItem); 
      console.log('old food item', this.item); //this is not the old food item 
      const itemIndex = this.foodItems.findIndex(item => item.name !== updatedItem.name);
      //findIndex will not give -1 if old item and new item name is different
        if (itemIndex !== -1) {
          // Update the item directly
          console.log("Before:" , this.foodItems);
          this.foodItems[itemIndex] = updatedItem; 
          console.log("After:", this.foodItems);
          this.foodItems.push( {category: this.selectedCategory, items: [updatedItem] }); 
          console.log('Item updated successfully in', this.selectedCategory);
        } else {
          console.log('Item not found within the category');
        }

      this.showEditForm = false;
    },    */ 


</script>



