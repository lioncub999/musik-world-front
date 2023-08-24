import '../css/Login.css'

import LoginPage from '../components/login/LoginPage';
import RegisterPage from '../components/login/RegisterPage';
import { useState } from 'react';

function Login() {
        const [currentpage, setcurrentpage] = useState(0);

        switch (currentpage) {
            case 1:
                return <RegisterPage setcurrentpage={setcurrentpage}></RegisterPage>
            default:
                return <LoginPage setcurrentpage={setcurrentpage}></LoginPage>
        }
}

export default Login;