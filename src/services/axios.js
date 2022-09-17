import axios from 'axios'

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_URL_HOST,
  headers: {
    'Content-type': 'application/json'
  }
})

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_URL_HOST,
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})
