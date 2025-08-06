import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | User,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async loginWithEmail(email: string, password: string) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      this.user = res.user;
    },
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      this.user = res.user;
    },
    async logout() {
      await signOut(auth);
      this.user = null;
    },
    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
      });
    },
  },
});
