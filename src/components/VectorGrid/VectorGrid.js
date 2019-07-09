import L from 'leaflet'
import 'leaflet.vectorgrid'

import { GridLayer, withLeaflet } from 'react-leaflet'

class VectorGrid extends GridLayer {
  createLeafletElement (props) {
    const { geojson, leaflet, ...options } = props
    return L.vectorGrid.slicer(geojson, options)
  }

  updateLeafletElement (fromProps, toProps) {
    const { geojson, leaflet, ...options } = toProps
    // TODO find a good way to check if the props are the same
    // i guess a deep equality check is also pretty expensive so…

    // Function to handle event from leaflet when all tiles are loaded
    // for the grid layer
    const onLoad = (e) => {
      // Remove the old grid layer from the map
      this.leafletElement.remove()
      // Stop listening to the load event
      e.target.off('load', onLoad)
      // Save the new graphics layer into the member variable
      this.leafletElement = e.target
    }

    L.vectorGrid.slicer(geojson, options)
      .on('load', onLoad)
      .addTo(leaflet.map)
  }
}

VectorGrid.defaultProps = {
  rendererFactory: L.svg.tile,
  vectorTileLayerStyles: {
    sliced: (properties, zoom) => ({
      fillColor: 'red',
      fillOpacity: 0.5,
      stroke: true,
      fill: true,
      color: 'red',
      opacity: 0.2,
      weight: 1,
      radius: 1
    })
  },
  interactive: false,
  getFeatureId: f => f.properties.id
}

export default withLeaflet(VectorGrid)
