import { MouseEventHandler, createContext, useContext, useState } from 'react'
import { usePrevious } from 'react-use'
import { clamp } from './clamp'

interface ClampOptions {
  value: number
  lowerLimit: number
  upperLimit: number
  width: number
}

function loopBack({
  lowerLimit,
  upperLimit,
  value,
  width
}: ClampOptions): number {
  const halfWidth = width / 2
  const lowerBound = lowerLimit - halfWidth
  const upperBound = upperLimit + halfWidth

  if (value < lowerBound) {
    return upperBound
  } else if (value > upperBound) {
    return lowerBound
  } else {
    return clamp({ min: lowerBound, max: upperBound, value })
  }
}

const WIDTH = 800
const HEIGHT = 500

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
    const initialBoxPos: Position = { x: 200, y: 200 }

    if (isDragging) {
      setDeltaPosition({
        x: event.clientX - initialPosition.x,
        y: event.clientY - initialPosition.y
      })

      setTransform((prev) => {
        const computedX = prev.x + (deltaPosition.x - (prevDelta?.x ?? 0))
        console.log({ computedX })

        return {
          x: loopBack({
            lowerLimit: 0,
            upperLimit: WIDTH,
            value: computedX,
            width: 200
          }),
          y: prev.y + (deltaPosition.y - (prevDelta?.y ?? 0))
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
