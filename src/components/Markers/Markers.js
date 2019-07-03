import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import useWindowSize from '../../shared/lib/useWindowSize'
import mobileBreakpoint from '../../shared/styles/breakpoints.sass'
import SelectableMarker from '../../shared/components/MapSelectableMarker/MapSelectableMarker'

export default function Markers (props) {
  const { onMarkerSelect: handleMarkerSelect, markers } = props
  const { width } = useWindowSize()

  const mapMarkers = markers.map(marker => {
    console.log(marker)
    const markerProps = {
      id: marker.properties.id,
      isSelected: false,
      onClick: e => {
        handleMarkerSelect(marker.properties.id)
        L.DomEvent.stopPropagation(e)
      },
      position: featureToLatLng(marker),
      optimizeForTouch: width < mobileBreakpoint
    }

    return <SelectableMarker {...markerProps} />
  })

  return <div>
    { mapMarkers }
  </div>
}

Markers.propTypes = {
  onMarkerSelect: PropTypes.func,
  /* array of geojson features */
  markers: PropTypes.array
}
