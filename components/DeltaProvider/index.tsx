import { MouseEventHandler, createContext, useContext, useState } from 'react'
import { usePrevious } from 'react-use'
import { loopBack } from './clamp'
import { HEIGHT, WIDTH } from '@/utils/constants'

interface Position {
  x: number
  y: number
}

interface DeltaContextValue {
  parentProps: {
    onMouseDown: MouseEventHandler<HTMLDivElement>
    onMouseMove: MouseEventHandler<HTMLDivElement>
    onMouseUp: MouseEventHandler<HTMLDivElement>
  }
  deltaPosition: Position
  isDragging: boolean
  transform: Position
}

export const ORIGIN: Position = { x: 0, y: 0 }

export const DeltaContext = createContext<DeltaContextValue>({
  parentProps: {
    onMouseDown: () => {},
    onMouseMove: () => {},
    onMouseUp: () => {}
  },
  deltaPosition: ORIGIN,
  isDragging: false,
  transform: ORIGIN
})

interface DeltaProviderProps {
  children: React.ReactNode
}

export const DeltaProvider = ({ children }: DeltaProviderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [initialPosition, setInitialPosition] = useState(ORIGIN)
  const [deltaPosition, setDeltaPosition] = useState(ORIGIN)
  const prevDelta = usePrevious(deltaPosition)
  const [transform, setTransform] = useState(ORIGIN)

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsDragging(true)

    setInitialPosition({
      x: event.clientX,
      y: event.clientY
    })
  }

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isDragging) {
      setDeltaPosition({
        x: event.clientX - initialPosition.x,
        y: event.clientY - initialPosition.y
      })

      setTransform((prev) => {
        const computedX = prev.x + (deltaPosition.x - (prevDelta?.x ?? 0))
        const computedY = prev.y + (deltaPosition.y - (prevDelta?.y ?? 0))

        return {
          x: loopBack({
            min: 0,
            max: WIDTH,
            value: computedX,
            treshold: (5 / 100) * WIDTH
          }),
          y: loopBack({
            min: 0,
            max: HEIGHT,
            value: computedY,
            treshold: (5 / 100) * HEIGHT
          })
        }
      })
    }
  }

  const onMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    setIsDragging(false)
    // Reset the delta position, also reset the previous delta
    setDeltaPosition(ORIGIN)
  }

  const parentProps = {
    onMouseDown,
    onMouseMove,
    onMouseUp
  }

  const contextValue: DeltaContextValue = {
    parentProps,
    deltaPosition,
    isDragging,
    transform
  }

  return (
    <DeltaContext.Provider value={contextValue}>
      {children}
    </DeltaContext.Provider>
  )
}

export const useDragContext = () => {
  return useContext(DeltaContext)
}
