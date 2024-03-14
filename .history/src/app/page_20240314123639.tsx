import Image from 'next/image';
import { format } from 'date-fns';

const jalaliDate = format(today, 'yyyy/MM/dd', { locale: 'fa' }); // Use 'fa' locale for Farsi (Iranian)

// import { formatInLocale } from 'date-fns-jalali'; // Import the correct function

export default function Home() {
  const today = new Date();

  // Get Jalali (Iranian) date using formatInLocale
  const jalaliDate = formatInLocale(today, 'fa', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  // Calculate Pahlavi date (assuming year starts at Nowruz, March 21st)
  const pahlaviYear = today.getFullYear() - 621;
  const daysSinceNowruz = Math.floor(
    (today - new Date(today.getFullYear(), 2, 20)) / (1000 * 60 * 60 * 24)
  ); // Adjusted for accurate calculation

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Rest of your component code remains the same */}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3">
        <div className="text-center">
          <h2>European</h2>
          <p>{today.toLocaleDateString('en-GB')}</p>
        </div>
        <div className="text-center">
          <h2>Iranian</h2>
          <p>{jalaliDate}</p>
        </div>
        <div className="text-center">
          <h2>Pahlavi</h2>
          <p>
            {pahlaviYear}/{Math.floor(daysSinceNowruz / 31) + 1}/
            {(daysSinceNowruz % 31) + 1}
          </p>
        </div>
      </div>
    </main>
  );
}
