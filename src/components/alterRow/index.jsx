import React from 'react'
import { useNavigate } from 'react-router-dom'
import Pencil from '../icons/Pencil'
import X from '../icons/X'
import Go from '../icons/GoToLink'

const AlterRow = ({ onClickRemove, onClickEdit, disableCursor = false, id, path }) => {
  const navigate = useNavigate()

  return (
    <td className='alter-row'>
      <X onClick={onClickRemove} cursor={!disableCursor} />
      <Pencil onClick={onClickEdit} cursor={!disableCursor} />
      <Go onClick={() => navigate(`/${path}/${id}`)} cursor={!disableCursor} />
    </td>
  )
}

export default AlterRow
