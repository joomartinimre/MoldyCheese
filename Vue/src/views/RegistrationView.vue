<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="max-width: 400px; margin-top: 50px; text-align: left;">
    <h1 class="mb-4" style="width: 100%;">Regisztráció</h1>
    <v-text-field
      style="width: 100%;"
      label="Felhasználónév"
      variant="outlined"
      class="mb-3"
      dense
    ></v-text-field>
    <v-text-field
      style="width: 100%;"
      label="Email"
      variant="outlined"
      class="mb-3"
      dense
    ></v-text-field>
    <v-text-field
      style="width: 100%;"
      label="Jelszó"
      type="password"
      variant="outlined"
      class="mb-3"
      dense
    ></v-text-field>
    <v-text-field
      style="width: 100%;"
      label="Jelszó megerősítése"
      type="password"
      variant="outlined"
      class="mb-3"
      dense
    ></v-text-field>
    <v-btn color="primary" variant="elevated" class="mb-3" style="width: 100%;">
      Regisztráció
    </v-btn>
    <p class='text-start' style='width: 100%;'>
      Már van fiókod?
      <span class='text-primary cursor-pointer' @click="navigateTo('/login')">
        Jelentkezz be itt!
      </span>
    </p>
  </v-container>
</template>
