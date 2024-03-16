// libraries
import localFont from 'next/font/local';

export const montserratFontFamily = localFont({
  variable: '--font-montserrat',
  src: [
    {
      path: './IranNastaliq/nasswoff.woff2',
      weight: '100',
      style: 'normal',
    },
  ],
});
