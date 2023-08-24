import '../../css/main/Home.css'
import $ from 'jquery';

function Homecontents(props) {
    var balance = $('.balance').text()
    balance = balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $('.balance').html(balance);
    return(
        <div className="contents">
            <div className="title-box">
                <div className="title">
                    HOME
                </div>
            </div>
            <div className="title-line-box">
                <div className="title-line"></div>
            </div>
            <div className="contents-content">
                <div className="login-info">
                    <p>안녕하세요 {props.Userinfo.username} 님</p>
                    <p>잔여포인트 : <span className="balance"> {props.Userinfo.userbalance}</span>포인트</p>
                </div>
                <div className="home-etc">
                    <div className="home-etc-box">
                        <p className="home-etc-title">
                            공지
                        </p>
                    </div>

                    <div className="home-etc-box" style={{
                        marginLeft : "40px"
                    }}>
                        <p className="home-etc-title">
                            미니게임
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Homecontents;