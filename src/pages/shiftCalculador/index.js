import React, { useState, useEffect } from 'react';
import './_styles.scss'

import { sum, subtract } from '../../../utils/hoursCalculator'

import { Button, TextField, Tooltip, Snackbar, Alert, Checkbox } from '@mui/material';
import Fab from '@mui/material/Fab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { MdContentCopy, MdPlusOne, MdOutlineAutoDelete, MdAutoFixHigh } from 'react-icons/md';
import { AiOutlineClear } from 'react-icons/ai'

import { TiMinus, TiPlus } from 'react-icons/ti'
import { BsClockHistory } from 'react-icons/bs'
import { PiClockCounterClockwiseBold } from 'react-icons/pi'

function ShiftCalculator() {
    const [snackbar, setSnackbar] = useState({ message: '', open: false, type: 'success' });
    const [result, setResult] = useState({ hours: '', minutes: '' });
    const [state, setState] = useState([{ hours: '', minutes: '' }, { hours: '', minutes: '' }])
    const [history, setHistory] = useState([])

    const [isDivMoved, setIsDivMoved] = useState(false);

    useEffect(() => {
        const historyStorage = localStorage.getItem("historyCalculator");
        if (historyStorage) setHistory(JSON.parse(historyStorage))
    }, []);

    const handleShowMessage = ({ message, type = 'success' }) => setSnackbar({ message, open: true, type })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ message: '', open: false })
    };

    const handleAddNewInputs = () => {
        const atualInputs = state;
        if (atualInputs.length === 3) return handleShowMessage({ message: 'Não é possivel adicionar mais campos', type: 'error' });
        setState([...atualInputs, { hours: '', minutes: '' }])
    }

    const handleCleanInputs = () => {
        handleShowMessage({ message: 'Todos os campos foram limpos', type: 'success' })
        setState([{ hours: '', minutes: '' }, { hours: '', minutes: '' }])
        setResult({ hours: '', minutes: '' })
    }

    const handleChangeInput = ({ value, index, inputType }) => {
        const atualInputs = state;
        value = value.replace(/[^0-9.]+/, '');
        if (inputType === 'minutes' && value > 59) value = 59
        atualInputs[index][inputType] = value;

        setState([...atualInputs])
    }

    const createHistory = ({ resultHours, type }) => {
        const dataAtual = new Date();
        const dataFormatada = `${dataAtual.getDate().toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear()} | ${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}`;
        const historyArray = [{ resultHours, inputs: JSON.parse(JSON.stringify(state)), dti: dataFormatada, type }, ...history].slice(0, 7);
        localStorage.setItem("historyCalculator", JSON.stringify(historyArray));
        setHistory(historyArray)
    }

    const doCalc = ({ type, addHistory }) => {
        const resultHours = type === 'sum' ? sum(state) : subtract(state);
        console.log(resultHours)
        setResult({ hours: '', minutes: '' })
        setTimeout(() => setResult(resultHours), 150);

        if (addHistory) createHistory({ resultHours, type})
    }

    const clickToCopy = () => {
        handleShowMessage({ message: 'Resultado copiado para area de transferencia!', type: 'success' })
        navigator.clipboard.writeText(`${(`${result.hours}`).padStart(2, '0')}h${(`${result.minutes}`).padStart(2, '0')}`)
    }

    return (
        <div className='container'>
            <div id='modal'>
                <h2 id='title'>Calculadora de jornada (Beta)</h2>
                <div id='painelHoursInputCalculator'>
                    <div className='painelHoursInputCalculatorLeft'>
                        {state.map((elem, index) => (
                            <div style={{display: 'flex'}}>
                                <div className='divInputs'>
                                    <p>Entrada {index+1}</p>
                                    <TextField type='time' />    
                                </div>
                                <div className='divInputs'>
                                    <p>Saida {index+1}</p>
                                    <TextField type='time' />    
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='painelHoursInputCalculatorRight'>
                        <div>
                            <Tooltip title="Adicionar campo">
                                <Button variant="text" onClick={() => handleAddNewInputs()}><p style={{ cursor: 'pointer' }} size='small'><MdPlusOne /></p></Button>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Limpar campo">
                                <Button variant="text" onClick={() => handleCleanInputs()}><p style={{ cursor: 'pointer' }} size='small'><AiOutlineClear /></p></Button>
                            </Tooltip>
                        </div>

                    </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Checkbox label='jxhjdij' defaultChecked />
                    <p>Ativar calculo noturno</p> 
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p>Inicio</p>
                    <TextField style={{marginLeft: 10}} type='time' />    
                    <p>Fim</p>
                    <TextField style={{marginLeft: 10}}  type='time' />    
                </div>


                <Button onClick={() => doCalc()} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Calcular</Button>
         

                <div className='divider' />
                <h2>Resultado</h2>
                <div className='resultDiv'>
                    <p>sisduidsuhdsuhd</p>
                    <div id='divCopyResult'>
                        <Tooltip title="Clique para copiar o resultado">
                            <Button onClick={() => clickToCopy()} size='small' variant="text" style={{ fontSize: 24 }}><MdContentCopy /></Button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
}

export default ShiftCalculator;
