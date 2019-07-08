import React from 'react'
import PropTypes from 'prop-types'

export default function Histogram (props) {
  const { values } = props

  const max = values.reduce((prev, next) => next > prev ? next : prev, 0)
  const normalizedValues = values.map(val => val / max)

  return <svg
    viewBox={`0 0 ${values.length} 1`}
    width='100%'
    height='20px'
    preserveAspectRatio='none'
    xmlns='http://www.w3.org/2000/svg'>
    {normalizedValues.map((val, i) =>
      <rect key={i} x={i} y={1 - val} width='1' height={val} />
    )}
  </svg>
}

Histogram.propTypes = {
  values: PropTypes.array
}
