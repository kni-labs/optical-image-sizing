export type CalculateOpticalImageSize = (image: HTMLImageElement) => number;

export type OpticallySizeImages = (
  images: HTMLImageElement[],
  callback?: (
    image: HTMLImageElement,
    opticalSize: ReturnType<CalculateOpticalImageSize>,
  ) => void,
) => void;

export declare const opticallySizeImages: OpticallySizeImages;
export default opticallySizeImages;
