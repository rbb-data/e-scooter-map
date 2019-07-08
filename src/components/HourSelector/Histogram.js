import React from 'react'
import PropTypes from 'prop-types'
import { darkGrey, red } from '../../shared/styles/colors.sass'
import _ from './Histogram.module.sass'

export default function Histogram (props) {
  const { values, highlight, onClick } = props

  const max = values.reduce((prev, next) => next > prev ? next : prev, 0)
  const normalizedValues = values.map(val => val / max)

  const margin = 0.1

  return <svg
    className={_.svg}
    viewBox={`0 0 ${values.length} 2`}
    width='100%'
    xmlns='http://www.w3.org/2000/svg'>
    {normalizedValues.map((val, i) =>
      <g key={i} onClick={() => onClick(i)}>
        <rect
          className={_.rect}
          x={i + margin}
          y={1 - val}
          width={1 - 2 * margin}
          height={val}
          fill={i === highlight ? red : darkGrey} />
        {/* <circle
          className={_.rect}
          r={0.4 - 2 * margin}
          cx={i + 0.5}
          cy='1.5'
          fill={i === highlight ? red : darkGrey} /> */}
        { i % 2 === 0 &&
          <text className={_.text} x={i + 0.5} y='2' textAnchor='middle' fill={i === highlight ? red : darkGrey}>{i}</text>
        }
      </g>
    )}
  </svg>
}

Histogram.propTypes = {
  onClick: PropTypes.func,
  values: PropTypes.array,
  highlight: PropTypes.number
}
