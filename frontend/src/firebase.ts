import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSfzXm1k2jUVE63jMGUc-9mucK3O_IfWA",
  authDomain: "auth-58eeb.firebaseapp.com",
  projectId: "auth-58eeb",
  storageBucket: "auth-58eeb.firebasestorage.app",
  messagingSenderId: "605831197714",
  appId: "1:605831197714:web:cedd432594e641505d54cb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
