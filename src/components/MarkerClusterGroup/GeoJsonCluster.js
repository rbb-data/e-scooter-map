// from https://github.com/YUzhva/react-leaflet-markercluster
import { MapLayer, withLeaflet } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet.markercluster'

class GeoJsonCluster extends MapLayer {
  createLeafletElement ({ features, markerCreateFunction, leaflet, ...options }) {
    const group = L.markerClusterGroup(options)
    const markers = features.map(markerCreateFunction)
    group.addLayers(markers)

    return group
  }

  updateLeafletElement (fromProps, toProps) {
    const { features, markerCreateFunction } = toProps

    this.leafletElement.clearLayers()

    const markers = features.map(markerCreateFunction)
    this.leafletElement.addLayers(markers)
  }
}

export default withLeaflet(GeoJsonCluster)
