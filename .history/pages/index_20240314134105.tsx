// import { format, Locale } from 'date-fns'; // Import here

// type Localize = {
//   options: {
//     day: string;
//     month: string;
//     weekday: string;
//   };
//   localize: {
//     day: (date: Date) => string;
//     month: (date: Date) => string;
//     weekday: (date: Date) => string;
//   };
//   formatLong: {
//     month: string;
//   };
// };

// export async function getServerSideProps() {
//   const today = new Date();
//   // Define localize object with individual functions
//   const localize: Localize = {
//     options: {
//       day: 'numeric',
//       month: 'long',
//       weekday: 'long',
//     },
//     localize: {
//       day: (date: Date) => date.toLocaleDateString('fa-IR', { day: 'numeric' }),
//       month: (date: Date) =>
//         date.toLocaleDateString('fa-IR', { month: 'long' }),
//       weekday: (date: Date) =>
//         date.toLocaleDateString('fa-IR', { weekday: 'long' }),
//     },
//     formatLong: {
//       month: 'long',
//     },
//   };
//   const jalaliDate: string = format(today, 'yyyy/MM/dd', {
//     locale: localize as unknown as Locale, // Ignore TypeScript error
//     ...(localize.formatLong as any), // Cast to any to include unknown property
//     long: true as any, // Cast to any to include unknown property
//   });
//   return {
//     props: {
//       jalaliDate,
//     },
//   };
// }

// function Home({ jalaliDate }: { jalaliDate: string }) {
//   const today = new Date();
//   console.log('hellooo');
//   console.log(jalaliDate);
//   const pahlaviYear = today.getFullYear() - 621;
//   const daysSinceNowruz = Math.floor(
//     (today.getTime() - new Date(today.getFullYear(), 2, 20).getTime()) /
//       (1000 * 60 * 60 * 24)
//   );
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3">
//         <div className="text-center">
//           <h2>European</h2>
//           <p>{today.toLocaleDateString('en-GB')}</p>
//         </div>
//         <div className="text-center">
//           <h2>Iranian</h2>
//           <p>{jalaliDate}</p>
//         </div>
//         <div className="text-center">
//           <h2>Pahlavi</h2>
//           <p>
//             {pahlaviYear}/{Math.floor(daysSinceNowruz / 31) + 1}/
//             {(daysSinceNowruz % 31) + 1}
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Home;

// Required imports
import { useEffect, useState } from 'react';
import jalaali from 'jalaali-js';

// Helper function to convert to Jalali
function convertToJalali(date) {
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return `${jy}/${jm < 10 ? '0' + jm : jm}/${jd < 10 ? '0' + jd : jd}`;
}

// Helper function to convert to Pahlavi
function convertToPahlavi(date) {
  const gregorianYear = date.getFullYear();
  let pahlaviYear = gregorianYear - 621;
  const nowruzThisYear = new Date(gregorianYear, 2, 21); // Approximate date for Nowruz
  if (date < nowruzThisYear) {
    pahlaviYear -= 1;
  }
  const startOfYear = new Date(gregorianYear, 2, 21);
  const dayOfYear = Math.ceil((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  return `${pahlaviYear}/${Math.ceil(dayOfYear / 31)}/${dayOfYear % 31 || 31}`;
}

// Home component
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
