import { format } from 'date-fns'; // Import here

export async function getServerSideProps() {
  const today = new Date();
  const jalaliDate: string = format(today, 'yyyy/MM/dd', { locale: 'fa' });

  return {
    props: {
      jalaliDate,
    },
  };
}

function Home({ jalaliDate }) {
  // Calculate Pahlavi date (assuming year starts at Nowruz, March 21st)
  const today = new Date(); // You can remove this line if not needed elsewhere
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

export default Home;
