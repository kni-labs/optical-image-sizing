import { calculateOpticalImageSize, imageIsReady } from '../../../lib/index';
import { useEffect, useRef, useState } from 'react';
import type { UseOpticalImageSize } from 'src/types/react/useOpticalImageSize';

const useOpticalImageSize: UseOpticalImageSize = (src) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const image = imgRef.current;
    if (!image) return;

    const updateScale = (): void => {
      setScale(calculateOpticalImageSize(image));
      setReady(true);
    };

    if (imageIsReady(image)) {
      setReady(true);
      updateScale();
    } else {
      setReady(false);
      image.addEventListener('load', updateScale);

      return () => {
        image.removeEventListener('load', updateScale);
      };
    }

    return;
  }, [src]);

  return { imgRef, ready, scale };
};

export default useOpticalImageSize;
