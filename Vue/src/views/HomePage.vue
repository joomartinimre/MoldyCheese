<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useDisplay } from 'vuetify';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

interface Place {
  id: number;
  url: string;
  title: string;
  rating: number;
  description: string;
}

const popularPlaces = ref<Place[]>([]);
const recentPlaces = ref<Place[]>([]);
const latestPlaces = ref<Place[]>([]);
const topRatedPlaces = ref<Place[]>([]);

const convertBlobToUrl = (blobData: string): string => {
  return `data:image/jpeg;base64,${blobData}`;
};

const API_BASE = "http://localhost:3000/api/main";

const fetchPlaces = async () => {
  try {
    const authStore = useAuthStore();

    const popularResponse = await axios.get(`${API_BASE}/popular`);
    console.log("POPULAR RESPONSE:", popularResponse.data);
    popularPlaces.value = popularResponse.data.map((place: any) => ({
      id: place.id,
      url: place.url,
      title: place.title,
      rating: place.rating,
      description: place.description
    }));

    const latestResponse = await axios.get(`${API_BASE}/latest`);
    latestPlaces.value = latestResponse.data.map((place: any) => ({
      id: place.id,
      url: place.url,
      title: place.title,
      rating: place.rating,
      description: place.description
    }));

    const topRatedResponse = await axios.get(`${API_BASE}/top-rated`);
    topRatedPlaces.value = topRatedResponse.data.map((place: any) => ({
      id: place.id,
      url: place.url,
      title: place.title,
      rating: place.rating,
      description: place.description
    }));

    // 🆕 Negyedik: recent helyek lekérése az authstore alapján
    if (authStore.recentPlaceIds.length > 0) {
      const recentResponse = await axios.post(`${API_BASE}/recent`, {
        placeIds: authStore.recentPlaceIds,
      });
      
      recentPlaces.value = recentResponse.data.map((place: any) => ({
        id: place.id,
        url: place.url,
        title: place.title,
        rating: place.rating,
        description: place.description
      }));
    } else {
      recentPlaces.value = [];
    }

  } catch (error) {
    console.error("Hiba történt a helyek lekérése közben:", error);
  }
};


onMounted(async () => {
  await fetchPlaces();
});

const isUserInteracting = ref(false);
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  if (!isUserInteracting.value) {
    if (activeIndex.value < popularPlaces.value.length - 1) {
      activeIndex.value++;
    } else {
      setTimeout(() => {
        activeIndex.value = 0;
      }, 2000);
    }
  }
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, 10000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});

const { mobile } = useDisplay();
const loading = ref(false);
const transitionState = ref("");
const windowModel = ref(0);
const displayedPlaces = ref(18);
const totalPlaces = computed(() => latestPlaces.value.length);

const loadMore = () => {
  displayedPlaces.value += 18;
};

const activeIndex = ref(0);
const dragStart = ref(0);
const dragOffset = ref(0);
const dragging = ref(false);

const sliderStyle = computed(() => ({
  transform: `translateX(calc(-${activeIndex.value * 100}% + ${dragOffset.value}px))`,
  transition: dragging.value ? 'none' : 'transform 0.3s ease'
}));

function onMouseMove(e: MouseEvent) {
  if (!dragging.value) return;
  dragOffset.value = e.clientX - dragStart.value;
}

function onMouseDown(e: MouseEvent) {
  dragging.value = true;
  isUserInteracting.value = true;
  stopAutoplay();
  dragStart.value = e.clientX;
}

function onMouseUp() {
  if (!dragging.value) return;
  dragging.value = false;
  isUserInteracting.value = false;
  startAutoplay();
  const threshold = 50;
  if (dragOffset.value < -threshold && activeIndex.value < popularPlaces.value.length - 1) {
    activeIndex.value++;
  } else if (dragOffset.value > threshold && activeIndex.value > 0) {
    activeIndex.value--;
  }
  dragOffset.value = 0;
}

function onMouseLeave() {
  if (dragging.value) {
    onMouseUp();
  }
}

function onTouchStart(e: TouchEvent) {
  const touchStart = e.touches[0].clientX;
  onMouseDown({ clientX: touchStart } as MouseEvent);
}

