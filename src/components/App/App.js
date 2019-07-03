/* global fetch */

import React, { useState, useEffect } from 'react'
import 'whatwg-fetch'
import Map from '../../shared/components/Map/Map'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import Markers from '../Markers/Markers'
import _ from './App.module.sass'

function App (props) {
  const [markers, setMarkers] = useState(null)

  useEffect(() => {
    async function fetchMarkers () {
      const res = await fetch('./markers.geo.json')
      const json = await res.json()
      setMarkers(json.features)
    }

    fetchMarkers()
  }, [])
  // ⬆️ the second parameter to useEffect are its dependencies
  //  if the array is empty it runs only once otherwise it runs when depencies change

  const gradient = {
    0: '#ffffff',
    0.1: '#ffedc9',
    0.2: '#fdd98e',
    0.3: '#d3d090',
    0.4: '#a7c593',
    0.5: '#74bb94',
    0.6: '#53ac90',
    0.7: '#4b9b86',
    0.8: '#438a7d',
    0.9: '#3b7a73',
    1: '#33696a'
  }

  return <div className={_.app}>
    <div className={_.mapWrapper}>
      <Map
        bingKey={process.env.REACT_APP_BING_KEY}
        className={_.map}>

        {markers && <HeatmapLayer
          points={markers}
          longitudeExtractor={schoter => schoter.geometry.coordinates[0]}
          latitudeExtractor={schoter => schoter.geometry.coordinates[1]}
          intensityExtractor={() => 1}
          maxZoom={5}
          radius={20}
          blur={20}
          max={10}
          // minOpacity={0.05}
          // eslint-disable-next-line no-return-assign, no-sequences
          // gradient={colorStops.reduce((gradient, color, index) => (gradient[index / 10] = color, gradient), {})} />
          gradient={gradient}
        />}

        {/* {markers && <Markers markers={markers} />} */}
      </Map>
    </div>
  </div>
}

export default App
