import React from 'react'
import Pencil from '../icons/Pencil'
import X from '../icons/X'

const AlterRow = ({ onClickRemove, onClickEdit, disableCursor = false }) => {
  return (
    <td className='alter-row'>
      <X onClick={onClickRemove} cursor={!disableCursor} />
      <Pencil onClick={onClickEdit} cursor={!disableCursor} />
    </td>
  )
}

export default AlterRow
