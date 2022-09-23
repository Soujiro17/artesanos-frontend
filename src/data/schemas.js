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

export const artesanoSchema = object().shape({
  nombres: string().required().defined().trim(),
  apellidos: string().optional().trim(),
  rut: string().optional().trim(),
  foto: mixed().optional(),
  nombre: string().optional().trim(),
  descripcion: string().optional().trim(),
  direccion: string().optional().trim(),
  telefono: string().optional().trim(),
  correo: string().optional().trim()
})
