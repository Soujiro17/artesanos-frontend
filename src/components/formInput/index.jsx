import { imgs } from '../../data/images'
import X from '../icons/X'
import styles from './styles.module.scss'

const FormInput = ({ errors, name, register, placeholder = '', type = 'text', isTextArea = false, foto, onClearPicture, defaultValue, artesano = false, producto = false, categoria = false, ...rest }) => {
  const className = errors ? `${errors[name] ? 'error-campo' : ''} input` : 'input'

  if (isTextArea) return <textarea className={className} placeholder={placeholder} {...register(name)} {...rest} />

  let noEncontrado = imgs.no_encontrado

  if (artesano) {
    noEncontrado = imgs.artesano_no_encontrado
  } else if (producto) {
    noEncontrado = imgs.producto_no_encontrado
  } else if (categoria) {
    noEncontrado = imgs.categoria_no_encontrada
  }

  if (type === 'file') {
    return (
      <div className={styles.file_input_wrapper}>
        <label className={`${className} ${styles.file_label}`} htmlFor={name}>
          <p>Selecciona la foto</p>
          <img className={styles.file_preview} src={foto || noEncontrado} />
        </label>
        <input id={name} className={styles.hidden} type={type} placeholder={placeholder} {...register(name)} {...rest} />
        {foto && <X onClick={onClearPicture} className={styles.delete_file} wrapperClassname={styles.delete_file_wrapper} />}
      </div>
    )
  }

  return <input className={className} defaultValue={defaultValue} type={type} placeholder={placeholder} {...register(name)} {...rest} />
}

export default FormInput
