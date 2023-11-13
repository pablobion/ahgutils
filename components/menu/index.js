import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';

import './styles.scss'
import '../../styles/app.scss'

import { optionsMenu } from './menuOptions'
import logo from '../../assets/logo.png'

//assets
import fitaAmarela from '../../assets/fita_amarela.png'
import fitaRosa from '../../assets/fita_rosa.png'
import fitaAzul from '../../assets/fita_azul.png'
import bandeirinhas from '../../assets/bandeirinhas.png'
import fogueira from '../../assets/fogueira.png'

import Snowfall from 'react-snowfall'


import { Tooltip } from '@mui/material';


const Layout = ({ children }) => {

    const router = useRouter();

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [currentMonth, setCurrentMonth] = useState(false)

    const handleMouseMove = (e) => {
        const pos = { x: e.clientX, y: e.clientY }
        setPosition(pos);
    };

    const cursorImageSrc = {
        9: fitaAmarela,
        11: fitaAzul
    }

    useEffect(() => {
        const d = new Date();
        let month = d.getMonth();
        setCurrentMonth(month + 1)

    }, []);

    return (
        <div className="container" onMouseMove={handleMouseMove} style={{backgroundColor: '#232329'}}>
            <div className="menu">
                {/* <Image
                    src={logo}
                    width={80}
                    height={80}
                    onClick={() => router.push('/')}
                    style={{ cursor: 'pointer', marginTop: 15 }}
                /> */}
                {cursorImageSrc[currentMonth] && (
                    <Tooltip title='Novembro azul'>
                        <Image
                            src={cursorImageSrc[currentMonth]}
                            width={60}
                            style={{ cursor: 'pointer', marginTop: 15 }}
                            id='easterEgg'
                        />
                      </Tooltip>
                )}


                {/* {
                    // Natal
                    currentMonth === 12 && (<Snowfall snowflakeCount={150} />)
                } */}

                { // Outubro Rosa
                    currentMonth === 10 && (
                        <Image
                            src={fitaRosa}
                            style={{
                                position: 'absolute',
                                left: (position.x + 0) + 'px',
                                top: (position.y + 20) + 'px',
                                width: '50px',
                                height: '50px',
                                zIndex: 9999
                            }}
                        />

                    )
                }
                {/* { // Festa junina
                    currentMonth === 6 && (
                        <>
                            <Image
                                src={bandeirinhas}
                                style={{
                                    position: 'absolute',
                                    left: 100,
                                    top: -140,
                                    width: 600,
                                    height: 300,
                                    //rotate
                                    transform: 'rotate(15deg)',
                                    zIndex: 0
                                }}
                            />
                            <Image
                                src={fogueira}
                                style={{
                                    position: 'absolute',
                                    left: 300,
                                    bottom: 0,
                                    width: 200,
                                    height: 200,
                                    zIndex: 0
                                }}
                            />
                        </>
                    )
                } */}
                {optionsMenu.map(elem => (
                    <Tooltip key={elem.label} title={currentMonth === 10 ? `🧛🕯️ ${elem.label} 🧟‍♀️🎃` : elem.label} placement="right">
                        <div onClick={() => router.push(elem.path)} key={elem.path} className='menuOptionDiv'>{elem.icon}</div>
                    </Tooltip>
                ))}
            </div>
            {children}
        </div>
    );
};

export default Layout;
