import type {
  CalculateOpticalImageSize,
  OpticallySizeImages,
} from '../types/lib/opticallySizeImages';

// TODO: set up react project and create a react component option that uses the hook and allows for a custom image component
// TODO: document suggested default styles and examples instead of a CSS import, that way they're flexible, localized to the context and don't have to be repeated.
// TODO: create callback functionality for react hook as well

export const imageIsReady = (image: HTMLImageElement): boolean => {
  return (
    image.complete && image.naturalWidth !== 0 && image.naturalHeight !== 0
  );
};

export const calculateOpticalImageSize: CalculateOpticalImageSize = (image) => {
  const imgWidth = image.naturalWidth;
  const imgHeight = image.naturalHeight;
  const aspectRatio = imgHeight / imgWidth;
  let scaleBy = 1 - -(Math.cos(Math.PI * aspectRatio) - 1) / 2 / 2.06;
  if (aspectRatio > 1.5)
    scaleBy = (1 - Math.cos((aspectRatio * Math.PI) / 1.75)) / 2;
  if (aspectRatio > 5) scaleBy = 1;
  const scaleRound = Math.round((scaleBy + Number.EPSILON) * 100) / 100;
  return scaleRound;
};

const opticallySizeImages: OpticallySizeImages = (images, callback) => {
  images.map((image) => {
    const setOpticalSize = (): void => {
      const opticalSize = calculateOpticalImageSize(image);
      if (callback) callback(image, opticalSize);
    };

    if (imageIsReady(image)) {
      setOpticalSize();
    } else {
      image.addEventListener('load', setOpticalSize);
    }
  });
};

export default opticallySizeImages;
