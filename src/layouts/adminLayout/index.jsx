import React from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from '../../components'
import styles from './styles.module.scss'

const AdminLayout = ({ onSubmit, form, children }) => {
  const clearFields = () => {}

  const { register, formState: { errors }, setValue } = useForm()

  const isUpdating = false

  const data = {}

  return (
    <>
      {children}
      <div className='table-container'>
        <p className='no-data'>Mostrando {data?.totalDocs || 0} registros</p>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {/* {
            !data
            ? <Spinner />
            : data?.docs?.map(item =>
                <tr key={item._id}>
                <td>{item.nombre}</td>
                <AlterRow onClickEdit={() => handleOnClickSet({ ...item })} onClickRemove={() => remove(item._id)} />
                </tr>
                )
            } */}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminLayout
