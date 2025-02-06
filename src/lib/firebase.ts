import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVvufRUApANwEZ2XVCdgmo_e7t3X9-zfU",
  authDomain: "vocabulous-eb427.firebaseapp.com",
  projectId: "vocabulous-eb427",
  storageBucket: "vocabulous-eb427.appspot.com",
  messagingSenderId: "624609192018",
  appId: "1:624609192018:web:1ca14dbd8196ce219a578b"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
