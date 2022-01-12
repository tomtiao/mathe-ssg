import axios from 'axios'

const API_BASE_URL = 'https://api.neumathe.xyz:8181/'
const API_LOCAL_BASE_URL = 'http://localhost:2333/'

function fetchTrees ($axios = axios) {
  return $axios
    .get(`${API_BASE_URL}api/clist`)
    .then((resp) => {
      const d = resp.data
      if (d.code === 0) {
        return d.data
      } else {
        throw new Error(d.msg)
      }
    })
    // eslint-disable-next-line
    .catch(e => console.warn(e));
}

export default {
  API_BASE_URL,
  API_LOCAL_BASE_URL,
  _fetchTrees: fetchTrees
}
