/**
 * 将 ISO 8601 格式的日期字符串转换为 Date.UTC 格式的日期对象
 * @param isoDateString ISO 8601 格式的日期字符串
 * @returns Date 对象
 */
function convertISOToUTCDate(isoDateString: string): Date {
  const date = new Date(isoDateString);
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  ));
}

function getEpochTime(time: number, beginDate: string) {
  if (time === undefined) {
    time = new Date().getTime();
  }
  const d = beginEpochTime(beginDate);
  const t = d.getTime();
  return Math.floor((time - t) / 1000);
}

function beginEpochTime(beginDate: string) {
  return convertISOToUTCDate(beginDate);
}

const interval = 10,
  delegates = 101;

function getTime(time: number, beginDate: string) {
  return getEpochTime(time, beginDate);
}

function getRealTime(epochTime: number, beginDate: string) {
  if (epochTime === undefined) {
    epochTime = getTime(0, beginDate);
  }
  const d = beginEpochTime(beginDate);
  const t = Math.floor(d.getTime() / 1000) * 1000;
  return t + epochTime * 1000;
}

function getSlotNumber(epochTime: number, beginDate: string) {
  if (epochTime === undefined) {
    epochTime = getTime(0, beginDate);
  }

  return Math.floor(epochTime / interval);
}

function getSlotTime(slot: number) {
  return slot * interval;
}

function getNextSlot(epochTime: number, beginDate: string) {
  const slot = getSlotNumber(epochTime, beginDate);

  return slot + 1;
}

function getLastSlot(nextSlot: number) {
  return nextSlot + delegates;
}

const limitLength = (value: string, len: number) => {
  let valueText = value;
  let length = len || 8;
  if (typeof valueText !== 'string') return '……';
  if (+length !== length) return '……';
  length = length >= 0 ? length : 8;
  if (valueText.length > length) {
    return valueText.substring(0, length) + '……';
  } else {
    return valueText;
  }
};
const formatDuring = (mss: number) => {
  const days = parseInt(mss / (1000 * 60 * 60 * 24));
  const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  const seconds =  parseInt((mss % (1000 * 60)) / 1000);

  let daysStr = days === 0 ? '' : days + ' 天 ';
  let hoursStr = hours === 0 ? '' : hours + ' 小时 ';
  let minutesStr = minutes === 0 ? '' : minutes + ' 分钟 ';
  let secondsStr = seconds === 0 ? '' : seconds + ' 秒 ';
  let result;
  if (daysStr !== '') {
    result = daysStr;
  } else if (hoursStr !== '') {
    result = hoursStr;
  } else if (minutesStr !== '') {
    result = minutesStr;
  } else if (secondsStr !== '') {
    result = secondsStr;
  }
  return result + '前';
};
export default {
  interval: interval,
  delegates: delegates,
  getTime: getTime,
  getRealTime: getRealTime,
  getSlotNumber: getSlotNumber,
  getSlotTime: getSlotTime,
  getNextSlot: getNextSlot,
  getLastSlot: getLastSlot,
  beginEpochTime: beginEpochTime,
  limitLength: limitLength,
  formatDuring: formatDuring,
};
