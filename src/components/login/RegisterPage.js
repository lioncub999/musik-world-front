import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";


function RegisterPage(props) {

    return (
        <div className="register-page">

            <form action="/auth/register_process" method="POST" className='register-box' style={{
                background: 'url(/image/logo.png)',
                backgroundSize: '23%',
                backgroundRepeat: "no-repeat",
                backgroundPosition: 'top',
                backgroundColor: "white"
            }}>

                <div className="login-title">
                    <p className="login-title-text">회원가입</p>
                </div>

                <div className="inputs">
                    <input className="id-input" type="text" name="username" placeholder="이름" required />
                </div>

                <div className="inputs">
                    <input type="password" name='userpw' placeholder='비밀번호' required style={{ top: "32px" }} />
                </div>

                <div className="inputs">
                    <input type="password" name='userpw2' placeholder='비밀번호 확인' required style={{ top: "32px" }} />
                </div>

                <div className="buttons" style={{ height: "100px" }}>
                    <button type="submit" className="register" style={{ top: "42px" }}>회원가입</button>
                </div>

                <div className="buttons">
                    <button type="button" className="back-btn" onClick={() => props.setcurrentpage(0)}>돌아가기</button>
                </div>

                <div className="login-announce">
                    <div className="login-announce-content">
                        <FontAwesomeIcon icon={faLock} className='icons' /><span>&nbsp;비밀번호 제가 볼수있어요</span>
                    </div>
                </div>

            </form>
        </div>
    )

}

export default RegisterPage;