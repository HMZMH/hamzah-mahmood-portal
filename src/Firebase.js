import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; // Import getAuth for authentication

const firebaseConfig = {
    apiKey: "AIzaSyAvgf34g6hHisjL_Ac1JUAXtyZ6ogh605Y",
    authDomain: "hamzah-mahmood-portal.firebaseapp.com",
    projectId: "hamzah-mahmood-portal",
    storageBucket: "hamzah-mahmood-portal.appspot.com",
    messagingSenderId: "762652777896",
    appId: "1:762652777896:web:32402efb31391cda9a519d",
    measurementId: "G-XN56LSJ6S9"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the authentication module

export { auth }; // Export the authentication module