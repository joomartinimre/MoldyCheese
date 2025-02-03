<script setup>
import { reactive, ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, email, sameAs, helpers } from '@vuelidate/validators';

//ötletek/teendők: dinamikus Adatbázis. Bodával megbeszélni az API hívását (egyszerre lefuttatása, összekötés). Egyszeri API hívás, adatok lementése. Regi design (Márk). Elfelejtett jelszó, Emailes megerősítés. Login/Regi mükődés
//Profile page: username email, role, number of comments. top 3 most liked comments, profile picture, smtp server (google smtp mair trap(test) )

const form = reactive({
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const containsUppercase = (value) => /[A-Z]/.test(value);
const containsNumber = (value) => /\d/.test(value);
const containsSpecialChar = (value) => /[@$!%*?&]/.test(value);

const confirmPasswordMatches = computed(() => form.confirmPassword === form.password);

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

const submitForm = () => {
  v$.value.$touch();
  showErrors.value = true;
  showConfirmPasswordError.value = true;
  
  console.log("🔍 Form adatok:", JSON.parse(JSON.stringify(form)));
  console.log("✅ Vuelidate állapot:", v$.value);
  console.log("🛠 Jelszó:", form.password, "Jelszó megerősítés:", form.confirmPassword);
  console.log("🔍 Egyezés állapot:", confirmPasswordMatches.value);
  
  if (v$.value.$invalid) {
    console.error("❌ Hibás adatok!", v$.value.$errors);
    return;
  }
  
  console.log("🎉 Sikeres regisztrációs adatok:", form);
  registrationSuccess.value = true;
  alert("Sikeres regisztráció!");
};
</script>

<template>
  <div v-if="!registrationSuccess" style="max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: left;">
    <h2>Regisztráció</h2>
    <label>Felhasználónév</label>
    <input v-model="form.userName" type="text" @blur="v$.userName.$touch" />
    <p v-if="v$.userName.$error" style="color: red;">{{ v$.userName.$errors[0]?.$message }}</p>

    <label>Email</label>
    <input v-model="form.email" type="email" @blur="v$.email.$touch" />
    <p v-if="v$.email.$error" style="color: red;">{{ v$.email.$errors[0]?.$message }}</p>

    <label>Jelszó</label>
    <input v-model="form.password" type="password" @blur="v$.password.$touch" />
    <p v-if="v$.password.$error" style="color: red;">{{ v$.password.$errors.map(e => e.$message).join(', ') }}</p>

    <label>Jelszó megerősítése</label>
    <input v-model="form.confirmPassword" type="password" />
    <p v-if="showConfirmPasswordError && v$.confirmPassword.$error" style="color: red;">{{ v$.confirmPassword.$errors[0]?.$message }}</p>

    <button @click="submitForm">Regisztráció</button>
  </div>
  
  <div v-else style="max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: center; background-color: #f0f8ff;">
    <h2>Sikeres regisztráció!</h2>
    <p>A regisztráció sikeres volt. Kérlek, jelentkezz be.</p>
  </div>
</template>

<style>
input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>


