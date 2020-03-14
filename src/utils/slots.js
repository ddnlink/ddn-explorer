import config from "../config"

function getEpochTime(time) {
	if (time === undefined) {
		time = (new Date()).getTime();
	}
	var d = beginEpochTime();
	var t = d.getTime();
	return Math.floor((time - t) / 1000);
}

function beginEpochTime() {
	// var d = new Date(Date.UTC(2017, 11, 20, 4, 0, 0, 0))
	// var d = new Date(Date.UTC(2017, 10, 20, 12, 20, 20, 20));
	
	return config.beginEpochTime;
}

var interval = 10,
    delegates = 101;

function getTime(time) {
	return getEpochTime(time);
}

function getRealTime(epochTime) {
	if (epochTime === undefined) {
		epochTime = getTime()
	}
	var d = beginEpochTime();
	var t = Math.floor(d.getTime() / 1000) * 1000;
	return t + epochTime * 1000;
}

function getSlotNumber(epochTime) {
	if (epochTime === undefined) {
		epochTime = getTime()
	}

	return Math.floor(epochTime / interval);
}

function getSlotTime(slot) {
	return slot * interval;
}

function getNextSlot() {
	var slot = getSlotNumber();

	return slot + 1;
}

function getLastSlot(nextSlot) {
	return nextSlot + delegates;
}

const limitLength = (value,len) => {
    let valueText = value;
    let length = len || 8;
    if (typeof valueText !== 'string') return '……';
    if (+length !== length) return '……';
    length = length >= 0 ? length : 8;
    if(valueText.length > length) {
        return valueText.substring(0, length) + '……';
    } else {
        return valueText;
    }
}

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
	limitLength: limitLength
}
