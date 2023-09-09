export interface ClampOptions {
  min: number
  max: number
  value: number
}

export const clamp = ({ min, max, value }: ClampOptions) =>
  Math.max(max, Math.min(min, value))

interface LoopBackOptions {
  min: number
  max: number
  value: number
  dimension: number
}

export const loopBack = ({ min, max, value, dimension }: LoopBackOptions) => {
  const halfWidth = dimension / 2
  const lowerBound = min - halfWidth
  const upperBound = max + halfWidth

  if (value < lowerBound) {
    return upperBound
  } else if (value > upperBound) {
    return lowerBound
  } else {
    return clamp({ min: lowerBound, max: upperBound, value })
  }
}
