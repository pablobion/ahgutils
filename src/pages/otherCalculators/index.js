import React, { useState } from 'react'

import { Button, TextField, Tooltip, Snackbar, Alert } from '@mui/material';
import InputMask from 'react-input-mask';

import { BiInfoCircle } from 'react-icons/bi'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

import './_styles.scss'

import { hoursWithFactor } from '../../../utils/hoursCalculator'

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
        horasFatorsexagesimal: '',
        fatorMultiplicador: '1.00',
        result: {
            horasFatorsexagesimal: '',
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
        if (!state.horasFatorsexagesimal && !state.fatorMultiplicador) return handleShowMessage({ message: 'Preencha pelo menos um campo', type: 'error' })
        const horasFatorsexagesimals = hoursWithFactor(state.horasFatorsexagesimal, state.fatorMultiplicador)

        console.log(horasFatorsexagesimals)

        setState({ ...state, result: { horasFatorsexagesimal: horasFatorsexagesimals } })
    }

    const handleCopy = (data) => {
        navigator.clipboard.writeText(data)
        handleShowMessage({ message: 'Copiado para a área de transferência', type: 'success' })
    }

    const handleCleanInputs = () => {
        setState({
            horasFatorsexagesimal: '',
            fatorMultiplicador: '',
            result: {
                horasFatorsexagesimal: '',
            }
        })
    }

    return (
        <>
            <div id='modal'>
            <div onClick={() => window.open('https://4generate.com/pt/ahgutils/multipliquerFactor/?ahgutils=true', '_blank')} style={{borderRadius: 10, border: '1px solid lightgray', padding: 10, marginBottom: 20, backgroundColor: '#9D349D', color: 'white', cursor: 'pointer'}}>
                <p>Acessar no 4Generate</p>
            </div>
                <div id='header'>

                    <h2>Outras Calculadoras</h2>
                </div>

                <div id='inputs'>
                    <InputMask
                        mask="99:99"
                        value={state.horasFatorsexagesimal}
                        onChange={(e) => handleChangeInput(e.target.value, 'horasFatorsexagesimal')}
                    >
                        {() => (
                            <TextField
                                id="outlined-basic"
                                label="Horas"
                                variant="outlined"
                            />
                        )}
                    </InputMask>
                    <InputMask
                        mask="9.99"
                        value={state.fatorMultiplicador}
                        onChange={(e) => handleChangeInput(e.target.value, 'fatorMultiplicador')}
                    >
                        {() => (
                            <TextField
                                id="outlined-basic"
                                label="Fator Multiplicador"
                                variant="outlined"
                            />
                        )}
                    </InputMask>

                    <p style={{ width: 50 }}>{state?.result?.horasFatorsexagesimal}</p>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.result.horasFatorsexagesimal)}><MdContentCopy /></p>
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