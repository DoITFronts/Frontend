import { expect, describe, it } from '@jest/globals';

import { formatDateTime, formatDate } from '@/utils/formatDateTime';

describe('formatDateTime', () => {
  it("YYYY-MM-DDTHH:mm:ss 형식을 '2월 14일 · 10:30' 형태로 변환해야 함", () => {
    const result = formatDateTime('2025-02-14T10:30:00');
    expect(result).toBe('2월 14일 · 10:30');
  });

  it('오전/오후 없는 24시간제를 유지해야 함', () => {
    const result = formatDateTime('2025-02-14T23:45:00');
    expect(result).toBe('2월 14일 · 23:45');
  });

  it('올바른 날짜와 시간을 변환해야 함', () => {
    const result = formatDateTime('2025-12-25T08:15:00');
    expect(result).toBe('12월 25일 · 08:15');
  });

  it("빈 문자열을 입력하면 'Invalid Date' 처리", () => {
    const result = formatDateTime('');
    expect(result).toBe('Invalid Date · Invalid Date');
  });

  it("잘못된 형식의 날짜 입력 시 'Invalid Date' 반환", () => {
    const result = formatDateTime('invalid-date');
    expect(result).toBe('Invalid Date · Invalid Date');
  });
});

describe('formatDate', () => {
  it("YYYY-MM-DD 형식을 'YYYY.MM.DD' 형태로 변환해야 함", () => {
    const result = formatDate('2025-02-25');
    expect(result).toBe('2025.02.25');
  });

  it("YYYY-MM-DDTHH:mm:ss 형식도 'YYYY.MM.DD'로 변환해야 함", () => {
    const result = formatDate('2025-12-31T23:59:59');
    expect(result).toBe('2025.12.31');
  });

  it("빈 문자열을 입력하면 'Invalid Date' 처리", () => {
    const result = formatDate('');
    expect(result).toBe('Invalid Date');
  });

  it("잘못된 날짜 형식 입력 시 'Invalid Date' 반환", () => {
    const result = formatDate('invalid-date');
    expect(result).toBe('Invalid Date');
  });
});
