import React, { useState } from 'react'

import { Button, TextField, Tooltip, Snackbar, Alert, Switch } from '@mui/material';
import InputMask from 'react-input-mask';

import { BiInfoCircle } from 'react-icons/bi'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

import './_styles.scss'

import { generateFakePIS, generateFakeCPF, generateSingleEmail, generateFakeCNPJ, generateRandomName } from '../../../utils/generateInfos'

import AlertDialog from '../../../components/alertDialog/AlertDialog'

const NightCalculator = () => {


    const [state, setState] = useState({
        pis: '',
        cpf: '',
        cnpj: '',
        nome: '',
        email: ''
    })

    const [removePontuation, setRemovePontuation] = useState(false)

    const [snackbar, setSnackbar] = useState({ message: '', open: false, type: 'success' });

    const handleShowMessage = ({ message, type = 'success' }) => setSnackbar({ message, open: true, type })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ message: '', open: false })
    };

    const handleChangeInput = (value, type) => {
        setState({ ...state, [type]: value })
    }

    const handleGenerate = (type) => {
        const typeDataToGenerate = {
            pis: () => generateFakePIS(),
            cpf: () => generateFakeCPF(),
            cnpj: () => generateFakeCNPJ(),
            nome: () => generateRandomName(),
            email: () => generateSingleEmail()
        }

        let response = typeDataToGenerate[type]()
        response = removePontuation && type !== 'email' ? response.replace(/[^a-zA-Z0-9 ]/g, '') : response
        setState({ ...state, [type]: response })

       // return typeDataToGenerate[type]()
    }


    const handleCopy = (data) => {
        navigator.clipboard.writeText(data)
        handleShowMessage({ message: 'Copiado para a área de transferência', type: 'success' })
    }

    return (
        <div id='container'>
            <div id='modal'>
                <div id='header'>
                    <h2>Gerar dados</h2>
                </div>
                <p>Gerar dados com pontuação <Switch checked={removePontuation} onChange={(e) => setRemovePontuation(e.target.checked)} /></p>
                
                <div id='inputs'>
                    <Button onClick={() => handleGenerate('pis')} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Gerar PIS</Button>
                    <TextField value={state.pis} size='small' id="outlined-basic" label="" variant="outlined"/>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.pis)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <Button onClick={() => handleGenerate('cpf')} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Gerar CPF</Button>
                    <TextField value={state.cpf} size='small' id="outlined-basic" label="" variant="outlined"/>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.cpf)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <Button onClick={() => handleGenerate('cnpj')} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Gerar CNPJ</Button>
                    <TextField value={state.cnpj} size='small' id="outlined-basic" label="" variant="outlined"/>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.cnpj)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <Button onClick={() => handleGenerate('nome')} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Gerar Nome</Button>
                    <TextField value={state.nome} size='small' id="outlined-basic" label="" variant="outlined"/>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.nome)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <Button onClick={() => handleGenerate('email')} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Gerar E-mail</Button>
                    <TextField value={state.email} size='small' id="outlined-basic" label="" variant="outlined"/>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.email)}><MdContentCopy /></p>
                </div>
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </div>

    )

}

export default NightCalculator
