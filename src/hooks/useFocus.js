import { useRef, useCallback } from "react";

const useFocus = () => {
  const ref = useRef();
  const setFocus = useCallback(() => {
    ref.current && ref.current.focus();
  }, []);

  return { ref, setFocus };
};

export default useFocus;
