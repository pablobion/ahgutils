import React, { useState } from 'react'


import DataValidator from './components/dataValidator'
import DataGenerator from './components/dataGenerator'

const NightCalculator = () => {

    return (
        <div id='container'>
            <DataGenerator/>
            <DataValidator/>
        </div>

    )

}

export default NightCalculator
