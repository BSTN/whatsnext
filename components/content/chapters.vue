<template>
  <div class="chapters" ref="el" :class="{ visible }">
    <div class="frame">
      <ClientOnly>
        <NuxtLink :to="`#${kebabCase(chapter)}`" class="chapter" v-for="chapter in chapters">{{ chapter }}
        </NuxtLink>
      </ClientOnly>
    </div>
    <div class="stickyframe">
      <button @click="open = !open">MENU</button>
      <div class="active-chapter">{{ activeChapter }}</div>
      <TransitionGroup name="fademenu">
        <div class="bg" v-if="open" @click="open = false"></div>
        <div class="menu" v-if="open" @click="open = false">
          <button class="close" @click="open = false">
            <icon icon="iconamoon:close-bold"></icon>
          </button>
          <div class="list">
            <ClientOnly>
              <NuxtLink :to="makeLink(chapter)" class="chapter" v-for="chapter in chapters"
                :class="{ active: chapter === activeChapter }">
                {{ chapter }}
              </NuxtLink>
            </ClientOnly>
          </div>
          <div class="bottom">
            <NuxtLink to="/">
              <icon icon="lucide:arrow-left"></icon>
            </NuxtLink>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useElementBounding, useWindowScroll } from '@vueuse/core';
import kebabCase from 'lodash/kebabCase'
const route = useRoute();
const open = ref(false)
const chapters = ref([])
const el = ref()
const { top } = useElementBounding(el)
const offsetList = []
const visible = computed(() => {
  return top.value < 0
})

function makeLink(chapter: string) {
  return `${route.fullPath.split('#')[0]}#${kebabCase(chapter)}`
}

const { y } = useWindowScroll()

const activeChapter = computed(() => {
  let found = false
  let name = ''
  const yy = y.value
  offsetList.map(x => {
    if (yy > (x.top)) {
      name = x.txt
      found = true
    }
  })
  return name
})

watch(open, (val) => {
  if (val) document.body.classList.add('scroll-block')
  else document.body.classList.remove('scroll-block')
})

onMounted(() => {
  if (import.meta.client) {
    const list = document.body.querySelectorAll('.chapter');
    list.forEach(el => {
      if (!el?.children[0]?.innerText) return
      const txt = el.children[0].innerText
      offsetList.push({
        top: el.scrollTop + el.getBoundingClientRect().top,
        txt
      })
      chapters.value.push(txt)
    })
  }
})

</script>
<style lang="less" scoped>
.chapters {
  border-top: 1px solid var(--bg2);
}

.frame {
  .row();
  margin: 10vh auto;
  position: relative;

  &:before {
    content: "";
    border-left: 1px solid var(--fg2);
    position: absolute;
    top: 1rem;
    left: 0.4rem;
    height: calc(100% - 2rem);
  }

  .chapter {
    font-size: 1.75rem;
    line-height: 1.2;
    margin-bottom: 1em;
    display: block;
    text-decoration: none;

    &:before {
      content: "•";
      margin-right: 1em;
    }
  }
}

.stickyframe {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 3.125rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  pointer-events: auto;
  opacity: 0;
  gap: 1rem;
  background: var(--bg);
  border-bottom: 1px solid var(--bc);
  transition: all 0.3s @easeInOutExpo;

  .nottop.scroll-down & {
    // opacity: 0;
    // transform: translateY(-2rem);
    // pointer-events: none;
  }

  .visible & {
    opacity: 1;
  }

  >button {
    border: 1px solid var(--bc);
    padding: 0.25rem 0.5rem;
    pointer-events: auto;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    position: relative;
    z-index: 1;
    margin: 0;
    font-weight: 600;

    &:hover {
      background: var(--bg2);
    }
  }

  >.active-chapter {
    color: var(--fg2);
  }

  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--bg3);
    z-index: 2;
    opacity: 0.85;
    pointer-events: auto;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 20rem;
    display: block;
    background: var(--bg);
    pointer-events: auto;
    border-right: 1px solid var(--bc);
    padding: 4rem 3rem 2rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >button.close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      margin: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      font-size: 1.5rem;
      color: var(--fg2);

      &:hover {
        color: var(--fg);
      }
    }

    .list {
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0.75rem;
        left: 0;
        height: calc(100% - 1.25rem);
        border-left: 1px solid var(--fg2);
      }

      a {
        display: block;
        text-decoration: none;
        color: var(--fg2);
        margin-bottom: 1em;
        position: relative;
        padding-left: 1rem;
        transition: all 0.1s ease;

        @s: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }

        &:before {
          content: "";
          width: @s;
          height: @s;
          border-radius: 100%;
          background: var(--fg);
          position: absolute;
          left: calc(-0.25rem + 0.5px);
          top: 0.6rem;
        }

        &.active {
          color: var(--fg);
        }

        &:hover {
          color: var(--fg);
          text-decoration: underline;
        }
      }
    }

    .bottom {
      a {
        font-size: 1.5rem;
        margin: 0;
      }
    }
  }
}
</style>