function onTouchMove(e: TouchEvent) {
  const touchMove = e.touches[0].clientX;
  onMouseMove({ clientX: touchMove } as MouseEvent);
}

function onTouchEnd(e: TouchEvent) {
  if (!dragging.value) return;
  dragging.value = false;
  isUserInteracting.value = false;
  startAutoplay();
  const threshold = 50;
  if (dragOffset.value < -threshold && activeIndex.value < popularPlaces.value.length - 1) {
    activeIndex.value++;
  } else if (dragOffset.value > threshold && activeIndex.value > 0) {
    activeIndex.value--;
  }
  dragOffset.value = 0;
}

const goToSlide = (index: number) => {
  activeIndex.value = index;
};

// Custom slider logikája
let currentIndex = 0;
let updateCustomSlider: () => void;

const initCustomSlider = () => {
  const track = document.querySelector('.custom-slider-track') as HTMLElement;
  const leftArrow = document.querySelector('.custom-arrow.custom-left') as HTMLButtonElement;
  const rightArrow = document.querySelector('.custom-arrow.custom-right') as HTMLButtonElement;
  const wrapper = document.querySelector('.custom-slider-wrapper') as HTMLElement;

  updateCustomSlider = () => {
    const cards = document.querySelectorAll('.custom-card');
    if (!cards.length || !wrapper) return;
    const cardWidth = (cards[0] as HTMLElement).offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const totalCards = cards.length;
    const totalTrackWidth = (cardWidth * totalCards) + (gap * (totalCards - 1));
    const containerWidth = wrapper.clientWidth;
    const maxShift = totalTrackWidth - containerWidth;
    const desiredShift = currentIndex * (cardWidth + gap);
    const shift = Math.min(desiredShift, maxShift);

    track.style.transform = `translateX(-${shift}px)`;

    leftArrow.disabled = shift === 0;
    rightArrow.disabled = shift === maxShift;
  };

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCustomSlider();
    }
  });

  rightArrow.addEventListener('click', () => {
    const cards = document.querySelectorAll('.custom-card');
    if (!cards.length) return;
    const cardWidth = (cards[0] as HTMLElement).offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const totalTrackWidth = (cardWidth * cards.length) + (gap * (cards.length - 1));
    const containerWidth = wrapper.clientWidth;
    const maxShift = totalTrackWidth - containerWidth;
    const currentShift = Math.min(currentIndex * (cardWidth + gap), maxShift);

    if (currentShift < maxShift) {
      currentIndex++;
      updateCustomSlider();
    }
  });

  window.addEventListener('resize', updateCustomSlider);
  updateCustomSlider();
};

// Várjuk meg, hogy a latestPlaces feltöltődjön, majd a DOM is frissüljön
watch(topRatedPlaces, (newVal) => {
  if (newVal.length) {
    nextTick(() => {
      currentIndex = 0; // alaphelyzetbe állítjuk az indexet
      initCustomSlider();
    });
  }
}, { immediate: true });

let windowAutoplayInterval: ReturnType<typeof setInterval> | null = null;

// Flag, hogy megkülönböztesd az automatikus slide váltást a manuálistól
const isAutoChanging = ref(false);

// Módosított automatikus slide váltás
const nextWindowSlide = () => {
  isAutoChanging.value = true;
  if (windowModel.value < popularPlaces.value.length - 1) {
    windowModel.value++;
  } else {
    windowModel.value = 0;
  }
  // A flag visszaállítása a következő tick-ben, hogy a watch már manuális változásként kezelje a későbbi módosításokat
  nextTick(() => {
    isAutoChanging.value = false;
  });
};

const startWindowAutoplay = () => {
  stopWindowAutoplay(); // Biztos, hogy ne legyen több futó intervallum
  windowAutoplayInterval = setInterval(nextWindowSlide, 10000);
};

const stopWindowAutoplay = () => {
  if (windowAutoplayInterval) {
    clearInterval(windowAutoplayInterval);
    windowAutoplayInterval = null;
  }
};

onMounted(() => {
  startWindowAutoplay();
});

