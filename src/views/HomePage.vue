<template>
  <div v-if="user">
    <NavBar />
    <GroceryPage />
  </div>
  <div v-if="!user">
    <h1>Please Sign In Properly</h1>
  </div>
</template>

<script scoped>
import GroceryPage from '@/views/GroceryPage.vue'; 
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '@fortawesome/fontawesome-free/css/all.css'; 
import NavBar from '@/components/NavBar.vue';


export default {
  
  components: {
    GroceryPage,
    NavBar
  }, 

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
