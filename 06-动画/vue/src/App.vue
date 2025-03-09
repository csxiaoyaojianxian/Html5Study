<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
const show = ref(true)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" @click="show = !show" />
    <Transition name="slide-fade">
      <div v-if="show" class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </Transition>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header { line-height: 1.5; }
.logo { display: block; margin: 0 auto 2rem; }
@media (min-width: 1024px) {
  header { display: flex; place-items: center; padding-right: calc(var(--section-gap) / 2); }
  .logo { margin: 0 2rem 0 0; }
  header .wrapper { display: flex; place-items: flex-start; flex-wrap: wrap; }
}

/* default */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* slide-fade */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* bounce */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}



</style>
