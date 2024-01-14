import { useRouter } from 'next/router';
import ReportPageView from '../modules/report/ReportPageView';

const ReportPage = () => {
  const router = useRouter();
  const { from, to } = router.query;
  return <ReportPageView from={from as string} to={to as string} />;
};

export default ReportPage;
