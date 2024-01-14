import { Input, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { add } from 'date-fns';
import { useRouter } from 'next/router';

export default function HomePageView() {
  const router = useRouter();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Auto fill the dates within useEffect
  useEffect(() => {
    const today = new Date();
    const from = add(today, { days: -7 });
    setFromDate(from.toISOString().slice(0, 10));
    setToDate(today.toISOString().slice(0, 10));
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full md:w-96 p-5">
      <h1 className="text-lg font-medium">RMS Audit Report</h1>
      <Input
        placeholder="From Date"
        type="date"
        value={fromDate}
        onValueChange={setFromDate}
      />
      <Input
        placeholder="To Date"
        type="date"
        value={toDate}
        onValueChange={setToDate}
      />
      <Button
        variant="shadow"
        onClick={() =>
          router.push({
            pathname: '/report',
            query: {
              from: fromDate,
              to: toDate,
            },
          })
        }
      >
        Open Report
      </Button>
    </div>
  );
}
