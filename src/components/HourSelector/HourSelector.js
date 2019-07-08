import React from 'react'
import PropTypes from 'prop-types'

export default function HourSelector (props) {
  const { selectedHour, onChange } = props
  return <div>
    <input
      type='range'
      step='1'
      min={0}
      max={24}
      value={selectedHour}
      onChange={e => { onChange(+e.target.value) }} />
  </div>
}

HourSelector.propTypes = {
  selectedHour: PropTypes.number,
  onChange: PropTypes.func
}
