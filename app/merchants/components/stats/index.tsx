import { MerchantStatusFilter } from '@/utils/merchants-filter';
import { Store, CheckCircle2, Clock, XCircle, Trash2 } from 'lucide-react';

type StatProps = {
  allMerchants: number;
  activeCount: number;
  inactiveCount: number;
  readyCount: number;
  closedCount: number;
  onSelectStatus: (status: MerchantStatusFilter) => void;
};

function MerchantStats({
  allMerchants,
  activeCount,
  inactiveCount,
  closedCount,
  readyCount,
  onSelectStatus,
}: StatProps) {
  const stats = [
    {
      label: '전체 가맹점',
      value: allMerchants,
      icon: Store,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      statusKey: 'ALL' as MerchantStatusFilter,
    },
    {
      label: '활성화',
      value: activeCount,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      statusKey: 'ACTIVE' as MerchantStatusFilter,
    },
    {
      label: '준비중',
      value: readyCount,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      statusKey: 'READY' as MerchantStatusFilter,
    },
    {
      label: '비활성화',
      value: inactiveCount,
      icon: XCircle,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      statusKey: 'INACTIVE' as MerchantStatusFilter,
    },
    {
      label: '폐기됨',
      value: closedCount,
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      statusKey: 'CLOSED' as MerchantStatusFilter,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map(stat => {
        const Icon = stat.icon;
        return (
          <button
            key={stat.label}
            type="button"
            onClick={() => onSelectStatus(stat.statusKey)}
            className="overflow-hidden text-left cursor-pointer transition hover:scale-[1.02]"
          >
            <div className="p-6 bg-white rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default MerchantStats;
