import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import AnnounceTable from "./components/Announce/AnnounceTable";
import { Button } from "react-bootstrap";
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

    }, [pageActive])

    useEffect(() => {
        axios.post('/api/announce/paging', {
            selectRangeStart: selectRangeStart,
            selectRangeEnd: selectRangeEnd
        })
            .then((result) => {
                setPageAnnounceList(result.data)
            })

    }, [pageActive])

    if (pageAnnounceList.length > 0 && totalAnnounceCnt > 0) {
        return (
            <>
                {showModal ? <AnnounceModal
                    setShowModal={setShowModal}
                    anModalNum={anModalNum}
                    pageAnnounceList={pageAnnounceList}
                    userInfo={props.userInfo}
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
                                    setAnModalNum={setAnModalNum}></AnnounceTable>
                                <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
                            </>}
                    </div>
                </div>
            </>
        )
    }
}

export default AnnounceContents;