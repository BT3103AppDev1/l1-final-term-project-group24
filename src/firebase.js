import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyD1Q4YCwCVhqsj7D2UirIbfdHG9vuAnLQM",
    authDomain: "foodfolio-7d5f4.firebaseapp.com",
    projectId: "foodfolio-7d5f4",
    storageBucket: "foodfolio-7d5f4.appspot.com",
    messagingSenderId: "228432804995",
    appId: "1:228432804995:web:a11dd96fa199f587a86fb6"    
}; 


const firebaseApp = initializeApp(firebaseConfig); 

const db = getFirestore(firebaseApp); 

export { db }; 
