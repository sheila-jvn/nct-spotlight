export interface ClampOptions {
  min: number
  max: number
  value: number
}

export const clamp = ({ min, max, value }: ClampOptions) =>
  Math.max(min, Math.min(max, value))

interface LoopBackOptions {
  min: number
  max: number
  value: number
  treshold: number
}

export const loopBack = ({ min, max, value, treshold }: LoopBackOptions) => {
  const lowerBound = min - treshold
  const upperBound = max + treshold

  if (value < lowerBound) {
    return upperBound
  } else if (value > upperBound) {
    return lowerBound
  } else {
    return clamp({ min: lowerBound, max: upperBound, value })
  }
}
