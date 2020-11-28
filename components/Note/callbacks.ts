import { dayOfTheWeekList } from 'constants/Calendar';

export const getNoteHeaderText = (calendarCellId: string) => {
  const splittedId = calendarCellId.split('_');
  if (splittedId.length !== 3) {
    return {
      date: '',
      dayOfTheWeek: '',
    };
  }

  const year = Number.parseInt(splittedId[0], 10);
  const month = Number.parseInt(splittedId[1], 10);
  const day = Number.parseInt(splittedId[2], 10);

  const date = new Date(year, month - 1, day);

  return {
    date: `${year}年${month}月${day}日`,
    dayOfTheWeek: dayOfTheWeekList[date.getDay()],
  };
};
