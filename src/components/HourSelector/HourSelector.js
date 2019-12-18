import React, { useState } from 'react'
import track from '../../lib/tracking'
import PropTypes from 'prop-types'
import Histogram from './Histogram'
import useAutoStepper from './useAutoStepper'
import playIcon from './playIcon.svg'
import stopIcon from './stopIcon.svg'
import _ from './HourSelector.module.sass'

export default function HourSelector (props) {
  const { selectedHour, histogramData, histogramMax, onChange } = props
	const [isFirstPlay, setIsFirstPlay] = useState(true)
	
  const [isAnimating, setIsAnimating] = useAutoStepper(() => {
		// TODO
		const minDate = '2019-12-18T11:00:00.000Z'
		const maxDate = '2020-01-02T11:00:00.000Z'

		function addDays(date, days) {
			if (date === '2020-01-02T11:00:00.000Z') {
				return minDate
			}
			let result = new Date(date)
			result.setDate(result.getDate() + days)
			return result.toISOString()
		}

    let next = isFirstPlay ? selectedHour : (addDays(selectedHour, 1))
    onChange(next)
    if (next === maxDate) {
			setIsAnimating(false)
			next = minDate
			onChange(next)
		}
		if (isFirstPlay) setIsFirstPlay(false)

  }, [selectedHour, onChange, isFirstPlay], 1500)


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
