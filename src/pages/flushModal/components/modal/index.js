import React, { useState, useEffect } from 'react'


//components
import About from '../../../hoursCalculator'
import { NightCalculatorComponent } from '../../../nightCalculator'
import { HoursConverterComponent } from '../../../hoursConverter'
import { DataValidatorComponent } from '../../../generateData/components/dataValidator'
import { DataGeneratorComponent } from '../../../generateData/components/dataGenerator'
import { BankCycleComponent } from '../../../bankCycle'

import AlertDialog from '../../../../../components/alertDialog/AlertDialog'


import { Button, TextField, Tooltip, Snackbar, Alert, Fab } from '@mui/material';

import './_styles.scss'

//icons
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { ImCalculator } from 'react-icons/im';
import { BsFillCalendarMonthFill } from 'react-icons/bs'
import { MdNightlightRound, MdPublishedWithChanges, MdDeleteOutline } from 'react-icons/md'
import { IoCreate, IoCreateOutline } from 'react-icons/io5'


const BlankComponent = ({ handleClickElement }) => {

    const styles = {
        cursor: 'pointer',
    }

    return (
        <Tooltip title='Adicionar ferramenta' placement='top'>
            <div id='containerBlank'>

                <AlertDialog
                    button={(
                        <div id='divBlank'>
                            <AiOutlinePlusCircle />
                        </div>
                    )}
                    body={(
                        <div>
                            <h3>Qual ferramenta deseja adicionar?</h3>
                            <div style={{ color: '#494949', fontSize: 60, width: 490, display: 'flex', justifyContent: 'space-around', marginTop: 50 }}>
                                <ImCalculator onClick={() => handleClickElement('hoursCalculator')} style={styles} />
                                <MdNightlightRound onClick={() => handleClickElement('nightCalculator')} style={styles} />
                                <MdPublishedWithChanges onClick={() => handleClickElement('hoursConverter')} style={styles} />
                                <IoCreate onClick={() => handleClickElement('dataGenerator')} style={styles} />
                                <IoCreateOutline onClick={() => handleClickElement('dataValidator')} style={styles} />
                                <BsFillCalendarMonthFill onClick={() => handleClickElement('bankCycle')} style={styles} />
                            </div>
                        </div>
                    )}>
                </AlertDialog>
            </div>
        </Tooltip>
    )
}

const Modal = ({ index, componentPage, handleChangeConfiguration }) => {

    const selectComponent = (name) => {
        const deleteStyle = { position: 'absolute', left: -30, top: -40, fontSize: 35 }

        const components = {
            'hoursCalculator': <><Fab onClick={() => teste('')} style={deleteStyle}><MdDeleteOutline /></Fab><About /></>,
            'nightCalculator': <><Fab onClick={() => teste('')} style={deleteStyle}><MdDeleteOutline /></Fab><NightCalculatorComponent /></>,
            'hoursConverter': <><Fab onClick={() => teste('')} style={deleteStyle}><MdDeleteOutline /></Fab><HoursConverterComponent /></>,
            'dataGenerator': <><Fab onClick={() => teste('')} style={deleteStyle}><MdDeleteOutline /></Fab><DataGeneratorComponent /></>,
            'dataValidator': <><Fab onClick={() => teste('')} style={deleteStyle}><MdDeleteOutline /></Fab><DataValidatorComponent /></>,
            'bankCycle': <><Fab onClick={() => teste('')} style={deleteStyle}><MdDeleteOutline /></Fab><BankCycleComponent /></>,
            'blank': <BlankComponent handleClickElement={teste} />,
        }

        return components[name] || null
    }

    const teste = (name) => {
        handleChangeConfiguration({ index, name })
    }

    const currentComponent = selectComponent(componentPage);

    return (
        <div id='modals'>
            <div id='content'>
                {currentComponent}
            </div>
        </div>
    )
}

export default Modal