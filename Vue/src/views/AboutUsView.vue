<script lang="ts" setup>
import { ref } from 'vue'
import { usePageLoader } from '@/composables/usePageLoader';
import { onMounted } from 'vue';

onMounted(() => {
  startLoading();
  setTimeout(() => {
    stopLoading();
  }, 500);
});


const { loading, startLoading, stopLoading } = usePageLoader();


const dialog1 = ref(false)
const dialog2 = ref(false)
</script>

<template>
  <v-container v-if="loading" class="loading-screen">
    <v-progress-circular
      indeterminate
      color="primary"
      size="40"
    ></v-progress-circular>
    <p>Betöltés folyamatban...</p>
  </v-container>
  <body v-else>
    <header>
      <h1 color="primary">MoldyCheese - A helyértékelés forradalma</h1>
      <p>- "Minél több hely, minél több vélemény, minél egyszerűbb értékelés!"</p>
      <img
        class="floating-image header-deco"
        src="https://www.tasteofhome.com/wp-content/uploads/2022/09/GettyImages-470340853.jpg"
        alt="Dekoráció"
        style="top: 0px; left: 10px; transform: rotate(-10deg);"
      />
    </header>
    <div class="container">
        <section id="about">
        <h2>Rólunk</h2>
        <p>
          A MoldyCheese egy innovatív online platform, melynek elsődleges célja, hogy átfogó, részletes és objektív értékeléseket biztosítson a város különböző helyszíneiről. Oldalunk segítségével a látogatók könnyedén megtekinthetik és értékelhetik az iskoláktól és éttermektől kezdve a vegyesboltokon át a játszóterekig számos közösségi tér minőségét és szolgáltatásait. Az információk alapján a felhasználók megalapozott döntéseket hozhatnak a mindennapi életük során, legyen szó akár egy új étterem kipróbálásáról, akár egy gyermekbarát játszótér kiválasztásáról.
        </p>
        
        <h3>Platformunk Célja</h3>
        <p>
            A platformunk elsődleges célja az, hogy a város lakói számára egy átlátható és könnyen kezelhető felületet biztosítsunk, ahol a közösségi értékelések és a szakértői visszajelzések alapján választásaikat alakíthatják ki. Az oldalunkon megjelenő információk hozzájárulnak a helyszínek minőségének folyamatos javításához és a szolgáltatások optimalizálásához.
        </p>
        <img src="https://www.speexx.com/wp-content/uploads/Speexx_Blog_5_Steps_to_Achieving_a_Goal-scaled.jpg" style="max-width: 100%; float: left;" width="400px" alt="Kép 1">

        <h3>Értékelési Rendszerünk</h3>
        <p>
          Platformunk két fő értékelési csoportot különböztet meg: a hétköznapi felhasználók véleményét, akik saját tapasztalataik alapján adnak visszajelzést, valamint a témák szakértői által megadott értékeléseket. A kritikusok között megtalálhatók az olyan kategóriák, mint az <em>Iskológus</em>, az <em>Étterem kritikus</em>, a <em>Vegyesbolt vegyész</em> és a <em>Játszóter szakértő</em>. Az általuk adott értékelések egyedi számlálóval rendelkeznek, amelyek segítik a megítélt információk pontos és átfogó bemutatását.
        </p>
        
        <h3>Közösségi Interakció és Moderáció</h3>
        <img src="https://m.media-amazon.com/images/I/319S8zl9kSL._AC_UF894,1000_QL80_.jpg" style="float: right;" width="200px" alt="Kép 1">
        <p>
          A MoldyCheese nem csupán egy értékelő platform, hanem egy olyan közösségi tér is, ahol a felhasználók megoszthatják tapasztalataikat, javaslataikat és konstruktív kritikáikat. A beküldött értékelések szigorú moderációs folyamaton esnek át annak érdekében, hogy kizárólag a valós tapasztalatok és hiteles információk jelenjenek meg. Ez elősegíti a közösségi párbeszédet, és hozzájárul a szolgáltatások folyamatos fejlődéséhez.
        </p>

        <h3>Fejlesztések és Jövőkép</h3>
        <p>
          Az elkövetkező időszakban a MoldyCheese további fejlesztéseken fog átesni, hogy még szélesebb körben tudja támogatni a közösséget. Tervezett fejlesztéseink között szerepel egy mobilalkalmazás kifejlesztése, amely révén a felhasználók bárhol, bármikor elérhetik az oldal szolgáltatásait. Emellett új funkciókat kívánunk bevezetni, mint például interaktív térképek, személyre szabott ajánlások és részletes statisztikai adatok a különböző helyszínek értékeléseiről.
        </p>

        <h3>Elkötelezettségünk az Átláthatóság és a Felelősségvállalás Mellett</h3>
        <img src="https://uploads.dailydot.com/2024/06/kurt-angel-meme.jpg?auto=compress&fm=pjpg" style="max-width: 100%; float: left;" width="400px" alt="Kép 1">
        <p>
          A MoldyCheese alapelve a közösségi felelősségvállalás és az átláthatóság. Minden felhasználói értékelés és visszajelzés hozzájárul ahhoz, hogy a platformunk egyre pontosabb képet adjon a város különböző helyszíneinek minőségéről. Hiszünk abban, hogy az információk szabad megosztása és a hiteles visszajelzések révén a közösségi élet javítható, és elősegíthetjük a környező térségek fejlődését.
        </p>

        <p>
          Összefoglalva, a MoldyCheese célja egy átlátható, megbízható és korszerű online értékelési platform létrehozása, ahol a felhasználók a lehető legpontosabb és részletesebb információk alapján hozhatják meg döntéseiket. Minden értékelés és visszajelzés hozzájárul a közösségi párbeszéd és a hiteles információáramlás magas szintjének fenntartásához. Amennyiben kérdése merülne fel, vagy további információra lenne szüksége, kérjük, vegye fel velünk a kapcsolatot az oldalon feltüntetett elérhetőségek valamelyikén. Minden visszajelzést nagyra értékelünk, hiszen ezek segítenek abban, hogy folyamatosan javítsuk és fejlesszük szolgáltatásainkat.
        </p>
      </section>

      <section id="gallery">
        <div class="gallery-header">
          <h2>Képgaléria</h2>
          <img
            class="floating-image gallery-floating"
            src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg"
            alt="Dekoráció"
          />
        </div>
        <div class="gallery">
          <img src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg" alt="Kép 1">
          <img src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg" alt="Kép 2">
          <img src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg" alt="Kép 3">
          <img src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg" alt="Kép 4">
          <img src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg" alt="Kép 5">
          <img src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg" alt="Kép 6">
        </div>
      </section>
      <img
        class="floating-image"
        src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg"
        alt="Dekoráció"
        style="top: 0px; right: 20px; transform: rotate(12deg);"
      />
      <img
        class="floating-image"
        src="https://meglepetes.hu/uploads/2025/02/peneszes-sajt.jpg"
        alt="Dekoráció"
        style="bottom: 40px; left: 2%; transform: rotate(-15deg);"
      />
    </div>
    <div style="display: flex; gap: 20px;">
    <p 
      id="bal"
      @click="dialog1 = true" 
      style="cursor: pointer;"
    >
      --------------------
    </p>
    <v-dialog v-model="dialog1" max-width="1500px">
      <v-card>
        <v-card-title style="font-size: 30px;">Ha azt hiszed hogy igénytelen az oldalunk, akkor még nem láttad az asztalunkat:</v-card-title>
        <v-img src="http://localhost:3000/api/user/image/finalboss.png"></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog1 = false">Bezár</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <p
      id="jobb"
      @click="dialog2 = true" 
      style="cursor: pointer; margin-left: auto;"
    >
      --------------------
    </p>
    <v-dialog v-model="dialog2" max-width="800px">
      <v-card>
        <v-card-title style="font-size: 30px;">A kutyánk:</v-card-title>
        <v-img src="http://localhost:3000/api/user/image/gizsgugya.png"></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog2 = false">Bezár</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </body>
