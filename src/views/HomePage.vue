<template>
  <div v-if="user">
    <NavBar />
    <h1>This is a home page</h1>
  </div>
  <div v-if="!user">
    <h1>Please Sign In Properly</h1>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
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
  },

  // methods: {
  //   logout() {
  //     const auth = getAuth();
  //     signOut(auth).then(() => {
  //       alert("Logged out successfully!")
  //       this.$router.push({ name: 'Login' });
  //     }).catch((error) => {
  //       alert("Logout Failed: " + error.message);
  //     });
  //   },

  //   goToProfile() {
  //   this.$router.push({ name: 'Profile' });
  //   }
  // }
};
</script>

