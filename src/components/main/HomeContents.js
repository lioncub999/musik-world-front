import { useEffect, useState } from 'react'
import '../../css/main/Home.css'
import axios from 'axios'
import HomeAnnounce from './components/HomeAnnounce'

function Homecontents(props) {

    const [totalAnnounce, setTotalAnnounce] = useState(0)
    const [announceList, setAnnounceList] = useState([])

    useEffect(() => {
        axios.post('/api/announce/paging', {
            selectRangeStart: 1,
            selectRangeEnd: 999999
        })
            .then((result) => {
                setAnnounceList(result.data)
                setTotalAnnounce(result.data.length)
            })

    }, [])

    if (props.userInfo.USER_NM != ('' || null)) {
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
                        <p>안녕하세요 {props.userInfo.USER_NM} 님</p>
                        <BalanceSplit UserBalance={props.userInfo.USER_POINT}></BalanceSplit>
                    </div>
                    <div className="home-etc">
                        <div className="home-etc-box">
                            <p className="home-etc-title">
                                공지
                            </p>
                            <HomeAnnounce announceList={announceList} setContentsNum={props.setContentsNum}></HomeAnnounce>
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
}

function BalanceSplit(props) {
    var UserBalance = props.UserBalance;
    if (UserBalance === undefined) {
        return <p>잔여포인트 : <span className="balance"> </span>포인트</p>

    } else {
        UserBalance = UserBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (
            <p>잔여포인트 : <span className="balance"> {UserBalance}</span>포인트</p>
        )
    }
}

export default Homecontents;
