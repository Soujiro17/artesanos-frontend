import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'

const Producto = () => {

  const { id } = useParams()

  // const { getProductoById } = useApi()
  
  const [searchParams] = useSearchParams()
  const title = searchParams.get("name")

  return (
    <div>
      id: {id}
      <br />
      title: {title}
    </div>
  )
}

export default Producto