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
    ...localize.formatLong, // Include formatLong directly in the options
    long: true,
  });
  return {
    props: {
      jalaliDate,
    },
  };
}

// Rest of the code remains the same
