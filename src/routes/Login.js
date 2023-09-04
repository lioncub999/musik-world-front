import '../css/Login.css'

import LoginPage from '../components/login/LoginPage';
import RegisterPage from '../components/login/RegisterPage';
import { useState } from 'react';

function Login() {
        const [CurrentPage, setCurrentPage] = useState(0);

        switch (CurrentPage) {
            case 1:
                return <RegisterPage setCurrentPage={setCurrentPage}></RegisterPage>
            default:
                return <LoginPage setCurrentPage={setCurrentPage}></LoginPage>
        }
}

export default Login;