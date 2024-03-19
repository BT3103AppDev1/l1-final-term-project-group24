<template>
  <div id="registrationContainer">
    <form @submit.prevent="registerToFB">
      <h1>Firebase</h1> <br>
      <div id="registrationForm">
        <label for="email1"> Email: </label>
        <input type="email" id="email1" v-model="email" required="" placeholder="username@email.com"> <br><br>
        
        <label for="username1"> Username: </label>
        <input type="text" id="username1" v-model="username" required="" placeholder="username123"> <br><br>

        <label for="password1"> Password: </label>
        <input type="password" id="password1" v-model="password" required="" placeholder="***********"> <br><br>

        <label for="confirm1"> Confirm Password: </label>
        <input type="password" id="confirm1" v-model="confirm" required="" placeholder="***********"> <br><br>

        <div class="signupButton">
          <button id="signupButton" type="submit"> Sign Up </button>
        </div>
      </div>
      <div class="login-container">
        <button class="login-button" @click="navigateToLogin">Back to Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import firebaseApp from '@/firebase.js';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirm: ''
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    },
    async registerToFB() {
      alert("Registering Account...");

      if (!this.email) {
        alert("Please Enter Email");
      } else if (!this.username) {
        alert("Please Enter Username");
      } else if (!this.password) {
        alert("Please Enter Password");
      } else if (!this.confirm) {
        alert("Please Enter Confirm Password");
      } else if (this.password !== this.confirm) {
        alert("Passwords do not match!");
      } else {
        try {
          const userCredentials = await createUserWithEmailAndPassword(getAuth(firebaseApp), this.email, this.password);
          console.log('User Created:', this.email);

          await updateProfile(userCredentials.user, {
            displayName: this.username
          });
          console.log('Profile Updated');

          await sendEmailVerification(userCredentials.user);
          alert("Verification Email sent. Please check your email.");

          this.email = '';
          this.username = '';
          this.password = '';
          this.confirm = '';
          alert("Account Successfully Created! :D");
          this.$router.push({ name: 'Login' });
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }
}
</script>

<style>
#registrationContainer {
  height: 340px; 
  text-align: center;
  width: 100%;
  margin: auto;
}

form {
  height: 200px;
  text-align: center;
  width: 100%;
}

#registrationForm {
  display: inline-block;
  text-align: right;

  height: 250px;
}

.signupButton {
  text-align: center;
}

.login-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.login-button {
  background: none;
  border: none;
  color: #0645AD;
  padding: 0;
  cursor: pointer;
}

.login-button:hover {
  text-decoration: underline;
}
</style>
