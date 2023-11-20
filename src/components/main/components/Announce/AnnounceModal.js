import { Button, Col, Row, Toast } from 'react-bootstrap'
import '../../../../css/main/AnnounceModal.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function AnnounceModal(props) {
    const [modifyCont, setModifyCont] = useState(props.pageAnnounceList[props.anModalNum].AN_CONT)
    const [modifyTitle, setmodifyTitle] = useState(props.pageAnnounceList[props.anModalNum].AN_TITLE)
    const [isModify, setIsModify] = useState(false)

    const modalESC = () => {
        // your logic here
        props.setShowModal(false)
    };

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                event.preventDefault();

                // 👇️ your logic here
                modalESC();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    return (
        <div className="announce-modal-box" onClick={function () {
            props.setShowModal(false)
        }}>


                <div className="announce-num" onClick={function(e) {
                    e.stopPropagation()
                }}>
                    {
                        isModify
                            ?
                            <h5 style={{
                                textAlign: "left",
                                height: "80px",
                                lineHeight: "80px",
                                paddingLeft: "50px",
                                margin: "0px",
                            }}>글 제목 : <input style={{
                                textAlign: "left",
                                height: "40px",
                                paddingLeft: "10px",
                                border: "3px solid blue",
                                borderRadius: "10px",
                                width: "600px"

                            }}
                                defaultValue={modifyTitle}
                                onChange={function (e) {
                                    setmodifyTitle(e.target.value)
                                }}
                                /></h5>

                            :
                            <h5 style={{
                                textAlign: "left",
                                height: "80px",
                                lineHeight: "80px",
                                paddingLeft: "50px",
                                margin: "0px",
                                clear: "both"
                            }}>글 제목 : {modifyTitle}</h5>
                    }

                    <h5 style={{
                        textAlign: "left",
                        paddingLeft: "50px",
                        height: "40px"
                    }}>작성자 : {props.pageAnnounceList[props.anModalNum].REGR_ID}</h5>

                    {
                        isModify
                            ?
                            <div className="announce-cont-box" style={{
                                margin: "auto",
                                width: "90%",
                                height: "500px",
                                border: "3px solid blue",
                                borderRadius: "15px",
                                overflow: "auto",
                            }}>
                                <textarea name="modifyAnnounceCont" id="modifyAnnounceCont" cols="30" rows="10" className='modifyCont'
                                    style={{
                                        width: "100%",
                                        height: "98%",
                                        resize: "none",
                                        padding: "20px",
                                        background: "none",
                                        border: "none"
                                    }}
                                    defaultValue={modifyCont}
                                    onChange={function (e) {
                                        setModifyCont(e.target.value)
                                    }}
                                ></textarea>
                            </div>
                            :
                            <div className="announce-cont-box" style={{
                                margin: "auto",
                                width: "90%",
                                height: "500px",
                                border: "2px solid black",
                                borderRadius: "15px",
                                overflow: "auto",
                            }}>
                                <div className="annoucne-cont" style={{
                                    textAlign: "left",
                                    padding: "20px"
                                }}>
                                    {modifyCont}
                                </div>
                            </div>
                    }

                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <p className="regr-dttm" style={{
                            paddingLeft: "50px",
                            paddingTop: "20px",
                            marginRight: "auto",

                            fontSize: "14px"
                        }}>
                            작성일 : {props.pageAnnounceList[props.anModalNum].REGR_DTTM}
                        </p>

                        {props.userInfo.USER_ROLE >= 2 ?
                            <>
                                <Button variant='danger' style={{
                                    marginRight: "10px",
                                    width: "70px",
                                    height: "40px",
                                }}
                                    onClick={function () {
                                        axios.post("/api/announce/delete", {
                                            postNumber: props.pageAnnounceList[props.anModalNum].AN_ID
                                        }
                                        ).then(function (result) {
                                            props.setShowDeleteToast(true)
                                            props.setShowModal(false)
                                        })
                                    }}
                                >삭제</Button>
                                {
                                    isModify
                                        ?
                                        <Button variant='primary' style={{
                                            marginRight: "10px",
                                            width: "70px",
                                            height: "40px",
                                        }}
                                            onClick={function () {
                                                axios.post('/api/announce/modify', {
                                                    modifyTitle: modifyTitle
                                                    , modifyCont: modifyCont
                                                    , modifyNum: props.pageAnnounceList[props.anModalNum].AN_ID
                                                }).then(function (result) {
                                                    setIsModify(false)
                                                    props.setShowSucsessToast(true)
                                                })
                                            }}
                                        >저장</Button>
                                        :
                                        <Button variant='primary' style={{
                                            marginRight: "10px",
                                            width: "70px",
                                            height: "40px",
                                        }}
                                            onClick={function () {
                                                setIsModify(true)
                                            }}
                                        >수정</Button>
                                }
                            </> : null}
                        <Button variant='secondary' style={{
                            marginRight: "50px",
                            width: "70px",
                            height: "40px",
                        }}
                            onClick={
                                function () {
                                    props.setShowModal(false)
                                }
                            }
                        >닫기</Button>
                    </div>


                </div>

        </div>
    )
}

export default AnnounceModal;