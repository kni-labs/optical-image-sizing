export type CalculateOpticalImageSize = (image: HTMLImageElement) => number;

export type OpticallySizeImagesCallback = (
  image: HTMLImageElement,
  opticalSize: ReturnType<CalculateOpticalImageSize>,
) => void;

export type OpticallySizeImages = (
  images: HTMLImageElement[],
  callback?: OpticallySizeImagesCallback,
) => void;

export declare const opticallySizeImages: OpticallySizeImages;
export default opticallySizeImages;
