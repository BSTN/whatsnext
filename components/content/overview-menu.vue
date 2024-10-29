<template>
  <div class="overview-menu">
    <div class="frame">
      <div class="left">
        <TheLogo>Wat nu?</TheLogo>
      </div>
      <div class="right">
        <div class="language">
          <button @click="setLocale('nl')" :class="{ active: locale === 'nl' }">Nederlands</button>
          <button @click="setLocale('en')" :class="{ active: locale === 'en' }">English</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale, setLocale, setLocaleCookie } = useI18n()
</script>

<style lang="less" scoped>
.overview-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.2s ease;

  .frame {
    .row();
    padding: 2rem 0;
    display: flex;
  }

  .nottop.scroll-down & {
    opacity: 0;
    transform: translateY(-2rem);
  }
}

.left {
  flex: 1;
}

.language {
  button {
    color: var(--fg2);
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    background: transparent;

    &.active {
      color: var(--fg);
      background: var(--bg);
    }

    &:hover {
      background: var(--bg);
      color: var(--link);
    }
  }
}
</style>