onUnmounted(() => {
  stopWindowAutoplay();
});

// Watch, amely figyeli a windowModel változását
watch(windowModel, () => {
  // Ha a flag nincs beállítva, az azt jelenti, hogy manuális változás történt
  if (!isAutoChanging.value) {
    stopWindowAutoplay();
    startWindowAutoplay();
  }
});


</script>



<template>
  <!-- Popular-->
  <v-container fluid style="padding: 0px;">
    <v-window v-model="windowModel" :show-arrows="$vuetify.display.mdAndUp">
      <v-window-item v-for="hely in popularPlaces" :key="hely.id">
        <div class="homepage-container" :style="{ backgroundImage: `url(${hely.url})` }">
          <div class="content" :class="transitionState">
            <div class="text-section">
              <h1 style="padding-bottom: 20px;">{{ hely.title }}</h1>
              <div class="description-container">
                <p>{{ hely.description }}</p>
              </div>
              <v-card-text style="text-align: left;">
                <v-rating v-if="!mobile"
                  readonly
                  :model-value="hely.rating"
                  :length="10"
                  size="large"
                  active-color="elevated text-surface"
                ></v-rating>
                <v-rating v-if="mobile"
                  readonly
                  :model-value="hely.rating"
                  :length="10"
                  :size="40"
                  active-color="elevated text-surface"
                ></v-rating>
              </v-card-text>
              <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface"> Adatlap </v-btn>
            </div>
            <div class="image-section">
              <img :src="hely.url" alt="Hely képe" />
            </div>
          </div>
        </div>
      </v-window-item>
    </v-window>
    <!-- Recent-->
       
    <h1 v-if="recentPlaces.length > 0" style="padding: 0px 30px; max-width: 2300px; margin: auto;">Korábban megtekintve</h1>
    <v-container v-if="recentPlaces.length > 0" class="horizontal-scroll-container" fluid>
      <v-row class="horizontal-scroll-track">
        <v-col
        v-for="hely in recentPlaces.slice(0, displayedPlaces)" 
        :key="hely.title">
        <v-card
          rounded="xl"
          :disabled="loading"
          :loading="loading"
          class="mx-auto">

          <v-img
            height="250"
            :src="hely.url"
            cover
          ></v-img>

          <v-card-item>
            <v-card-title>{{ hely.title }}</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-rating
              readonly
              :model-value="hely.rating"
              :length="10"
              size=""
              active-color="primary"
            ></v-rating>
          </v-card-text>
          <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface" style="margin: 15px;"> Adatlap </v-btn>
        </v-card>
      </v-col>
      </v-row>
    </v-container>

      <!-- latest-->
    <h1 style="padding: 0px 30px; max-width: 2300px; margin: auto;">Legújabb helyek</h1>
    <v-row style="max-width: 2300px; margin: auto; padding: 0px 18px 0px 18px">
      <v-col
        v-for="hely in latestPlaces.slice(0, displayedPlaces)" 
        :key="hely.title" 
        cols="12" sm="6" md="4" lg="3" xl="2">
        <v-card
          rounded="xl"
          :disabled="loading"
          :loading="loading"
          class="mx-auto">

          <v-img
            height="250"
            :src="hely.url"
            cover
          ></v-img>

          <v-card-item>
            <v-card-title>{{ hely.title }}</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-rating
              readonly
              :model-value="hely.rating"
              :length="10"
              size=""
              active-color="primary"
            ></v-rating>
          </v-card-text>
          <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface" style="margin: 15px;"> Adatlap </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Továbbiak betöltése gomb -->
    <v-btn
      v-if="displayedPlaces < totalPlaces" 
      @click="loadMore"
      color="primary"
      class="text-surface"
      style="display: block; margin: auto; margin-bottom: 12px;"
    >
      Továbbiak betöltése
    </v-btn>
    
      <!-- popular-->
    <div class="slider-container"
     @mousedown="onMouseDown"
     @mousemove="onMouseMove"
     @mouseup="onMouseUp"
     @mouseleave="onMouseLeave"
     @touchstart="onTouchStart"   
     @touchmove="onTouchMove"    
     @touchend="onTouchEnd">
      <div class="slider-track" :style="sliderStyle">
        <div v-for="hely in popularPlaces" :key="hely.id" class="slide">
          <div class="homepage-container" :style="{ backgroundImage: `url(${hely.url})` }">
            <div class="content" :class="transitionState">
              <div class="text-section">
                <h1>{{ hely.title }}</h1>
                <div class="description-container">
                  <p>{{ hely.description }}</p>
                </div>
                <v-card-text style="text-align: left;">
                  <v-rating v-if="!mobile"
                    readonly
                    :model-value="hely.rating"
                    :length="10"
                    size="large"
                    active-color="elevated text-surface"
                  ></v-rating>
                  <v-rating v-if="mobile"
                    readonly
                    :model-value="hely.rating"
                    :length="10"
                    :size="25"
                    active-color="elevated text-surface"
                  ></v-rating>
                </v-card-text>
                <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface"> Adatlap </v-btn>
              </div>
              <div class="image-section">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bars-container">
        <div
          v-for="(hely, index) in popularPlaces"
          :key="hely.id"
          class="bar"
          :class="{ active: activeIndex === index }"
          @click="goToSlide(index)"
        ></div>
      </div>
    </div>
    
      <!-- top-rated-->
    <h1 style="padding: 0px 30px; max-width: 2300px; margin: auto;">A legjobb 10</h1>
  </v-container>
  <div class="custom-slider-container">
    <v-btn icon class="custom-arrow custom-left">
  <v-icon>mdi-chevron-left</v-icon>
