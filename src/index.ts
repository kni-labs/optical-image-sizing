import type { OpticalImageSizing } from './types/optical-image-sizing';

// TODO: create a DOM version and a react version
// TODO: for the stylesheet option, document suggested default styles and examples instead of a CSS import, that way they're flexible, localized to the context and don't have to be repeated.
// TODO: if not loaded, scale by 1
// TODO: add event listeners / readiness checks + expose internal function
// TODO: callback for when loading is complete?

const opticalImageSizing: OpticalImageSizing = (images) => {
  const sizedImages = Array.from(images).map((image) => {
    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;
    const aspectRatio = imgHeight / imgWidth;
    // TODO: make sure edge cases are compensated for like NBA
    const scaleBy = 1 - -(Math.cos(Math.PI * aspectRatio) - 1) / 2 / 2;
    const scaleRound = Math.round((scaleBy + Number.EPSILON) * 100) / 100;
    image.style.setProperty('--optical-image-size', scaleRound.toString());
    return image;
  });

  return sizedImages;
};

export default opticalImageSizing;
