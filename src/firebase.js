// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOdV5UdZS4Tz7-l_1zT0cH8KFTUCQS9YA',
  authDomain: 'reactformikyup.firebaseapp.com',
  databaseURL: 'https://reactformikyup-default-rtdb.firebaseio.com',
  projectId: 'reactformikyup',
  storageBucket: 'reactformikyup.appspot.com',
  messagingSenderId: '563623586410',
  appId: '1:563623586410:web:4320686aabe8e49868b813',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
