import React from 'react'
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

const AdminTable = ({ headers = [], data, isLoading, path, handleOnClickSet, onRemove }) => {
  return (
    <div className='table-container'>
      <p className='no-data'>Mostrando {data?.totalDocs || 0} registros</p>
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
          ? <tr><td colSpan={4}><Spinner /></td></tr>
          : data?.docs?.map(item =>
            <tr key={item._id}>
              {path === 'artesano' ? <ArtesanosRow {...item} /> : path === 'categoria' ? <CategoriasRow {...item} /> : null}
              <AlterRow path={path} id={item._id} onClickEdit={() => handleOnClickSet({ ...item })} onClickRemove={() => onRemove(item._id)} />
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable
