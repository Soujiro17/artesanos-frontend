import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { toast } from 'react-toastify'
import Spinner from '../spinner'
import styles from './styles.module.scss'

const MapComponent = ({ points, geolocation = false }) => {
  const [actualLat, setActualLat] = useState(0)
  const [actualLon, setActualLon] = useState(0)
  const [actualAlt, setactualAlt] = useState(0)

  const zoom = 13.5

  // Determinar punto central en caso de no encontrar la ubicación del usuario. Ejemplo: Santiago

  useEffect(() => {
    if (geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setActualLat(position.coords.latitude)
          setActualLon(position.coords.longitude)
          setactualAlt(position.coords.altitude)
        },
        () => toast.error('Error obteniendo la ubicación')
      )
    }
  }, [navigator, actualLat, actualLon, actualAlt])

  if (geolocation && !actualAlt && !actualLon && !actualAlt) return <Spinner />

  const center = [actualLat, actualLon, actualAlt]

  return (
    <div className={styles.map_wrapper}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Circle center={center} radius={50} />
        <Marker position={center}>
          <Popup>Tu ubicación</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapComponent
