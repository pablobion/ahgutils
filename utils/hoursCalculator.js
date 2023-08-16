
export const HoursToMinutes = () => {}

const extractHoursFromSeconds = seconds => seconds > 0 ? Math.floor(seconds / 3600) : Math.floor(Math.abs(seconds) / 3600) * -1; 

const extractMinutesFromSeconds = seconds => seconds > 0 ?  Math.floor((seconds % 3600) / 60) :  Math.floor((Math.abs(seconds) % 3600) / 60) * -1;

export const MinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const minutesRest = minutes % 60;

    return {hours, minutes: minutesRest}
}

export const accToMinutes = (hours, minutes) =>  parseInt((hours * 60) + Number(minutes));

export const sum = (arrayHours) =>  MinutesToHours(arrayHours.reduce((acc, hour) => acc + accToMinutes(hour.hours, hour.minutes), 0))

const mountResult = seconds => ({hours: extractHoursFromSeconds(seconds), minutes: extractMinutesFromSeconds(seconds)});

export const subtract = (arrayHours) =>  mountResult(arrayHours.map((hour, index) =>  hour.hours * 3600 + hour.minutes * 60).reduce((acc, curr) => acc - curr));

export const calcNightlyFactor = (hours, minutes ) => {
    const minutesInSeconds = minutes ? (minutes * 60) : 0;
    const totalSeconds = hours ? (hours * 3600) + minutesInSeconds : minutesInSeconds;

    return !minutesInSeconds && !totalSeconds ? {} : mountResult(totalSeconds * 8 / 7);
};