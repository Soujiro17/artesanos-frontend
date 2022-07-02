import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import Spinner from '../spinner'
import styles from './styles.module.scss'
import useApi from '../../hooks/useApi'

const MapComponent = ({ points = false, geolocation = false }) => {
  const [actualLat, setActualLat] = useState(0)
  const [actualLon, setActualLon] = useState(0)
  const [actualAlt, setactualAlt] = useState(0)

  const zoom = 13.5

  // Determinar punto central en caso de no encontrar la ubicación del usuario. Ejemplo: Santiago

  let pymes = []

  const api = useApi()

  if (points) {
    pymes = useQuery('pymes_coordenadas', () => api.getCoordenadasPymes()).data
  }

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
  }, [navigator, actualLat, actualLon, actualAlt, navigator.geolocation])

  if (geolocation && !actualAlt && !actualLon && !actualAlt) return <Spinner />

  const center = [actualLat, actualLon, actualAlt]

  console.log(pymes)

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
        {
          pymes?.map(pyme => {
            const icon = L.icon({
              iconUrl: pyme.picture_url,
              iconSize: [35, 35],
              className: styles.icon_classname

            })

            return (
              <Marker icon={icon} position={pyme.direccion.coordenadas.coordinates} key={pyme._id}>
                <Popup>{pyme.nombre}</Popup>
              </Marker>
            )
          })
        }
      </MapContainer>
    </div>
  )
}

export default MapComponent
