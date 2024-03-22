"use client"

import React, { useEffect } from "react"

import Geiger from "@/components/geiger"

export const GeigerContext = React.createContext<{
  setGeiger: (geigerActivated: boolean) => void
  geigerActivated: boolean
}>({
  setGeiger: () => {},
  geigerActivated: false,
})

export default function GeigerProvider({ children }: { children: React.ReactNode }) {
  const [geigerActivated, _setGeiger] = React.useState(false)
  const [hasInteracted, setHasInteracted] = React.useState(false)

  useEffect(() => {
    const geigerActivated = localStorage.getItem("geigerActivated")
    if (geigerActivated) {
      _setGeiger(geigerActivated === "true")
    }
  }, [])

  const setGeiger = (geigerActivated: boolean) => {
    localStorage.setItem("geigerActivated", geigerActivated.toString())
    _setGeiger(geigerActivated)
  }

  useEffect(() => {
    const onInteraction = () => {
      setHasInteracted(true)
    }
    document.addEventListener("keydown", onInteraction)
    document.addEventListener("pointerdown", onInteraction)

    return () => {
      document.removeEventListener("keydown", onInteraction)
      document.removeEventListener("pointerdown", onInteraction)
    }
  }, [])

  return (
    <GeigerContext.Provider
      value={{
        setGeiger,
        geigerActivated,
      }}
    >
      <Geiger renderTimeThreshold={0} enabled={geigerActivated && hasInteracted}>
        {children}
      </Geiger>
    </GeigerContext.Provider>
  )
}
