import MerchantStatusBadge from '@/app/merchants/components/badge/status';
import { MerchantDetail } from '@/types/merchants';
import { formatDateToYMD } from '@/utils/date';
import { Store } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type MerchantCardProps = {
  merchantDetails: MerchantDetail;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedMerchant: Dispatch<SetStateAction<string>>;
};

function MerchantCard({ merchantDetails, setModalOpen, setSelectedMerchant }: MerchantCardProps) {
  const { mchtCode, mchtName, status, bizType, registeredAt, updatedAt } = merchantDetails;

  const handleCardClick = () => {
    setModalOpen(true);
    setSelectedMerchant(mchtCode);
  };

  return (
    <>
      <article
        className="bg-white p-5 rounded-lg flex flex-col gap-3 text-sm"
        onClick={handleCardClick}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-2">
            <Store
              width={40}
              height={40}
              className="p-1 ring-2 ring-blue-300 text-blue-500 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold">{mchtName}</span>
              <span className="text-xs">{mchtCode}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <MerchantStatusBadge status={status} />
            <span className="px-2 text-blue-700 text-center bg-blue-100 rounded-xl">{bizType}</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-sm text-gray-700">등록일: {formatDateToYMD(registeredAt)}</span>
          <span className="text-sm text-gray-700">수정일: {formatDateToYMD(updatedAt)}</span>
        </div>
      </article>
    </>
  );
}

export default MerchantCard;
