import React from 'react'

const Checkbox = ({ register, name, label = '', ...rest }) => {
  return (
    <div className={`${rest.className} checkbox`}>
      <input id={name} {...register(name)} type='checkbox' />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default Checkbox
