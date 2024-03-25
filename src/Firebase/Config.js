import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyC2LwSWP6eRkOkeJu_MaGpCTYkYrHJxyjA",
    authDomain: "correoarg-627c6.firebaseapp.com",
    projectId: "correoarg-627c6",
    storageBucket: "correoarg-627c6.appspot.com",
    messagingSenderId: "649424183195",
    appId: "1:649424183195:web:2b73ef90b97b7a9bcc4b3e",
    measurementId: "G-7BRMKND1DD"
};

const app = initializeApp(firebaseConfig)

export default function getFirestoreApp(){
    return app
}