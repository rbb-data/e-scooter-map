/* global fetch */

import React, { useState, useEffect, useMemo } from 'react'
import 'whatwg-fetch'
import Map from '../../shared/components/Map/Map'
import TabBar from '../../shared/components/TabBar/TabBar'
import HourSelector from '../HourSelector/HourSelector'
// import TileMarkers from '../Markers/TileMarkers'
// import Markers from '../Markers/Markers'
import ClusteredMarkers from '../Markers/ClusteredMarkers'
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
    vendorFilter === 'Alle' || marker.properties.v === vendorFilter)
  const filteredByHour = filteredByVendor.filter(marker => marker.properties.h === hour)

  const numberOfScootersByHour = useMemo(() =>
    filteredByVendor.reduce((array, marker) => {
      const hour = marker.properties.h
      array[hour] = (array[hour] || 0) + 1
      return array
    }, [])
  , [filteredByVendor.length])
  //  ⬆️ the histogram is only regenerated when the number of scooter change
  //  of course we could have two vendors with the same number of scooters but we don't

  if (markers.length === 0) return null

  return <div className={_.app}>
    <div className={_.filter}>
      <label htmlFor='vendorSelector'>Anbieter:</label>
      <TabBar id='vendorSelector'
        title='Anbieter auswählen'
        selectedTab={vendorFilter}
        tabs={filterOptions}
        format={name => name.charAt(0).toUpperCase() + name.slice(1)}
        onSelect={vendor => {
          setVendorFilter(vendor)

          if (typeof window.callAnalytics === 'function') {
            window.callAnalytics('pi', 'rbb-data-e-scooter', `select vendor: ${vendor}`)
          }
        }} />
    </div>
    <div className={_.mapWrapper}>
      <Map
        bingKey={process.env.REACT_APP_BING_KEY}
        className={_.map}>

        {/* <Markers markers={filteredByHour} /> */}
        {/* <TileMarkers features={filteredByHour} /> */}
        <ClusteredMarkers markers={filteredByHour} />

      </Map>
    </div>
    <div className={_.filter}>
      <div className={_.labelWrapper}>
        <label className={_.timeLabel}>Fr. 05.07.2019 <strong>{hour}:00 Uhr</strong></label>
        <label className={_.countLabel}>{numberOfScootersByHour[hour] || 0} Roller</label>
      </div>
      <HourSelector
        selectedHour={hour}
        onChange={setHour}
        histogramData={numberOfScootersByHour}
        histogramMax={2833} />
      <label className={_.histogramLabel}>
        Die Höhe der Balken zeigt die Anzahl der Roller zur jeweiligen Stunde.
      </label>
    </div>
  </div>
}

export default App
