import { defineStore } from 'pinia';

export interface User {
  id: number;
  name: string;
  email: string;
  // Bővítsd ki a szükséges mezőkkel!
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state: AuthState): boolean => !!state.user,
  },
  actions: {
    login(userData: User, token: string) {
      this.user = userData;
      this.token = token;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    loadFromLocalStorage() {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser) as User;
        this.token = storedToken;
      }
    },
  },
});
