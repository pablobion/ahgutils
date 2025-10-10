import React, { useState, useEffect } from 'react';
import './_styles.scss'

import { shiftCalculatorHours} from '../../../utils/hoursCalculator'

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
    const [result, setResult] = useState({ totalHours: 0, periods: [] });
    const [state, setState] = useState(['08:00', '12:00', '13:00', '17:00'])
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
        if (atualInputs.length > 5) return handleShowMessage({ message: 'Não é possivel adicionar mais campos', type: 'error' });
        setState([...atualInputs, '', ''])
    }

    const handleCleanInputs = () => {
        handleShowMessage({ message: 'Todos os campos foram limpos', type: 'success' })
        setState(['08:00', '12:00', '13:00', '17:00'])
        setResult({ hours: '', minutes: '' })
    }

    const handleChangeInput = (value, index) => {
        const atualInputs = state;
        atualInputs[index] = value;
        console.log(atualInputs)
        setState([...atualInputs])
    }

    const doCalc = () => {
        const haha = shiftCalculatorHours(state)
        console.log(haha);
        setResult(haha)
    }

    const clickToCopy = () => {
        handleShowMessage({ message: 'Resultado copiado para area de transferencia!', type: 'success' })
        navigator.clipboard.writeText(`${(`${result.hours}`).padStart(2, '0')}h${(`${result.minutes}`).padStart(2, '0')}`)
    }

    return (
        <div className='container'>
            <div id='modal'>
            <div onClick={() => window.open('https://4generate.pages.dev/pt/ahgutils/shiftCalculator/?ahgutils=true', '_blank')} style={{borderRadius: 10, border: '1px solid lightgray', padding: 10, marginBottom: 20, backgroundColor: '#9D349D', color: 'white', cursor: 'pointer'}}>
                <p>Acessar no 4Generate</p>
            </div>
                <h2 id='title'>Calculadora de jornada (Beta)</h2>
                <div id='painelHoursInputCalculator'>
                    <div className='painelHoursInputCalculatorLeft'>
                        {state.map((elem, index) => {
                            if(index % 2 === 0){
                                return (
                                    <div style={{display: 'flex'}}>
                                        <div className='divInputs'>
                                            <p>Entrada {index / 2 + 1}</p>
                                            <TextField type='time' value={elem} onChange={(e) => handleChangeInput(e.target.value, index)} />
                                        </div>
                                        <div className='divInputs'>
                                            <p>Saida {index / 2 + 1}</p>
                                            <TextField type='time' value={state[index +1]} onChange={(e) => handleChangeInput(e.target.value, index+1)} />
                                        </div>
                                    </div>
                                )
                            }
                        })}
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

                {/* <div style={{display: 'flex', alignItems: 'center'}}>
                    <Checkbox label='jxhjdij' defaultChecked />
                    <p>Ativar calculo noturno</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p>Inicio</p>
                    <TextField style={{marginLeft: 10}} type='time' />
                    <p>Fim</p>
                    <TextField style={{marginLeft: 10}}  type='time' />
                </div>
 */}

                <Button onClick={() => doCalc()} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Calcular</Button>


                <div className='divider' />
                <h2>Resultado</h2>
                <div className='resultDiv'>
                    <p>Total de horas trabalhadas: {result.totalHours}</p>
                    {/* <p>total de horas trabalhadas (com intervalo): {result.totalHours}</p> */}
                    {/* <div id='divCopyResult'>
                        <Tooltip title="Clique para copiar o resultado">
                            <Button onClick={() => clickToCopy()} size='small' variant="text" style={{ fontSize: 24 }}><MdContentCopy /></Button>
                        </Tooltip>
                    </div> */}
                </div>
            </div>

            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
}

export default ShiftCalculator;
