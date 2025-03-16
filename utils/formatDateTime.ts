// 형태 LocalDateTime -> 2월 14일 ⦁ 10:30
export function formatDateTime(datetimeStr: string, locale = 'ko-KR'): string {
  const dateTime = new Date(`${datetimeStr}`);
  const formattedDate = dateTime.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return `${formattedDate} · ${formattedTime}`;
}

// 형태 LocalDateTime -> 2025.02.25
export function formatDate(dateStr: string, locale = 'ko-KR'): string {
  const date = new Date(`${dateStr}`);

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

// 형태 LocalDateTime -> MM.DD
export function formatShortDate(dateStr: string, locale = 'ko-KR'): string {
  const date = new Date(`${dateStr}`);

  return date
    .toLocaleDateString(locale, {
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '')
    .trim();
}
