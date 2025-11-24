import React, { useState } from 'react'

import { Button, TextField, Tooltip, Snackbar, Alert, Switch } from '@mui/material';
import InputMask from 'react-input-mask';

import { BiInfoCircle } from 'react-icons/bi'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'

import './_styles.scss'

import { generateFakePIS, generateFakeCPF, generateSingleEmail, generateFakeCNPJ, generateRandomName } from '../../../../../utils/generateInfos'

const DataGenerator = () => {
    return (
        <div id='container'>
            <DataGeneratorComponent/>
        </div>
    )
}
export const DataGeneratorComponent = () => {


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

    const handleGenerate = (type) => {
        const typeDataToGenerate = {
            pis: generateFakePIS(),
            cpf: generateFakeCPF(),
            cnpj: generateFakeCNPJ(),
            nome: generateRandomName(),
            email: generateSingleEmail()
        }

        if (!removePontuation) {
            typeDataToGenerate.pis = typeDataToGenerate.pis.replace(/[^a-zA-Z0-9 ]/g, '')
            typeDataToGenerate.cpf = typeDataToGenerate.cpf.replace(/[^a-zA-Z0-9 ]/g, '')
            typeDataToGenerate.cnpj = typeDataToGenerate.cnpj.replace(/[^a-zA-Z0-9 ]/g, '')
        }

        setState(typeDataToGenerate)
        handleShowMessage({ message: 'Dados gerados com sucesso', type: 'success' })
    }


    const handleCopy = (data) => {
        navigator.clipboard.writeText(data)
        handleShowMessage({ message: 'Copiado para a área de transferência', type: 'success' })
    }

    return (
        <>
            <div id='modal'>
            <div onClick={() => window.open('https://4generate.com/pt/ahgutils/generateData/?ahgutils=true', '_blank')} style={{borderRadius: 10, border: '1px solid lightgray', padding: 10, marginBottom: 20, backgroundColor: '#9D349D', color: 'white', cursor: 'pointer'}}>
                <p>Acessar no 4Generate</p>
            </div>
                <div id='header'>
                    <h2>Gerar dados</h2>
                </div>
                <p>Gerar dados com pontuação <Switch checked={removePontuation} onChange={(e) => setRemovePontuation(e.target.checked)} /></p>
                <Button onClick={() => handleGenerate('pis')} style={{ backgroundColor: "#0078d4", minWidth: 147, margin: 30 }} variant="contained">Gerar Dados</Button>

                <div id='inputs'>
                    <TextField value={state.pis} size='small' id="outlined-basic" label="PIS" variant="outlined" />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.pis)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <TextField value={state.cpf} size='small' id="outlined-basic" label="CPF" variant="outlined" />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.cpf)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <TextField value={state.cnpj} size='small' id="outlined-basic" label="CNPJ" variant="outlined" />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.cnpj)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <TextField value={state.nome} size='small' id="outlined-basic" label="Nome" variant="outlined" />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.nome)}><MdContentCopy /></p>
                </div>
                <div id='inputs'>
                    <TextField value={state.email} size='small' id="outlined-basic" label="E-mail" variant="outlined" />
                    <p style={{ cursor: 'pointer' }} onClick={() => handleCopy(state.email)}><MdContentCopy /></p>
                </div>
            </div>


            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </>

    )

}

export default DataGenerator
