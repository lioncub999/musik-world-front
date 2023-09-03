import { useState } from 'react';
import '../../css/main/Sidenavbar.css'
import $ from 'jquery'
import { useEffect } from 'react';

function Sidenavbar(props) {
    const [SidebarMenu] = useState(['홈', '공지', '게시판', '룰렛', '마이페이지'])
    const [SidebarSelected, setSidebarSelected] = useState(0)

    useEffect(() => {
        $('.nav-contents-box').eq(SidebarSelected).addClass('selected')
    }, [SidebarSelected])

    return (
        <div>
            <div className="nav-bar-box">
                <div className="nav-bar">

                    <div className="nav-logo">
                        <p className="nav-log-img">로고이미지</p>
                    </div>

                    {
                        SidebarMenu.map((a, i) => {
                            return (
                                <NavTitle key={i} CheckIndex={SidebarMenu} SidebarMenu={SidebarMenu[i]} setSidebarSelected={setSidebarSelected} setContentsNum={props.setContentsNum}></NavTitle>
                            )
                        })
                    }

                    <div className="logout-btn" onClick={() => { window.location.href = '/auth/logout' }}>
                        <div className="logout-text">
                            Logout
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

function NavTitle(props) {
    return (
        <div data-count={props.SidebarMenu} id="nav-home" className='nav-contents-box' onClick={(e) => {
            let tg = e.currentTarget.dataset.count;
            $('.nav-contents-box').removeClass('selected');
            setTimeout(() => {
                var index = props.CheckIndex.indexOf(tg);
                $('.nav-contents-box').eq(index).addClass('selected');
                props.setContentsNum(1000);
                props.setContentsNum(index);
            }, 50);
        }}>
            <div className="nav-bg"></div>
            <div className="nav-contents-text">
                {props.SidebarMenu}
            </div>
        </div>
    )
}

export default Sidenavbar;