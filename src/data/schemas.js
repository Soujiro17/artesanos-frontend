import { string, number, object, boolean, mixed } from 'yup'

export const productosSchema = object().shape({
  nombre: string().required().trim(),
  precio: number().integer().positive().min(0).required(),
  stock: number().integer().min(0).optional().default(0),
  visible: boolean().optional().default(false),
  descripcion: string().required().trim().max(300),
  foto: mixed().optional(),
  categoria: string().required().defined().trim()
})
