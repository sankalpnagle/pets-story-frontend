// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnWEcHYlTynF6EGEXvz51a7pxpFjoHVGg",
  authDomain: "storyofpets-178bc.firebaseapp.com",
  projectId: "storyofpets-178bc",
  storageBucket: "storyofpets-178bc.firebasestorage.app",
  messagingSenderId: "1080624052763",
  appId: "1:1080624052763:web:162dd963d442a2c2bdd6be",
  databaseURL: "https://storyofpets-178bc.firebaseio.com",
  measurementId: "G-WTZBKY0DN5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  // Customize notification here
  const notificationTitle =
    payload.notification.title || "Background Notification";
  const notificationOptions = {
    body: payload.notification.body || "No body text",
    icon: "/logo192.png", // Adjust icon path as per your app
  };

  // Show the notification
  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
