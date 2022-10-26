importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyB8kTzB_lJMkiNl8eJxXgwirFVSp7cuJqg",
    authDomain: "dealz22.firebaseapp.com",
    projectId: "dealz22",
    storageBucket: "dealz22.appspot.com",
    messagingSenderId: "1075894556853",
    appId: "1:1075894556853:web:d152d60c54f13c544006fc"
});
const messaging = firebase.messaging();