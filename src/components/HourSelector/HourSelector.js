import React from 'react'
import PropTypes from 'prop-types'
import Histogram from './Histogram'
import useAutoStepper from './useAutoStepper'
import playIcon from './playIcon.svg'
import stopIcon from './stopIcon.svg'
import _ from './HourSelector.module.sass'

export default function HourSelector (props) {
  const { selectedHour, histogramData, onChange } = props
  const [isAnimating, setIsAnimating] = useAutoStepper(() => {
    const next = (selectedHour + 1) % 24
    onChange(next)
    return next
  }, 1000)

  return <div className={_.wrapper}>
    <button className={_.button} onClick={() => { setIsAnimating(!isAnimating) }}>
      {isAnimating
        ? <img src={stopIcon} alt='play' />
        : <img src={playIcon} alt='play' />
      }
    </button>
    <Histogram
      values={histogramData}
      highlight={selectedHour}
      onClick={onChange} />
  </div>
}

HourSelector.propTypes = {
  selectedHour: PropTypes.number,
  onChange: PropTypes.func,
  histogramData: PropTypes.array
}
