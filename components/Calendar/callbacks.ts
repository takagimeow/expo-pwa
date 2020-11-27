// カレンダーのその月の末日よりあとの空白部分が何個あるかを計算する
const remainingDaysForNext = (year: number, month: number): number => {
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
const remainingDaysForPrev = (year: number, month: number): number => {
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
const backFromFirst = (year: number, month: number): number[] => {
  const rd: number = remainingDaysForPrev(year, month);
  let counter = 0;
  const result: number[] = [];
  for (let i = 0; i < rd; i += 1) {
    const d = new Date(year, month - 1, counter);
    result.unshift(d.getDate());
    counter -= 1;
  }

  return result;
};

// 末日より後の空白部分の数に該当する分の日付の配列を作る
// year と month は対象月の値でよい
// 事前に来月を計算して出す必要はない
const forwardFromLast = (year: number, month: number): number[] => {
  const rd = remainingDaysForNext(year, month);
  let counter = 1;
  const result: number[] = [];
  for (let i = 0; i < rd; i += 1) {
    const d = new Date(year, month + 1, counter);
    result.push(d.getDate());
    counter += 1;
  }

  return result;
};

// 5 * 7 の箱をつくる。
export const create35Box = (year: number, month: number): number[][] => {
  const bffList = backFromFirst(year, month);
  const fflList = forwardFromLast(year, month);
  const target: number[] = [];
  const d = new Date(year, month, 0);
  for (let i = 1; i <= d.getDate(); i += 1) {
    target.push(i);
  }
  const beforeBox: number[] = [...bffList, ...target, ...fflList];

  const box: number[][] = [];
  let insideBox: number[] = [];
  for (let i = 0; i < beforeBox.length; i += 1) {
    insideBox.push(beforeBox[i]);
    if ((i + 1) % 7 === 0) {
      box.push(insideBox);
      insideBox = [];
    }
  }

  return box;
};
