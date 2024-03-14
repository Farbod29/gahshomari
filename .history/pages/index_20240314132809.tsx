import { format, Locale } from 'date-fns'; // Import here

type Localize = {
  options: {
    day: string;
    month: string;
    weekday: string;
  };
  localize: {
    day: (date: Date) => string;
    month: (date: Date) => string;
    weekday: (date: Date) => string;
  };
  formatLong: {
    month: string;
  };
};

export async function getServerSideProps() {
  const today = new Date();
  // Define localize object with individual functions
  const localize: Localize = {
    options: {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
    },
    localize: {
      day: (date: Date) => date.toLocaleDateString('fa-IR', { day: 'numeric' }),
      month: (date: Date) =>
        date.toLocaleDateString('fa-IR', { month: 'long' }),
      weekday: (date: Date) =>
        date.toLocaleDateString('fa-IR', { weekday: 'long' }),
    },
    formatLong: {
      month: 'long',
    },
  };
  const jalaliDate: string = format(today, 'yyyy/MM/dd', {
    locale: localize as unknown as Locale, // Ignore TypeScript error
    ...(localize.formatLong as any), // Cast to any to include unknown property
    long: true as any, // Cast to any to include unknown property
  });
  return {
    props: {
      jalaliDate,
    },
  };
}

function convertToPahlavi(date) {
  const gregorianYear = date.getFullYear();
  let pahlaviYear = gregorianYear - 621;
  const nowruzThisYear = new Date(gregorianYear, 2, 21); // Approximate date for Nowruz
  if (date < nowruzThisYear) {
    // Before Nowruz, it's still the previous year in Iranian calendars
    pahlaviYear -= 1;
  }
  const startOfYear = new Date(gregorianYear, 2, 21);
  const dayOfYear = Math.ceil((date - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  return {
    year: pahlaviYear,
    month: Math.ceil(dayOfYear / 31),
    day: dayOfYear % 31 || 31, // Fix for the last day of months
  };
}

export async function getServerSideProps() {
  const today = new Date();

  // Convert to Jalali
  const jalaliDate = convertToJalali(today);

  // Convert to Pahlavi
  const { year, month, day } = convertToPahlavi(today);
  const pahlaviDate = `${year}/${month}/${day}`;

  return {
    props: {
      jalaliDate,
      pahlaviDate,
    },
  };
}

function Home({ jalaliDate }: { jalaliDate: string }) {
  const today = new Date();
  const pahlaviYear = today.getFullYear() - 621;
  const daysSinceNowruz = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 2, 20).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3">
        <div className="text-center">
          <h2>Pahlavi</h2>
          <p>{pahlaviDate}</p>

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

export default Home;
