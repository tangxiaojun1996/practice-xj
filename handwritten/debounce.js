
function debounce(fn, delay) {
  let timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
      timer = null;
      timer = setTimeout(fn, delay)
    } else {
      timer = setTimeout(fn, delay)
    }
  }
}