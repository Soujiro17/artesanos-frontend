import React from 'react'
import { useContext } from 'react'
import { ApiContext } from '../contexts/API'

const useApi = () => {
  return useContext(ApiContext)
}

export default useApi