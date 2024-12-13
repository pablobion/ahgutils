import React, {useState, useEffect} from 'react'

import Modal from './components/modal'
import { Button, TextField, Tooltip, Snackbar, Alert } from '@mui/material';

import './_styles.scss'

const FlushModal = () => {

    const [snackbar, setSnackbar] = useState({ message: '', open: false, type: 'success' });
    const [configuration, setConfiguration] = useState([
        'blank',
    ])


    useEffect(() => {
        const flushModal = localStorage.getItem("flushModal");
        if (flushModal) setConfiguration(JSON.parse(flushModal))
    }, [])

    useEffect(() => {
        localStorage.setItem("flushModal", JSON.stringify(configuration));
    }, [configuration])


    const handleDeleteElement = (index) => {
        let newConfiguration = configuration
        const hasBlankComponent = newConfiguration.some(elem => elem === 'blank')
        if(!hasBlankComponent)newConfiguration.push('blank')
        newConfiguration.splice(index, 1)
        setConfiguration([...newConfiguration])
        handleShowMessage({ message: 'Ferramenta Removida', type: 'success' })
    }

    const handleChangeConfiguration = ({index, name}) => {
        if(name === '') return handleDeleteElement(index)
        let newConfiguration = configuration
        newConfiguration[index] = name
        if(newConfiguration.length < 2){
            newConfiguration.push('blank')
        }
        setConfiguration([...newConfiguration])
        handleShowMessage({ message: 'Nova ferramenta adicionada, configuração salva.', type: 'success' })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ message: '', open: false })
    };

    const handleShowMessage = ({ message, type = 'success' }) => setSnackbar({ message, open: true, type })


    return (
        <div id='container'>
            <div id='containerFlush'>
                {configuration.map((elem, index) => {
                    return (
                        <>
                            <Modal index={index} componentPage={elem} handleChangeConfiguration={handleChangeConfiguration}/>
                        </>
                    )
                })}
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    )
}

export default FlushModal