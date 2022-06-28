import React from 'react'
import { useParams } from 'react-router-dom'

const Artesano = () => {
  const params = useParams()

  return (
    <div>Artesano {params?.id}</div>
  )
}

export default Artesano
