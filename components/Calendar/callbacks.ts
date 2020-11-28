import { CalendarCellData } from './redux';

const generateLastMonth = (month: number) => {
  if (month === 1) {
    return 12;
  }
  return month - 1;
};

// カレンダーのその月の末日よりあとの空白部分が何個あるかを計算する
const countRemainingDaysFromLastDay = (year: number, month: number): number => {
  const d = new Date(year, month - 1, 1);
  // const d = new Date(year, month+1, 1)
  // その月の末日
  const d2 = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  // その月の末日の曜日
  const ld = d2.getDay();
  // 7(一週間の数)から末日の曜日の番号を引いて、さらにマイナス1をする
  // カレンダーの空白部分の数
  const remainingDays = 7 - ld - 1;

  return remainingDays;
};

// カレンダーのその月の1日より前の空白部分が何個あるかを計算する
const countRemainingDaysBeforeFirstDay = (year: number, month: number): number => {
  const d = new Date(year, month - 1, 1);
  // 7(一週間の数)から最初の日の曜日の番号を引いたものを使って、もう一度7から引く
  // カレンダーの空白部分の数
  const fd = d.getDay();
  const remainingDays = 7 - (7 - fd);

  return remainingDays;
};

// 1日より前の空白部分の数に該当する分の日付の配列を作る
// year と month は対象月の値でよい
// 事前に前月を計算して出す必要はない
const createCellsBeforeFirstMonth = (year: number, month: number) => {
  const rd: number = countRemainingDaysBeforeFirstDay(year, month);
  let counter = 0;
  const result: CalendarCellData[] = [];
  for (let i = 0; i < rd; i += 1) {
    const d = new Date(year, month - 1, counter);
    result.unshift({
      month: generateLastMonth(d.getMonth()),
      day: d.getDate(),
    });
    counter -= 1;
  }

  return result;
};

// 末日より後の空白部分の数に該当する分の日付の配列を作る
// year と month は対象月の値でよい
// 事前に来月を計算して出す必要はない
const forwardFromLast = (year: number, month: number) => {
  const rd = countRemainingDaysFromLastDay(year, month);
  let counter = 1;
  const result: CalendarCellData[] = [];
  for (let i = 0; i < rd; i += 1) {
    const d = new Date(year, month + 1, counter);
    result.push({
      month: d.getMonth(),
      day: d.getDate(),
    });
    counter += 1;
  }

  return result;
};

// 5 * 7 の箱をつくる。
export const create5x7Cells = (year: number, month: number): CalendarCellData[][] => {
  const bffList = createCellsBeforeFirstMonth(year, month);
  const fflList = forwardFromLast(year, month);
  const target: CalendarCellData[] = [];
  const d = new Date(year, month, 0);
  for (let i = 1; i <= d.getDate(); i += 1) {
    target.push({
      month,
      day: i,
    });
  }
  const beforeBox: CalendarCellData[] = [...bffList, ...target, ...fflList];

  const box: CalendarCellData[][] = [];
  let insideBox: CalendarCellData[] = [];
  for (let i = 0; i < beforeBox.length; i += 1) {
    insideBox.push(beforeBox[i]);
    if ((i + 1) % 7 === 0) {
      box.push(insideBox);
      insideBox = [];
    }
  }

  return box;
};
