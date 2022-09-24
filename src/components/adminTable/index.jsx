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
          ? <tr><td colSpan={path === 'artesano' ? 6 : path === 'categoria' ? 6 : 6}><Spinner /></td></tr>
          : data?.docs?.map(item =>
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
}

export default AdminTable
