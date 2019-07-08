/* global fetch */

import React, { useState, useEffect } from 'react'
import 'whatwg-fetch'
import Map from '../../shared/components/Map/Map'
import TabBar from '../../shared/components/TabBar/TabBar'
import HourSelector from '../HourSelector/HourSelector'
import Markers from '../Markers/Markers'
import _ from './App.module.sass'

const filterOptions = ['Alle', 'circ', 'lime', 'tier', 'voi']

function App (props) {
  const [markers, setMarkers] = useState([])
  const [hour, setHour] = useState(19)
  const [vendorFilter, setVendorFilter] = useState('Alle')

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

  const filteredMarkers = markers.filter(marker => {
    const vendorIsMatching = vendorFilter === 'Alle' || marker.properties.vendor === vendorFilter
    const hourIsMatching = marker.properties.hour === hour

    return vendorIsMatching && hourIsMatching
  })

  return <div className={_.app}>
    <div className={_.mapWrapper}>
      <Map
        bingKey={process.env.REACT_APP_BING_KEY}
        className={_.map}>

        <Markers markers={filteredMarkers} />
      </Map>
    </div>
    <div className={_.filter}>
      <HourSelector selectedHour={hour} onChange={setHour} />
      <label htmlFor='vendorSelector'>Nach Anbieter filtern:</label>
      <TabBar id='vendorSelector'
        title='Anbieter auswählen'
        selectedTab={vendorFilter}
        tabs={filterOptions}
        onSelect={setVendorFilter} />
    </div>
  </div>
}

export default App
