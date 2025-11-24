import React, { useState } from 'react'

import { Button, TextField, Tooltip, Snackbar, Alert } from '@mui/material';

import { BiInfoCircle } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'

import './_styles.scss'

import { calcNightlyFactor } from '../../../utils/hoursCalculator'

import AlertDialog from '../../../components/alertDialog/AlertDialog'


const NightCalculator = () => {
    return (
        <div id='container'>
            <NightCalculatorComponent/>
        </div>
    )
}
export const NightCalculatorComponent = () => {

    const [snackbar, setSnackbar] = useState({ message: '', open: false, type: 'success' });
    const [state, setState] = useState({ hours: '', minutes: '' })
    const [result, setResult] = useState({ hours: '', minutes: '' })
    const [explainResult, setExplainResult] = useState([[], ''])

    const handleShowMessage = ({ message, type = 'success' }) => setSnackbar({ message, open: true, type })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ message: '', open: false })
    };

    const handleChangeInput = (value, type) => {
        value = value.replace(/[^0-9.]+/, '');
        if (type === 'minutes' && value > 59) value = 59

        console.log(value, 'dale')
        setState({ ...state, [type]: value })
    }

    const doExplainResult = () => {
        const hoursToMinutes = state.hours * 60;
        const hoursToMinutesMoreMinutes = hoursToMinutes + Number(state.minutes);
        const hoursDivide = (hoursToMinutesMoreMinutes / 52.5).toFixed(2);
        const onlyMinutesCentesimal = Number(hoursDivide.split(".")[1]);
        const onlyHoursCentesimal = hoursDivide.split(".")[0];
        const minutesToSexagesimal = (onlyMinutesCentesimal / 1.67).toFixed(2).split('.');

        const resultText = `
            Primeiro convertemos as horas para minutos: ${state.hours}h * 60 = ${hoursToMinutes}m\n
            Somamos esses minutos com os minutos que ele fez: ${hoursToMinutes}m + ${state.minutes}m = ${hoursToMinutesMoreMinutes}m\n
            Depois dividimos tudo por 52,5: ${hoursToMinutesMoreMinutes}m / 52,5 = ${hoursDivide} (Valor da hora reduzida em centesimal)\n
            Neste caso para transformar em sexagesimal, precisamos fazer o seguinte:\n
            Pegamos apenas os minutos (2 dígitos após a vírgula) do resultado anterior: ${hoursDivide} = ${onlyMinutesCentesimal}\n
            Dividimos os minutos por 1,67 para transformar em formato (sexagesimal)\n
            ${onlyMinutesCentesimal} / 1,67 = ${minutesToSexagesimal.join('.')} (minutos sexagesimal)\n
            Logo temos ${minutesToSexagesimal[1] ? ` ${minutesToSexagesimal[0]} Minutos e ${minutesToSexagesimal[1]} segundos` : `${minutesToSexagesimal[0]} Minutos`}\n
            Agora é só somar os minutos com as horas: ${onlyHoursCentesimal.toString().padStart(2, '0')}h + ${String(minutesToSexagesimal[0]).padStart(2, '0')}m = ${onlyHoursCentesimal.toString().padStart(2, '0')}h${String(minutesToSexagesimal[0]).padStart(2, '0')}m
        `;
        const resultHtml = [
            <p>{`Primeiro convertemos as horas para minutos: ${state.hours}h * 60 = ${hoursToMinutes}m`}</p>,
            <p>{`Somamos esses minutos com os minutos que ele fez: ${hoursToMinutes}m + ${state.minutes}m = ${hoursToMinutesMoreMinutes}m`}</p>,
            <p>{`Depois dividimos tudo por 52,5: ${hoursToMinutesMoreMinutes}m / 52,5 = ${hoursDivide} (Valor da hora reduzida em centesimal)`}</p>,
            <p>{`Neste caso para transformar em sexagesimal, precisamos fazer o seguinte:`}</p>,
            <p>{`Pegamos apenas os minutos (2 dígitos após a vírgula) do resultado anterior: ${hoursDivide} = ${onlyMinutesCentesimal}`}</p>,
            <p>{`Dividimos os minutos por 1,67 para transformar em formato (sexagesimal)`}</p>,
            <p>{`${onlyMinutesCentesimal} / 1,67 = ${minutesToSexagesimal.join('.')} (minutos sexagesimal)`}</p>,
            <p>{`Logo temos ${minutesToSexagesimal[1] ? ` ${minutesToSexagesimal[0]} Minutos e ${minutesToSexagesimal[1]} segundos` : `${minutesToSexagesimal[0]} Minutos`}`}</p>,
            <p>{`Agora é só somar os minutos com as horas: ${onlyHoursCentesimal.toString().padStart(2, '0')}h + ${String(minutesToSexagesimal[0]).padStart(2, '0')}m = ${onlyHoursCentesimal.toString().padStart(2, '0')}h${String(minutesToSexagesimal[0]).padStart(2, '0')}m`}</p>
        ];

        return [resultHtml, resultText]
    }

    const doCalc = () => {
        console.log(state.hours)
        if((state.hours === '' || Number(state.hours) === 0) && ((state.minutes === '' || Number(state.minutes) === 0)) ) return handleShowMessage({ message: 'Preencha os campos de horas e minutos', type: 'error' })
        const result = calcNightlyFactor(state.hours, state.minutes)
        result.hours = `${result.hours}`.padStart(2, '0')
        result.minutes = `${result.minutes}`.padStart(2, '0')
        setExplainResult(doExplainResult())
        setResult(result)
    }

    const handleCopy = (data) => {
        let text = '';
        if (data === 'resultWithFactor') text = `${result.hours}h${result.minutes}m`
        if(data === 'resultExplain') text = explainResult[1]

        navigator.clipboard.writeText(text)

        handleShowMessage({ message: 'Copiado para a área de transferência', type: 'success' })
    }

    return (
        <>
            <div id='modal'>
            <div onClick={() => window.open('https://4generate.com/pt/ahgutils/nightCalculator/?ahgutils=true', '_blank')} style={{borderRadius: 10, border: '1px solid lightgray', padding: 10, marginBottom: 20, backgroundColor: '#9D349D', color: 'white', cursor: 'pointer'}}>
                <p>Acessar no 4Generate</p>
            </div>
                <div id='header'>
                    <h2>Calculadora de horas noturnas</h2>


                    <AlertDialog
                        button={(
                            <Tooltip title="Informação sobre horas noturnas">
                                <Button variant="text"><p style={{ cursor: 'pointer' }} size='small'><BiInfoCircle /></p></Button>
                            </Tooltip>
                        )}
                        body={(
                            <>
                                <h3>Como é o calculo da hora noturna?</h3>
                                <p>Vamos simplificar com um exemplo.</p>
                                <p>Imagine que alguém trabalhou 7 horas durante a noite, o que seriam 420 minutos (7 horas x 60 minutos).</p>
                                <p>Mas, para calcular o pagamento noturno, cada hora é considerada como 52 minutos e meio. </p>
                                <p>Dividindo esses 420 minutos por 52,5, obtemos 8 horas.</p>
                                <p>Assim, mesmo trabalhando 7 horas reais, a pessoa é remunerada como se tivesse trabalhado 8 horas devido à conversão específica.</p>
                            </>
                            )}>
                    </AlertDialog>
                </div>


                <div id='inputs'>
                    <TextField onChange={(e) => handleChangeInput(e.target.value, 'hours')} value={state.hours} id="outlined-basic" label="Horas" />
                    <TextField onChange={(e) => handleChangeInput(e.target.value, 'minutes')} value={state.minutes} id="outlined-basic" label="Minutos" />
                </div>
                <Button onClick={() => doCalc()} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Calcular</Button>

                <div id='resultDiv'>
                    {
                        result.hours && result.minutes && (
                            <>
                                <div id='resultHour' onClick={() => handleCopy('resultWithFactor')}>
                                    <p >Resultado com fator noturno:</p>
                                    <Tooltip className='clickToCopy' title='Clique para copiar'><strong>{result.hours}h{result.minutes}m</strong></Tooltip>
                                </div>

                                <div id='explainDiv'>
                                    <h3>Explicação (Beta):</h3>
                                    {explainResult[0].map(elem => (<p style={{fontSize: 15, marginTop: 10}}>{elem}</p>))}
                                </div>
                                <Tooltip style={{marginRight: 20}} className='clickToCopy' title='Clique para copiar a explicação acima' onClick={() => handleCopy('resultExplain')}><MdContentCopy/><p>Copiar texto</p></Tooltip></>
                        )
                    }
                </div>
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </>

    )

}

export default NightCalculator