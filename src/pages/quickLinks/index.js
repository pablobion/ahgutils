import {useState} from 'react'
import { Button, TextField, Tooltip, Snackbar, Alert } from '@mui/material';

import './_styles.scss'
const QuickLinks = () => {

    return (
        <div id='container'>
            <QuickLinkComponent/>
        </div>
    )
}

export const QuickLinkComponent = () => {

    const [company, setCompany] = useState('')

    const links = [
        {
            name: 'Acessar super Admin',
            link: 'https://app.ahgora.com.br/admin'
        },
        {
            name: 'Acessar Usuários',
            link: 'https://app.ahgora.com.br/configuracoes/usuarios'
        },
        {
            name: 'Log de acessos',
            link: 'https://app.ahgora.com.br/audit_acesso'
        },
        {
            name: 'Perfis',
            link: 'https://app.ahgora.com.br/teste/aplica_regras#permissoes'
        },
        {
            name: 'Empresa por usuario',
            link: 'https://app.ahgora.com.br/admin/lista_empresas_por_usuario'
        },
        {
            name: 'Cadastro CNPJ',
            link: 'https://app.ahgora.com.br/configuracoes/configurarCadastros'
        }
    ];

    return (
        <div id='modal'>
            <h1>Links rápidos</h1>
            <div className='inputs' >
                <Button onClick={() => window.open(`https://app.ahgora.com.br/lista_empresas?empresa=${company}`, '_blank')} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">Trocar de base (pw)</Button>
                <TextField onChange={(e) => setCompany(e.target.value)} value={company} id="outlined-basic" label="Cod Empresa" />
            </div>
            <hr/>
            {
                links.map(link => (
                    <div className='inputs'>
                        <Button onClick={() => window.open(link.link, '_blank')} style={{ backgroundColor: "#0078d4", minWidth: 147 }} variant="contained">{link.name}</Button>
                    </div>
                ))
            }
            

        </div>
    )
}

export default QuickLinks