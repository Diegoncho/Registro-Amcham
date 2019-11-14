// Otorgar al service worker acceso a Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.10.0/firebase-messaging.js');

// Inicializando la aplicación Firebase en el service worker pasando la messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '231239336425'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Message received. ', payload);
});
