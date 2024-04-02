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
      this.selectedCategories = this.selectedCategories.filter((category, i) => i !== index);
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
      console.log('old food item', this.foodItems); 

      const category = this.foodItems.find(category => category.items.some(item => item.name === updatedItem.name)); 
      if (category) {
        // Find the item within the category and update it
        const itemIndex = category.items.findIndex(item => item.name === updatedItem.name);
        if (itemIndex !== -1) {
          // Update the item directly
          category.items[itemIndex] = updatedItem;
          console.log('Item updated successfully');
        } else {
          console.log('Item not found within the category');
        }
      } else {
          console.log('Category not found');
      }

      this.showEditForm = false;
    },




    /*handleUpdateItem(updatedItem) {
      console.log('Updating item:', updatedItem);
      // Find the index of the category that contains the item to be updated
      const categoryIndex = this.foodItems.findIndex(category => category.category === updatedItem.category);

      if (categoryIndex !== -1) {
      // Category found, now find the index of the item within that category
        const itemIndex = this.foodItems[categoryIndex].items.findIndex(item => item.name === updatedItem.name);

        if (itemIndex !== -1) {
        // Item found, update it using Vue's reactivity system
          this.$set(this.foodItems[categoryIndex].items, itemIndex, updatedItem);
          console.log('Item updated successfully');
        } else {
          // Item not found within the category, handle accordingly
          console.log('Item not found within the category');
        }
      } else {
        // Category not found, handle accordingly
        console.log('Category not found');
      }

      // Optionally, close the edit form after updating the item
        this.showEditForm = false;
      },*/ 


    //findIndex will return -1 if category is not found (this is default)
    //still debugging : not ready yet 
    /*handleUpdateItem(updatedItem) {
      console.log('Updating item:', updatedItem);
      const categoryIndex = this.foodItems.findIndex(category => {
        console.log('checking category', category.category); 
        return category.items.some(item => {
          console.log('comparing item', item.name, 'with updateditem', updatedItem.name); 
          return item.name === updatedItem.name;
        });
      }); 

      console.log('Category index:', categoryIndex); 

      //for now my console log in this if loop does not show means my items not going into my if loop
      //i should code something similar to addfood item method
      //my categoryindex is -1 which is found 

      if (categoryIndex != -1) { //category found
        console.log('Category found'); 
        const itemIndex = this.foodItems[categoryIndex].items.findIndex(item => item.name === updatedItem.name); 
        console.log('Item index', itemIndex); 
        if (itemIndex != -1) {
          this.$set(this.foodItems[categoryIndex].items, itemIndex, updatedItem); 
          console.log('Food items after update:', this.foodItems);
        } else {
          // This part should not be reached if the item exists within the category.
          console.log('Item not found within the category, but this should not happen.');
        }

      } else { //categoryIndex == -1 category not found
        this.foodItems.push({ category: updatedItem.category, items: [updatedItem] });
        console.log('New category created with updated item');
      }

        this.showEditForm = false;
      },*/ 



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

