<script lang="ts" setup>
const links = [
    'Home',
    'About Us',
    'Team',
    'Services',
    'Blog',
    'Contact Us',
  ]
</script>
<template>
    <v-layout class="rounded rounded-md">
      
        <v-app-bar title="🧀 Moldy Cheese">
            <nav>
            <v-btn variant="text" color="primary" class="ma-1">Iskolák</v-btn>
            <v-btn variant="text" color="primary" class="ma-1">Éttermek</v-btn>
            <v-btn variant="text" color="primary" class="ma-1">Vegyesboltok</v-btn>
            <v-btn variant="text" color="primary" class="ma-1">Játszóterek</v-btn>
        </nav>
        <div class="auth-buttons">
          <v-btn variant="elevated" color="primary" class="text-surface ma-1">Bejelentkezés</v-btn>
          <v-btn variant="elevated" color="primary" class="text-surface ma-1">Regisztráció</v-btn>
        </div>

        </v-app-bar>
      
      
      
      <v-main class="d-flex align-center justify-center fill-height">
        Main Content
      </v-main>



      <v-navigation-drawer location="bottom">
        <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</v-navigation-drawer>

    </v-layout>
    
  </template>
  