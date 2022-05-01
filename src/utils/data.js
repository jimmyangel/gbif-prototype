import axios from 'axios'

export async function getGbifOccurrences(offset) {
  let response = await axios.get('https://api.gbif.org/v1/occurrence/search/?country=VE&offset=' + offset, {headers: {'Accept-Language': 'es; 0.9, en; 0.8'}})
  return response
}
