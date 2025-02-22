<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const loginUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value, 
        password: password.value
      })
    });

    if (!response.ok) {
      const error = await response.json();
      errorMessage.value = error.error || 'Hibás bejelentkezési adatok';
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); 
    errorMessage.value = '';
    alert('Sikeres bejelentkezés!');
    navigateTo('/'); 
  } catch (err) {
    console.error('Hiba történt a bejelentkezés során:', err);
    errorMessage.value = 'Nem sikerült csatlakozni a szerverhez.';
  }
};


</script>
<template>
    <v-container class="d-flex flex-column align-center justify-center" style="box-shadow: black 5px 5px 20px; background-color: wheat; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: left;">
      <h1 class="mb-4" style="width: 100%;">Bejelentkezés</h1>
        <v-text-field
          v-model="email"
          style="width: 100%;"
          label="Email cím"
          variant="outlined"
          class="mb-3"
          dense
        ></v-text-field>
        <v-text-field
          v-model="password"
          style="width: 100%;"
          label="Jelszó"
          type="password"
          variant="outlined"
          class="mb-3"
          dense
        ></v-text-field>
        <v-btn color="primary" variant="elevated" class="mb-3" style="width: 100%;" @click="loginUser">
          Bejelentkezés
        </v-btn>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
        <p class='text-start' style='width: 100%;'>
          Még nem regisztráltál?
          <span class='text-primary cursor-pointer' @click="navigateTo('/registration')">
            Tedd meg itt!
          </span>
        </p>
  </v-container>
</template>
  