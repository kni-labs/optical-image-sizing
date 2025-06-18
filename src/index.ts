import type {OpticalImageSizing} from "./types/optical-image-sizing";

// TODO: create a DOM version and a react version

const opticalImageSizing: OpticalImageSizing = (images) => {
  images.map((image) => {
    // set up default values
    let scaleBy = 0;
    let scaleCurve = 0;

    // get the image's natural dimensions
    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;

    // get a decimal aspect ratio by dividing height by width
    const aspectRatio = imgHeight / imgWidth;

    // super edge case ultra tall/skinny
    if (aspectRatio > 5) scaleBy = 1;
    // edge case tall + skinny like NBA — scale logos along a custom ease-out-sine curve
    else if (aspectRatio > 1.5)
      scaleCurve = (1 - Math.cos((aspectRatio * Math.PI) / 1.75)) / 2;
    // 99% of logos fall in here — scale logos along a custom ease-in-out-sine curve
    else scaleCurve = 1 - -(Math.cos(Math.PI * aspectRatio) - 1) / 2 / 2.06;

    // round it
    scaleBy = Math.round((scaleCurve + Number.EPSILON) * 100) / 100;

    // set the CSS variables for the image
    image.style.setProperty("--opticalImageSize", scaleBy.toString());

    // TODO: make sure opacity can be controlled with external styles / add option to hide images with param
    image.style.setProperty("opacity", "1");
  });

  return images;
};

export default opticalImageSizing;
