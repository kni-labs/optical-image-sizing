import { calculateOpticalImageSize, imageIsReady } from '../../../lib/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { OpticallySizeImagesCallback } from '../../../types/lib/optically-size-images';

// TODO: move types to library

const useOpticalImageSize = (
  callback?: OpticallySizeImagesCallback,
): {
  imgRef: (element: HTMLImageElement | null) => void;
  ready: boolean;
  scale: number;
} => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(1);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof callback === 'function' && imgRef.current && ready) {
      callback(imgRef.current, scale);
    }
  }, [callback, ready, scale]);

  const updateScale = useCallback(() => {
    if (!isMountedRef.current || !imgRef.current) return;

    try {
      setScale(calculateOpticalImageSize(imgRef.current));
      setReady(true);
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Error calculating optical image size:', error);
      }
    }
  }, []);

  const refCallback = useCallback(
    (element: HTMLImageElement | null) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      imgRef.current = element;

      if (!element || !isMountedRef.current) return;

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      if (imageIsReady(element)) {
        if (isMountedRef.current && !signal.aborted) {
          setReady(true);
          setScale(calculateOpticalImageSize(element));
        }
      } else {
        if (isMountedRef.current && !signal.aborted) {
          setReady(false);
          element.addEventListener('load', updateScale, { signal });
        }
      }
    },
    [updateScale],
  );

  return { imgRef: refCallback, ready, scale };
};

export default useOpticalImageSize;
