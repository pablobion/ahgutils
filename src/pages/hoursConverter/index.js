import React, { useState } from 'react'

import { Button, TextField, Tooltip, Snackbar, Alert } from '@mui/material';
import InputMask from 'react-input-mask';

import { BiInfoCircle } from 'react-icons/bi'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

import './_styles.scss'

import { sexagesimalToCentesimal, centesimalToSexagesimal, switchSexagesimalCentesimal } from '../../../utils/hoursCalculator'

import AlertDialog from '../../../components/alertDialog/AlertDialog'


const HoursConverter = () => {
    return (
        <div id='container'>
            <HoursConverterComponent/>

        </div>
    )
}
export const HoursConverterComponent = () => {


    const [state, setState] = useState({
        sexagesimal: '',
        centesimal: '',
        result: {
            centesimal: '',
            sexagesimal: ''
        }
    })
    const [snackbar, setSnackbar] = useState({ message: '', open: false, type: 'success' });

    const handleShowMessage = ({ message, type = 'success' }) => setSnackbar({ message, open: true, type })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ message: '', open: false })
    };

    const handleChangeInput = (value, type) => {
        setState({ ...state, [type]: value })
    }

    const doCalc = () => {
        if (!state.sexagesimal && !state.centesimal) return handleShowMessage({ message: 'Preencha pelo menos um campo', type: 'error' })
        const response = switchSexagesimalCentesimal(state)
        setState({ ...state, result: response })
    }

    const handleCopy = (data) => {
        navigator.clipboard.writeText(data)
        handleShowMessage({ message: 'Copiado para a área de transferência', type: 'success' })
    }

    const handleCleanInputs = () => {
        setState({
            sexagesimal: '',
            centesimal: '',
            result: {
                centesimal: '',
                sexagesimal: ''
            }
        })
    }

    return (
        <>
            <div id='modal'>
                <div id='header'>
                    <h2>Converter Horas</h2>

                    <AlertDialog
                        button={(
                            <Tooltip title="Informação sobre horas noturnas">
                                <Button variant="text"><p style={{ cursor: 'pointer' }} size='small'><BiInfoCircle /></p></Button>
                            </Tooltip>
                        )}
                        body={(
                            <>
                                <h3>Hora Sexagesimal</h3>
                                <p>A hora sexagesimal é a forma tradicional de medir o tempo que costumamos usar no dia a dia. Divide o dia em 24 horas, e cada hora é dividida em 60 minutos, e cada minuto é dividido em 60 segundos. Essa divisão é baseada no número 60, que era utilizado em culturas antigas por ser facilmente divisível por vários números. Portanto, um relógio comum tem 12 horas no mostrador porque a cada 12 horas (metade de 24), um novo dia começa.</p>
                                <p> </p>
                                <hr />
                                <p> </p>
                                <h3>Hora Centesimal para Cálculos</h3>
                                <p>A hora centesimal é útil em cálculos matemáticos e científicos, porque a divisão em 100 partes facilita os cálculos de porcentagens e proporções. Comparado à hora tradicional, em que a divisão em 60 partes pode ser mais complexa, a hora centesimal simplifica operações numéricas. No entanto, não é amplamente usada na vida cotidiana. Se você precisa fazer muitos cálculos envolvendo proporções, a hora centesimal pode ser uma ferramenta mais conveniente devido à sua divisão mais simples.</p>
                            </>
                        )}>
                    </AlertDialog>
                </div>

                <div id='inputs'>
                    <InputMask
                        mask="99:99"
                        value={state.sexagesimal}
                        onChange={(e) => handleChangeInput(e.target.value, 'sexagesimal')}
                    >
                        {() => (
                            <TextField
                                id="outlined-basic"
                                label="Sexagesimal"
                                variant="outlined"
                            />
                        )}
                    </InputMask>
                    <LiaExchangeAltSolid />
                    <p style={{ width: 50 }}>{state?.result?.centesimal}</p>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.result.centesimal)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <InputMask
                        mask="99.99"
                        value={state.centesimal}
                        onChange={(e) => handleChangeInput(e.target.value, 'centesimal')}
                    >
                        {() => (
                            <TextField
                                id="outlined-basic"
                                label="Centesimal"
                                variant="outlined"
                            />
                        )}
                    </InputMask>
                    <LiaExchangeAltSolid />
                    <p style={{ width: 50 }}>{state?.result?.sexagesimal}</p>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.result.sexagesimal)}><MdContentCopy /></p>
                </div>
                <div id='divButtonFooter'>
                    <Button onClick={() => doCalc()} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Calcular</Button>
                    <Button variant="text" onClick={() => handleCleanInputs()}><p style={{ cursor: 'pointer',  }} size='small'><AiOutlineClear /></p></Button>
                </div>
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </>

    )

}

export default HoursConverter