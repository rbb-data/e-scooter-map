import React from 'react'
import PropTypes from 'prop-types'
import Histogram from './Histogram'
import useAutoStepper from './useAutoStepper'

export default function HourSelector (props) {
  const { selectedHour, markers, onChange } = props
  const [isAnimating, setIsAnimating] = useAutoStepper((step) => {
    onChange(step)
    return (step + 1) % 24
  }, selectedHour, 1000)

  const numberOfScootersByHour = markers.reduce((array, marker) => {
    const hour = marker.properties.hour
    array[hour] = (array[hour] || 0) + 1
    return array
  }, [])

  return <div>
    <input
      type='range'
      step='1'
      min={0}
      max={24}
      value={selectedHour}
      onChange={e => { onChange(+e.target.value) }} />
    <Histogram values={numberOfScootersByHour} />
    <button onClick={() => { setIsAnimating(!isAnimating) }}>
      { isAnimating ? 'stop' : 'play' }
    </button>
  </div>
}

HourSelector.propTypes = {
  selectedHour: PropTypes.number,
  onChange: PropTypes.func,
  markers: PropTypes.array
}
