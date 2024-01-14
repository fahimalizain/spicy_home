import { FC } from 'react';
import { SaudiRiyal } from '../../utils/currnecy';

type ReportFooterProps = {
  from: string;
  to: string;
  numOrders: number;
  periodTotal: number;
  periodRemovedTabletTotal: number;
  periodRemovedSystemTotal: number;
  periodRemovedTotal: number;
  periodKitchenTotal: number;
};

const ReportFooter: FC<ReportFooterProps> = ({
  from,
  to,
  numOrders,
  periodTotal,
  periodRemovedTabletTotal,
  periodRemovedSystemTotal,
  periodRemovedTotal,
  periodKitchenTotal,
}) => (
  <div className="flex flex-col">
    <span className="text-lg font-medium">Summary</span>
    <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-2 p-2">
      <FooterItem label="Total Orders" value={numOrders.toString()} />
      <FooterItem label="From" value={from} />
      <FooterItem label="To" value={to} />

      <FooterItem
        label="Total Removed"
        value={SaudiRiyal(periodRemovedTotal).format()}
      />

      <FooterItem
        label="Total Removed System"
        value={SaudiRiyal(periodRemovedSystemTotal).format()}
      />

      <FooterItem
        label="Total Removed Tablet"
        value={SaudiRiyal(periodRemovedTabletTotal).format()}
      />

      <FooterItem
        label="Total Sales"
        value={SaudiRiyal(periodTotal).format()}
      />

      <FooterItem label="Total Kitchen" value={periodKitchenTotal.toString()} />
    </div>
  </div>
);

export default ReportFooter;

const FooterItem: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-zinc-500">{label}</span>
    <span className="font-medium -mt-1">{value}</span>
  </div>
);
