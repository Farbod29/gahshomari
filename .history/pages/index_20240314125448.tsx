import { format } from 'date-fns'; // Import here

type Localize = {
  day: (date: Date) => string;
  month: (date: Date) => string;
  weekday: (date: Date) => string;
};

export async function getServerSideProps() {
  const today = new Date();
  // Define localize object with individual functions
  const localize: Localize = {
    day: (date: Date) => date.toLocaleDateString('fa-IR', { day: 'numeric' }),
    month: (date: Date) => date.toLocaleDateString('fa-IR', { month: 'long' }),
    weekday: (date: Date) =>
      date.toLocaleDateString('fa-IR', { weekday: 'long' }),
  };
  const jalaliDate: string = format(today, 'yyyy/MM/dd', {
    locale: localize, // Use the defined localize object
    formatLong: { month: 'long' }, // Optional for long month format
    long: true,
  });
  return {
    props: {
      jalaliDate,
    },
  };
}

function Home({ jalaliDate }) {
  const today = new Date();
  const pahlaviYear = today.getFullYear() - 621;
  const daysSinceNowruz = Math.floor(
    (today - new Date(today.getFullYear(), 2, 20)) / (1000 * 60 * 60 * 24)
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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

export default Home;
