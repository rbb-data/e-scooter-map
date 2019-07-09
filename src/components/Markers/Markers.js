import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import Chroma from 'chroma-js'
import { useLeaflet } from 'react-leaflet'
import CircleMarker from '../CircleMarker/CircleMarker'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import { red, bordeaux } from '../../shared/styles/colors.sass'
import MarkerClusterGroup from '../MarkerClusterGroup/MarkerClusterGroup'
import _ from './Markers.module.sass'

const scale = Chroma.scale([red, 'black']).domain([2, 150])

function getSize (childCount) {
  const radius = childCount * 0.5
  if (radius < 8) return 8
  if (radius > 48) return 48

  return radius
}

function createClusterIcon (cluster) {
  const childCount = cluster.getChildCount()
  const size = getSize(childCount)

  return L.divIcon({ html:
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="${getSize(childCount)}"
        fill="${scale(childCount)}"
        fill-opacity="${1}"
        stroke-width="0" />
        <text x="50" y="50" text-anchor="middle" dx="-0.03em" dy=".38em" class="${_.circleText}">
          ${size > 30 ? childCount : ''}
        </text>
    </svg>`,
  iconSize: [20, 20],
  className: _.divIcon
  })
}

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

  return <MarkerClusterGroup
    chunkedLoading
    maxClusterRadius={6}
    zoomToBoundsOnClick={false}
    showCoverageOnHover={false}
    spiderfyOnMaxZoom={false}
    disableClusteringAtZoom={14}
    iconCreateFunction={createClusterIcon}>
    {markers.map(marker =>
      <CircleMarker
        key={marker.properties.id}
        center={featureToLatLng(marker)}
        radius={1}
        interactive={false}
        stroke={false}
        fillColor={red}
        fillOpacity={0.7}
      />
    )}
  </MarkerClusterGroup>
}

Markers.propTypes = {
  /* array of geojson features */
  markers: PropTypes.array
}
