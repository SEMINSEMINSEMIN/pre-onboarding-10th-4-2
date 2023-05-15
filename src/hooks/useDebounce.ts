import { useEffect } from "react";
import { DEBOUNCE_TIME } from "../constants";

type CallbackFunction = (...args: any[]) => any;

const useDebounce = (
  value: any,
  callback: CallbackFunction,
  delay: number = DEBOUNCE_TIME
): void => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, callback, delay]);
};

export default useDebounce;
