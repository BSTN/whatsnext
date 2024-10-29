<template>
  <div class="landing">
    <!-- <MainMenu></MainMenu> -->
    <div class="frame">
      <NuxtLink to="/">
        <TheLogo class="the-logo">{{ props.logo }}</TheLogo>
      </NuxtLink>
      <ClientOnly>
        <div class="content" :style="{ transform: `translateY(${y / 2}px)`, opacity: 1 - (y / height) }">
          <h1>{{ props.title }}</h1>
          <slot></slot>
        </div>
      </ClientOnly>
      <div class="languages">
        <div class="language" v-for="(item, langcode) in props.languages" :class="[`taal-${langcode}`]"
          @click="setLocale(String(langcode))">
          {{ item }}
        </div>
      </div>
      <button class="continue">
        <Icon icon="mdi:arrow-down-circle"></Icon>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
const { setLocale, locale } = useI18n()
const { y } = useWindowScroll()
const props = defineProps(['languages', 'title', 'logo'])
const { height } = useWindowSize()
</script>
<style lang="less">
.landing+.chapter {
  margin-top: 0 !important;
}
</style>
<style lang="less" scoped>
.landing {

  .frame {
    .row();
    min-height: 100vh;
    padding: 2rem 0;
    position: relative;

    @media (max-width: 50rem) {
      width: calc(100% - 3rem);
    }
  }

  .content {
    height: 100%;
    padding-top: 10vh;
  }

  .the-logo {
    font-size: 1rem;
    position: absolute;
    top: 2rem;
    z-index: 2;
    // right: 0;
  }

  h1 {
    font-size: 2.5rem;
    width: 12em;
    line-height: 1.1;
    text-align: left;
    margin: 0 auto 2rem 0;
    font-weight: 500;
    // margin-top: 4rem;
  }

  :deep(p) {
    margin: 0 auto 1rem 0;
  }
}

button.continue {
  position: absolute;
  bottom: 2rem;
  left: 0;
  border-radius: 100%;
  text-align: center;
  line-height: 0em;
  font-weight: 600;
  font-size: 3rem;
  margin: 0;
  padding: 0;

  &:hover {
    background: var(--bg);
    color: var(--fg);
  }
}

.languages {
  position: absolute;
  font-size: 1.25rem;
  margin-bottom: 2rem;
  right: 0;
  bottom: 0;
  text-align: right;

  .language {
    margin-top: 0.75em;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    &.taal-nl {
      opacity: 1;
    }
  }
}
</style>