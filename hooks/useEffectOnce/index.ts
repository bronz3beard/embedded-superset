import { useEffect, useRef } from 'react';

const useEffectOnce = (effect: () => void) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      return effect();
    }
  }, [effect]);
};

export default useEffectOnce;
