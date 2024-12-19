<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Navigációs függvény
const navigateTo = (path: string) => {
  router.push(path);
};
const links = [
  { label: 'Főoldal', path: '/home' },
  { label: 'Rólunk', path: '/aboutUs' },
  { label: 'Jelentkezz kritikusnak!', path: '/Apply' },
  ]
</script>
<template>
    <v-layout class="rounded rounded-md">
      
        <v-app-bar >
          <template v-slot:title>
            <button  @click="navigateTo('/home')">🧀 Moldy Cheese</button>
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
      
      
      
      <v-main class="d-flex align-center justify-center fill-height">
        <router-view />
      </v-main>



      <v-navigation-drawer location="bottom">
        <v-footer class="bg-yellow-darken-1" >
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
  