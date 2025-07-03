export type OpticallySizeImage = (image: HTMLImageElement) => HTMLImageElement;

export type OpticallySizeImages = (
  images: ReturnType<OpticallySizeImage>[],
  options?: {
    inlineStyles?: boolean;
  },
) => ReturnType<OpticallySizeImage>[];

export declare const opticallySizeImages: OpticallySizeImages;
export default opticallySizeImages;
