<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const navigateTo = (path: string) => {
  router.push(path);
};

const handleLogout = () => {
  authStore.logout();
  navigateTo('/');
};

const links = [
  { label: 'Főoldal', path: '/' },
  { label: 'Rólunk', path: '/aboutUs' },
  { label: 'Jelentkezz kritikusnak!', path: '/Apply' },
];

const items = [
  { title: "Iskolák", path: "/school" },
  { title: "Éttermek", path: "/restaurant" },
  { title: "Vegyesboltok", path: "/shop" },
  { title: "Játszóterek", path: "/playground" },
];

const { mobile } = useDisplay();

const search = ref(''); // Keresősáv értéke
</script>

<template>
  <v-layout class="rounded rounded-md">
    <!-- 📌 FIXÁLT FEJLÉC -->
    <v-app-bar height="80" app class="sticky-header">
      <template v-slot:title>
        <div class="header-container">
          <button style="font-size: 25px;" @click="navigateTo('/')">
            🧀 <span v-if="!mobile">Moldy Cheese</span>
          </button>
          <v-text-field
            v-model="search"
            placeholder="Keresés..."
            variant="outlined"
            dense
            class="search-bar"
            hide-details
            clearable
          ></v-text-field>
        </div>
      </template>
      <div class="d-flex justify-space-around">
        <!-- Mobil nézet: account menü -->
        <v-menu transition="scale-transition" v-if="mobile">
          <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon
              variant="elevated"
              color="primary"
              class="text-surface ma-1"
              v-bind="props"
            >
              <v-icon class="text-surface">mdi-account</v-icon>
            </v-app-bar-nav-icon>
          </template>
          <v-list>
            <template v-if="!authStore.isLoggedIn">
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/login')">
                  Bejelentkezés
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/registration')">
                  Regisztráció
                </v-btn>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="handleLogout">
                  Kijelentkezés
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/profile')">
                  Profil
                </v-btn>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>

        <!-- Helyek menü -->
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-app-bar-nav-icon v-if="mobile" color="primary" v-bind="props"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo(item.path)">
                {{ item.title }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Asztali nézet: navigáció és account menü -->
      <nav v-if="!mobile" class="desktop-nav">
        <div class="desktop-nav-items">
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/school')">Iskolák</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/restaurant')">Éttermek</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/shop')">Vegyesboltok</v-btn>
          <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/playground')">Játszóterek</v-btn>
        </div>
        <div class="desktop-nav-account">
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-app-bar-nav-icon
                variant="elevated"
                color="primary"
                class="text-surface ma-1"
                v-bind="props"
              >
                <v-icon class="text-surface">mdi-account</v-icon>
              </v-app-bar-nav-icon>
            </template>
            <v-list>
              <template v-if="!authStore.isLoggedIn">
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/login')">
                    Bejelentkezés
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/registration')">
                    Regisztráció
                  </v-btn>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="handleLogout">
                    Kijelentkezés
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/profile')">
                    Profil
                  </v-btn>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
      </nav>
    </v-app-bar>

    <!-- 📌 A FŐ TARTALOM KÖZÉPRE IGAZÍTVA -->
    <div class="page-content">
      <v-container fluid class="main-container">
        <router-view />
      </v-container>
    </div>

    <!-- LÁBLÉC -->
    <v-navigation-drawer location="bottom" :mobile="false">
      <v-footer class="bg-yellow-darken-1">
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link.label"
            class="mx-2"
            color="primary"
            variant="text"
            @click="navigateTo(link.path)"
          >
            {{ link.label }}
          </v-btn>
        </v-row>
      </v-footer>
    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped>
.sticky-header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.page-content {
  padding-top: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container {
  width: 100vw;
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
}

.header-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  max-width: 600px;
  width: 100%;
}

::v-deep(.search-bar .v-field__input) {
  font-size: 18px !important;
}

.v-btn--size-default {
  padding: 0 4px !important;
}

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.v-navigation-drawer {
  height: auto !important;
}
</style>
