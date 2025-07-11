import React from 'react';
import useOpticalImageSize from '../../hooks/use-optical-image-size';

type OpticallySizedImageProps<ComponentType extends React.ElementType = 'img'> =
  Omit<React.ComponentPropsWithoutRef<ComponentType>, 'ref' | 'src'> & {
    src: string;
    component?: ComponentType;
  };

const OpticallySizedImage = <ComponentType extends React.ElementType = 'img'>({
  src,
  component,
  ...otherProps
}: OpticallySizedImageProps<ComponentType>): React.JSX.Element => {
  const { imgRef, ready, scale } = useOpticalImageSize(src);
  const ImageComponent = component ?? 'img';

  return (
    <figure>
      <ImageComponent
        ref={imgRef}
        src={src}
        alt=""
        style={
          {
            '--optical-image-size': scale,
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.2s ease',
          } as React.CSSProperties
        }
        {...otherProps}
      />
    </figure>
  );
};

export default OpticallySizedImage;
