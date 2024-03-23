<template>
    <div>
        <h1>Nutrition Information</h1>
        <label for="meal">Meal: </label>
        <input type="text" id="meal" required="" placeholder="Search meal">
        <div class="save">
            <button id="savebutton" type="button" v-on:click="inputMeal"> Save </button>
        </div>
        <pre>{{ calories }}</pre>
    </div>
  </template>
  
<script>
    import axios from 'axios';
  
    export default {
        data() {
            return {
            calories: null,
        };
        },
        methods: {
            async inputMeal() {
                axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${document.getElementById("meal").value}`, {
                headers: { 'X-Api-Key': 'Ljn/8+fBf3VItM38d5R/cw==7qzsCiFXen3sEHi5' },
                })
                .then(response => {
                    this.calories = response.data.items[0].calories;
                });
            }
        },
    }
</script>
  