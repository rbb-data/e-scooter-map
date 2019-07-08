import { useState, useEffect, useRef } from 'react'

export default function useAutoStepper (handler, dependencies, timeout) {
  const [isAnimating, setIsAnimating] = useState(false)
  const prevIsAnimatingState = useRef(false)
  const timeoutId = useRef(null)

  useEffect(() => {
    clearTimeout(timeoutId.current)
    const _prevIsAnimatingState = prevIsAnimatingState.current
    prevIsAnimatingState.current = isAnimating

    if (!isAnimating) return

    // if animation was just started go to next step immediatly
    if (_prevIsAnimatingState === false) {
      handler()
      return
    }

    timeoutId.current = setTimeout(handler, timeout)
  }, [isAnimating, ...dependencies])

  return [isAnimating, setIsAnimating]
}
