import { ImCalculator } from 'react-icons/im';
import {BsFillPeopleFill} from 'react-icons/bs'
import {MdNightlightRound, MdPublishedWithChanges} from 'react-icons/md'
import {IoCreate} from 'react-icons/io5'


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
        icon: <MdPublishedWithChanges />,
        path: '/hoursConverter',
        label: 'Conversor de horas'
    },
    {
        icon: <IoCreate />,
        path: '/',
        label: '(Em breve) Gerador de informações'
    },
    {
        icon: <BsFillPeopleFill />,
        path: '/about',
        label: 'Colaboradores'
    },
    

];

//ImCalculator