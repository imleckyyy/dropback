export const formatYmd = (date) => date.toISOString().slice(0, 10);

export const formatDmy = (date) => {
  let localeString = date.toLocaleString().slice(0, 10);

  if (localeString.slice(0, localeString.indexOf('.')).length === 1) {
    localeString = `0${localeString}`;
  }

  return localeString.replace(',', '');
};

export const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
