import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import Chroma from 'chroma-js'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import { red } from '../../shared/styles/colors.sass'
import GeoJsonCluster from '../MarkerClusterGroup/GeoJsonCluster'
import _ from './ClusteredMarkers.module.sass'

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
          ${size > 40 ? childCount : ''}
        </text>
    </svg>`,
  iconSize: [20, 20],
  className: _.divIcon
  })
}

export default function Markers (props) {
  const { markers } = props

  return <GeoJsonCluster
    features={markers}
    chunkedLoading
    chunkInterval={100}
    maxClusterRadius={6}
    zoomToBoundsOnClick={false}
    showCoverageOnHover={false}
    spiderfyOnMaxZoom={false}
    disableClusteringAtZoom={14}
    iconCreateFunction={createClusterIcon}
    markerCreateFunction={feature =>
      L.circleMarker(featureToLatLng(feature), {
        radius: 1,
        stroke: false,
        interactive: false,
        fillColor: 'red',
        fillOpacity: 1
      })
    } />
}

Markers.propTypes = {
  /* array of geojson features */
  markers: PropTypes.array
}
