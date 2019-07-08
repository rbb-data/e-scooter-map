const Papa = require('papaparse')
const path = require('path')
const fs = require('fs')
const content = fs.createReadStream(path.join(__dirname, '../data/circ_fuer_manu.csv'))

Papa.parse(content, {
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    let features = results.data.map(entry => {
      // change format if there's a different local place name
      const vehicleId = entry.vehicle_id
      const vendor = Math.random() > 0.5 ? 'circ' : 'lime'
      const hour = Math.floor(Math.random() * 24)

      return {
        type: 'Feature',
        properties: {
          id: vehicleId,
          hour: hour,
          vendor: vendor
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(entry.lng.replace(',', '.')),
            parseFloat(entry.lat.replace(',', '.'))
          ]
        }
      }
    })

    let seen = {}

    const output = {
      type: 'FeatureCollection',
      features: features
        // filter out invalid locations
        .filter(feature => {
          return !!feature.geometry.coordinates[0] && !!feature.geometry.coordinates[1]
        })
        // filter out duplicates
        .filter(feature => {
          const isDuplicate = seen[feature.properties.id]
          seen[feature.properties.id] = true

          return !isDuplicate
        })
    }

    fs.writeFile(path.join(__dirname, '../public/markers.geo.json'), JSON.stringify(output), error => {
      if (error === null) {
        console.log('success')
      } else {
        console.error(error)
        process.exit(1)
      }
    })
  }
})
