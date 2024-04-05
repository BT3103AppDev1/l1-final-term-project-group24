<template> 
  <div> 
    <AddCategory @category-selected="handleCategorySelected" @show-form="handleShowForm"/> 
    <DisplayCategoryAndFood :selectedCategories="selectedCategories" :foodItems="foodItems" @show-form="handleShowForm" @category-selected="handleCategorySelected" @delete-category="deleteCategory" @edit-item="handleEditItem" @delete-item="handleDeleteItem" />
    <AddFood :selectedCategory="selectedCategory" :show-form="showForm" @close="handleCloseForm" @add-food="addFoodItem"/>
    <editFood :show-edit-form="showEditForm" :item="itemToEdit" @update-item="handleUpdateItem" @close-edit-form="handleCloseEditForm"></editFood>
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
      console.log('Received add-food event with category:', this.selectedCategory, ' and item:', food.item);      
      this.foodItems.push( {category: this.selectedCategory, items: [food.item] }); 
    }, 

    //ditching the categoryIndex method 
      /*const categoryIndex = this.foodItems.findIndex(cat => cat.category === category); 
      console.log(categoryIndex); 
      //but when we categoryIndex we always get -1 which is always not found 
      if (categoryIndex != -1) { //category found 
        console.log(this.foodItems[categoryIndex]);
        this.foodItems[categoryIndex].items.push(food.item);
        this.foodItem = food.item; 
        console.log('Food item added:', this.foodItem);
      } else { //category not found -> need create category 
        //create a new category with the new item 
        this.foodItems.push({ category: category, items: [food.item] });
        this.foodItem = food.item; 
      }
    }, */ 

    handleEditItem(item) {
      this.itemToEdit = item; 
      this.showEditForm = true; 
    }, 

    handleUpdateItem(updatedItem) {
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


</script>

