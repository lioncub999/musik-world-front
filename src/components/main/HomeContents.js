import '../../css/main/Home.css'

function Homecontents(props) {
    return (
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
                    <BalanceSplit userbalance={props.Userinfo.userbalance}></BalanceSplit>
                </div>
                <div className="home-etc">
                    <div className="home-etc-box">
                        <p className="home-etc-title">
                            공지
                        </p>
                    </div>

                    <div className="home-etc-box" style={{
                        marginLeft: "40px"
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

function BalanceSplit(props) {
    var balance = props.userbalance;
    if (balance == undefined) {
        return <p>잔여포인트 : <span className="balance"> </span>포인트</p>

    } else {
        balance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (
            <p>잔여포인트 : <span className="balance"> {balance}</span>포인트</p>
        )
    }
}

export default Homecontents;