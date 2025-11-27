import MerchantStatusBadge from '@/app/merchants/component/badge/stauts';
import { MerchantDetail } from '@/types/merchants';
import { formatDateToYMD } from '@/utils/date';
import { Store } from 'lucide-react';

function MerchantCard(props: MerchantDetail) {
  const {
    mchtCode,
    mchtName,
    status,
    bizType,
    bizNo,
    address,
    phone,
    email,
    registeredAt,
    updatedAt,
  } = props;
  return (
    <article className="bg-white p-5 rounded-lg flex flex-col gap-3 text-sm">
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
          <span className="px-2 text-blue-700 bg-blue-100 rounded-xl">{bizType}</span>
        </div>
      </div>
      {/* <div className="flex justify-between">
        <span className="text-gray-700">업종</span>
        <span>카페</span>
      </div> */}
      {/* <div className="flex justify-between">
        <span className="text-gray-700">사업자번호</span>
        <span>{bizNo}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-700">주소</span>
        <span>{address}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-700">연락처</span>
        <span>{phone}</span>
      </div> */}
      {/* <div className="flex justify-between">
        <span className="text-gray-700">이메일</span>
        <a href={'mailto: nowrobin3@gmail.com'}>{email ?? 'nowrobin3@gmail.com'}</a>
      </div> */}

      <hr className="text-gray-300 my-1" />
      <div className="flex flex-row justify-between">
        <span className="text-sm text-gray-700">등록일: {formatDateToYMD(registeredAt)}</span>
        <span className="text-sm text-gray-700">수정일: {formatDateToYMD(updatedAt)}</span>
      </div>
    </article>
  );
}

export default MerchantCard;
