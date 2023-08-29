import { useState } from 'react'
import './_styles.scss'
import { Button, TextField, Tooltip, Snackbar, Alert } from '@mui/material';
import InputMask from 'react-input-mask';

import { bankCycleCalc } from '../../../utils/hoursCalculator'


export const BankCycleComponent = () => {

    //2222-01
    const [result, setResult] = useState('');

    const [initial, setInital] = useState({
        yearMonth: '2023-01',
        months: 1

    })

    const doCalc = () => {
        if(parseInt(initial.months) <= 0 ) return false
        const response = bankCycleCalc(initial.yearMonth, parseInt(initial.months))
        console.log(response)
        setResult(response)
    }


    const handleChangeMonth = (e, type) => {
        setInital({ ...initial, [type]: e.target.value })
    }


    return (
        <div id='modal'>

            <h1>Ciclo de banco de horas</h1>

            <h3>Data de inicio do ciclo</h3>
            <input value={initial.yearMonth} onChange={(e) => handleChangeMonth(e, 'yearMonth')} id='inputMonth' type="month" />
            <TextField value={initial.months} onChange={(e) => handleChangeMonth(e, 'months')} id="outlined-basic" label="Quantidade de meses" variant="outlined" />
            <Button id='buttonResult' onClick={() => doCalc()} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Calcular</Button>
            {
                result && (
                    <>
                        <h3>Final do ciclo</h3>
                        <input value={result} onChange={(e) => handleChangeMonth(e, 'yearMonth')} id='inputMonth' type="month" />
                    </>
                )
            }
        </div>
    )
}

const BankCycle = () => {
    return (
        <div className='container'>
            <BankCycleComponent />

        </div>

    )
}

export default BankCycle