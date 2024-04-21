<template>
  <div class="container">
    <div class="input-group">
      <label>Total Calorie: {{ totCalories }}</label>
    </div>

    <div class="input-group">
      <label>My Goal: {{ calorieIntakeGoal }}</label>
    </div>

    <div class="input-group">
      <label>My BMI: {{ userBMI }}</label>
    </div>
      <div class="avatar-container">
        <div v-if="selected=='avatar1'">
        <img src="@/assets/avatar1.png" class="avatar">
        </div>

        <div v-if="selected=='avatar2'">
        <img src="@/assets/avatar2.png" class="avatar">
        </div>

        <div v-if="selected=='avatar3'">
        <img src="@/assets/avatar3.png" class="avatar">
        </div>

        <div v-if="selected=='avatar4'">
        <img src="@/assets/avatar4.png" class="avatar">
        </div>
        <div class="select-container">
          <select v-model="selected">
          <option value="avatar1">Avatar 1</option>
          <option value="avatar2">Avatar 2</option>
          <option value="avatar3">Avatar 3</option>
          <option value="avatar4">Avatar 4</option>
          </select>
          <br><br>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import '@fortawesome/fontawesome-free/css/all.css'; 
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';


//const db = getFirestore(firebaseApp);

export default {
  name: "SideBar",
  data() {
    return {
      selected: 'avatar1',
      userEmail: '',
      userHeight: 0,
      userHeight: 0,
      calorieIntakeGoal: ''
    };
  },

  computed: {
    userBMI() {
      return (this.userWeight / (this.userHeight * this.userHeight / 10000)).toFixed(2)
    }
  },

  props:['totCalories'],

  mounted() {
    // async function updateBMIandTarget() {
    //   let auth = getAuth();
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       this.userEmail = user.email;
    //     }
    //   });
    //   let userInfoRef = doc(db, String(userEmail), "profile-info");
    //   try {
    //     const docSnap = await getDocs(userInfoRef);
    //     if (docSnap.exists()) {
    //       let data = docSnap.data();
    //       this.userWeight = data.weight || 0;
    //       this.userHeight = data.height || 0;
    //       this.calorieIntakeGoal = data.calorieIntakeGoal || '';
    //     } else {
    //       console.log("No data available");
    //     }
    //   } catch (error) {
    //       console.error("Failed to fetch user data:", error);
    //   }
    // }
    this.updateSideBar()
  },

  methods: {
    updateSideBar() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userEmail = user.email;
          this.updateBMIandTarget(user.email)
        }
      });
    },

    async updateBMIandTarget(userEmail) {
      const userInfoRef = doc(db, String(userEmail), "profile-info");
      try {
        console.log("try")
        const docSnap = await getDoc(userInfoRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          this.userWeight = data.weight || 0;
          this.userHeight = data.height || 0;
          this.calorieIntakeGoal = data.calorieIntakeGoal || '';
          console.log(this.calorieIntakeGoal)
        } else {
          console.log("No data available");
        }
      } catch (error) {
          console.error("Failed to fetch user data:", error);
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fuzzy Bubbles');
@import url('https://fonts.googleapis.com/css?family=Poppins');

* {
  font-family: 'Fuzzy Bubbles'
}

.container {
  width: 300px;
  height: 600px;
  background: #ffefd5; 
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 10px; 
  top: 95px;
  margin: 20px; 
}

.input-group {
  background-color: #ffa726; 
  border-radius: 22px; 
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  padding: 5px 14px; 
  margin-bottom: 13px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-group label {
  color: white;
  display: block;
  margin-bottom: 5px;
}

.avatar {
  display: block;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  object-fit: cover;
  margin: 20px auto;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  padding: 20px;
  position: relative;
  top: 30px;
}

.select-container {
  position: relative;
  top: 30px;
}

.select-container select {    
  font-size: 15px;  
  background-color: #ffefd5;
  border: 2px solid #ffefd5;
}

.select-container select:focus {
  outline: none;
  border-color: #ffefd5;
}

</style>
