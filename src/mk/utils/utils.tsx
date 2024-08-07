export const throttle = (func: Function, delay: number) => {
  let lastCall: number = 0;
  return function (...args: any) {
    const now: number = new Date().getTime();
    if (delay > now - lastCall) {
      return;
    }
    lastCall = now;
    func(...args);
  };
};

export const debounce = (func: Function, delay: number) => {
  let timeoutId: any;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const isProbablyReactComponent = (prop: any) => {
  return (
    typeof prop === "function" &&
    prop.name &&
    prop.name[0] === prop.name[0].toUpperCase()
  );
};

export const isFunction = (prop: any) => {
  return typeof prop === "function" && !isProbablyReactComponent(prop);
};
