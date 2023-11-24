import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Pagination, Row, Toast } from "react-bootstrap"
import AnnounceNew from "./components/Announce/AnnounceNew"
import BoardTable from "./components/Board/BoardTable"
import BoardModal from "./components/Board/BoardModal"
import BoardNew from "./components/Board/BoardNew"

function BoardContents(props) {

    const [pageBoardList, setPageBoardList] = useState([])

    const [totalBoardCnt, setTotalBoardCnt] = useState(0)
    const [selectRangeStart, setSelectRangeStart] = useState(1)
    const [selectRangeEnd, setSelectRangeEnd] = useState(10)

    const [boModalNum, setBoModalNum] = useState(0)

    const [pageActive, setPageActive] = useState(1)

    let items = [];

    const [showModal, setShowModal] = useState(false);

    const [boNewPage, setBoNewPage] = useState(false);

    const [showSucsessToast, setShowSucsessToast] = useState(false);
    const [showDeleteToast, setShowDeleteToast] = useState(false);

    for (let number = 1; number <= Math.ceil(totalBoardCnt / 10); number++) {
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
        axios.get('/api/board', {
        })
            .then((result) => {
                setTotalBoardCnt(result.data.length)
            })

    }, [pageActive, showModal, boNewPage])

    useEffect(() => {
        axios.post('/api/board/paging', {
            selectRangeStart: selectRangeStart,
            selectRangeEnd: selectRangeEnd
        })
            .then((result) => {
                setPageBoardList(result.data)
            })

    }, [pageActive, showModal, boNewPage])

    if (pageBoardList.length > 0 && totalBoardCnt > 0) {
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

                {showModal ? <BoardModal
                    setShowModal={setShowModal}
                    boModalNum={boModalNum}
                    pageBoardList={pageBoardList}
                    userInfo={props.userInfo}
                    setShowSucsessToast={setShowSucsessToast}
                    setShowDeleteToast={setShowDeleteToast}
                ></BoardModal> : null}

                <div className="contents" style={{ zIndex: "1" }}>
                    <div className="title-box">
                        <div className="title">
                            BOARD
                        </div>
                    </div>
                    <div className="title-line-box">
                        <div className="title-line"></div>
                    </div>
                    <div className="announce-box" style={{
                        textAlign: "center"
                    }}>

                        {boNewPage ? <BoardNew
                            userInfo={props.userInfo}
                            setBoNewPage={setBoNewPage}
                            setShowSucsessToast={setShowSucsessToast}
                        ></BoardNew> :
                            <>
                                {props.userInfo.USER_ROLE >= 0 ?
                                    <div className="create-board" style={{ textAlign: "left" }}>
                                        <Button onClick={function () {
                                            setBoNewPage(true)
                                        }}>글쓰기</Button>
                                    </div>
                                    : null}

                                <BoardTable
                                    pageBoardList={pageBoardList}
                                    setShowModal={setShowModal}
                                    setBoModalNum={setBoModalNum}>
                                </BoardTable>
                                <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
                            </>}

                    </div>
                </div>
            </>
        )
    }
}

export default BoardContents;