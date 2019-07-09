import React from 'react'
import PropTypes from 'prop-types'
// import Chroma from 'chroma-js'
import { red } from '../../shared/styles/colors.sass'
import VectorGrid from '../VectorGrid/VectorGrid'

// const scale = Chroma.scale([red, 'black']).domain([2, 150])

export default function TileMarkers (props) {
  const { features } = props

  return <VectorGrid
    geojson={{
      type: 'FeatureCollection',
      features: features
    }}
    vectorTileLayerStyles={{
      sliced: (properties, zoom) => ({
        fillColor: red,
        color: red,
        fillOpacity: 0.3,
        opacity: 0.3,
        radius: zoom > 12 ? 2 : 1,
        weight: 0.5,
        fill: true,
        stroke: zoom > 10
      })
    }} />
}

TileMarkers.propTypes = {
  /* array of geojson features */
  features: PropTypes.array
}
