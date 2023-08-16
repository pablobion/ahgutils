import { ImCalculator } from 'react-icons/im';
import {BsPeople} from 'react-icons/bs'
import {MdNightlightRound} from 'react-icons/md'


export const optionsMenu = [
    {
        icon: <ImCalculator />,
        path: '/hoursCalculator',
        label: 'Calculadora de horas'
    },
    {
        icon: <MdNightlightRound />,
        path: '/nightCalculator',
        label: 'Calculadora de horas noturnas'
    },
    {
        icon: <BsPeople />,
        path: '/about',
        label: 'Colaboradores'
    },
    

];

//ImCalculator