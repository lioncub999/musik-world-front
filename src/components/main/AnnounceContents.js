import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import AnnounceTable from "./components/Announce/AnnounceTable";
import { Button, Col, Row, Toast } from "react-bootstrap";
import AnnounceModal from "./components/Announce/AnnounceModal";
import AnnounceNew from "./components/Announce/AnnounceNew";

function AnnounceContents(props) {

    const [pageAnnounceList, setPageAnnounceList] = useState([])

    const [totalAnnounceCnt, setTotalAnnounceCnt] = useState(0)
    const [selectRangeStart, setSelectRangeStart] = useState(1)
    const [selectRangeEnd, setSelectRangeEnd] = useState(10)

    const [anModalNum, setAnModalNum] = useState(0)

    const [pageActive, setPageActive] = useState(1)

    let items = [];

    const [showModal, setShowModal] = useState(false);

    const [anNewPage, setAnNewPage] = useState(false);

    const [showSucsessToast, setShowSucsessToast] = useState(false);
    const [showDeleteToast, setShowDeleteToast] = useState(false);



    for (let number = 1; number <= Math.ceil(totalAnnounceCnt / 10); number++) {
        items.push(
            <Pagination.Item key={number} active={number === pageActive} onClick={function () {
                setPageActive(number)
                setSelectRangeStart(number * 10 - 9)
                setSelectRangeEnd(number * 10)
            }}>
                {number}
            </Pagination.Item>,
        );

    }

    useEffect(() => {
        axios.get('/api/announce', {
        })
            .then((result) => {
                setTotalAnnounceCnt(result.data.length)
            })

    }, [pageActive, showModal, anNewPage])

    useEffect(() => {
        axios.post('/api/announce/paging', {
            selectRangeStart: selectRangeStart,
            selectRangeEnd: selectRangeEnd
        })
            .then((result) => {
                setPageAnnounceList(result.data)
            })

    }, [pageActive, showModal, anNewPage])

    if (pageAnnounceList.length > 0 && totalAnnounceCnt > 0) {
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

                {showModal ? <AnnounceModal
                    setShowModal={setShowModal}
                    anModalNum={anModalNum}
                    pageAnnounceList={pageAnnounceList}
                    userInfo={props.userInfo}
                    setShowSucsessToast={setShowSucsessToast}
                    setShowDeleteToast={setShowDeleteToast}
                ></AnnounceModal> : null}
                
                <div className="contents" style={{ zIndex: "1" }}>
                    <div className="title-box">
                        <div className="title">
                            ANNOUNCE
                        </div>
                    </div>
                    <div className="title-line-box">
                        <div className="title-line"></div>
                    </div>
                    <div className="announce-box" style={{
                        textAlign: "center"
                    }}>

                        {anNewPage ? <AnnounceNew
                            userInfo={props.userInfo}
                            setAnNewPage={setAnNewPage}
                            setShowSucsessToast={setShowSucsessToast}
                        ></AnnounceNew> :
                            <>
                                {props.userInfo.USER_ROLE >= 2 ?
                                    <div className="create-announce" style={{ textAlign: "left" }}>
                                        <Button onClick={function () {
                                            setAnNewPage(true)
                                        }}>글쓰기</Button>
                                    </div>
                                    : null}

                                <AnnounceTable
                                    pageAnnounceList={pageAnnounceList}
                                    setShowModal={setShowModal}
                                    setAnModalNum={setAnModalNum}>
                                </AnnounceTable>
                                <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
                            </>}
                    </div>
                </div>
            </>
        )
    }
}

export default AnnounceContents;