import { ImCalculator, ImHome } from 'react-icons/im';
import {BsFillPeopleFill, BsFillCalendarMonthFill} from 'react-icons/bs'
import {MdNightlightRound, MdPublishedWithChanges} from 'react-icons/md'
import {IoCreate} from 'react-icons/io5'



export const optionsMenu = [
    {
        icon: <ImHome />,
        path: '/',
        label: 'Início'
    },
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
        path: '/generateData',
        label: 'Gerador de informações'
    },
    {
        icon: <BsFillCalendarMonthFill />,
        path: '',
        label: '(Em breve)'
    },
    {
        icon: <BsFillPeopleFill />,
        path: '/about',
        label: 'Colaboradores'
    },
    

];

//ImCalculator