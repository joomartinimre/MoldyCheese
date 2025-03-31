import { defineStore } from 'pinia';

export interface User {
  ID: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  recentPlaceIds: number[]; 
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    recentPlaceIds: [], 
  }),
  getters: {
    isLoggedIn: (state: AuthState): boolean => !!state.user,
    userRole: (state: AuthState): string | null => state.user?.role || null,
    userId: (state: AuthState): number | null => state.user ? state.user.ID : null,
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
      this.recentPlaceIds = [];
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('recentPlaceIds');
    },
    loadFromLocalStorage() {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      const storedRecent = localStorage.getItem('recentPlaceIds');

      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser) as User;
        this.token = storedToken;
      }

      if (storedRecent) {
        this.recentPlaceIds = JSON.parse(storedRecent);
      }
    },
    addRecentPlace(placeId: number) {
      
      this.recentPlaceIds = this.recentPlaceIds.filter(id => id !== placeId);
      
      this.recentPlaceIds.push(placeId);
      
      if (this.recentPlaceIds.length > 12) {
        this.recentPlaceIds.shift();
      }
      
      localStorage.setItem('recentPlaceIds', JSON.stringify(this.recentPlaceIds));
    }
  },
});
