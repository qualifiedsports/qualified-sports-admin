import moment from "moment";

export const FORMAT_DATE = "YYYY-MM-DD";
export const FORMAT_DATE_TIME = "YYYY-MM-DDTHH:MM";
export const INPUT_FORMAT_DATE = "DD/MM/YYYY";
export const INPUT_FORMAT_DATE_TIME = "DD/MM/YYYY, HH:MM";

export const formatAsDate = (stringDate) => dateAsMoment(stringDate).format(FORMAT_DATE);
export const momentAsDate = (momentDate) => momentDate.format(FORMAT_DATE);
export const dateAsMoment = (stringDate) => moment(stringDate);
export const isBetween = (from, to, actualDate) => {
  const parsedFrom = dateAsMoment(from).startOf('day');
  const parsedTo = dateAsMoment(to).startOf('day');
  const parsedActualDate = dateAsMoment(actualDate).startOf('day');

  if (parsedActualDate.isBetween(parsedFrom, parsedTo)) {
    return true;
  }

  if (parsedFrom.isSame(parsedTo)) {
    return parsedFrom.isSame(parsedActualDate);
  }

  return false;
};

export const getListOfDaysBetweeen = (from, to) => {
  let dates = [];
  const fromClone = dateAsMoment(from);
  const toClone = dateAsMoment(to);

  while (!fromClone.isSame(toClone)) {
    dates.push(momentAsDate(fromClone));

    fromClone.add(1, 'd');
  }

  return dates;
};

export const parseDate = (stringDate) => moment(stringDate, INPUT_FORMAT_DATE).toISOString();
export const formatDate = (momentDate) => momentDate.format(INPUT_FORMAT_DATE);

export const parseDateTime = (stringDateTime) => moment(stringDateTime, INPUT_FORMAT_DATE_TIME).toISOString();
export const formatDateTime = (momentDateTime) => momentDateTime.format(INPUT_FORMAT_DATE_TIME);