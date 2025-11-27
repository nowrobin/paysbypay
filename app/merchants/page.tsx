'use client';
import Card from '@/app/merchants/components/card';
import MerchantModal from '@/app/merchants/components/modal';
import MerchantSortDropdown from '@/app/merchants/components/sortDropDown';
import MerchantStats from '@/app/merchants/components/stats';
import { useMerchantDetails } from '@/hooks/merchants/useMerchants';
import { filterMerchantList, MerchantFilterState } from '@/utils/merchants-filter';
import { MerchantSortType, sortMerchants } from '@/utils/merchants-sort';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

function MerchantsPage() {
  const { data: merchants, isLoading } = useMerchantDetails();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMerchant, setSelecetedMerchant] = useState('');
  const [sortType, setSortType] = useState<MerchantSortType>('REGISTERED_NEWEST');
  const [filter, setFilter] = useState<MerchantFilterState>({
    search: '',
    statusFilter: 'ALL',
    bizTypes: [],
  });

  const filteredAndSorted = useMemo(() => {
    if (!merchants) return [];
    const filtered = filterMerchantList(merchants, filter);
    return sortMerchants(filtered, sortType);
  }, [merchants, filter, sortType]);

  if (isLoading || !merchants) return <div>로딩...</div>;
  const activeCount = merchants.filter(m => m.status === 'ACTIVE').length;
  const readyCount = merchants.filter(m => m.status === 'READY').length;
  const inactiveCount = merchants.filter(m => m.status === 'INACTIVE').length;
  const closedCount = merchants.filter(m => m.status === 'CLOSED').length;

  return (
    <div className="flex flex-col w-full max-w-[1920px] bg-blue-100 p-6 h-screen gap-4">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-medium">가맹점 관리</h1>
        <MerchantStats
          allMerchants={activeCount}
          activeCount={readyCount}
          inactiveCount={inactiveCount}
          readyCount={readyCount}
          closedCount={closedCount}
          onSelectStatus={status =>
            setFilter(prev => ({
              ...prev,
              statusFilter: status,
            }))
          }
        />
      </header>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 relative w-3/7 h-10">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 " />
          <input
            type="text"
            placeholder="가맹점명 / 코드 검색"
            value={filter.search ?? ''}
            onChange={e => setFilter(prev => ({ ...prev, search: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm  shadow-sm placeholder:text-slate-400"
          />
        </div>
        <MerchantSortDropdown value={sortType} onChange={setSortType} />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 justify-items-stretch max-h-5/6 overflow-y-scroll scrollbar-hide">
        {filteredAndSorted?.map(merchant => (
          <Card
            key={merchant.mchtCode}
            merchantDetails={merchant}
            setModalOpen={setModalOpen}
            setSelectedMerchant={setSelecetedMerchant}
          />
        ))}
      </section>
      {modalOpen && <MerchantModal mchtCode={selectedMerchant} setModalOpen={setModalOpen} />}
    </div>
  );
}

export default MerchantsPage;
