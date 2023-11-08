import '../css/Login.css'

import LoginPage from '../components/login/LoginPage';
import RegisterPage from '../components/login/RegisterPage';
import { useState } from 'react';

function Login() {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <>
            {
                currentPage == 0 ?
                    <LoginPage setCurrentPage={setCurrentPage}></LoginPage>
                    :
                    <RegisterPage setCurrentPage={setCurrentPage}></RegisterPage>

            }
        </>
    )
}

export default Login;