import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import AlterRow from '../alterRow'
import Spinner from '../spinner'

const ArtesanosRow = ({ nombres, apellidos, emprendimiento, rut }) => {
  return (
    <>
      <td>{nombres}</td>
      <td>{apellidos}</td>
      <td>{emprendimiento?.nombre || '-'}</td>
      <td>{emprendimiento?.direccion?.nombre || '-'}</td>
      <td>{rut || '-'}</td>
    </>
  )
}

const CategoriasRow = ({ nombre }) => {
  return (
    <>
      <td>{nombre}</td>
    </>
  )
}

const ProductosRow = ({ nombre, precio, stock, categoria, visible }) => {
  return (
    <>
      <td>{nombre}</td>
      <td>${precio.toLocaleString()}</td>
      <td>{stock.toLocaleString()}</td>
      <td>{categoria?.nombre}</td>
      <td>{visible ? 'Sí' : 'No'}</td>
    </>
  )
}

const AdminFiltros = React.memo(({ data, setResultados }) => {
  const [nombre, setNombre] = useState('')
  const [inicio, setInicio] = useState('')
  const [fin, setFin] = useState('')

  useEffect(() => {
    if (data?.totalDocs) {
      setFin(data?.totalDocs)
    }
  }, [data?.totalDocs])

  useEffect(() => {
    if (data?.docs) {
      setResultados(data?.docs?.slice(inicio || 0, fin || 100)?.filter(item =>
        item.nombre?.toLowerCase().includes(nombre.toLowerCase()) ||
        item.nombres?.toLowerCase().includes(nombre.toLowerCase()) ||
        item.apellidos?.toLowerCase().includes(nombre.toLowerCase()) ||
        item.emprendimiento?.nombre?.toLowerCase().includes(nombre.toLowerCase())
      ))
    }
  }, [nombre, inicio, fin, data?.docs])

  return (
    <div className={styles.filtros}>
      <input className='input' placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} value={nombre} />
      <input className='input' placeholder='Inicio' type='number' min={0} onChange={(e) => setInicio(e.target.value)} value={inicio} />
      <input className='input' placeholder='Fin' type='number' min={0} onChange={(e) => setFin(e.target.value)} value={fin} />
    </div>
  )
})

const AdminTable = React.memo(({ headers = [], data, isLoading, path, handleOnClickSet, onRemove }) => {
  const [resultados, setResultados] = useState(data?.docs)

  return (
    <div className='table-container'>
      <AdminFiltros data={data} setResultados={setResultados} />
      <p className='no-data'>Mostrando {resultados?.length || 0} registros</p>
      <table>
        <thead>
          <tr>
            {
                headers.map((header, i) => <th key={i}>{header}</th>)
            }
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {
        !data || isLoading
          ? <tr><td colSpan={path === 'artesano' ? 6 : path === 'categoria' ? 6 : 6}><Spinner /></td></tr>
          : resultados?.map(item =>
            <tr key={item._id}>
              {path === 'artesano' ? <ArtesanosRow {...item} /> : path === 'categoria' ? <CategoriasRow {...item} /> : <ProductosRow {...item} />}
              <AlterRow path={path} id={item._id} onClickEdit={() => handleOnClickSet({ ...item })} onClickRemove={() => onRemove(item._id)} />
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
})

export default AdminTable
