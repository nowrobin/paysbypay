// src/types/common.ts

// 모든 API 응답 공통 타입
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 날짜 문자열은 ISO 포맷
export type IsoDateString = string;