</v-btn>
  <div class="custom-slider-wrapper">
    <div class="custom-slider-track">
      <v-col v-for="hely in topRatedPlaces" :key="hely.title" class="custom-card">
        <v-card rounded="xl" :disabled="loading" :loading="loading" class="mx-auto">
          <v-img height="250" :src="hely.url" cover></v-img>
          <v-card-item>
            <v-card-title>{{ hely.title }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <v-rating readonly :model-value="hely.rating" :length="10" size="" active-color="primary"></v-rating>
          </v-card-text>
          <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface" style="margin: 15px;">
            Adatlap
          </v-btn>
        </v-card>
      </v-col>
    </div>
  </div>
  <v-btn icon class="custom-arrow custom-right">
  <v-icon>mdi-chevron-right</v-icon>
</v-btn>
</div>

  <br>
  <br>
</template>

<style scoped>

.text-section p{
  font-size: 20px;
  text-align: left;
}

.content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 2300px;
  padding: 80px;
  border-radius: 10px;
  flex-wrap: wrap; /* Engedélyezi a sorok törését */
  z-index: 2;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  min-height: fit-content;
}

.homepage-container {
  width: 100%;
  min-height: 100%; /* A tartalom magasságához igazodik */
  height: 94vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 20px; /* Alsó padding a biztonság kedvéért */
  z-index: 0;
}

.homepage-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

/* Szöveges rész */
.text-section {
  flex: 1;
  color: white;
  text-align: left;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.image-section img {
  width: 90%;
  border-radius: 10px;
}

@media (max-width: 1300px) {
  .content {
    flex-direction: column; /* Oszlopos elrendezés */
    align-items: center; /* Középre igazítás */
    min-height: fit-content; /* Dinamikus magasság a tartalom alapján */
  }

  .image-section {
    order: -1; /* A kép kerül előre */
    justify-content: center;
    width: 100%; /* Kép teljes szélességet kitölt */
  }

  .image-section img {
    margin-bottom: 20px; /* Hézag a kép alján */
    width: 100%; /* Kép méretének csökkentése kisebb képernyőn */
  }

  .text-section {
    margin: 0; /* Margók eltávolítása */
    width: 100%; /* Szöveg a teljes szélességhez igazodik */
  }

  .homepage-container
  {
    height: 100%;
  }
}

.content .v-card-text
{
  padding: 0px !important;
}

div .v-card-text
{
  padding: 0px !important;
  padding-left: 16px !important;
}

.description-container {
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: white;
}

/* Slider konténer */
.slider-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
  max-width: 2300px;
  margin: auto;

}

