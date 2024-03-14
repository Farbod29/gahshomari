import { useEffect, useState } from 'react';
import jalaali from 'jalaali-js';

function convertToJalali(date) {
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return `${jy}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`;
}

function convertToPahlavi(date) {
  const gregorianYear = date.getFullYear();
  let pahlaviYear = gregorianYear - 559;
  const nowruzThisYear = new Date(gregorianYear, 2, 21); // Approximate date for Nowruz

  // If the date is before this year's Nowruz, subtract one year
  if (date < nowruzThisYear) {
    pahlaviYear -= 1;
  }

  // Calculate the month and day in the Pahlavi calendar
  // Use the same method as for Jalali since both are Solar Hijri calendars
  const jalali = jalaali.toJalaali(date);
  const month = jalali.jm;
  const day = jalali.jd;

  return `${pahlaviYear}/${month < 10 ? '0' + month : month}/${
    day < 10 ? '0' + day : day
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
          <h2>Iranian</h2>
          <p>{dates.jalaliDate}</p>
        </div>
        <div className="text-center">
          <h2>Pahlavi</h2>
          <p>{dates.pahlaviDate}</p>
        </div>
      </div>
    </main>
  );
}
