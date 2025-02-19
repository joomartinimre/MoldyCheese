<script lang="ts" setup>
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
    alert("Sikeres regisztráció!");
    console.log(`Sikeres regisztráció: ${data.message}`)
  } catch (err) {
    console.error('Hiba történt a regisztráció során:', err);
    alert('Nem sikerült csatlakozni a szerverhez.');
  }
  if (v$.value.$invalid) {
    console.error("❌ Hibás adatok!", v$.value.$errors);
    return;
  }
  
  console.log("🎉 Sikeres regisztrációs adatok:", form);
  registrationSuccess.value = true;
  
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

    <button  @click="registerUser">Regisztráció</button>
    
  </div>
  
  <div v-else style="max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: center; background-color: #f0f8ff;">
    <h2>Sikeres regisztráció!</h2>
    <p>A regisztráció sikeres volt. Kérlek, jelentkezz be.</p>
  </div>

</template>


