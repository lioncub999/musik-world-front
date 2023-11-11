import { Button } from 'react-bootstrap'
import '../../css/main/AnnounceModal.css'

function AnnounceModal(props) {

    return (
        <div className="announce-modal-box" onClick={function () {
            props.setShowModal(false)
        }}>
            <div className="announce-modal" onClick={function (e) {
                e.stopPropagation()
            }}>
                <div className="announce-num">
                    <h5 style={{
                        textAlign: "left",
                        height: "80px",
                        lineHeight: "80px",
                        paddingLeft: "50px",
                        margin: "0px"
                    }}>글 제목 : {props.pageAnnounceList[props.anModalNum].AN_TITLE}</h5>
                    <h5 style={{
                        textAlign: "left",
                        paddingLeft: "50px",
                        height : "40px"
                    }}>작성자 : {props.pageAnnounceList[props.anModalNum].REGR_ID}</h5>
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
                            {props.pageAnnounceList[props.anModalNum].AN_CONT}
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <p className="regr-dttm" style={{
                            paddingLeft: "50px",
                            paddingTop: "20px",
                            marginRight: "auto",

                            fontSize : "14px"
                        }}>
                            작성일 : {props.pageAnnounceList[props.anModalNum].REGR_DTTM}
                        </p>
                        <Button variant='secondary' style={{
                            marginRight: "50px",
                            width: "70px",
                            height: "40px",
                        }}
                        onClick={function() {
                            props.setShowModal(false)
                        }}
                        >닫기</Button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default AnnounceModal;