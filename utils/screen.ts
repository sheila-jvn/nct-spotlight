// We'll set the looping point here, e.g. 1920x1080
// but if the user viewport is bigger, we'll use that instead
const preferredWidth = 1920
const preferredHeight = 1080

export const getWidth = () => {
  // If not on browser, return the preferred width
  if (!screen) {
    return preferredWidth
  }

  // If on browser, return the avail width if it's bigger
  if (screen.availWidth > preferredWidth) return screen.availWidth
  // Otherwise, return the preferred width
  else return preferredWidth
}

export const getHeight = () => {
  // If not on browser, return the preferred height
  if (!screen) {
    return preferredHeight
  }

  // If on browser, return the avail height if it's bigger
  if (screen.availHeight > preferredHeight) return screen.availHeight
  // Otherwise, return the preferred height
  else return preferredHeight
}
