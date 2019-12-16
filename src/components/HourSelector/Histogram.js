import React from 'react'
import PropTypes from 'prop-types'
import { darkGrey, red } from '../../shared/styles/colors.sass'
import _ from './Histogram.module.sass'

export default function Histogram (props) {
	const { values, max, highlight, onClick } = props

	console.log('props in histor', props)
	
	const values_only = Object.values(values)
	const keys_only = Object.keys(values)

	const keys = keys_only.sort(function(a, b) {
		return new Date(b) - new Date(a);
	})
	const sorted_keys = keys.reverse()

	var sorted_values = []
	sorted_keys.forEach(key => sorted_values.push(values[key]))
	console.log('sorted_values', sorted_values)

	const normalizedValues = sorted_values.map(val => val / max)

  const margin = 0.22

  return <svg
    className={_.svg}
    viewBox={`0 0 ${normalizedValues.length} 3.5`}
    width='100%'
    xmlns='http://www.w3.org/2000/svg'>
		{normalizedValues.map((val, i) =>
      <g key={i} onClick={() => onClick(i)}>
        <rect
          className={_.rect}
          x={i + margin}
          y={2.5 - val * 2.5}
          width={1 - 2 * margin}
          height={val * 2.5}
          fill={sorted_keys[i] === highlight ? red : darkGrey} />
				{ i % 2 === 0 &&
					<text className={_.text} x={i + 0.5} y='3.5' textAnchor='middle' fill={sorted_keys[i] === highlight ? red : darkGrey}>{ new Date(sorted_keys[i]).getDate() }</text>
				}
      </g>
    )}
  </svg>
}

Histogram.propTypes = {
  onClick: PropTypes.func,
  values: PropTypes.array,
  max: PropTypes.number,
  highlight: PropTypes.number
}
