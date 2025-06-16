import { messaging } from '../firebaseConfig.js';
import { getToken, onMessage } from 'firebase/messaging';

export const requestNotificationPermission = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
        console.log('Device Token:', token);
        return token;
    } catch (error) {
        console.error('Error getting notification permission:', error);
        return null;
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log('Notification received:', payload);
            resolve(payload);
        });
    });