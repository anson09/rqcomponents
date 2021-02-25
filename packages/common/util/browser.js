const isCssVarSupported = () =>
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports("color", "var(--fake-var)");

function globalGuard(fname, ...params) {
  if (typeof window[fname] === "function") {
    window[fname](...params);
  } else {
    setTimeout(() => {
      if (typeof window[fname] === "function") {
        window[fname](...params);
      }
    }, 3000);
  }
}

export { isCssVarSupported, globalGuard };
