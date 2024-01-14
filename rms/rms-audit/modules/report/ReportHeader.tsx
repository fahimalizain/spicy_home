import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ReportHeader = () => {
  const router = useRouter();

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    setFromDate(router.query.from as string);
    setToDate(router.query.to as string);
  }, [router.query.from, router.query.to]);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
      <h1 className="text-lg font-medium">RMS Audit Report</h1>
      <h2 className="text-lg">
        {fromDate} / {toDate}
      </h2>
    </div>
  );
};

export default ReportHeader;
