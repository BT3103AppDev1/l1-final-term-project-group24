<template>
  <div id="header-container">
    <br>
  </div>

  <div id="registrationContainer">
    <img id="FoodFolioLogo" src="/foodfolio_logo.png" alt="FoodFolio logo"><br><br>
    <form @submit.prevent="registerToFB">
      <h1>Sign up for FoodFolio!</h1> <br>
      <div id="registrationForm">
        <div id="registrationInput">
          <label for="email1"> Email: </label>
          <input type="email" id="email1" v-model="email" required="" placeholder="username@email.com"> <br><br>
          
          <label for="username1"> Username: </label>
          <input type="text" id="username1" v-model="username" required="" placeholder="username123"> <br><br>

          <div class="password-wrapper">
            <label for="password1"> Password: </label>
            <input :type="showPassword ? 'text' : 'password'" id="password1" v-model="password" required placeholder="***********">
            <button type="button" @click="showPassword = !showPassword">
              <img id="PasswordEyeIcon" src="/password-eye.png" alt="Toggle password visibility"><br><br>
            </button>
          </div> <br>

          <div class="password-wrapper">
            <label for="confirm1"> Confirm Password: </label>
            <input :type="showConfirm ? 'text' : 'password'" id="confirm11" v-model="confirm" required placeholder="***********">
            <button type="button" @click="showConfirm = !showConfirm">
              <img id="PasswordEyeIcon" src="/password-eye.png" alt="Toggle password visibility"><br><br>
            </button>
          </div> <br>
        </div>
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

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirm: '',
      showPassword: false,
      showConfirm: false,
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    },
    async registerToFB() {
      const auth = getAuth();
      alert("Registering Account...");

      if (this.password !== this.confirm) {
        alert("Passwords do not match!");
      } else {
        try {
          const userCredentials = await createUserWithEmailAndPassword(auth, this.email, this.password);
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

<style scoped>
#header-container {
  background-color: #578855;
  padding: 16px;
  margin: 0;
  width: 100%;
  /* Ensures there's no space between the header and the edges of the browser window */
  position: absolute;
  top: 0;
  left: 0;
  
}

#registrationContainer {
  text-align: center;
  width: 100%;
  margin: auto;
  color:#578855;
}

#FoodFolioLogo {
    width: 300px;
    margin-top: -120px;
}

#PasswordEyeIcon {
    width: 30px;
}

h1 {
  font-weight: bold;
}

form {
  height: 200px;
  text-align: center;
  width: 100%;
}

#registrationForm {
  display: inline-block;
  text-align: right;
}

#registrationInput {
  padding-right: 50px;
}

input {
    width: 300px;
    padding: 10px;
    border-radius: 20px;
    border-color: #578855;
    background-color: #FDF0C3;
    font-family: 'Fuzzy Bubbles', cursive;
    font-size: 15px;
}

input[type="email"]::placeholder, input[type="text"]::placeholder, input[type="password"]::placeholder {
    font-family: 'Fuzzy Bubbles';
    font-size: 15px;
}

.password-wrapper {
  position: relative;
  align-items: center;
}

.password-wrapper button {
  position: absolute;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.signupButton {
  text-align: center;
}

.login-container {
  display: flex;
  justify-content: center;
}

#signupButton:hover {
  background-color: #f8961f; /* New color for hover */
  transform: scale(1.1); /* Increases size by 10% */
}

#signupButton {
    background-color: #FFB356;
    border-radius: 20px;
    color: #578855;
    padding: 5px 15px;
    cursor: pointer;
    font-family: 'Fuzzy Bubbles';
    font-size: 18px;
    transition: background-color 0.1s, transform 0.1s;
}

.login-button {
  background: none;
  border: none;
  color:#578855;
  padding: 0;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  text-decoration: underline;
  font-family: 'Fuzzy Bubbles';
  font-size: 14px;
}

.login-button:hover {
  font-weight: bold;
  color:#FFB356;
}
</style>
