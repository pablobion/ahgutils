
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

const objHoursSexagesimal = seconds => ({hours: extractHoursFromSeconds(seconds), minutes: extractMinutesFromSeconds(seconds)});

export const subtract = (arrayHours) =>  objHoursSexagesimal(arrayHours.map((hour, index) =>  hour.hours * 3600 + hour.minutes * 60).reduce((acc, curr) => acc - curr));

export const calcNightlyFactor = (hours, minutes ) => {
    const minutesInSeconds = minutes ? (minutes * 60) : 0;
    const totalSeconds = hours ? (hours * 3600) + minutesInSeconds : minutesInSeconds;

    return !minutesInSeconds && !totalSeconds ? {} : objHoursSexagesimal(totalSeconds * 8 / 7);
};

export const sexagesimalToCentesimal = (time) => {
    const hours = Number(time.slice(0, 2))
    const minutes = Number(time.slice(2))
    const calc = (`${hours}.` + `${Math.floor(minutes * 1.67)}`.padStart(2, '0')).padStart(5, '⠀⠀')
    return {
        to: 'centesimal',
        result: calc
    };
}

export const centesimalToSexagesimal = (time) => {
    let [hours, minutes] = time.split(".");
    return {
        to: 'sexagesimal',
        result: `${hours}:${Math.round(minutes / 1.67).toString().padStart(2, '0')}`
    };
}