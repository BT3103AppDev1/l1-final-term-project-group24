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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase.js';
import { getFirestore, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import '@fortawesome/fontawesome-free/css/all.css'; 

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
    props: ['totCalories'],
    
    setup(props, { emit }) {
        const mydate = ref(new Date().toISOString().substr(0, 10));
        const showDatePicker = ref(false);
        const buttonText = ref('Select Date');
        const dateDisplay = ref('');
        const totalCalories = ref(0);
        const userEmail = ref('');

        function formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }) + " Meal Plan 🌱";
        }

        onMounted(() => {
            dateDisplay.value = formatDate(mydate.value);
            monitorAuthAndFetchData();
        });

        function toggleDatePicker() {
            showDatePicker.value = !showDatePicker.value;
        }

        function monitorAuthAndFetchData() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    userEmail.value = user.email;
                    fetchAndUpdateMeals(user.email);
                }
            });
        }

        function fetchAndUpdateMeals(email) {
            const dateString = String(mydate.value);
            const collectionRef = collection(db, email, 'calories-intake', dateString);

            // Clear existing content and set up real-time updates
            const tables = ["breakfast", "lunch", "dinner", "snack"].reduce((acc, id) => {
                acc[id] = document.getElementById(id);
                acc[id].innerHTML = '';  // Clear existing table content
                return acc;
            }, {});

            totalCalories.value = 0;
            const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
                snapshot.docChanges().forEach(change => {
                    const doc = change.doc;
                    const mealData = doc.data();

                    if (change.type === 'added' || change.type === 'modified') {
                        const row = tables[doc.id].insertRow();
                        const cellMeal = row.insertCell(0);
                        const cellAction = row.insertCell(1);
                        cellMeal.textContent = `${mealData.mealName} ${mealData.calories}`;
                        totalCalories.value += parseFloat(mealData.calories);
                        totalCalories.value = parseFloat(totalCalories.value.toFixed(2));

                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Delete";
                        deleteButton.className = "btn btn-delete";
                        deleteButton.onclick = () => deleteMeal(email, doc.id);
                        cellAction.appendChild(deleteButton);
                    } else if (change.type === 'removed') {
                        const rows = tables[doc.id].getElementsByTagName("tr");
                        Array.from(rows).forEach(row => {
                            if (row.cells[0].textContent === `${mealData.mealName} ${mealData.calories}`) {
                                tables[doc.id].deleteRow(row.rowIndex);
                            }
                        });
                        totalCalories.value -= parseFloat(mealData.calories);
                        totalCalories.value = parseFloat(totalCalories.value.toFixed(2));
                    }
                });
                emit('update-total-calories', totalCalories.value);
            }, err => {
                console.error("Error fetching updates:", err);
            });

            return unsubscribe;
        }

        function deleteMeal(email, mealType) {
            alert(`You are going to delete ${mealType}`);
            deleteDoc(doc(db, email, 'calories-intake', mydate.value, mealType));
        }

        function updateDateDisplay() {
            showDatePicker.value = false;
            dateDisplay.value = formatDate(mydate.value);
            if (userEmail.value) {
                fetchAndUpdateMeals(userEmail.value);  // Fetch and update meals for the new date
            }
        }

        return {
            mydate,
            showDatePicker,
            buttonText,
            dateDisplay,
            toggleDatePicker,
            updateDateDisplay,
            fetchAndUpdateMeals
        };
    }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css?family=Fuzzy Bubbles');

* {
  font-family: 'Fuzzy Bubbles';
}

button:hover {
    background-color: #f8961f; 
    transform: scale(1.1);
    transition: background-color 0.1s, transform 0.1s;
}

.meal-container {
  width: 1000px;
  height: 600px;
  background: white; 
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 370px; 
  top: 95px;
  margin: 20px; 
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

.btn-delete {
    padding: 6px 16px;
    border: none;
    background-color: #FFA500; 
    color: white;
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    bottom: 2px;
    left: 10px;
}

.date-input {
    position: absolute;
    left: 650px;
    top: 85px;
    cursor: pointer;
    display: block; 
}

.date-display{
    position: absolute;
    left: 40px;
    top: 10px;
}

.bwt {
  border:none;
  background-color: #FFA500;
  border-radius: 20px;
  color: white;
  padding: 4px 12px;
  cursor: pointer;
  font-family: 'Fuzzy Bubbles';
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 5px;
}

.bf {
    text-align:left;
    position: absolute;
    left: 40px;
    top: 110px;
}

.lch {
    text-align:left;
    position: absolute;
    left: 500px;
    top: 110px;
}

.din {
    text-align:left;
    position: absolute;
    left: 40px;
    top: 350px;
}

.snk {
    text-align:left;
    position: absolute;
    left: 500px;
    top: 350px;
}
</style>