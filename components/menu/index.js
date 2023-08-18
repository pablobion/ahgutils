import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';

import './styles.scss'
import '../../styles/app.scss'

import {optionsMenu} from './menuOptions'
import logo from '../../assets/logo.png'

import {Tooltip} from '@mui/material';


const Layout = ({ children }) => {

    const router = useRouter();

    return (
        <div className="container">
            <div className="menu">
                <Image
                    src={logo}
                    width={80}
                    height={80}
                    onClick={() => router.push('/')}
                    style={{ cursor: 'pointer', marginBottom: 25 }}
                />
                {optionsMenu.map(elem => (
                    <Tooltip title={elem.label} placement="right">  
                        <div onClick={() => router.push(elem.path)} key={elem.path} className='menuOptionDiv'>{elem.icon}</div>
                    </Tooltip>
                ))}
            </div>
            {children}
        </div>
    );
};

export default Layout;
