# optical-image-sizing
Normalize the size of a set of images, optically, based on their aspect ratios

![grid of logos, before and after normalization](https://github.com/kni-labs/optical-image-sizing/blob/df1cfa533f4247142a9be9a11006ed46ab982290/test/preview.gif?raw=true) 

### What is this?
This is a small script that loops through all the images of a specified container and resizes them be similarly sized. This is especially handy on logos, but has other applications as well.

### Why not scale the images manually?
The absolute best way to insure a set of images always looks sized properly in relation to each other is to manually size them within the same-sized containers. Many times this isn't feasible or a good use of time. This also becomes problematic when there are many images or they need to be added dynamically from a backend (from client).


### Why not just use object-fit?
This repo does use `object-fit`, but there are limitations to the amount of normalization that can happen with `ojbect-fit`. Even with `max-height` and other tricks, images with different aspect-ratios will always appear as different visual sizes.
![object-fit vs script](https://github.com/kni-labs/optical-image-sizing/blob/be9ba77c90c1939517292d7d1ce389e5c060d038/test/object-fit.jpg?raw=true) 


### The solution - Scaling along a curve
The solution for this is set their scale amount based on where the image's aspect ratio lands on a curve:

![Scaling along a curve](https://github.com/kni-labs/optical-image-sizing/blob/061b236bf0aec265357d5b7fcb5fd9b4e550451b/test/curve.jpg?raw=true) 

So, the wider an image, the less it scales, the closer it gets to square, the more it scales. (For logos taller than `1:1` the script essentially reverses the process back down the curve.)



