import { useRouter } from 'next/router';
import OrderDetailsView from '../../modules/order-details/OrderDetailsView';

const OrderDetailedReportPage = () => {
  const router = useRouter();

  const { orderNo } = router.query;

  return <OrderDetailsView orderNo={orderNo as string} />;
};

export default OrderDetailedReportPage;
