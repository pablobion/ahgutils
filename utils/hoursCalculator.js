
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
    time = time.replaceAll("_", '0')
    const [hours, minutes] = time.split(':')
    const calc = (`${hours}.` + `${Math.floor(minutes * 1.67)}`.padStart(2, '0'))

    console.log(calc)
    return {
        to: 'centesimal',
        result: calc
    };
}

export const centesimalToSexagesimal = (time) => {
    time = time.replaceAll("_", '0')
    let [hours, minutes] = time.split(".");
    return {
        to: 'sexagesimal',
        result: `${hours}:${Math.round(minutes / 1.67).toString().padStart(2, '0')}`
    };
}

export const switchSexagesimalCentesimal = (times) => {
    let objReturn = {
        centesimal: '',
        sexagesimal: ''
    }

    console.log(times)

    if (times.sexagesimal) objReturn.centesimal = sexagesimalToCentesimal(times.sexagesimal).result

    if (times.centesimal) objReturn.sexagesimal = centesimalToSexagesimal(times.centesimal).result
    return objReturn
}

export const bankCycleCalc = (data, quantidadeMeses) => {
    const [ano, mes] = data.split('-').map(Number);

    const mesesPorAno = 12;
    const totalMeses = mes - 1 + quantidadeMeses;
  
    const novoAno = ano + Math.floor(totalMeses / mesesPorAno);
    const novoMes = (totalMeses % mesesPorAno) + 1;
  
    return `${novoAno}-${novoMes.toString().padStart(2, '0')}`;
  }
  