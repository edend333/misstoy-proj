import { useState } from "react"

export function useToggle(initialValue) {
  const [isOn, setIsOn] = useState(initialValue)

  function toggle(isOnArg) {
    if (typeof isOnArg === "boolean") {
      setIsOn(isOnArg)
    } else {
      setIsOn(prevIsOn => !prevIsOn)
    }
  }

  return [isOn, toggle]
}
