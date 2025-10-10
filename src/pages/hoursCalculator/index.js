import React, { useState, useEffect } from 'react';
import './_styles.scss'

import { sum, subtract } from '../../../utils/hoursCalculator'

import { Button, TextField, Tooltip, Snackbar, Alert } from '@mui/material';
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

function About() {
    const [snackbar, setSnackbar] = useState({ message: '', open: false, type: 'success' });
    const [result, setResult] = useState({ hours: '', minutes: '' });
    const [state, setState] = useState([{ hours: '', minutes: '' }, { hours: '', minutes: '' }])
    const [history, setHistory] = useState([])

    const [isDivMoved, setIsDivMoved] = useState(false);

    const handleButtonClick = () => {
        setIsDivMoved(!isDivMoved);
    };

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
        if (atualInputs.length === 9) return handleShowMessage({ message: 'Não é possivel adicionar mais campos', type: 'error' });
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

    const rollbackHours = (index) => {
        const historyAtual = history;
        const resultHours = historyAtual[index].resultHours;
        const inputs = historyAtual[index].inputs;
        const type = historyAtual[index].type;
        setResult(resultHours)
        setState(inputs)
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem("historyCalculator");
    }

    const clickToCopy = () => {
        handleShowMessage({ message: 'Resultado copiado para area de transferencia!', type: 'success' })
        navigator.clipboard.writeText(`${(`${result.hours}`).padStart(2, '0')}h${(`${result.minutes}`).padStart(2, '0')}`)
    }

    return (
        <div className='container'>
            <div id='modal'>
                <h2 id='title'>Calculadora de horas</h2>
                <div onClick={() => window.open('https://4generate.pages.dev/pt/ahgutils/hoursCalculator/?ahgutils=true', '_blank')} style={{borderRadius: 10, border: '1px solid lightgray', padding: 10, marginBottom: 20, backgroundColor: '#9D349D', color: 'white', cursor: 'pointer'}}>
                <p>Acessar no 4Generate</p>
            </div>
                <div id='painelHoursInputCalculator'>
                    <div className='painelHoursInputCalculatorLeft'>
                        {state.map((elem, index) => (
                            <div className='divInputs'>
                                <TextField value={state[index].hours} id="outlined-basic" label="Horas" variant="outlined" onChange={(e) => handleChangeInput({ value: e.target.value, index, inputType: 'hours' })} />
                                <TextField value={state[index].minutes} id="outlined-basic" label="Minutos" variant="outlined" onChange={(e) => handleChangeInput({ value: e.target.value, index, inputType: 'minutes' })} />
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

                <div id='divActionsHours'>
                    <Button style={{ backgroundColor: "blue", minWidth: 147 }} variant="contained" onClick={() => doCalc({ type: 'sum', addHistory: true })}><TiPlus /></Button>
                    <Button style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained" onClick={() => doCalc({ type: 'sub', addHistory: true })}><TiMinus /></Button>
                </div>

                <div className='divider' />
                <h2>Resultado</h2>
                <div className='resultDiv'>
                    <div className='divInputs'>
                        <TextField value={result.hours ? `${result.hours}`.padStart(2, '0') : '00'} color="success" id="outlined-basic" label="Horas" variant="filled" InputProps={{ readOnly: true }} />
                        <TextField value={result.minutes ? `${result.minutes}`.padStart(2, '0') : '00' } color="success" id="outlined-basic" label="Minutos" variant="filled" InputProps={{ readOnly: true }} />
                    </div>
                    <div id='divCopyResult'>
                        <Tooltip title="Clique para copiar o resultado">
                            <Button onClick={() => clickToCopy()} size='small' variant="text" style={{ fontSize: 24 }}><MdContentCopy /></Button>
                        </Tooltip>
                        <div id='historyCalc'>
                            <Fab color="primary" aria-label="add" onClick={handleButtonClick}>
                                <BsClockHistory />
                            </Fab>
                        </div>
                    </div>
                </div>
            </div>

            {/* Historico  */}
            <div className={`modalHistory ${isDivMoved ? 'openHistory' : 'closeHistory'}`}>
                <h3>Historico de operações<MdOutlineAutoDelete onClick={() => clearHistory()} style={{ marginLeft: 10, cursor: 'pointer' }} /></h3>
                {history.map((elem, index) => (<Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{elem.dti}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='detailHistory'>
                            <div className='detailHistoryLeft'>
                                {elem.type === 'sum' ? <TiPlus /> : <TiMinus />}
                            </div>
                            <div className='detailHistoryRight'>
                                {elem?.inputs.map(input => (
                                    <p>{(`${input?.hours}`).padStart(2, '0')}:{(`${input?.minutes}`).padStart(2, '0')}</p>
                                ))}
                                <div className='divider' />
                                <p>{elem?.resultHours?.hours}:{(`${elem?.resultHours?.minutes}`).padStart(2, '0')}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => rollbackHours(index)}><PiClockCounterClockwiseBold />Restaurar</button>
                        </div>
                    </AccordionDetails>
                </Accordion>))}
            </div>

            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
}

export default About;
