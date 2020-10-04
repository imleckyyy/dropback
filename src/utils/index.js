export const formatYmd = (date) => date.toISOString().slice(0, 10);

export const formatDmy = (date) => date.toLocaleString().slice(0, 10);

export const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
