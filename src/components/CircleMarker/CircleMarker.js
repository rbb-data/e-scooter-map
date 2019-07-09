import { CircleMarker as LeafletCircleMarker } from 'leaflet'

import { Path, withLeaflet } from 'react-leaflet'

class CircleMarker extends Path {
  createLeafletElement (props) {
    const el = new LeafletCircleMarker(props.center, this.getOptions(props))
    this.contextValue = { ...props.leaflet, popupContainer: el }
    return el
  }

  updateLeafletElement (fromProps, toProps) {
    // there is a bug in leaflet CircleMarker that causes leaflet.markercluster to crash
    // when trying to update the marker position we never move the markers anyway
    // so just don't try to update the position

    // also this if statement is useless because these objects are compared by reference
    // not by value
    // if (toProps.center !== fromProps.center) {
    //   this.leafletElement.setLatLng(toProps.center)
    // }
    if (toProps.radius !== fromProps.radius) {
      this.leafletElement.setRadius(toProps.radius)
    }
    if (toProps.stroke !== fromProps.stroke) {
      this.leafletElement.setStyle({ stroke: toProps.stroke })
    }
  }
}

export default withLeaflet(CircleMarker)
