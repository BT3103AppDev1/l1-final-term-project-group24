<template>
    <div class="meal-container">
    <div class="meal-plan">
        <div id="selectdate" class="date-picker-container">
            <button @click="showDatePicker = !showDatePicker" class="select-date-button">{{ buttonText }}</button>
            <div v-if="dateDisplay" class="date-display">
                <h2>{{ dateDisplay }}</h2>
            </div>
            <input type="date" v-if="showDatePicker" v-model="mydate" @change="updateDateDisplay" class="date-input">
        </div>
    </div>

    <section class="meals">
        <div class="breakfast">
            <h2>Breakfast</h2>
        </div>

        <div class="lunch">
            <h2>Lunch</h2>
        </div>

        <div class="dinner">
            <h2>Dinner</h2>
        </div>

        <div class="snacks">
            <h2>Snacks</h2>
        </div>
    </section>
    <PopUp/>
    </div>
</template>

<script>
import PopUp from './PopUp.vue'
import { ref, onMounted } from 'vue'

export default {
    components: {
        PopUp
    },

    setup() {
        const mydate = ref(new Date().toISOString().substr(0, 10)) 
        const showDatePicker = ref(false)
        const buttonText = ref('Select Date')
        const dateDisplay = ref('')

    function formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }) + " Meal Plan 🥕";
    }

    onMounted(() => {
      dateDisplay.value = formatDate(mydate.value);
    })

    function updateDateDisplay() {
      showDatePicker.value = false
      dateDisplay.value = formatDate(mydate.value);
    }

    return {
        mydate,
        showDatePicker,
        buttonText,
        dateDisplay,
        updateDateDisplay,

    }
  }
}

</script>

<style>
.meal-container {
  width: 1000px;
  height: 600px;
  background: #ffefd5; 
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 350px; 
  top: 120px;
  margin: 20px; 
}

.meal {
    font-family: sans-serif;
}

.select-date-button, .add-meal-button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #FFA500; 
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

.select-date-button {
    position: absolute;
    left: 650px;
    top: 30px;
}

.add-meal-button {
    position: absolute;
    left: 810px;
    top: 30px;
}

.date-input {
    position: absolute;
    left: 650px;
    top: 85px;
    cursor: pointer;
    display: block; 
}

.date-display{
    position: relative;
    left: 50px;
    top: 10px;
    font-family: sans-serif;
}

.meals {
    font-family: sans-serif;
}

.breakfast {
    position: relative;
    left: 50px;
    top: 50px;
}

.lunch {
    position: relative;
    left: 500px;
    top: 20px;
}

.dinner {
    position: relative;
    left: 50px;
    top: 200px;
}

.snacks {
    position: relative;
    left: 500px;
    top: 170px;
}
</style>