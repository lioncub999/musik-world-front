import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function LoginPage(props) {

    return (
        <div className="login-page">

            <form action="/auth/login_process" method='POST' className='login-box' >
                <div className="logo-img" style={{
                    background: 'url(/image/logo.png)',
                    backgroundSize: '23%',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'top',
                    backgroundColor: "white"
                }}>
                </div>

                <div className="login-title">
                    <p className="login-title-text"></p>
                </div>

                <div className="inputs">
                    <input type="text" className="id-input" name='username' placeholder='이름' required />
                </div>

                <div className="inputs">
                    <input type="password" name='userpw' placeholder='비밀번호' required style={{ top: "32px" }} />
                </div>

                <div className="buttons" style={{ height: "100px" }}>
                    <button className="login-btn" type='submit' style={{ top: "42px" }}>로그인</button>
                </div>

                <div className="buttons">
                    <button className="register-btn" type='button' onClick={() => props.setcurrentpage(1)}>회원가입</button>
                </div>

                <div className="login-announce">
                    <div className="login-announce-content">
                        <FontAwesomeIcon icon={faLock} className='icons' /><span>&nbsp;열심히 개발중이에요~</span>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default LoginPage;