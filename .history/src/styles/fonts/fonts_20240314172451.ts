// libraries
import localFont from 'next/font/local';

export const montserratFontFamily = localFont({
  variable: '--font-montserrat',
  src: [
    {
      path: '../fonts/Montserrat/Montserrat-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Montserrat/Montserrat-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../fonts/Montserrat/Montserrat-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
  ],
});
