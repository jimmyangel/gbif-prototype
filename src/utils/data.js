import axios from 'axios'

export async function getGbifOccurrences(offset, name) {
  let sN = (name) ? '&scientificName=' + name : ''
  let response = await axios.get('https://api.gbif.org/v1/occurrence/search/?country=VE&offset=' + offset + sN,
    {headers: {'Accept-Language': 'es; 0.9, en; 0.8'}})
  return response
}

export async function getSpeciesSuggestions(pre) {
  let response = await axios.get('https://api.gbif.org/v1/species/suggest?q=' + pre)
  return response
}

export async function getGbifDatasets(offset) {
  let response = await axios.get('https://api.gbif.org/v1/dataset/search?publishingCountry=VE&offset=' + offset,
    {headers: {'Accept-Language': 'es; 0.9, en; 0.8'}})
  return response
}
