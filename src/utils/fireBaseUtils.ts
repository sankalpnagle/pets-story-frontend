import { initializeApp,getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

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
const vapidKey =
  "BIVeHm82u0PPXdo9z6SnW3Pmo_X9dBgLCMAMT56bgMZU36N8RuS0_RNJ4bZHy57W9gyOkKpxqwgo3YTqwOsgBtE	";

// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const messaging = getMessaging(app);

// export const auth = getAuth(app);

export const requestFCMToken = async () => {
  return await Notification.requestPermission()
    .then((permission) => {
      if (permission == "granted") {
        return getToken(messaging, { vapidKey });
      } else {
        throw new Error("Notification not granted");
      }
    })
    .catch((err) => {
      console.error("Error retrieving FCM token:", err);
    });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      toast.success(
        payload?.notification?.title +
          " " +
          payload?.notification?.title +
          "testing"
      );
      //   console.log("Foreground Notification Received: ", payload);
      resolve(payload);
    });
  });
};

// export const registerServiceWorker = async () => {
//   try {
//     if ("serviceWorker" in navigator) {
//       const registration = await navigator.serviceWorker.register(
//         "/firebase-messaging-sw.js"
//       );
//       console.log("Service Worker registered:", registration);
//       return registration;
//     } else {
//       throw new Error("Service workers are not supported in this browser.");
//     }
//   } catch (error) {
//     console.error("Service Worker registration failed:", error);
//   }
// };

//     if (permission !== "granted") {
//       throw new Error("Notification permission not granted.");
//     }
//     const registration = await registerServiceWorker();

//     const token = await getToken(messaging, {
//       vapidKey:
//         "BLvi8fPMVdSE6MM3E0NuI5T5r3tnVWA3lcMl6BL_zyJdLGgrHHBH8LVFVXuQZW1hGjw-lsbA4yM6GOI0g_WJNFw",
//       serviceWorkerRegistration: registration,
//     });
//     if (!token) {
//       throw new Error(
//         "Unable to get FCM token. Ensure the app is running on HTTPS."
//       );
//     }

//     console.log("FCM Token:", token);
//     return token;
//   } catch (error) {
//     console.error("Error retrieving FCM token:", error);
//     return null;
//   }
// };
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("Foreground Notification Received: ", payload);
//       resolve(payload);
//     });
//   })
