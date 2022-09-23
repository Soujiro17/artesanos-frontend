import axios from 'axios'

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_URL_HOST,
  headers: {
    'Content-type': 'application/json'
  }
})

axiosPublic.defaults.withCredentials = true

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_URL_HOST,
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})

axiosPrivate.defaults.withCredentials = true

export { axiosPublic, axiosPrivate }
