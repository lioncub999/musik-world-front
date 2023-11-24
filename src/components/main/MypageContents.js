import axios from "axios";
import { useState } from "react";
import { Button, Col, Row, Toast } from "react-bootstrap";

function MypageContents(props) {

    const [isModify, setIsModify] = useState(false)
    const [showSucsessToast, setShowSucsessToast] = useState(false)

    if (props.userInfo != undefined) {
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
                            <Toast.Body style={{ color: 'white' }}>비밀번호 초기화 완료.</Toast.Body>
                        </Toast>
                    </Col>

                </Row>
                <div className="contents">
                    <div className="title-box">
                        <div className="title">
                            MYPAGE
                        </div>
                    </div>
                    <div className="title-line-box">
                        <div className="title-line"></div>
                    </div>
                    <div className="mypage-box">
                        <Button variant="outline-danger" onClick={function () {
                            axios.post('/api/auth/resetpw', {
                                userNm: props.userInfo.USER_NM
                            })
                                .then(function (result) {
                                    setShowSucsessToast(true)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })


                        }}>비밀번호 초기화</Button>{' '}

                        <div className="mypage-nm" style={{ display: "flex", marginTop: "20px" }}>
                            <p style={{ lineHeight: "40px", margin: "0px" }}>이름 : </p>
                            {isModify
                                ?
                                <input type="text" defaultValue={props.userInfo.USER_NM} />
                                :
                                <p style={{ lineHeight: "40px", margin: "0px" }}>{props.userInfo.USER_NM}</p>}

                        </div>
                        <div className="mypage-ph" style={{ display: "flex", marginTop: "20px" }}>
                            <p style={{ lineHeight: "40px", margin: "0px" }}>핸드폰번호 : </p>
                            {
                                isModify
                                    ?
                                    <input type="text" defaultValue={props.userInfo.USER_PHONE} />
                                    :
                                    <p style={{ lineHeight: "40px", margin: "0px" }}>{props.userInfo.USER_PHONE}</p>
                            }
                        </div>



                        {
                            isModify ?
                                <Button onClick={function () {
                                    setIsModify(false)
                                }}>저장</Button>
                                :
                                <Button onClick={function () {
                                    setIsModify(true)
                                }}>수정</Button>
                        }

                    </div>
                </div>
            </>
        )
    }
}

export default MypageContents;