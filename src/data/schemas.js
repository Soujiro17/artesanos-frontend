import { string, number, object, boolean, mixed } from 'yup'

export const productosSchema = object().shape({
  nombre: string().required().trim(),
  precio: number().integer().positive().min(0).default(0).optional(),
  stock: number().integer().min(0).optional().default(0),
  visible: boolean().optional().default(true),
  descripcion: string().trim().max(300),
  foto: mixed().optional().default(false),
  categoria: string().required().defined().trim()
})

export const artesanoSchema = object().shape({
  nombres: string().required().defined().trim(),
  apellidos: string().optional().trim(),
  rut: string().optional().trim(),
  foto: mixed().optional().default(false),
  nombre: string().optional().trim(),
  descripcion: string().optional().trim(),
  direccion: string().optional().trim(),
  telefono: string().optional().trim(),
  correo: string().optional().trim()
})

export const categoriaSchema = object().shape({
  nombre: string().required().defined().trim(),
  foto: mixed().optional().default(false)
})
