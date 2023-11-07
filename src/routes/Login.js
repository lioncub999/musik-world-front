import '../css/Login.css'

import LoginPage from '../components/login/LoginPage';
import RegisterPage from '../components/login/RegisterPage';
import { useState } from 'react';

function Login() {
        const [currentPage, setCurrentPage] = useState(0);

        switch (currentPage) {
            case 1:
                return <RegisterPage setCurrentPage={setCurrentPage}></RegisterPage>
            default:
                return <LoginPage setCurrentPage={setCurrentPage}></LoginPage>
        }
}

export default Login;