/* A slider-track flexbox elrendezéssel egymás mellé helyezi a slide-okat */
.slider-track {
  display: flex;
  width: 100%;
}

/* Minden slide 100% szélességet kap */
.slide {
  flex: 0 0 100%;
  padding: 0px 30px;
}
@media (max-width: 870px) {
  /* Slide szélesség automatikusan 100%-ra állítva */
  .slide {
    flex: 0 0 100%;  /* Minden slide 100%-os szélességet kap */
    max-width: 100%; /* Biztosítjuk, hogy a szélesség nem haladja meg a szülő szélességét */
  }

  /* A slide tartalma is igazodik a slide szélességéhez */
  .slide .content {
    flex-direction: column; /* Oszlopos elrendezés, ha kisebb a képernyő */
    align-items: center; /* Középre igazítjuk a tartalmat */
    width: 100%; /* A tartalom szélessége 100% */
    padding: 20px; /* Hézag a tartalom körül */
  }

  .slide .text-section {
    width: 100%; /* A szöveges rész szélessége 100% */
    padding: 10px; /* Hézag hozzáadása */
  }

  .slide .image-section {
    width: 100%; /* Kép szélessége 100% */
    display: flex;
    justify-content: center; /* Kép középre igazítása */
  }

  .slide .image-section img {
    width: 100%; /* Kép automatikusan kitölti a szülő szélességét */
    max-width: 300px; /* Kép ne legyen túl nagy */
    margin-bottom: 20px; /* Hézag a kép alján */
  }

  .slide .description-container {
    max-height: 200px; /* A leírás dobozának maximális magassága */
    overflow-y: auto; /* Ha túl hosszú, görgethető lesz */
    padding: 10px;
  }
}

/* Fogó kurzor, amikor lenyomod az egeret */
.slider-container:active {
  cursor: grab;  /* Amikor megfogod */
}

.bars-container {
  position: absolute;
  bottom: 20px; /* A slider alján */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  justify-content: center;
}

/* Csíkok (bars) alap stílusai */
.bar {
  width: 30px; /* A csíkok szélessége */
  height: 5px; /* A csíkok magassága */
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Aktív csík kiemelése */
.bar.active {
  background-color: white;
}

.custom-slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 2300px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 30px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

/* Fix szélességű wrapper, hogy 7 kártya jelenjen meg */
.custom-slider-wrapper {
  overflow: hidden;
}

/* A track-nek nem kell a calc, mert a wrapper fix */
.custom-slider-track {
  display: flex;
  gap: 9px;
  transition: transform 0.3s ease;
}

/* A kártyák fix szélessége */
.custom-card {
  /* Szélesség: a konténer teljes szélessége mínusz a 6 gap, osztva 7-tel */
  width: calc((100% - 6 * 10px) / 7);
  flex: 0 0 auto;
  box-sizing: border-box;
}

@media (max-width: 2000px) {
  .custom-card {
    width: calc((100% - 3 * 10px) / 4);
  }
}

@media (max-width: 1280px) {
  .custom-card {
    width: calc((100% - 2 * 10px) / 3);
  }
}

@media (max-width: 960px) {
  .custom-card {
    width: calc((100% - 10px) / 2);
  }
}

@media (max-width: 600px) {
  .custom-card {
    width: 100%;
  }
}

.custom-arrow {
  position: absolute;
  top: 50%;                  /* Függőleges középre helyezés */
  transform: translateY(-50%); /* A gombokat középre igazítjuk */
  z-index: 10;               /* Legyenek a slider elemei felett */
}

.custom-arrow.custom-left {
  left: 20px;
}

/* A jobb nyíl a jobb oldalon */
.custom-arrow.custom-right {
  right: 20px;
}

.horizontal-scroll-container {
  overflow-x: auto;
  /* Opcionális: elrejti a függőleges scrollt, ha van */
  overflow-y: hidden;
  display: flex;
  width: 100%;
  max-width: 2250px;
}

.horizontal-scroll-track {
  display: flex;
  /* Ha szeretnéd, hogy a kártyák ne törjenek új sorba */
  flex-wrap: nowrap;
}


</style>