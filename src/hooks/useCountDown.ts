import { useSafeState, useUnmount, useUpdateEffect } from 'ahooks'
import { useRef } from 'react'

const useCountDown = (initialCount: number, interval = 1000) => {
  const [count, setCount] = useSafeState(initialCount)
  const [isCounting, setIsCounting] = useSafeState(false)
  const timer = useRef<any>(null)
  const startCountDown = () => {
    stopCountDown()
    setIsCounting(true)
    timer.current = setInterval(() => {
      setCount(prevCount => prevCount - 1)
    }, interval)
  }
  const stopCountDown = () => {
    clearInterval(timer.current)
    timer.current = null
    setIsCounting(false)
  }

  useUnmount(() => {
    stopCountDown()
  })

  useUpdateEffect(() => {
    if (timer.current !== null && count === 0) {
      stopCountDown()
      setCount(initialCount)
    }
  }, [timer, count])

  return { count, isCounting, startCountDown, stopCountDown }
}

export default useCountDown
