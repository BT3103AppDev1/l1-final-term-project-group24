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
        <div class="bf">
            <h2>Breakfast</h2>
            <table id = "breakfast" class = "auto-index">
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </table>
        </div>

        <div class="lch">
            <h2>Lunch</h2>
            <table id = "lunch" class = "auto-index">
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </table>
        </div>

        <div class="din">
            <h2>Dinner</h2>
            <table id = "dinner" class = "auto-index">
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </table>
        </div>

        <div class="snk">
            <h2>Snacks</h2>
            <table id = "snack" class = "auto-index">
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </table>
        </div>
    </section>
    <PopUp @added = "refresh"/>
    </div>
</template>

<script>
import PopUp from './PopUp.vue'
import { ref, onMounted } from 'vue'
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default {
    components: {
        PopUp
    },

    methods: {
        update() {
            this.$emit("up")
        }
    },

    setup() {
        const mydate = ref(new Date().toISOString().substr(0, 10)) 
        const showDatePicker = ref(false)
        const buttonText = ref('Select Date')
        const dateDisplay = ref('')
        const breakfastTF = ref(false)
        const lunchTF = ref(false)
        const dinnerTF = ref(false)
        const snackTF = ref(false)

        function formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
            }) + " Meal Plan 🥕";
        }

        onMounted(() => {
            dateDisplay.value = formatDate(mydate.value);

            async function display() {
                if (breakfastTF.value) {
                    let table = document.getElementById("breakfast")
                    table.deleteRow(0)
                    breakfastTF.value = false
                } 
                if (lunchTF.value) {
                    let table = document.getElementById("lunch")
                    table.deleteRow(0)
                    lunchTF.value = false
                } 
                if (dinnerTF.value) {
                    let table = document.getElementById("dinner")
                    table.deleteRow(0)
                    lunchTF.value = false
                } 
                if (snackTF.value) {
                    let table = document.getElementById("snack")
                    table.deleteRow(0)
                    snackTF.value = false
                }
                let allDocuments = await getDocs(collection(db, mydate.value))
                allDocuments.forEach((docs) => {
                    if (docs.id === "breakfast") {
                        breakfastTF.value = true
                    } else if (docs.id === "lunch") {
                        lunchTF.value = true
                    } else if (docs.id === "dinner") {
                        dinnerTF.value = true
                    } else {
                        snackTF.value = true
                    }
                    let mealNameCal = docs.data()
                    let mealName = mealNameCal.mealName
                    let calories = mealNameCal.calories
                    let table = document.getElementById(docs.id)
                    let row = table.insertRow(mealName)
                    let cell0 = row.insertCell(0)
                    let cell1 = row.insertCell(1)
                    cell0.innerHTML = mealName + " " + calories

                    let deleteButton = document.createElement("button")
                    deleteButton.id = String(mealName)
                    deleteButton.className = "bwt"
                    deleteButton.innerHTML = "Delete"
                    cell1.appendChild(deleteButton)
                    deleteButton.onclick = function(){
                        deleteMeal(docs.id)
                    }
                })
                console.log("display")
            }

            display()

            async function deleteMeal(mealType){
                alert("You are going to delete " + mealType)
                await deleteDoc(doc(db, mydate.value, mealType))
                console.log("Document successfully deleted!", mealType);
                let tb = document.getElementById(mealType)
                tb.deleteRow(0)
                display()
            }
        })

        async function refresh() {
            console.log(breakfastTF)
            if (breakfastTF.value) {
                let table = document.getElementById("breakfast")
                table.deleteRow(0)
                breakfastTF.value = false
            } 
            if (lunchTF.value) {
                let table = document.getElementById("lunch")
                table.deleteRow(0)
                lunchTF.value = false
            } 
            if (dinnerTF.value) {
                let table = document.getElementById("dinner")
                table.deleteRow(0)
                lunchTF.value = false
            } 
            if (snackTF.value) {
                let table = document.getElementById("snack")
                table.deleteRow(0)
                snackTF.value = false
            }
            let allDocuments = await getDocs(collection(db, mydate.value))
            allDocuments.forEach((docs) => {
                if (docs.id === "breakfast") {
                    breakfastTF.value = true
                } else if (docs.id === "lunch") {
                    lunchTF.value = true
                } else if (docs.id === "dinner") {
                    dinnerTF.value = true
                } else {
                    snackTF.value = true
                }
                let mealNameCal = docs.data()
                let mealName = mealNameCal.mealName
                let calories = mealNameCal.calories
                let table = document.getElementById(docs.id)
                let row = table.insertRow(mealName)
                let cell0 = row.insertCell(0)
                let cell1 = row.insertCell(1)
                cell0.innerHTML = mealName + " " + calories

                let deleteButton = document.createElement("button")
                deleteButton.id = String(mealName)
                deleteButton.className = "bwt"
                deleteButton.innerHTML = "Delete"
                cell1.appendChild(deleteButton)
                deleteButton.onclick = function(){
                    deleteMeal(docs.id)
                }
            })
            console.log("display")
        }

        async function deleteMeal(mealType){
            alert("You are going to delete " + mealType)
            await deleteDoc(doc(db, mydate.value, mealType))
            console.log("Document successfully deleted!", mealType);
            let tb = document.getElementById(mealType)
            tb.deleteRow(0)
            refresh()
        }

        function updateDateDisplay() {
            showDatePicker.value = false
            dateDisplay.value = formatDate(mydate.value);
            refresh()
        }

        return {
            mydate,
            showDatePicker,
            buttonText,
            dateDisplay,
            updateDateDisplay,
            refresh
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

.bf {
    position: relative;
    left: 50px;
    top: 50px;
}

.lch {
    position: relative;
    left: 500px;
    top: 20px;
}

.din {
    position: relative;
    left: 50px;
    top: 200px;
}

.snk {
    position: relative;
    left: 500px;
    top: 170px;
}
</style>