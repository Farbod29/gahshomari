import { useEffect, useState } from 'react';
import jalaali from 'jalaali-js';

function convertToJalali(date) {
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return `${jy}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`;
}

function convertToPahlavi(date) {
  // Convert to Jalali
  const { jy, jm, jd } = jalaali.toJalaali(date);

  // Convert Jalali year to Pahlavi year
  const pahlaviYear = jy + 1180;

  return `${pahlaviYear}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`;
}

function convertToIranianDiako(date) {
  // Convert to Jalali
  const { jy, jm, jd } = jalaali.toJalaali(date);

  // Convert Jalali year to Pahlavi year
  const IranianDiako = jy + 1321;

  return `${IranianDiako}/${jm < 10 ? '0' + jm : jm}/${
    jd < 10 ? '0' + jd : jd
  }`;
}

export default function Home() {
  const [dates, setDates] = useState({
    europeanDate: '',
    jalaliDate: '',
    pahlaviDate: '',
  });

  useEffect(() => {
    const today = new Date();
    setDates({
      europeanDate: today.toLocaleDateString('en-GB'),
      jalaliDate: convertToJalali(today),
      pahlaviDate: convertToPahlavi(today),
      IranianDiako: convertToIranianDiako(today),
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3">
        <div className="text-center">
          <h2>European</h2>
          <p>{dates.europeanDate}</p>
        </div>
        <div className="text-center">
          <h2>Iranian (شمسی) مهاجرت پیامبر مسلمانان </h2>
          <p>{dates.jalaliDate}</p>
        </div>
        <div className="text-center">
          <h2> Iranian Pahlavi کورش کبیر</h2>
          <p>{dates.pahlaviDate}</p>
        </div>
        <div className="text-center">
          <h2>Iranian دیاکو </h2>
          <p>{dates.IranianDiako}</p>
        </div>
      </div>
    </main>
  );
}
