import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { actualizarCategoria, crearCategoria, eliminarCategoria } from '../../api/categorias'
import { actualizarProducto, crearProducto, eliminarProducto } from '../../api/productos'
import useMutateCrud from '../../hooks/useMutateCrud'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import { toFormData } from '../../utils/toFormData'

const withForm = (Component) => (type) => (props) => {
  const [idToUpdate, setIdToUpdate] = useState('')

  const form = useForm()

  const { setValue, reset } = form

  let mutate

  if (type === 'productos') {
    const mutateConfig = useMutatorConfig('Producto', 'productos')
    mutate = useMutateCrud(crearProducto, actualizarProducto, eliminarProducto, mutateConfig)
  } else if (type === 'artesanos') {
    const mutateConfig = useMutatorConfig('Categoria', 'categorias')
    mutate = useMutateCrud(crearCategoria, actualizarCategoria, eliminarCategoria, mutateConfig)
  } else {
    const mutateConfig = useMutatorConfig('Categoria', 'categorias')
    mutate = useMutateCrud(crearCategoria, actualizarCategoria, eliminarCategoria, mutateConfig)
  }

  const onSubmit = (data) => {
    const img = data.foto[0]
    const formData = toFormData({ ...data, foto: img })

    if (idToUpdate) mutate.mutateUpdate({ values: formData, _id: idToUpdate })
    else mutate.mutateCreate({ values: formData })

    onClear()
  }

  const onRemove = (_id) => {
    if (!window.confirm('Seguro que deseas eliminar este registro?')) return

    if (_id === idToUpdate) {
      setIdToUpdate('')
    }

    mutate.mutateDelete({ _id })
  }

  const onClickSet = (values) => {
    if (typeof values === 'string') return
    Object.keys(values).map(key => {
      if (key === '_id') return setIdToUpdate(values[key])
      return setValue(key, values[key])
    })
  }

  const onClear = () => {
    reset()
    setIdToUpdate('')
  }
  return (
    <Component
      {...props}
      form={form}
      onSubmit={onSubmit}
      onRemove={onRemove}
      onClickSet={onClickSet}
      onClear={onClear}
      idToUpdate={idToUpdate}
    />
  )
}

export default withForm
