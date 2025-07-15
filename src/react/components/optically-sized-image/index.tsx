import type { OpticallySizeImagesCallback } from '../../../types/lib/optically-size-images';
import React from 'react';
import useOpticalImageSize from '../../hooks/use-optical-image-size';

// TODO: move types to library

type OpticallySizedImageProps<ComponentType extends React.ElementType = 'img'> =
  Omit<React.ComponentPropsWithoutRef<ComponentType>, 'ref'> & {
    component?: ComponentType;
    callback?: OpticallySizeImagesCallback;
  };

const OpticallySizedImageImpl = React.forwardRef<
  HTMLImageElement,
  OpticallySizedImageProps<React.ElementType>
>((props, forwardedRef) => {
  const {
    src = '',
    alt = '',
    component = 'img',
    callback,
    ...otherProps
  } = props as OpticallySizedImageProps & {
    src: string;
    component?: React.ElementType;
  };

  const { imgRef, ready, scale } = useOpticalImageSize(callback);

  const combinedRef = React.useCallback(
    (element: HTMLImageElement | null) => {
      if (typeof imgRef === 'function') {
        imgRef(element);
      } else if (
        imgRef &&
        typeof imgRef === 'object' &&
        'current' in imgRef &&
        (imgRef as React.RefObject<HTMLImageElement | null>).current !== element
      ) {
        (imgRef as React.RefObject<HTMLImageElement | null>).current = element;
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

interface OpticallySizedImageComponent {
  <ComponentType extends React.ElementType = 'img'>(
    props: OpticallySizedImageProps<ComponentType> & {
      ref?: React.Ref<HTMLImageElement>;
    },
  ): React.ReactElement;
  displayName?: string;
}

OpticallySizedImageImpl.displayName = 'OpticallySizedImage';

const OpticallySizedImage =
  OpticallySizedImageImpl as OpticallySizedImageComponent;

export default OpticallySizedImage;
