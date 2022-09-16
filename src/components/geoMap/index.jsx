import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import Spinner from '../spinner'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const MapComponent = ({ geolocation = false, data }) => {
  const [errorPass, setErrorPass] = useState(true)
  const [actualLat, setActualLat] = useState(0)
  const [actualLon, setActualLon] = useState(0)
  const [actualAlt, setactualAlt] = useState(0)

  const zoom = 13.5

  const queryClient = useQueryClient()

  const emprendimientos = queryClient.getQueryData(['direcciones'])

  const createIcon = (value) => {
    return L.icon({
      iconUrl: value || '/san_miguel.jpg',
      iconSize: [35, 35],
      className: styles.icon_classname
    })
  }

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

  const center = data ? data.direccion?.coordenadas : (geolocation && errorPass) ? [actualLat, actualLon, actualAlt] : [-33.49868534902928, -70.65307906953697]

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
        {emprendimientos?.map(emprendimiento => {
          const icon = createIcon(emprendimiento.foto?.url)

          return (
            <Marker icon={icon} position={emprendimiento.direccion?.coordenadas} key={emprendimiento._id}>
              <Popup>
                <Link to={`/artesano/${emprendimiento.artesano}`}>{emprendimiento.nombre}</Link>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default MapComponent
