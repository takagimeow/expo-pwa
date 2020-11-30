// const dayOfTheWeekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const dayOfTheWeekList = ['日', '月', '火', '水', '木', '金', '土'];

interface Time {
  hours: number;
  minutes: number;
}

export interface Label {
  id: string;
  title: string;
  color: string;
  start: Time;
  end: Time;
  breakTime: Time;
  isHoliday: boolean;
}

export const labels: Label[] = [
  {
    id: 'label_yasumi',
    title: '休み',
    color: '#ff3b39',
    start: {
      hours: 0,
      minutes: 0,
    },
    end: {
      hours: 0,
      minutes: 0,
    },
    breakTime: {
      hours: 1,
      minutes: 0,
    },
    isHoliday: true,
  },
  {
    id: 'label_nikkin',
    title: '日勤',
    color: '#ff9500',
    start: {
      hours: 8,
      minutes: 0,
    },
    end: {
      hours: 17,
      minutes: 0,
    },
    breakTime: {
      hours: 1,
      minutes: 0,
    },
    isHoliday: false,
  },
  {
    id: 'label_hayaban',
    title: '早番',
    color: '#ffcc00',
    start: {
      hours: 6,
      minutes: 0,
    },
    end: {
      hours: 15,
      minutes: 0,
    },
    breakTime: {
      hours: 1,
      minutes: 0,
    },
    isHoliday: false,
  },
  {
    id: 'label_osoban',
    title: '遅番',
    color: '#4cd964',
    start: {
      hours: 13,
      minutes: 0,
    },
    end: {
      hours: 22,
      minutes: 0,
    },
    breakTime: {
      hours: 1,
      minutes: 0,
    },
    isHoliday: false,
  },
  {
    id: 'label_yakin',
    title: '夜勤',
    color: '#5ac8fa',
    start: {
      hours: 18,
      minutes: 0,
    },
    end: {
      hours: 0,
      minutes: 0,
    },
    breakTime: {
      hours: 1,
      minutes: 0,
    },
    isHoliday: false,
  },
  {
    id: 'label_ake',
    title: '明け',
    color: '#007aff',
    start: {
      hours: 0,
      minutes: 0,
    },
    end: {
      hours: 18,
      minutes: 0,
    },
    breakTime: {
      hours: 1,
      minutes: 0,
    },
    isHoliday: false,
  },
  {
    id: 'label_shift',
    title: 'シフト',
    color: '#ff3b99',
    start: {
      hours: 10,
      minutes: 0,
    },
    end: {
      hours: 18,
      minutes: 0,
    },
    breakTime: {
      hours: 1,
      minutes: 0,
    },
    isHoliday: false,
  },
];

/**
 * 休み: 0:00 - 0:00
 * 日勤 8:00 - 17:00
 * 早番 6:00 - 15:00
 * 遅番 13:00 - 22:00
 * 夜勤 18:00 - 0:00
 * 明け 0:00 - 10:00
 * シフト 10:00 - 18:00
 * @param param0 
 */
