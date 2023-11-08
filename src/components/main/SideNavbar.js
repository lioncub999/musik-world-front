import { useState } from 'react';
import '../../css/main/Sidenavbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBullhorn, faClipboard, faGamepad, faUser } from "@fortawesome/free-solid-svg-icons";

function Sidenavbar(props) {
    const sidebarMenu = ['홈', '공지', '게시판', '룰렛', '마이페이지']
    const [isSelected, setIsSelected] = useState(['selected', '', '', '', ''])
    const [icons, setIcons] = useState([faHouse, faBullhorn, faClipboard, faGamepad, faUser])

    return (
        <div>
            <div className="nav-bar-box">
                <div className="nav-bar">

                    <div className="nav-logo" style={{
                        background: 'url(/image/logo.png)',
                        backgroundSize: "60%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "306px",
                        height: "120px"


                    }}>
                    </div>

                    {
                        sidebarMenu.map((a, i) => {
                            return (
                                <div className={`nav-contents-box ${isSelected[i]}`} key={i}
                                    onClick={function (e) {
                                        let copy = [...isSelected]
                                        copy = ['', '', '', '', '']
                                        props.setContentsNum(i)
                                        setTimeout((e) => {
                                            clearTimeout(e)
                                            copy[i] = 'selected'
                                            setIsSelected(copy)
                                        }, 100);
                                    }}
                                >
                                    <div className="nav-bg"></div>

                                    <div className="nav-contents-text">
                                        <FontAwesomeIcon icon={icons[i]} /> {a}
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="logout-btn" onClick={() => { window.location.href = '/api/auth/logout' }}>
                        <div className="logout-text">
                            Logout
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidenavbar;
