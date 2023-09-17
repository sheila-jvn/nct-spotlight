// We'll set the looping point here, e.g. 1920x1080
// but if the user viewport is bigger, we'll use that instead
const preferredWidth = 1920
const preferredHeight = 1080

export const WIDTH =
  screen.availWidth > preferredWidth ? screen.availWidth : preferredWidth
export const HEIGHT =
  screen.availHeight > preferredHeight ? screen.availHeight : preferredHeight
