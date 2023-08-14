import React, {useState} from 'react';
import './styles.scss'

import {sum, subtract} from '../../utils/hoursCalculator'

import {Button, TextField, Tooltip, Snackbar, Alert} from '@mui/material';

import {MdContentCopy, MdPlusOne} from 'react-icons/md';
import {AiOutlineClear} from 'react-icons/ai'

function About() {
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    type: 'success'
  });
  const [result, setResult] = useState({
    hours: '',
    minutes: ''
  });
  const [state, setState] = useState([
    {
      hours: '',
      minutes: ''
    },
    {
      hours: '',
      minutes: ''
    },
  ])

  const handleShowMessage = ({message, type = 'success'}) => {
    setSnackbar({
      message,
      open: true,
      type
    }) 
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      message: '',
      open: false
    })
  };

  const handleAddNewInputs = () => {
    const atualInputs = state;
    if(atualInputs.length === 9) return handleShowMessage({message: 'Não é possivel adicionar mais campos', type: 'error'});
    setState([...atualInputs, {hours: '', minutes: ''}])
  }

  const handleCleanInputs = () => {
    handleShowMessage({message: 'Todos os campos foram limpos', type: 'success'})
    setState([{hours: '', minutes: ''},{hours: '', minutes: ''}])
    setResult({hours: '', minutes: ''})
  }

  const handleChangeInput = ({e, index, inputType}) => {
    const atualInputs = state;

    atualInputs[index][inputType] = Number(e.target.value);
    console.log(atualInputs)
    setState([...atualInputs])
  }

  const doCalc = (type) => {
    const response = type === 'sum' ? sum(state) : subtract(state);
    setResult({hours: '', minutes: ''})
    console.log(response)
    setTimeout(() => setResult(response), 150);
    
  } 

  return (
    <div className='container'>
      <div id='modal'>
        <h2>Resultado</h2>
        <div className='resultDiv'>
          <div className='divInputs'>  
            <TextField value={result.hours} id="outlined-basic" label="Horas" variant="outlined" InputProps={{readOnly: true}} />
            <TextField value={result.minutes} id="outlined-basic" label="Minutos" variant="outlined" InputProps={{readOnly: true}}/>
          </div>
          <div id='divCopyResult'>
            <Tooltip title="Clique para copiar o resultado" onClick={() => handleShowMessage({message: 'Resultado copiado para area de transferencia!', type: 'success'})}>
              <Button size='small' variant="text" style={{ fontSize: 24 }}><MdContentCopy/></Button>
            </Tooltip>
          </div>
        </div>
        
        <div className='divider'/>

        <div id='painelHoursInputCalculator'>
          <div className='painelHoursInputCalculatorLeft'>
            {state.map((elem, index) => (
              <div className='divInputs'>
                <TextField value={state[index].hours} id="outlined-basic" label="Horas" variant="outlined" onChange={(e) => handleChangeInput({e, index, inputType: 'hours'})} />
                <TextField value={state[index].minutes} id="outlined-basic" label="Minutos" variant="outlined" onChange={(e) => handleChangeInput({e, index, inputType: 'minutes'})} /> 
              </div>
            ))}
          </div>
          <div className='painelHoursInputCalculatorRight'>
            <div>
              <Tooltip title="Adicionar campo">
                <Button variant="text" onClick={() => handleAddNewInputs()}><p style={{cursor: 'pointer'}} size='small'><MdPlusOne/></p></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Limpar campo">
                <Button variant="text" onClick={() => handleCleanInputs()}><p style={{cursor: 'pointer'}} size='small'><AiOutlineClear/></p></Button>
              </Tooltip>
            </div>
            
          </div>
        </div>


       
        <div className='hoursInput'>
          
          
        </div>

        <div id='divActionsHours'>
          <Button size="small" style={{ backgroundColor: "blue", minWidth: 147, fontSize: '0.8rem' }}  variant="contained" onClick={() => doCalc('sum')}>Adição</Button>
          <Button size="small" style={{ backgroundColor: "tomato", minWidth: 147, fontSize: '0.8rem' }}  variant="contained">Limpar</Button>
          <Button size="small" style={{ backgroundColor: "#0078d4", minWidth: 147, fontSize: '0.8rem' }}  variant="contained" onClick={() => doCalc('sub')}>Subtração</Button>
        </div>
        
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default About;
