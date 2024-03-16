import { useEffect, useState } from 'react';
import jalaali from 'jalaali-js';
import  '../src/global.css'; // Your Tailwind CSS file

export default function Home() {
  const [dates, setDates] = useState({
    europeanDate: '',
    jalaliDate: '',
    pahlaviDate: '',
    IranianDiako: '',
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

  function convertToJalali(date) {
    const { jy, jm, jd } = jalaali.toJalaali(date);
    return `${jy}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`;
  }

  function convertToPahlavi(date) {
    const { jy, jm, jd } = jalaali.toJalaali(date);
    const pahlaviYear = jy + 1180;
    return `${pahlaviYear}/${jm < 10 ? '0' + jm : jm}/${
      jd < 10 ? '0' + jd : jd
    }`;
  }

  function convertToIranianDiako(date) {
    const { jy, jm, jd } = jalaali.toJalaali(date);
    const IranianDiako = jy + 1321;
    return `${IranianDiako}/${jm < 10 ? '0' + jm : jm}/${
      jd < 10 ? '0' + jd : jd
    }`;
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-8 rounded-lg bg-red-600 p-8 shadow-lg">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Persian Calendar Gah Shomari (ایرانی گاه شماری)
          </h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-red-700 bg-red-600">
                Iranian Date Pahlavi (کورش کبیر)
              </h2>
              <p className="text-lg text-gray-600 nastaliq-font">
                {dates.pahlaviDate}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Iranian (Median Empire) (امپراطوری ماد دیاکو)
              </h2>
              <p className="text-lg text-gray-600">{dates.IranianDiako}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                European Date
              </h2>
              <p className="text-lg text-gray-600">{dates.europeanDate}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Iranian Date (Shamsi) (مهاجرت پیامبر مسلمانان)
              </h2>
              <p className="text-lg text-gray-600">{dates.jalaliDate}</p>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
