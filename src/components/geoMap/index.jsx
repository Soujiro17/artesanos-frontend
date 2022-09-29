import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Spinner from '../spinner'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const MapComponent = ({ geolocation = false, data }) => {
  const [errorPass, setErrorPass] = useState(true)
  const [actualLat, setActualLat] = useState(0)
  const [actualLon, setActualLon] = useState(0)
  const [actualAlt, setactualAlt] = useState(0)

  const zoom = data ? 16 : 13.5

  const queryClient = useQueryClient()

  const emprendimientos = queryClient.getQueryData(['direcciones'])

  const createIcon = (value) => {
    return L.icon({
      iconUrl: value || '/san_miguel.jpg',
      iconSize: [35, 35],
      className: styles.icon_classname
    })
  }

  const MIN = 0.0001
  const MAX = 0.0009

  const randomNum = () => {
    const posOrNeg = Math.floor(Math.random() * (1 - 0 + 1) + 0)

    const num = Math.floor(Math.random() * (MAX - MIN)) + MIN

    if (posOrNeg) {
      return -num
    }

    return num
  }

  const ubicacionCercana = () => {
    const latitud = randomNum()
    const longitud = randomNum()

    return [parseFloat(import.meta.env.VITE_DIRECCION_SANMIGUEL_LATITUD) + latitud, parseFloat(import.meta.env.VITE_DIRECCION_SANMIGUEL_LONGITUD) + longitud]
  }

  const emprendimientosComponents = useMemo(() => {
    if (!emprendimientos) return null

    return emprendimientos?.map(emprendimiento => {
      const icon = createIcon(emprendimiento.foto?.url)

      let nuevaDireccion

      if (!emprendimiento.direccion?.tieneDireccion) {
        nuevaDireccion = ubicacionCercana()
      }

      if (typeof emprendimiento.direccion?.coordenadas[0] === 'object') {
        nuevaDireccion = [emprendimiento.direccion?.coordenadas[0]?.$numberDecimal, emprendimiento.direccion?.coordenadas[1]?.$numberDecimal]
      }

      return (
        <Marker icon={icon} position={nuevaDireccion || emprendimiento.direccion?.coordenadas} key={emprendimiento._id}>
          <Popup>
            <Link to={`/artesano/${emprendimiento.artesano}`}>{emprendimiento.nombre}</Link>
          </Popup>
        </Marker>
      )
    })
  }, [emprendimientos])

  useEffect(() => {
    if (geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setActualLat(position.coords.latitude)
          setActualLon(position.coords.longitude)
          setactualAlt(position.coords.altitude)
        },
        () => {
          setTimeout(() => {
            toast.error('Error al obtener la ubicación')
            setErrorPass(false)
          })
        }
      )
    }
  }, [navigator, actualLat, actualLon, actualAlt, navigator.geolocation])

  if (geolocation && errorPass && !actualAlt && !actualLon && !actualAlt) return <Spinner />

  const center = data ? data.direccion?.coordenadas : (geolocation && errorPass) ? [actualLat, actualLon, actualAlt] : [import.meta.env.VITE_DIRECCION_SANMIGUEL_LATITUD, import.meta.env.VITE_DIRECCION_SANMIGUEL_LONGITUD]

  return (
    <div className={styles.map_wrapper}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {
          (geolocation && errorPass) && (
            <>
              <Circle center={center} radius={50} />
              <Marker position={center}>
                <Popup>Tu ubicación</Popup>
              </Marker>
            </>
          )
        }

        {emprendimientosComponents}
      </MapContainer>
    </div>
  )
}

export default MapComponent
