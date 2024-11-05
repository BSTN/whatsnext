


export const useProfiles = (folder:string) => {
  const { locale } = useI18n()
  const { data, error, status } = useFetch('/api/profiles')
  const route = useRoute()
  const current = computed(() => {
    if (!data.value) return false
    if (!route.params?.type || !route.params?.name || !(String(route.params.type) in data.value) || !(String(route.params.name) in data.value[route.params.type])) {
      return false
    }
    const currentdata = data.value[String(route.params.type)][String(route.params.name)]
    if (locale.value in currentdata) {
      return currentdata[locale.value]
    }
    // default language
    return currentdata['nl']
  })

  const list = computed(() => {
    const tlist = {}
    if (!data.value) return tlist
    if (!folder || !(folder in data.value)) return tlist
    for (let i in data.value[folder]) {
      const x = data.value[folder][i]
      if (x[locale.value]) {
        tlist[i] = x[locale.value]
      } else {
        tlist[i] = x.nl
      }
    }
    return tlist
  })
  
  return {
    data, error, status, list, current
  }
}
