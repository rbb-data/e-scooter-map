import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { CircleMarker } from 'react-leaflet'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import { red, bordeaux } from '../../shared/styles/colors.sass'
import MarkerClusterGroup from '../MarkerClusterGroup/MarkerClusterGroup'
import _ from './Markers.module.sass'

function getSize (childCount) {
  const radius = childCount
  if (radius < 10) return 10
  if (radius > 48) return 48

  return radius
}

function getOpacity (childCount) {
  const opacity = childCount * 0.02
  if (opacity < 0.1) return 0.2
  if (opacity > 0.8) return 0.8

  return opacity
}

export default function Markers (props) {
  const { markers } = props

  function createClusterIcon (cluster) {
    const childCount = cluster.getChildCount()
    const size = getSize(childCount)

    return L.divIcon({ html:
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="50"
          cy="50"
          r="${size}"
          fill="${red}"
          fill-opacity="${getOpacity(childCount)}"
          stroke-opacity="1"
          stroke-width="2"
          stroke='${bordeaux}' />
          <text x="50" y="50" text-anchor="middle" dx="-0.05em" dy=".3em" class="${_.circleText}">
            ${childCount > 19 ? childCount : ''}
          </text>
      </svg>`,
    iconSize: [60, 60],
    className: _.divIcon
    })
  }

  return <MarkerClusterGroup
    maxClusterRadius={10}
    zoomToBoundsOnClick={false}
    showCoverageOnHover={false}
    disableClusteringAtZoom={16}
    iconCreateFunction={createClusterIcon}>
    {markers.map(marker =>
      <CircleMarker
        center={featureToLatLng(marker)}
        radius={3}
        interactive={false}
        weight={1}
        color={bordeaux}
        fillColor={red}
        fillOpacity={0.1}
      />
    )}
  </MarkerClusterGroup>
}

Markers.propTypes = {
  /* array of geojson features */
  markers: PropTypes.array
}
