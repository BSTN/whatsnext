import { Octokit } from 'octokit';
import markdownParser from "@nuxt/content/transformers/markdown";


const list = ref([])
const pages = ref({})
const loadingStarted = ref(false)

async function loadList() {
  const octokit = new Octokit();
  const { data } = await octokit.rest.repos.getContent({
    owner: 'BSTN',
    repo: "whatsnext-content",
    path: '/profiles'
  })
  if (!data || !Array.isArray(data)) { return false }
  list.value = data.filter(x => x.name !== 'README.md')
  loadFiles()
}

async function loadFiles() {
  for (let i in list.value) {
    const pageObject = {
      loading: true,
      error: '',
      data: null,
      raw: ''
    }
    pages.value[list.value[i].name] = pageObject
    fetch(list.value[i].download_url).then(x => x.text()).then(async x => {
      pages.value[list.value[i].name].raw = x
      pages.value[list.value[i].name].data = await markdownParser.parse(list.value[i].name, x)
      pages.value[list.value[i].name].loading = false
    }).catch(err => {
      pages.value[list.value[i].name].loading = false
      pages.value[list.value[i].name].error = err
    })
  }
}

export async function usePages () {
  if (!loadingStarted.value) {
    loadingStarted.value = true
    await loadList()
  }
  return {
    list,
    loadList,
    pages
  }
}