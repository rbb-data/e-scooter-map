import React, { useState } from 'react'
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
    const next = isFirstPlay ? 0 : (selectedHour + 1) % 24
    onChange(next)
    if (next === 23) setIsAnimating(false)
    if (isFirstPlay) setIsFirstPlay(false)
  }, [selectedHour, onChange, isFirstPlay], 2000)

  return <div className={_.wrapper}>
    <button className={_.button} onClick={() => {
      setIsAnimating(!isAnimating)
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
      }} />
  </div>
}

HourSelector.propTypes = {
  selectedHour: PropTypes.number,
  onChange: PropTypes.func,
  histogramData: PropTypes.array,
  histogramMax: PropTypes.number
}
