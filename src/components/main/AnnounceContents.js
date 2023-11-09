import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import AnnounceTable from "./components/AnnounceTable";
import { Button } from "react-bootstrap";
import AnnounceModal from "./AnnounceModal";

function AnnounceContents() {

    const [announceList, setAnnounceList] = useState([])

    const [totalAnnounce, setTotalAnnounce] = useState(0)
    const [selectRangeStart, setSelectRangeStart] = useState(1)
    const [selectRangeEnd, setSelectRangeEnd] = useState(10)

    const [pageActive, setPageActive] = useState(1)

    let items = [];

    for (let number = 1; number <= Math.ceil(totalAnnounce / 10); number++) {
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
                setTotalAnnounce(result.data[0].TOTAL_ANNOUNCE)
            })

    }, [])

    useEffect(() => {
        axios.post('/api/announce/paging', {
            selectRangeStart: selectRangeStart,
            selectRangeEnd: selectRangeEnd
        })
            .then((result) => {
                setAnnounceList(result.data)
                console.log(result.data)
            })

    }, [pageActive])

    if (announceList.length > 0 && totalAnnounce > 0) {
        return (
            <>
                <AnnounceModal></AnnounceModal>
                <div className="contents" style={{zIndex : "-1"}}>
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
                        <div className="create-announce" style={{ textAlign: "center" }}>
                            <Button>글쓰기</Button>
                        </div>
                        <AnnounceTable announceList={announceList}></AnnounceTable>
                        <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
                    </div>

                </div>
            </>
        )
    }
}

export default AnnounceContents;