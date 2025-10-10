import React, { useState } from 'react'

import { Button, TextField, Tooltip, Snackbar, Alert, Switch } from '@mui/material';
import InputMask from 'react-input-mask';

import { BiInfoCircle } from 'react-icons/bi'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

import './_styles.scss'

import { validateCPF, validateCNPJ, validatePIS, validateEmail } from '../../../../../utils/validatorInfos'

const DataValidator = () => {
    return (
        <div id='container'>
            <DataValidatorComponent/>
        </div>
    )
}

export const DataValidatorComponent = () => {


    const [state, setState] = useState({
        pis: '',
        cpf: '',
        cnpj: '',
        email: ''
    })

    const [isValid, setIsValid] = useState({
        pis: null,
        cpf: null,
        cnpj: null,
        email: null
    })

    const [snackbar, setSnackbar] = useState({ message: '', open: false, type: 'success' });

    const handleShowMessage = ({ message, type = 'success' }) => setSnackbar({ message, open: true, type })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ message: '', open: false })
    };

    const handleChangeInput = ({ value, type }) => {
        console.log(value, type)
        setState({ ...state, [type]: value })
    }

    const handleGenerate = (type) => {
        const { pis, cnpj, cpf, email } = state;
        const typeDataToGenerate = {
            pis: validatePIS(pis),
            cpf: validateCPF(cpf),
            cnpj: validateCNPJ(cnpj),
            email: validateEmail(email)
        }

        setIsValid(typeDataToGenerate)
        handleShowMessage({ message: 'Validando dados', type: 'success' })
    }

    const handleCopy = (data) => {
        navigator.clipboard.writeText(data)
        handleShowMessage({ message: 'Copiado para a área de transferência', type: 'success' })
    }

    const changeColorInput = (data) => {
        console.log(isValid[data] )
        return isValid[data] === null ? '' : isValid[data] ? 'success' : 'error';
    }

    const handleCleanData = () => {
        setState({ pis: '', cpf: '', cnpj: '', email: '' })
        setIsValid({ pis: null, cpf: null, cnpj: null, email: null })
    }

    return (
        <>

            <div id='modal'>
            <div onClick={() => window.open('https://4generate.pages.dev/pt/ahgutils/generateData/?ahgutils=true', '_blank')} style={{borderRadius: 10, border: '1px solid lightgray', padding: 10, marginBottom: 20, backgroundColor: '#9D349D', color: 'white', cursor: 'pointer'}}>
                <p>Acessar no 4Generate</p>
            </div>
                <div id='header'>
                    <h2>Validação de dados</h2>
                </div>
                <div id='headerButtons'>
                    <Button onClick={() => handleGenerate('pis')} style={{ backgroundColor: "#0078d4" }} variant="contained">Validar Dados</Button>
                    <Tooltip style={{ cursor: 'pointer'}} className='clickToCopy' title='Limpar dados' onClick={() => handleCleanData()}><AiOutlineClear/></Tooltip>
                </div>

                <div id='inputs'>
                    <TextField onChange={(e) => handleChangeInput({ value: e.target.value, type: 'pis' })} value={state.pis} size='small' id="outlined-basic" label="PIS" variant="outlined" color={changeColorInput('pis')} focused />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.pis)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <TextField onChange={(e) => handleChangeInput({ value: e.target.value, type: 'cpf' })} value={state.cpf} size='small' id="outlined-basic" label="CPF" variant="outlined" color={changeColorInput('cpf')} focused />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.cpf)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <TextField onChange={(e) => handleChangeInput({ value: e.target.value, type: 'cnpj' })} value={state.cnpj} size='small' id="outlined-basic" label="CNPJ" variant="outlined" color={changeColorInput('cnpj')} focused />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.cnpj)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <TextField onChange={(e) => handleChangeInput({ value: e.target.value, type: 'email' })} value={state.email} size='small' id="outlined-basic" label="E-mail" variant="outlined" color={changeColorInput('email')} focused />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.email)}><MdContentCopy /></p>
                </div>
            </div>


            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </>

    )

}

export default DataValidator
