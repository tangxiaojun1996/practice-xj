function throttle(fn, delay) {
  let timer;
  let isFirst = true;
  return (...args) => {
    if (isFirst) {
      fn(...args)
      isFirst = false
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        clearTimeout(timer);
        timer = null;

      }, delay)
    }
  }
}