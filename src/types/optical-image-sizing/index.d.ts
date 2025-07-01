export type OpticallySizeImage = (image: HTMLImageElement) => HTMLImageElement;

export type OpticalImageSizing = (
  images: ReturnType<OpticallySizeImage>[],
  options?: {
    inlineStyles?: boolean;
  },
) => ReturnType<OpticallySizeImage>[];

export declare const opticalImageSizing: OpticalImageSizing;
export default opticalImageSizing;
