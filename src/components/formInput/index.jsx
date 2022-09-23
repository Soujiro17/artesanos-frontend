import styles from './styles.module.scss'

const FormInput = ({ errors, name, register, placeholder = '', type = 'text', isTextArea = false, ...rest }) => {
  const className = `${errors[name] ? 'error-campo' : ''} input`

  if (isTextArea) return <textarea className={className} placeholder={placeholder} {...register(name)} {...rest} />

  if (type === 'file') {
    return (
      <>
        <label className={`${className} ${styles.file_label}`} htmlFor={name}>
          <p>Selecciona la foto</p>
        </label>
        <input id={name} className={styles.hidden} type={type} placeholder={placeholder} {...register(name)} {...rest} />
      </>
    )
  }

  return <input className={className} type={type} placeholder={placeholder} {...register(name)} {...rest} />
}

export default FormInput