</template>

<style scoped>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.8;
  max-width: 100%;
}


header {
  position: relative;
  background: url('https://img.freepik.com/premium-vector/yellow-cheese-with-holes-panoramic-texture-background-vector_532963-5988.jpg') no-repeat center center/cover;
  color: #fff;
  padding: 80px 20px;
  text-align: center;
}
header h1 {
  font-size: 3.5em;
  margin: 0;
}
header p {
  font-size: 1.5em;
  margin-top: 20px;
}


.container {
  position: relative;
  max-width: 1200px;
  margin: 40px auto;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


section {
  margin-bottom: 60px;
}
h2 {
  color: #444;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 30px;
  font-size: 2.2em;
}

.container p {
  margin-bottom: 30px;
  font-size: 1.1em;
  text-align: justify;
}

p {
  font-size: 1.1em;
  text-align: justify;
}

@media (max-width: 1280px) {
  #jobb {
    position: absolute;
    right: 0px;
    bottom: 30px;
  }
  #bal {
    position: absolute;
    left: 0px;
    bottom: 30px;
  }
}

@media (max-width: 465px) {
  #jobb {
    position: absolute;
    right: 0px;
    bottom: 70px;
  }
  #bal {
    position: absolute;
    left: 0px;
    bottom: 70px;
  }
}


.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.gallery img {
  width: calc(33% - 20px);
  max-width: 300px;
  height: auto;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .gallery img {
    width: calc(50% - 20px);
  }
}
@media (max-width: 480px) {
  .gallery img {
    width: 100%;
  }
}


.inline-img {
  max-width: 300px;
  margin: 20px;
  border: 3px solid #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}


.gallery-header {
  position: relative;
  margin-bottom: 20px;
}

.gallery-header h2 {
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin: 0 0 30px 0;
  font-size: 2.2em;
}

.floating-image {
  position: absolute;
  max-width: 150px;
  opacity: 0.9;
  border: 3px solid #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.gallery-floating {
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(7deg);
}


#about img {
    padding: 20px;
}

.loading-screen {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 450px) {
  .gallery-floating {
    max-width: 30%;
  }
}

</style>