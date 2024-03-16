'use client';
import { useEffect, useState } from 'react';
import jalaali from 'jalaali-js';

function toPersianNums(numString: string) {
  const persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return numString.replace(/\d/g, (x) => persianNums[parseInt(x)]);
}

export default function Home() {
  const [dates, setDates] = useState({
    europeanDate: '',
    jalaliDate: '',
    pahlaviYear: '',
    IranianDiako: '',
    IraniMithra: '',
  });

  useEffect(() => {
    const today = new Date();

    setDates({
      europeanDate: toPersianNums(today.toLocaleDateString('en-GB')),
      jalaliDate: convertToJalali(today),
      pahlaviYear: convertToPahlavi(today),
      IranianDiako: convertToIranianDiako(today),
      IraniMithra: convertToIraniMithra(today),
    });
  }, []);

  function convertToJalali(date: Date) {
    const { jy, jm, jd } = jalaali.toJalaali(date);
    return toPersianNums(
      `${jy}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`
    );
  }

  function convertToPahlavi(date: Date) {
    const { jy, jm, jd } = jalaali.toJalaali(date);
    const pYear = jy + 1180;
    return toPersianNums(
      `${pYear}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`
    );
  }

  function convertToIranianDiako(date: Date) {
    const { jy, jm, jd } = jalaali.toJalaali(date);
    const IranianDiako = jy + 1321;
    return toPersianNums(
      `${IranianDiako}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`
    );
  }

  function convertToIraniMithra(date: Date) {
    const { jy, jm, jd } = jalaali.toJalaali(date);
    const IraniMithraYear = jy + 6359; // As 1403 is to 7762, therefore jy + (7762 - 1403)
    return toPersianNums(
      `${IraniMithraYear}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-600">
      <div className="space-y-8 rounded-lg p-8 shadow-2xl bg-blue-200 w-[400px] ">
        <div className="text-center">
          <h1 className="mb-9 text-8xl text-blue-900">گاه شمار ایرانی</h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-7xl mt-20 mb-4 text-blue-900">کورش کبیر</h2>
              <p className="text-5xl text-blue-700">{dates.pahlaviYear}</p>
            </div>
            <div>
              <h2 className="text-6xl mt-8 text-blue-900">
                امپراطوری ماد دیاکو
              </h2>
              <p className="text-5xl text-blue-700">{dates.IranianDiako}</p>
            </div>
            <div>
              <h2 className="text-6xl text-blue-900">میلادی</h2>
              <p className="text-5xl text-blue-700">{dates.europeanDate}</p>
            </div>
            <div>
              <h2 className="text-6xl text-blue-900">شمسی</h2>
              <p className="text-5xl text-blue-700">{dates.jalaliDate}</p>
            </div>
            <div>
              <h2 className="text-6xl text-blue-900">ایرانی میترا</h2>
              <p className="text-5xl text-blue-700">{dates.IraniMithra}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
