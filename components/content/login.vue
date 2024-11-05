<template>
  <div class="login">
    <div class="frame">
      <TheLogo>Wat nu?</TheLogo>
      <div class="description">
        <slot>Welkom bij <b><em>Wat nu?</em></b>, je digitale hulp voor het begrijpelijker maken van je diagnose
          aan de hand van cijfers, uitleg en ervaringen. Hieronder kun je inloggen met je Elektronisch Patiëntendossier
          (EPD). Voor de demo kan je hieronder een fictief dossier selecteren.
        </slot>
      </div>
      <div class="loginbox">
        <div>
          <!-- <label>Selecteer een fictief EPD:</label> -->
          <div class="selectbox" @click="focus = true" v-on-click-outside="delayBlur">
            <div class="name">{{ active?.data?.title || 'Selecteer een fictief EPD:' }}</div>
            <Icon icon="iconamoon:arrow-down-2-fill"></Icon>
          </div>
        </div>
        <!-- <div class="loading"> -->
        <loadingBar v-model="loading" v-bind="{ duration: 1200, remove: true, delay: 0 }" @done="loading = false">
        </loadingBar>
        <!-- fictional profiles -->
        <div class="demo-data" v-if="list && focus">
          <div class="demo" v-for="item in list" @click="setActive(item)">
            <div class="name">{{ item.data.title }}</div>
            <Icon icon="heroicons:user-16-solid"></Icon>
          </div>
        </div>
        <Profile class="profile" v-if="profile && !focus && !loading" :fields="profile"></Profile>
      </div>

      <div class="continue" v-if="typeof active === 'object' && !loading && !focus">
        <button @click="$router.push(`/${active.type}/${active.name}`)">Ga verder -></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import { Icon } from '@iconify/vue'
const route = useRoute()
const { list } = useProfiles()
const focus = ref(false)
const active = ref(false)
const loading = ref(false)

function delayBlur() {
  setTimeout(() => {
    focus.value = false
  }, 10);
}

function setActive(item) {
  loading.value = true
  active.value = item
}

const profile = computed(() => {
  if (!active.value) return false
  // return active.value
  const p = active.value.data.body.children.find(x => x.tag === 'profile')
  if (!p) return false
  return JSON.parse(p.props[':fields'])
})

onMounted(async () => {
})
</script>

<style lang="less" scoped>
.login {
  background: var(--bg2);
  padding: 4rem 0;

  .frame {
    .row();
    min-height: calc(100vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    gap: 2rem;
  }
}



.description {
  width: var(--pwidth);
  max-width: 100%;
}

.loginbox {
  width: 30rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid var(--bc);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--bg);
  box-shadow: 0 0.1rem 0.15rem var(--shadow);
  user-select: none;

  label {
    text-align: center;
    margin-bottom: 1rem;
  }

  .selectbox {
    display: flex;
    border: 1px solid var(--bc);
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    align-items: center;
    cursor: pointer;

    .name {
      flex: 1;
    }

    &:hover {
      background-color: var(--bg2);
      color: var(--link);

      .iconify {
        color: var(--link);
      }
    }
  }
}

.demo-data {
  max-width: 100%;
  border: 1px solid var(--bc);
  border-radius: 0.25rem;
  overflow: hidden;

  .demo {
    cursor: pointer;
    display: block;
    background: var(--bg);
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid var(--bc);

    &:last-child {
      border-bottom: 0;
    }

    .name {
      flex: 1;
    }

    &:hover {
      background: var(--bg2);
      color: var(--link);
    }
  }
}

.profile {
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;

  :deep(.frame) {
    background: var(--bg) !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 1rem 0 !important;
  }
}

.continue {
  button {
    padding: 0.5rem 1rem;
    color: var(--bg2);
    background: var(--fg);

    &:hover {
      background: var(--link);
      color: var(--bg);
    }
  }
}
</style>