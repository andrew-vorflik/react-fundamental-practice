import { useEffect, useRef } from "react";

export const useObserver = (ref, isLoading, isShouldLoad, callback) => {
  const observer = useRef();

  useEffect(() => {
    if (isLoading || !ref.current) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }

    const observerCallback = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && isShouldLoad) {
          callback();
        }
      });
    };

    observer.current = new IntersectionObserver(observerCallback);
    observer.current.observe(ref.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, ref.current]);
};
