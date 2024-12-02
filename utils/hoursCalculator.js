
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
    const totalMeses = (ano * mesesPorAno) + mes - 1 + (quantidadeMeses-1);

    const novoAno = Math.floor(totalMeses / mesesPorAno);
    const novoMes = (totalMeses % mesesPorAno) + 1;

    return `${novoAno}-${novoMes.toString().padStart(2, '0')}`;
}

export const hoursWithFactor = (time, factor) => {
    factor = factor.replaceAll('_', '0')
    time = time.replaceAll("_", '0')

    //pega as horas e minutos e multiplica pelo fator
    let [hours, minutes] = time.split(':')
    let hoursWithFactor = (hours * factor) + (minutes * factor / 60)

    const hoursWithFactorSexagesimal = objHoursSexagesimal(hoursWithFactor * 3600)
    const hoursWithFactorSexagesimalString = `${hoursWithFactorSexagesimal.hours.toString().padStart(2, '0')}:${hoursWithFactorSexagesimal.minutes.toString().padStart(2, '0')}`

    return hoursWithFactorSexagesimalString
}

export const shiftCalculatorHours = (arrayHours) => {
    let totalHoras = 0;

    const periods = [

    ]

    for (let i = 0; i < arrayHours.length; i += 2) {
        const entrada = new Date(`2000-01-01T${arrayHours[i]}`);
        const saida = new Date(`2000-01-01T${arrayHours[i + 1]}`);

        if (saida < entrada) {
        // Se a saída for antes da entrada, adicione um dia à saída
        saida.setDate(saida.getDate() + 1);
        }

        const diferencaEmMilissegundos = saida - entrada;
        const horasTrabalhadas = diferencaEmMilissegundos / (1000); // Converter para horas
        periods.push({
            totalWorkHours: horasTrabalhadas,
            period: {
                start: `${entrada.getHours()}`.padStart(2, '0') + ':' + `${entrada.getMinutes()}`.padStart(2, '0'),
                end: `${saida.getHours()}`.padStart(2, '0') + ':' + `${saida.getMinutes()}`.padStart(2, '0'),
            }
        })
        totalHoras += horasTrabalhadas;
    }

    const hours = `${extractHoursFromSeconds(totalHoras)}`.padStart(2, '0');
    const minutes = `${extractMinutesFromSeconds(totalHoras)}`.padStart(2, '0');

    return {totalHours: `${hours}:${minutes}`, periods};
}