<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Navigációs függvény
const navigateTo = (path: string) => {
  router.push(path);
};

const links = [
  { label: 'Főoldal', path: '/' },
  { label: 'Rólunk', path: '/aboutUs' },
  { label: 'Jelentkezz kritikusnak!', path: '/Apply' },
];
</script>

<template>
  <v-layout class="rounded rounded-md">
    <!-- 📌 FIXÁLT FEJLÉC -->
    <v-app-bar app class="sticky-header">
      <template v-slot:title>
        <button @click="navigateTo('/')">🧀 Moldy Cheese</button>
      </template>
      <nav>
        <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/school')">Iskolák</v-btn>
        <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/restaurant')">Éttermek</v-btn>
        <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/shop')">Vegyesboltok</v-btn>
        <v-btn variant="text" color="primary" class="ma-1" @click="navigateTo('/playground')">Játszóterek</v-btn>
      </nav>
      <div class="auth-buttons">
        <v-btn variant="elevated" color="primary" class="text-surface ma-1" @click="navigateTo('/login')">Bejelentkezés</v-btn>
        <v-btn variant="elevated" color="primary" class="text-surface ma-1" @click="navigateTo('/registration')">Regisztráció</v-btn>
      </div>
    </v-app-bar>

    <!-- 📌 A FŐ TARTALOM KÖZÉPRE IGAZÍTVA -->
    <div class="page-content">
      <v-container fluid class="main-container">
        <router-view />
      </v-container>
    </div>

    <!-- LÁBLÉC -->
    <v-navigation-drawer location="bottom">
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
/* 📌 FIXÁLT FEJLÉC */
.sticky-header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px); /* Elmosás a háttérhez */
  -webkit-backdrop-filter: blur(10px); /* Safari támogatás */
}



/* 📌 MEGOLDJA AZ ELCSÚSZOTT OLDALT */
.page-content {
  padding-top: 64px; /* Fejléc magasságának megfelelő */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 📌 TELJES SZÉLESSÉGŰ FŐ TARTALOM */
.main-container {
  width: 100vw; /* Teljes nézet szélesség */
  max-width: 100%; /* Garantáltan teljes szélességű */
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>