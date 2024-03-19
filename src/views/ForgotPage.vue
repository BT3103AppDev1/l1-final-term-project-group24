<template>
  <div id="forgetPasswordContainer">
    <form @submit.prevent="submitForgetPassword">
      <h1>Password Reset</h1> <br>
      <div id="forgetPasswordForm">
        <label for="email2"> Email: </label>
        <input type="email" id="email2" v-model="email" required="" placeholder="username@email.com"> <br><br>

        <div class="resetButton">
          <button type="submit">Send Reset Link</button>
        </div>
      </div>
    </form>
    <div class="login-container">
      <button class="login-button" @click="navigateToLogin">Back to Login</button>
    </div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from '@/firebase.js';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    },
    async submitForgetPassword() {
      if (!this.email) {
        alert("Please enter your email.");
        return;
      }
      try {
        await sendPasswordResetEmail(getAuth(firebaseApp), this.email);
        alert("Password reset email sent! Check your inbox.");
        this.email = '';
      } catch (error) {
        alert("Failed to send password reset email: " + error.message);
      }
    },
  },
}
</script>

<style>
#forgetPasswordContainer {
  margin: auto;
}

form {
  height: 200px;
  text-align: center;
  width: 100%;
}

#forgetPasswordForm {
  display: inline-block;
  text-align: right;
}

.resetButton {
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
