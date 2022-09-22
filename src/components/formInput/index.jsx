const FormInput = ({ errors, name, register, placeholder = '', type = 'text', isTextArea = false, ...rest }) => {
  const className = `${errors[name] ? 'error-campo' : ''} input`

  if (isTextArea) return <textarea className={className} placeholder={placeholder} {...register(name)} {...rest} />

  return <input className={className} type={type} placeholder={placeholder} {...register(name)} {...rest} />
}

export default FormInput
