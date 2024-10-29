import { Octokit } from 'octokit';
import markdownParser from "@nuxt/content/transformers/markdown";

const alldocs = ref([])
const list = ref([])
const pages = ref({})
const loadingStarted = ref(false)

async function loadList() {
  list.value = []
  const octokit = new Octokit();
  const { data } = await octokit.rest.repos.getContent({
    owner: 'BSTN',
    repo: "whatsnext-content",
    path: '/profiles'
  })
  if (!data || !Array.isArray(data)) { return false }
  const l = data.filter(x => x.name !== 'README.md')
  for (let i in l) {
    l[i].langname = l[i].name.split('.')[0]
    if (!list.value.find(x => x.langname === l[i].langname)) {
      list.value.push(l[i])
    }
  }
  alldocs.value = l
  loadFiles()
}

async function loadFiles() {
  for (let i in alldocs.value) {
    const pageObject = {
      loading: true,
      error: '',
      data: null,
      raw: ''
    }
    pages.value[alldocs.value[i].name] = pageObject
    fetch(alldocs.value[i].download_url).then(x => x.text()).then(async x => {
      pages.value[alldocs.value[i].name].raw = x
      pages.value[alldocs.value[i].name].data = await markdownParser.parse(alldocs.value[i].name, x)
      pages.value[alldocs.value[i].name].loading = false
    }).catch(err => {
      pages.value[alldocs.value[i].name].loading = false
      pages.value[alldocs.value[i].name].error = err
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
    pages,
    alldocs
  }
}