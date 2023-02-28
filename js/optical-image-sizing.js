window.addEventListener("load", function () {
  // get all the images inside the "arScale" div
  const images = document.querySelectorAll(".arScale img");

  // loop through each image
  images.forEach((image) => {
    // Get the image's natural dimensions
    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;

    // get a decimal aspect ratio by dividing heigh by width
    var aspectRatio = imgHeight / imgWidth;

    // super edge case ultra tall/skinny
    if (aspectRatio > 5) {
      var scaleBy = 1;

      // edge case tall + skinny like NBA
    } else if (aspectRatio > 1.5) {
      // scale logos along a custom ease-out-sine curve
      var scaleCurve = (1 - Math.cos((aspectRatio * Math.PI) / 1.75)) / 2;

      // 99% of logos fall in here
    } else {
      // scale logos along a custom ease-in-out-sine curve
      var scaleCurve = 1 - -(Math.cos(Math.PI * aspectRatio) - 1) / 2 / 2.06;
    }
    // round it
    var scaleBy = Math.round((scaleCurve + Number.EPSILON) * 100) / 100;
    // add a style tag to have css scale by correct amount
    image.style = "--scaleBy: " + scaleBy + "; opacity: 1;";
  });
});
