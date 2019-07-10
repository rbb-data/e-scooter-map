const Papa = require('papaparse')
const path = require('path')
const fs = require('fs')
const content = fs.createReadStream(path.join(__dirname, '../data/e_scooters_frontend.csv'))

Papa.parse(content, {
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    let features = results.data.map((entry, i) => {
      // change format if there's a different local place name
      // const vehicleId = entry.vehicle_id

      return {
        type: 'Feature',
        properties: {
          // id: i,
          h: +entry.hour_of_day,
          v: entry.provider
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(entry.lng).toFixed(4),
            parseFloat(entry.lat).toFixed(4)
          ]
        }
      }
    })

    // let seen = {}

    const output = {
      type: 'FeatureCollection',
      features: features
      // // filter out invalid locations
      // .filter(feature => {
      //   return !!feature.geometry.coordinates[0] && !!feature.geometry.coordinates[1]
      // })
      // // filter out duplicates
      // .filter(feature => {
      //   const isDuplicate = seen[feature.properties.id]
      //   seen[feature.properties.id] = true
      //
      //   return !isDuplicate
      // })
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
