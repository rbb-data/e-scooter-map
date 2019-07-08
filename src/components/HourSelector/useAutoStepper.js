import { useState, useEffect, useRef } from 'react'

export default function useAutoStepper (handler, timeout) {
  const [isAnimating, setIsAnimating] = useState(false)
  const prevIsAnimatingState = useRef(false)
  const timeoutId = useRef(null)

  useEffect(() => {
    const _prevIsAnimatingState = prevIsAnimatingState.current
    prevIsAnimatingState.current = isAnimating

    if (!isAnimating) {
      clearTimeout(timeoutId.current)
      return
    }

    // if animation was just started go to next step immediatly
    if (_prevIsAnimatingState === false) {
      handler()
      return
    }

    timeoutId.current = setTimeout(handler, timeout)
  }, [isAnimating, handler])

  return [isAnimating, setIsAnimating]
}
