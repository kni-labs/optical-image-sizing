import React from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import useOpticalImageSize from '../hooks/useOpticalImageSize';

const imageSources = [
  'https://images.squarespace-cdn.com/content/v1/5ede2122e582b96630a4a73e/1609427144088-J6QCD34P67Y6GLUJ10HH/MTV-Logo-2021.jpg?format=2500w',
  'https://1000logos.net/wp-content/uploads/2017/05/Rolex-logo.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4f-mRJPxI2q_lmLlHQu-Sgw0aLD4gmvHzg&usqp=CAU',
  'https://images.squarespace-cdn.com/content/v1/5ede2122e582b96630a4a73e/1609426275896-1FOTSNA4G3UL4V05UONK/koa-logo+2021.png?format=750w',
  'https://www.dbox.us/misc/barrons.png',
  'https://www.dbox.us/misc/forbes2.png',
  'https://mlt.org/wp-content/uploads/2021/06/the-wall-street-journal-logo-png-8-300x174.png',
  'https://www.nlpschool.com/wp-content/uploads/2015/07/financial-times.png',
  'https://globalenergymonitor.org/wp-content/uploads/2020/12/ebff3737573f1b7635f3324be5c61f8f.png',
  'https://www.dbox.us/misc/600.jpg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/microsoft.svg',
  'https://cdn.worldvectorlogo.com/logos/nba-6.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/messenger.svg',
  'https://www.bolt.com/assets/images/components/FeaturedIn/cnbc.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/airbnb.svg',
  'https://summitry.com/wp-content/themes/summitry/img/temp/logo.svg',
  'https://www.dbox.us/misc/allure.jpg',
  'https://www.dbox.us/misc/tree.jpg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/arduino.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/discord.svg',
  'https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/american-express-logo.png',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/asana.svg',
  'https://www.bolt.com/assets/images/components/FeaturedIn/reuters.svg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
  'https://placewise.imgix.net/images/api/retailhubjs/e3a3f05c1cd1b25e3374b3cd8f88fb8c.png',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/nestjs.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/medium.svg',
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/Google_Play_2022_logo.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/css-3.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/cssnext.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/google.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/internetexplorer.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/android-vertical.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/github.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/gatsby.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/datocms.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/bitbucket.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/behance.svg',
  'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/beats.svg',
  'https://raw.githubusercontent.com/shgysk8zer0/logos/master/gulp.svg',
  'https://raw.githubusercontent.com/shgysk8zer0/logos/master/sass.svg',
];

const OpticalImage = ({ src }: { src: string }): React.JSX.Element => {
  const { imgRef, ready, scale } = useOpticalImageSize(src);

  return (
    <figure>
      <img
        ref={imgRef}
        src={src}
        alt=""
        style={
          {
            '--optical-image-size': scale,
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.2s ease',
          } as React.CSSProperties
        }
      />
    </figure>
  );
};

const App = (): React.JSX.Element => {
  return (
    <div className="optically-size-images">
      {imageSources.map((src) => (
        <OpticalImage key={src} src={src} />
      ))}
    </div>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root: Root = createRoot(rootElement);
  root.render(<App />);
}
