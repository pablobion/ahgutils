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

    const [selectedColor, setSelectedColor] = useState({
        menu: '#b0c4d8',
        background: '#e6f3ff'
    });

    useEffect(() => {
        const savedColor = window.localStorage.getItem('themeColor');
        if (savedColor) {
            const colors = JSON.parse(savedColor);
            setSelectedColor(colors);
            document.documentElement.style.setProperty('--menu-background', colors.menu);
            document.documentElement.style.setProperty('--page-background', colors.background);
        } else {
            document.documentElement.style.setProperty('--menu-background', selectedColor.menu);
            document.documentElement.style.setProperty('--page-background', selectedColor.background);
        }
    }, []);

    const colors = [
        { 
            name: 'Azul', 
            menu: '#b0c4d8',
            background: '#e6f3ff' 
        },
        { 
            name: 'Rosa',
            menu: '#d8a6b0',
            background: '#ffe6f3'
        },
        { 
            name: 'Verde',
            menu: '#b0d8c4',
            background: '#e6fff0'
        },
        { 
            name: 'Amarelo',
            menu: '#d8d0a6',
            background: '#fffbe6'
        },
        { 
            name: 'Cinza',
            menu: '#a0a0a0',
            background: '#f5f5f5'
        },
        { 
            name: 'Preto',
            menu: '#3c3c3c',
            background: '#3c3c3c'
        }
    ];

    const handleColorChange = (color) => {
        setSelectedColor({
            menu: color.menu,
            background: color.background
        });
        window.localStorage.setItem('themeColor', JSON.stringify({
            menu: color.menu,
            background: color.background
        }));
        document.documentElement.style.setProperty('--menu-background', color.menu);
        document.documentElement.style.setProperty('--page-background', color.background);
    };

    return (
        <div className="container" onMouseMove={handleMouseMove} style={{backgroundColor: selectedColor.background}}>
            <div className="menu" style={{ backgroundColor: selectedColor.menu }}>
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


             
                {currentMonth === 12 && (<Snowfall snowflakeCount={150} />)}
                

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
                {optionsMenu.map(elem => {
                    return (
                        <div key={elem.label}>
                            {elem.label == '4Generate' ? (<Tooltip title='Ir para 4Generate'><button
  onClick={() => window.open('https://4generate.com/pt/ahgutils/', '_blank')}
  style={{ background: 'transparent', border: 'none', marginBottom: 30, paddingLeft: 30 }}
>
  {elem.icon}
</button></Tooltip>) : (  <Tooltip key={elem.label} title={currentMonth === 10 ? `🧛🕯️ ${elem.label} 🧟‍♀️🎃` : elem.label} placement="right">
                            <div onClick={() => router.push(elem.path)} key={elem.path} className='menuOptionDiv'>{elem.icon}</div>
                        </Tooltip> )}
                        </div>
                    );
                })}
                <div className="color-picker">
                    {colors.map((color) => (
                        <Tooltip key={color.name} title={color.name} placement="top">
                            <button
                                className={`color-button ${selectedColor.menu === color.menu ? 'selected' : ''}`}
                                onClick={() => handleColorChange(color)}
                                style={{ backgroundColor: color.background }}
                            />
                        </Tooltip>
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;
