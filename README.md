# PG Dashboard (Recruit Test)

<img width="1467" height="852" alt="ALLPAYS_DASHBOARD" src="https://github.com/user-attachments/assets/fd1012aa-f240-47b1-ba72-340f7db6fc67" />

> 결제대행사(PG) 도메인 채용 과제를 위해 구현한 **가맹점/결제 내역 관리 대시보드**입니다.  
> Next.js(App Router) + TypeScript + React Query + Axios + Tailwind 기반으로 구성했습니다.

---

## 1. 개요 (Overview)

- 제공된 API(`https://recruit.paysbypays.com/api/v1`)를 사용하여  
  - **가맹점 관리 (Merchants)**
  - **결제 내역 조회 (Payments)**
  를 중심으로 한 관리 대시보드를 구현했습니다.
- 과제에서 요구한:
  - 첫 진입용 **대시보드/요약 영역**
  - **가맹점 목록 / 필터링 / 정렬**
  - **결제 내역 리스트 / 필터링 / 정렬**
  을 모두 포함합니다.
---

## 2. 기술 스택 (Tech Stack)

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query (TanStack Query) + Axios
- **Icons**: lucide-react
---

## 3. API 사용 (API Usage)

> 실제 과제 API URL: `https://recruit.paysbypays.com/api/v1`

### 가맹점 (Merchants)

- `GET /merchants/list`  
  - 가맹점 요약 목록 (`mchtCode`, `mchtName`, `status`, `bizType`)
- `GET /merchants/details`  
  - 가맹점 상세 정보 리스트 (`bizNo`, `address`, `phone`, `email`, `registeredAt`, `updatedAt` 포함)
- `GET /merchants/:mchtCode`  
  - 단일 가맹점 정보

### 결제 (Payments)

- `GET /payments/list`  
  - 전체 결제 내역 목록 (`paymentCode`, `mchtCode`, `amount`, `currency`, `payType`, `status`, `paymentAt`)

### 공통 코드

- 결제수단: `/codes/pay-types`
- 결제상태: `/codes/payment-status`
- 가맹점상태: `/codes/merchant-status`


---

## 4. 폴더 구조 (예시)

```txt
src/
  app/
    layout.tsx
    page.tsx                # 기본 대시보드
    merchants/
      page.tsx              # 가맹점 목록 + 카드 뷰
    payments/
      page.tsx              # 결제 내역 리스트
  components/
    common/
      SortDropdown.tsx      # 공통 드롭다운 컴포넌트
      TextInput.tsx         # 공통 인풋
    merchants/
      MerchantCard.tsx
      MerchantStats.tsx
      MerchantSortDropdown.tsx
    payments/
      PaymentSortDropdown.tsx
      PaymentStatusBadge.tsx
  hooks/
    useMerchants.ts
    useMerchantDetails.ts   # 필요 시
    usePayments.ts
  utils/
    merchants-filter.ts
    merchants-sort.ts
    payments-filter.ts
    payments-sort.ts
    date.ts
  styles/
    globals.css             # scrollbar-hide 등 유틸 클래스
```
-----
## 5. 가맹점 페이지 (Merchants)
![ALLPAY_MerchantPage](https://github.com/user-attachments/assets/1d01386e-6372-413b-a32e-3fc2eaacdc74)

### 5.1 기능

- 전체 가맹점 목록 그리드 (카드 뷰)
- 상단 통계 카드 (MerchantStats) :  전체 / 활성 / 준비중 / 비활성 / 폐기 개수
- 카드 클릭 시 statusFilter 변경

### 필터

- 검색: 가맹점명 / 가맹점코드 부분검색

- 상태 탭: ALL / ACTIVE / INACTIVE / READY / CLOSED

- 업종 필터: CAFE / SHOP / MART / APP / TRAVEL / EDU / TEST (멀티 선택)

### 정렬

- 등록일 최신순 / 등록일 오래된순

- 업데이트 최신순 / 업데이트 오래된순

- 가나다 순 (가맹점명 기준)

### 5.2 주요 유틸
MerchantFilterState & 필터 함수
```javascript
// utils/merchants-filter.ts
export type MerchantStatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE' | 'READY' | 'CLOSED';

export interface MerchantFilterState {
  search: string;
  statusFilter: MerchantStatusFilter;
  bizTypes: string[];
}

export function filterMerchantList(
  merchants: MerchantListItem[],
  filter: MerchantFilterState,
): MerchantListItem[] {
  // statusFilter, bizTypes, search 를 기반으로 필터링
}

```
```javascript
// utils/merchants-sort.ts
export type MerchantSortType =
  | 'REGISTERED_NEWEST'
  | 'REGISTERED_OLDEST'
  | 'UPDATED_NEWEST'
  | 'UPDATED_OLDEST'
  | 'NAME_ASC';

export function sortMerchants<T extends MerchantListItem | MerchantDetail>(
  merchants: T[],
  sortType: MerchantSortType,
): T[] {
  // registeredAt / updatedAt / mchtName 기준 정렬
}

```
----

## 6. 결제 내역 페이지 (Payments)
![ALLPAYS_PAYMENTPAGE-m](https://github.com/user-attachments/assets/d5772399-2bfd-43f8-8355-c0bfc3dcf8cf)

### 6.1 기능
- 전체 결제 내역 테이블 뷰

### 필터
- 상태: 전체 / 성공 / 실패 / 취소 / 대기
- 결제수단: 전체 / ONLINE / DEVICE / MOBILE / VACT / BILLING
- 통화: 전체 / KRW / USD
- 검색: 결제코드 / 가맹점코드
- 날짜 범위: from / to (input[type="date"])

### 정렬
- 결제일 최신순 / 결제일 오래된순
- 금액 높은순 / 금액 낮은순

상태 뱃지 : SUCCESS / FAILED / CANCELLED / PENDING 별 색상 구분

## 6.2 필터 유틸
```javascript
// utils/payments-filter.ts
export type PaymentStatusFilter = 'ALL' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'PENDING';
export type PaymentMethodFilter = 'ALL' | 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING';
export type PaymentCurrencyFilter = 'ALL' | 'KRW' | 'USD';

export interface PaymentFilterState {
  search: string;
  status: PaymentStatusFilter;
  method: PaymentMethodFilter;
  currency: PaymentCurrencyFilter;
  dateFrom?: string;
  dateTo?: string;
}

export function filterPayments(payments: Payment[], filter: PaymentFilterState): Payment[] {
  // 상태, 수단, 통화, 날짜 범위, search 기반 필터링
}
```
----
## 7. 상태/데이터 관리

Axios 인스턴스
- baseURL를 https://recruit.paysbypays.com/api/v1 로 설정
- 공통 응답 타입: { status: number; message: string; data: T }

React Query
- useMerchants, usePayments 등 개별 훅으로 분리
- QueryKey 예: ['merchants'], ['payments']
- 필터/정렬은 클라이언트 사이드에서 수행

----

## 8. 실행 방법 (How to Run)
```javascript
# 1. 의존성 설치
npm install
# 또는
yarn
pnpm install

# 2. 개발 서버 실행
npm run dev
# → http://localhost:3000
```
