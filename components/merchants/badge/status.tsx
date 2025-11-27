import { MerchantStatusType } from '@/types/merchants';

function MerchantStatusBadge({ status }: { status: MerchantStatusType }) {
  const textMap = {
    ACTIVE: '활성',
    READY: '대기',
    INACTIVE: '중지',
    CLOSED: '폐기',
  } as const;

  const colorMap = {
    ACTIVE: 'bg-emerald-100 text-emerald-700',
    READY: 'bg-slate-100 text-slate-600',
    INACTIVE: 'bg-slate-200 text-slate-500',
    CLOSED: 'bg-red-100 text-red-700',
  } as const;

  return (
    <span className={`w-20 text-center px-2 py-0.5 rounded-xl ${colorMap[status]}`}>
      {textMap[status]}
    </span>
  );
}

export default MerchantStatusBadge;
