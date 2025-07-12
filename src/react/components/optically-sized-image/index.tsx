import React from 'react';
import useOpticalImageSize from '../../hooks/use-optical-image-size';

// TODO: move types to library

type OpticallySizedImageProps<ComponentType extends React.ElementType = 'img'> =
  Omit<React.ComponentPropsWithoutRef<ComponentType>, 'ref'> & {
    component?: ComponentType;
  };

const OpticallySizedImage = React.forwardRef<
  HTMLImageElement,
  OpticallySizedImageProps<React.ElementType>
>((props, forwardedRef) => {
  const {
    src = '',
    alt = '',
    component = 'img',
    ...otherProps
  } = props as OpticallySizedImageProps & {
    src: string;
    component?: React.ElementType;
  };

  const { imgRef, ready, scale } = useOpticalImageSize(src);

  const combinedRef = React.useCallback(
    (element: HTMLImageElement | null) => {
      if (imgRef.current !== element) {
        imgRef.current = element;
      }

      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef && typeof forwardedRef === 'object') {
        forwardedRef.current = element;
      }
    },
    [imgRef, forwardedRef],
  );

  const elementProps = {
    ref: combinedRef,
    src,
    alt,
    ...otherProps,
    style: {
      '--optical-image-size': scale,
      opacity: ready ? 1 : 0,
      ...props.style,
    } as React.CSSProperties,
  };

  return React.createElement(component, elementProps);
});

OpticallySizedImage.displayName = 'OpticallySizedImage';

export default OpticallySizedImage;
