<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, sameAs, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';




const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

const form = reactive({
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const containsUppercase = (value: string): boolean => /[A-Z]/.test(value);
const containsNumber = (value: string): boolean => /\d/.test(value);
const containsSpecialChar = (value: string): boolean => /[@$!%*?&]/.test(value);

const confirmPasswordMatches = computed((): boolean => form.confirmPassword === form.password);

const rules = {
  userName: { required: helpers.withMessage("A felhasználónév megadása kötelező!", required), minLength: helpers.withMessage("Legalább 6 karakter szükséges!", minLength(6)) },
  email: { required: helpers.withMessage("Az email megadása kötelező!", required), email: helpers.withMessage("Érvényes email címet adj meg!", email) },
  password: {
    required: helpers.withMessage("A jelszó megadása kötelező!", required),
    minLength: helpers.withMessage("Legalább 8 karakter szükséges!", minLength(8)),
    containsUppercase: helpers.withMessage("A jelszónak tartalmaznia kell legalább egy nagybetűt!", containsUppercase),
    containsNumber: helpers.withMessage("A jelszónak tartalmaznia kell legalább egy számot!", containsNumber),
    containsSpecialChar: helpers.withMessage("A jelszónak tartalmaznia kell legalább egy speciális karaktert!", containsSpecialChar)
  },
  confirmPassword: {
    required: helpers.withMessage("A jelszó megerősítése kötelező!", required),
    sameAs: helpers.withMessage("A két jelszónak egyeznie kell!", () => confirmPasswordMatches.value)
  }
};

const v$ = useVuelidate(rules, form);
const registrationSuccess = ref(false);
const showErrors = ref(false);
const showConfirmPasswordError = ref(false);




const registerUser = async () => {
  v$.value.$touch();
  showErrors.value = true;
  showConfirmPasswordError.value = true;
  console.log("Elindítottam a regit")

  if (v$.value.$invalid) {
    console.error("❌ Hibás adatok!", v$.value.$errors);
    const errorMessages = v$.value.$errors.map((err) => {
    
    if (err.$message) return err.$message;
    
    switch (err.$property) {
      case 'userName':
        return "A felhasználónév nem megfelelő.";
      case 'email':
        return "Hibás e-mail cím.";
      case 'password':
        return "Hibás jelszó.";
      case 'confirmPassword':
        return "A jelszavak nem egyeznek.";
      default:
        return "Ismeretlen hiba.";
    }
  });

  alert("Kérlek javítsd a következő hibákat:\n\n" + errorMessages.join("\n"));
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: form.userName,
        email: form.email,
        password: form.password
      })
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Hiba: ${error.error}`);
      return;
    }

    const data = await response.json();
    console.log(`Sikeres regisztráció: ${data.message}`)
  } catch (err) {
    console.error('Hiba történt a regisztráció során:', err);
    alert('Nem sikerült csatlakozni a szerverhez.');
  }
  
  
  console.log("🎉 Sikeres regisztrációs adatok:", form);
  registrationSuccess.value = true;
  
};
</script>

<template>
  
  <v-container class="d-flex flex-column align-center justify-center" v-if="!registrationSuccess" style="box-shadow: black 5px 5px 20px; background-color: wheat; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: left;">

    <h1 class="mb-4" style="width: 100%;">Regisztráció</h1>

    <v-text-field
      style="width: 100%;"
      label="Felhasználónév"
      variant="outlined"
      class="mb-3"
      dense
      v-model="form.userName" 
      type="text" 
      @blur="v$.userName.$touch"
      :hint="v$.userName.$errors.length > 0 ? String(v$.userName.$errors[0].$message || '') : ''"
      persistent-hint
    ></v-text-field>

    <v-text-field
      style="width: 100%;"
      label="Email"
      variant="outlined"
      class="mb-3"
      dense
      v-model="form.email" 
      type="email" 
      @blur="v$.email.$touch"
      :hint="v$.email.$errors.length > 0 ? String(v$.email.$errors[0].$message || '') : ''"
      persistent-hint
    ></v-text-field>

    <v-text-field
      style="width: 100%;"
      label="Jelszó"
      variant="outlined"
      class="mb-3"
      dense
      v-model="form.password" 
      type="password" 
      @blur="v$.password.$touch"
      :hint="v$.password.$errors.length > 0 ? String(v$.password.$errors.map(e => e.$message).join(', ') || '') : ''"
      persistent-hint
    ></v-text-field>

    <v-text-field
      style="width: 100%;"
      label="Jelszó megerősítése"
      variant="outlined"
      class="mb-3"
      dense
      v-model="form.confirmPassword" 
      type="password"
      @blur="v$.confirmPassword.$touch"
      :hint="v$.confirmPassword.$errors.length > 0 ? String(v$.confirmPassword.$errors[0].$message || '') : ''"
      persistent-hint
    ></v-text-field>

    <v-btn color="primary" variant="elevated" class="mb-3" style="width: 100%;" @click="registerUser">
      Regisztráció
    </v-btn>

    <p class='text-start' style='width: 100%;'>
      Már van fiókod?
      <span style="font-style: italic;" class='text-primary cursor-pointer' @click="navigateTo('/login')">
        Jelentkezz be itt!
      </span>
    </p>
    
  </v-container>
  
  <div v-else style="max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: center; background-color: #f0f8ff;">
    <h2>Sikeres regisztráció!</h2>
    <p>A regisztráció sikeres volt. Kérlek, jelentkezz be.</p>
  </div>

</template>

<style>
.v-messages__message {
    color: red;
    line-height: 1.5 !important;
    font-weight: bold;
}
</style>