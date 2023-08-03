import { createContext, useContext, useState, useEffect } from "react"
import EventEmitter from "events"

export const BusContext = createContext<EventEmitter | null>(null)

export interface BusProviderProps {
  bus?: EventEmitter | null | undefined
  children: string | JSX.Element | JSX.Element[]
}
const BusProvider = ({
  bus: _bus,
  children,
}: BusProviderProps): JSX.Element => {
  const [bus] = useState(_bus || new EventEmitter())

  return <BusContext.Provider value={bus}>{children}</BusContext.Provider>
}

export default BusProvider

export const useEventBus = (): EventEmitter => {
  const bus = useContext(BusContext)
  return bus || new EventEmitter()
}

export const useSubscribe = (eventName: string, callback: any) => {
  const bus = useEventBus()
  useEffect(() => {
    bus.on(eventName, callback)
    return () => {
      bus.off(eventName, callback)
    }
  }, [bus, eventName, callback])
}
