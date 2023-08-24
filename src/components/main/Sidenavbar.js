import '../../css/main/Sidenavbar.css'

function Sidenavbar() {
    return(
        <div>
            <div className="nav-bar-box">
                <div className="nav-bar">

                    <div className="nav-logo">
                        <p className="nav-log-img">로고이미지</p>
                    </div>

                    <div id="nav-home" className='nav-contents-box active'>
                        <div className="nav-contents-text">
                            홈
                        </div>
                    </div>

                    <div id="nav-announce" className='nav-contents-box'>
                        <div className="nav-contents-text">
                            공지
                        </div>
                    </div>

                    <div id="nav-board" className='nav-contents-box'>
                        <div className="nav-contents-text">
                            게시판
                        </div>
                    </div>

                    <div id="nav-rullet" className='nav-contents-box'>
                        <div className="nav-contents-text">
                            룰렛
                        </div>
                    </div>

                    <div id="nav-mypage" className='nav-contents-box'>
                        <div className="nav-contents-text">
                            마이페이지
                        </div>
                    </div>

                    <div className="logout-btn" onClick={()=> {
                        window.location.href = '/auth/logout'
                    }}>
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