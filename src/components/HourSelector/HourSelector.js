import React, { useState } from 'react'
import track from '../../lib/tracking'
import PropTypes from 'prop-types'
import Histogram from './Histogram'
import useAutoStepper from './useAutoStepper'
import playIcon from './playIcon.svg'
import stopIcon from './stopIcon.svg'
import _ from './HourSelector.module.sass'

export default function HourSelector (props) {
	console.log('props', props)
  const { selectedHour, histogramData, histogramMax, onChange } = props
  const [isFirstPlay, setIsFirstPlay] = useState(true)
  const [isAnimating, setIsAnimating] = useAutoStepper(() => {
		console.log('selectedHour', selectedHour)
		console.log('isFirstPlay', isFirstPlay)

		function addDays(date, days) {
			let result = new Date(date)
			result.setDate(result.getDate() + days)
			console.log('result.toISOString()', result.toISOString())
			return result.toISOString()
		}

    const next = isFirstPlay ? selectedHour : (addDays(selectedHour, 1))
    onChange(next)
    if (next === '2020-01-09T11:00:00.000Z') setIsAnimating(false)
    if (isFirstPlay) setIsFirstPlay(false)
  }, [selectedHour, onChange, isFirstPlay], 2000)


  return <div className={_.wrapper}>
    <button className={_.button} onClick={() => {
      setIsAnimating(!isAnimating)
      track(isAnimating ? 'stop animation' : 'start animation')
    }}>
      {isAnimating
        ? <img src={stopIcon} alt='stop' />
        : <img src={playIcon} alt='play' />
      }
    </button>
    <Histogram
      values={histogramData}
      max={histogramMax}
      highlight={selectedHour}
      onClick={hour => {
        onChange(hour)
        setIsAnimating(false)

        track('select hour')
      }} />
  </div>
}

HourSelector.propTypes = {
  selectedHour: PropTypes.number,
  onChange: PropTypes.func,
  histogramData: PropTypes.array,
  histogramMax: PropTypes.number
}
