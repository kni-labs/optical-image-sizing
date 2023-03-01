# optical-image-sizing
Normalize the size of a set of images, optically, based on their aspect ratios. See it in action [on this Codepen](https://codepen.io/dbox/pen/oNPBozZ).

![grid of logos, before and after normalization](https://github.com/kni-labs/optical-image-sizing/blob/38bbe018d5e8e5ec3193d8b917aa909048955f96/test/preview.gif?raw=true) 

### What is this?
This is a small script that loops through all the images of a specified container and resizes them be similarly sized. This is especially handy on logos, but has other applications as well (product images, etc).

### Why not scale the images manually?
The absolute best way to insure a set of images always looks sized properly in relation to each other is to manually size them within the same-sized containers. Many times this isn't feasible or a good use of time. This also becomes problematic when there are many images or they need to be added dynamically from a backend (from client).


### Why not just use object-fit?
This solution does use `object-fit`, but there are limitations to the amount of normalization that can happen with `ojbect-fit`. Even with `max-height` and other tricks, images with different aspect-ratios will always appear as different visual sizes.
![object-fit vs script](https://github.com/kni-labs/optical-image-sizing/blob/be9ba77c90c1939517292d7d1ce389e5c060d038/test/object-fit.jpg?raw=true) 


### The solution - Scaling along a curve
The solution for this is set the scale amount based on where the image's aspect ratio lands on a curve:

![Scaling along a curve](https://github.com/kni-labs/optical-image-sizing/blob/2a3ee98809fc2315dfc14538e5c429d48e963ae7/test/curve.jpg?raw=true) 

So, the wider an image, the less it scales, the closer it gets to square, the more it scales. (For logos taller than `1:1` the script essentially reverses the process back down the curve.)

### Usage

1. Add a container with the class `.arScale` that holds your images. Each image will also need to have a parent container (ie `div` or `figure`)

```html
<div class="arScale">
  <figure><img src="img1.jpg"></figure>
  <figure><img src="img2.jpg"></figure>
  <figure><img src="img2.jpg"></figure>
</div>
```
2. Attach or add the javascript file:
```
<script src="path-to/optical-image-sizing.js"></script>
```
You can also add this and the css with npm.

3. Add required css:
```css
/* modify container to suit your needs */
.arScale {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 3%;
  column-gap: 6%;
}
/* required */
.arScale > * {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  aspect-ratio: 1/1;
  text-align: center;
  display: flex;
  align-items: center;
}
/* required */
.arScale img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.2s ease;
  transform: scale(var(--scaleBy));
}
```
The script will find the height and with of any image in that container then scale it accordingly.


