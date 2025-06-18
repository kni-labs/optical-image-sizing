export type OpticalImageSizing = (
  images: HTMLImageElement[],
  options?: {
    inlineStyles?: boolean;
  },
) => HTMLImageElement[];

export declare const opticalImageSizing: OpticalImageSizing;
export default opticalImageSizing;
