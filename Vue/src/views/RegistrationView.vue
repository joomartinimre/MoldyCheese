<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const regivalue = {
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
}

function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const rules = {
  username: { required: helpers.withMessage("Ez a mező kötelező, töltse ki!", required) },
  password: { required: helpers.withMessage("Ez a mező kötelező, töltse ki!", required) },
  confirmPassword: {
    required: helpers.withMessage("Ez a mező kötelező, töltse ki!", required),
    sameAsPassword: helpers.withMessage("A jelszavak nem egyeznek!", (value) => value === regivalue.password),
  },
  email: {
    required: helpers.withMessage("Ez a mező kötelező, töltse ki!", required),
    email: helpers.withMessage("Az email formátum nem megfelelő!", email),
  },
};

  const v$ = useVuelidate(rules, regivalue)

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
      v-model="regivalue.username"
      :counter="15"
      :error-messages="v$.username.$errors.map(e => String(e.$message))"
      label="Felhasználónév"
      variant="outlined"
      class="mb-3"
      @blur="v$.username.$touch"
      @input="debounce(() => v$.username.$touch(), 300)"
      
    ></v-text-field>  
    <v-text-field
      style="width: 100%;"
      v-model="regivalue.email"
      :counter="25"
      :error-messages="v$.email.$errors.map(e => String(e.$message))"
      label="Email"
      variant="outlined"
      class="mb-3"
      
      @blur="v$.email.$touch"
      @input="debounce(() => v$.email.$touch(), 300)"
      dense
    ></v-text-field>
    <v-text-field
    style="width: 100%;"
      v-model="regivalue.password"
      :counter="20"
      :error-messages="v$.password.$errors.map(e => String(e.$message))"
      label="Jelszó"
      type="password"
      variant="outlined"
      class="mb-3"
      
      @blur="v$.password.$touch" 
      @input="debounce(() => v$.password.$touch(), 300)"
      dense
    ></v-text-field>
    <v-text-field
    style="width: 100%;"
      v-model="regivalue.confirmPassword"
      :counter="20"
      :error-messages="v$.confirmPassword.$errors.map(e => String(e.$message))"
      label="Jelszó mégegyszer"
      type="password"
      variant="outlined"
      class="mb-3"
      
      @blur="v$.confirmPassword.$touch"
     @input="debounce(() => v$.confirmPassword.$touch(), 300)"
      dense
    ></v-text-field>
    <v-btn color="primary" variant="elevated" @click="v$.$validate" class="mb-3" style="width: 100%; ">
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
