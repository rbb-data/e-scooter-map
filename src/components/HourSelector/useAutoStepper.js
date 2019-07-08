import { useState, useEffect, useRef } from 'react'

export default function useAutoStepper (handler, timeout) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [step, setStep] = useState(0)
  const prevIsAnimatingState = useRef(false)
  const timeoutId = useRef(null)

  useEffect(() => {
    const _prevIsAnimatingState = prevIsAnimatingState.current
    prevIsAnimatingState.current = isAnimating

    if (!isAnimating) {
      clearTimeout(timeoutId.current)
      return
    }

    function goToNextStep () {
      const nextStep = handler(step)
      setStep(nextStep)
    }

    // if animation was just started go to next step immediatly
    if (_prevIsAnimatingState === false) {
      goToNextStep()
      return
    }

    timeoutId.current = setTimeout(goToNextStep, timeout)
  }, [isAnimating, step])

  return [isAnimating, setIsAnimating]
}
