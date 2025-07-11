export type UseOpticalImageSize = (src: string) => {
  imgRef: React.RefObject<HTMLImageElement | null>;
  ready: boolean;
  scale: number;
};
