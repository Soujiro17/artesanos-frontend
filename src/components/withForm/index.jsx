import React, { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { actualizarArtesano, crearArtesano, eliminarArtesano } from '../../api/artesanos'
import { yupResolver } from '@hookform/resolvers/yup'
import { actualizarCategoria, crearCategoria, eliminarCategoria } from '../../api/categorias'
import { actualizarProducto, crearProducto, eliminarProducto } from '../../api/productos'
import useMutateCrud from '../../hooks/useMutateCrud'
import useMutatorConfig from '../../hooks/useMutatorConfig'
import { toFormData } from '../../utils/toFormData'
import { artesanoSchema, categoriaSchema, productosSchema } from '../../data/schemas'
import Spinner from '../spinner'
import usePreview from '../../hooks/usePreview'
import { artesanoDefaultValue, categoriaDefaultValue, productoDefaultValue } from '../../data/defaultValues'

const withForm = (Component) => (type) => (props) => {
  const [idToUpdate, setIdToUpdate] = useState('')
  const [auxId, setAuxId] = useState('')

  let mutate, schema, defaultValues

  if (type === 'productos') {
    const mutateConfig = useMutatorConfig('Producto', ['productos', auxId])
    mutate = useMutateCrud(crearProducto, actualizarProducto, eliminarProducto, mutateConfig)
    schema = productosSchema
    defaultValues = productoDefaultValue
  } else if (type === 'artesanos') {
    const mutateConfig = useMutatorConfig('Artesano', ['artesanos'])
    mutate = useMutateCrud(crearArtesano, actualizarArtesano, eliminarArtesano, mutateConfig)
    schema = artesanoSchema
    defaultValues = artesanoDefaultValue
  } else {
    const mutateConfig = useMutatorConfig('Categoria', ['categorias'])
    mutate = useMutateCrud(crearCategoria, actualizarCategoria, eliminarCategoria, mutateConfig)
    schema = categoriaSchema
    defaultValues = categoriaDefaultValue
  }

  const form = useForm({ resolver: yupResolver(schema), defaultValues, shouldUnregister: false })

  const { setValue, reset, control } = form

  const onSubmit = (data) => {
    const img = data.foto ? data.foto[0] : data.foto
    const formData = toFormData({ ...data, foto: img })

    if (idToUpdate) mutate.mutateUpdate({ values: formData, _id: idToUpdate })
    else mutate.mutateCreate({ values: formData })

    // onClear()
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
      if (key === 'foto') return setValue('foto', values[key].url)
      return setValue(key, values[key])
    })
  }

  const onClear = () => {
    reset(defaultValues, {
      keepDirty: true,
      keepDirtyValues: true
    })
    setIdToUpdate('')
  }

  const foto = usePreview(useWatch({ control, name: 'foto' }))

  const onClearPicture = () => {
    setValue('foto', false)
  }

  // useEffect(() => {
  //   onClear()
  // }, [mutate.isSuccessCreate, mutate.isSuccessDelete, mutate.isSuccessUpdate])

  if (mutate.isLoadingCreate || mutate.isLoadingUpdate || mutate.isLoadingDelete) return <Spinner fullScreen />

  return (
    <Component
      {...props}
      form={form}
      onSubmit={onSubmit}
      onRemove={onRemove}
      onClickSet={onClickSet}
      onClear={onClear}
      idToUpdate={idToUpdate}
      auxId={auxId}
      setAuxId={setAuxId}
      foto={foto}
      onClearPicture={onClearPicture}
    />
  )
}

export default withForm
