import { useEffect, useState } from 'react'
import '../../css/main/Home.css'
import axios from 'axios'
import HomeAnnounce from './components/Announce/HomeAnnounce'
import AnnounceModal from './components/Announce/AnnounceModal'
import { Col, Row, Toast } from 'react-bootstrap'

function Homecontents(props) {

    const [homeAnnounceList, setHomeAnnounceList] = useState([])

    const [anModalNum, setAnModalNum] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        axios.post('/api/announce/paging', {
            selectRangeStart: 1,
            selectRangeEnd: 5
        })
            .then((result) => {
                setHomeAnnounceList(result.data)
            })

    }, [showModal])

    const [showSucsessToast, setShowSucsessToast] = useState(false);
    const [showDeleteToast, setShowDeleteToast] = useState(false);
    if (props.userInfo.USER_NM != ('' || null)) {
        return (


            <>
                <Row style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: "11"
                }}>
                    <Col xs={12}>
                        <Toast onClose={() => setShowSucsessToast(false)} show={showSucsessToast} delay={2000} autohide style={{
                            display: "block",
                            margin: "auto",
                            marginTop: "20px",
                        }} bg='success'>
                            <Toast.Body style={{ color: 'white' }}>수정 내용이 저장되었습니다.</Toast.Body>
                        </Toast>
                    </Col>

                </Row>
                <Row style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: "11"
                }}>
                    <Col xs={12}>
                        <Toast onClose={() => setShowDeleteToast(false)} show={showDeleteToast} delay={2000} autohide style={{
                            display: "block",
                            margin: "auto",
                            marginTop: "20px",
                        }} bg='danger'>
                            <Toast.Body style={{ color: 'white' }}>수정 내용이 삭제되었습니다.</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <div className="contents">
                    {showModal ? <AnnounceModal
                        pageAnnounceList={homeAnnounceList}
                        anModalNum={anModalNum}
                        setShowModal={setShowModal}
                        userInfo={props.userInfo}
                        setShowSucsessToast={setShowSucsessToast}
                        setShowDeleteToast={setShowDeleteToast}
                    ></AnnounceModal> : null}

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
                                <HomeAnnounce
                                    homeAnnounceList={homeAnnounceList}
                                    setAnModalNum={setAnModalNum}
                                    setShowModal={setShowModal}
                                    userInfo={props.userInfo}
                                ></HomeAnnounce>
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
            </>
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
