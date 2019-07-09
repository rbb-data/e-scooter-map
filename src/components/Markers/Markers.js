import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import L from 'leaflet'
import { useLeaflet } from 'react-leaflet'
import CircleMarker from '../CircleMarker/CircleMarker'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import { bordeaux } from '../../shared/styles/colors.sass'
// import MarkerClusterGroup from '../MarkerClusterGroup/MarkerClusterGroup'
// import _ from './Markers.module.sass'

// function getSize (childCount) {
//   const radius = childCount * 0.5
//   if (radius < 5) return 5
//   if (radius > 48) return 48
//
//   return radius
// }
//
// function getOpacity (childCount) {
//   const opacity = childCount * 0.004
//   if (opacity < 0.2) return 0.2
//   if (opacity > 0.5) return 0.5
//
//   return opacity
// }

// const red = '#699b32'
// const bordeaux = '#1e5a3a'
// const red = '#5f5f5f'
// const bordeaux = '#000'

// function createClusterIcon (cluster) {
//   const childCount = cluster.getChildCount()
//   const size = getSize(childCount)
//
//   return L.divIcon({ html:
//     `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//       <circle
//         cx="50"
//         cy="50"
//         r="${size}"
//         fill="${red}"
//         fill-opacity="${getOpacity(childCount)}"
//         stroke-opacity="1"
//         stroke-width="2"
//         stroke='${bordeaux}' />
//         <text x="50" y="50" text-anchor="middle" dx="-0.03em" dy=".38em" class="${_.circleText}">
//           ${size > 15 ? childCount : ''}
//         </text>
//     </svg>`,
//   iconSize: [35, 35],
//   className: _.divIcon
//   })
// }

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
      radius={zoom * zoom * zoom / 1000}
      interactive={false}
      stroke={false}
      fillColor={'#1e5a3a'}
      color={'white'}
      weight={1}
      opacity={0.3}
      fillOpacity={0.3}
    />
  )

  // return <MarkerClusterGroup
  //   chunkedLoading
  //   maxClusterRadius={10}
  //   zoomToBoundsOnClick={false}
  //   showCoverageOnHover={false}
  //   spiderfyOnMaxZoom={false}
  //   disableClusteringAtZoom={12}
  //   iconCreateFunction={createClusterIcon}>
  //   {markers.map(marker =>
  //     <CircleMarker
  //       key={marker.properties.id}
  //       center={featureToLatLng(marker)}
  //       radius={zoom * zoom / 100}
  //       interactive={false}
  //       stroke={false}
  //       fillColor={bordeaux}
  //       fillOpacity={1}
  //     />
  //   )}
  // </MarkerClusterGroup>
}

Markers.propTypes = {
  /* array of geojson features */
  markers: PropTypes.array
}
