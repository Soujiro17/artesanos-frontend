import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Producto = () => {

  const { id } = useParams()
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