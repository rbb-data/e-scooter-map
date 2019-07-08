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
  const [hour, setHour] = useState(18)
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

  const filteredByVendor = markers.filter(marker =>
    vendorFilter === 'Alle' || marker.properties.vendor === vendorFilter)
  const filteredByHour = filteredByVendor.filter(marker => marker.properties.hour === hour)

  // TODO maybe cache this
  const numberOfScootersByHour = filteredByVendor.reduce((array, marker) => {
    const hour = marker.properties.hour
    array[hour] = (array[hour] || 0) + 1
    return array
  }, [])

  return <div className={_.app}>
    <div className={_.filter}>
      <label htmlFor='vendorSelector'>Anbieter:</label>
      <TabBar id='vendorSelector'
        title='Anbieter auswählen'
        selectedTab={vendorFilter}
        tabs={filterOptions}
        onSelect={setVendorFilter} />
    </div>
    <div className={_.mapWrapper}>
      <Map
        bingKey={process.env.REACT_APP_BING_KEY}
        className={_.map}>

        <Markers markers={filteredByHour} />
      </Map>
    </div>
    <div className={_.filter}>
      <label className={_.timeLabel}>Fr. 05.06.2019 <strong>{hour}:00 Uhr</strong></label>
      <HourSelector selectedHour={hour} onChange={setHour} histogramData={numberOfScootersByHour} />
      <label>{numberOfScootersByHour[hour] || 0} Roller</label>
    </div>
  </div>
}

export default App
