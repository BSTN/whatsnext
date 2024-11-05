<template>
  <transition name="fade">
    <!-- <div class="preloading" v-if="!props.loaded"> -->
    <div class="preloading" v-if="preloading" @click="preloading = false">
      <div class="frame">
        <div>
          <label>Laden van relevante data:</label>
          <loadingBar v-model="loading1" v-bind="{ duration: 500, delay: 0 }" @done="loading2 = true"></loadingBar>
        </div>
        <div>
          <label>Genereren van uitleg:</label>
          <loadingBar v-model="loading2" :duration="2000" :delay="0" @done="loading3 = true"></loadingBar>
        </div>
        <div>
          <label>Genereren van persoonlijke ervaringen:</label>
          <loadingBar v-model="loading3" v-bind="{ duration: 800, delay: 0 }" @done="done"></loadingBar>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const props = defineProps(['loaded'])
const preloading = ref(true)
const model = defineModel()
const loading1 = ref(false)
const loading2 = ref(false)
const loading3 = ref(false)
onMounted(() => {
  loading1.value = true
})
function done() {
  preloading.value = false
  model.value = true
}
</script>

<style lang="less" scoped>
.preloading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow: auto;
  background: var(--bg2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity .35s ease;
  }

  .frame {
    width: 30rem;
    max-width: 100%;
    background: var(--bg);
    border-radius: 0.5rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  label {
    color: var(--fg);
  }
}
</style>