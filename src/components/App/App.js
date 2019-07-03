/* global fetch */

import React, { useState, useEffect } from 'react'
import 'whatwg-fetch'
import Map from '../../shared/components/Map/Map'
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
  //
  console.log(markers)

  return <div className={_.app}>
    <div className={_.mapWrapper}>
      <Map
        bingKey={process.env.REACT_APP_BING_KEY}
        className={_.map}>

        {markers && <Markers markers={markers} />}
      </Map>
    </div>
  </div>
}

export default App
