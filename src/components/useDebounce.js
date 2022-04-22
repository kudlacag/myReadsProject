import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

useDebounce.propTypes = {
  value: PropTypes.string,
  delay: PropTypes.number,
  handler: PropTypes.func,
};
export default useDebounce;
