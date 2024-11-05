import markdownParser from "@nuxt/content/transformers/markdown";
import { Octokit } from 'octokit';
const runtimeConfig = useRuntimeConfig()

const octokit = new Octokit({auth: runtimeConfig.githubtoken});

async function loadFile(download_url:string) {
  return fetch(download_url).then(x => x.text()).then(async x => {
    return {
      raw: x,
      content: await markdownParser.parse(download_url, x)
    }
  }).catch(err => {
    return {
      error: `Could not load file ${download_url}`
    }
  })
}

async function loadDir(path: string, type: string) {
  const list = {}
  const { data } = await octokit.rest.repos.getContent({
    owner: 'BSTN',
    repo: "whatsnext-content",
    path
  }).catch(err => {
    throw Error('Cannot load data from github.')
  })
  if (!data || !Array.isArray(data)) { throw Error('Empty folder') }

  for (let i in data) {
    const item = data[i]
    if (item.name.match(/readme\.md/i)) {
      continue
    }
    const [slug, langcode] = item.name.split('.')
    if (!(slug in list)) { list[slug] = {} }
    const { content, raw } = await loadFile(item.download_url)
    list[slug][langcode] = {
      name: slug,
      type,
      data:content,
      raw
    }
  }

  return list
}

export default defineEventHandler(async (event) => {
  
  const list = {}
  
  // get list
  const { data } = await octokit.rest.repos.getContent({
    owner: 'BSTN',
    repo: "whatsnext-content",
    path: '/profiles'
  }).catch(err => {
    throw Error('Cannot load data from github.')
  })
  
  if (!data || !Array.isArray(data)) { throw Error('Empty folder') }
  
  for (let i in data) {
    const item = data[i]
    if (item.type === 'dir') {
      list[item.name] = await loadDir(item.path, item.name).catch(console.warn)
    }
  }

  return list
})
