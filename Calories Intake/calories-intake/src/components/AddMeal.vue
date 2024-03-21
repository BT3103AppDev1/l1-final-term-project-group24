<template>
    <div class ="container">
        <form id="selection">
            <date-pick v-model="date" :displayFormat="'DD.MM.YYYY'"></date-pick>

            <label for="mealType">Meal Type: </label>
            <select name="meal" id="mealType">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
            </select>

        </form>
    </div>
</template>

<script>
import DatePick from 'vue-date-pick';

export default {
    components: {DatePick},
    data: () => ({
        date: '2019-02-12'
    })
};
</script>