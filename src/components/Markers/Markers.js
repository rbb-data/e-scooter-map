import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLeaflet } from 'react-leaflet'
import CircleMarker from '../CircleMarker/CircleMarker'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import { red } from '../../shared/styles/colors.sass'

export default function Markers (props) {
  const { markers } = props
  const leaflet = useLeaflet()
  const [zoom, setZoom] = useState(leaflet.map.getZoom())

  useEffect(() => {
    const zoomHandler = leaflet.map.on('zoom', () => {
      setZoom(leaflet.map.getZoom())
    })

    return () => { leaflet.map.off('zoom', zoomHandler) }
  }, leaflet)

  return markers.map(marker =>
    <CircleMarker
      key={marker.properties.id}
      center={featureToLatLng(marker)}
      radius={zoom > 12 ? 2 : 1}
      stroke={zoom > 10.5}
      interactive={false}
      weight={1}
      color={red}
      opacity={0.1}
      fillColor={red}
      fillOpacity={0.3}
    />
  )
}

Markers.propTypes = {
  /* array of geojson features */
  markers: PropTypes.array
}
