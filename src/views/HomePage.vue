<template>
  <div v-if="user">
    <GroceryPage />
    <button @click="goToProfile" class="profile-button">Go to Profile</button>
    <div class="logoutButton">
      <button id="logoutButton" @click="logout" class="logout-button"> Logout </button>
    <h1>This is a home page</h1>
    <button @click="goToProfile">Go to Profile</button>
    <div class="logoutButton">
      <button id="logoutButton" @click="logout"> Logout </button>
    </div>
  </div>
  <div v-if="!user">
    <h1>Please Sign In Properly</h1>
  </div>
</template>

<script scoped>
import GroceryPage from '@/views/GroceryPage.vue'; 
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '@fortawesome/fontawesome-free/css/all.css'; 


export default {
  
  components: {
    GroceryPage, 
  }, 


<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      user:false,
    }
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    })

    console.log(this.user); 

  },

  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        alert("Logged out successfully!")
        this.$router.push({ name: 'Login' });
      }).catch((error) => {
        alert("Logout Failed: " + error.message);
      });
    },

    goToProfile() {
    this.$router.push({ name: 'Profile' });
    }
  }
};
</script>

<style>
.logoutButton {
  text-align: center;
}

#logoutButton:hover {
  background-color: #f8961f; /* New color for hover */
  transform: scale(1.1); /* Increases size by 10% */
}


.profile-button, .logout-button {
  background-color: #FFB356;
  border-radius: 20px;
  color: #578855;
  padding: 5px 15px;
  cursor: pointer;
  font-family: 'Fuzzy Bubbles';
  font-size: 18px;
  transition: background-color 0.1s, transform 0.1s;
}

</style>
