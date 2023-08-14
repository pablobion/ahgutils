import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';

import './styles.scss'
import '../../styles/app.scss'

import {optionsMenu} from './menuOptions'
import logo from '../../assets/logo.png'

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
                    style={{ cursor: 'pointer' }}
                />
                {optionsMenu.map(elem => (<div onClick={() => router.push('/hoursCalculator')} key={elem.name} className='menuOptionDiv'>{elem.icon}</div>))}
            </div>
            {children}
        </div>
    );
};

export default Layout;
