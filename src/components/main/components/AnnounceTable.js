function AnnounceTable(props) {

        return (
            <>

                <div className="table-box" style={{
                    height: "450px",
                    overflow: "hidden"
                }}>
                    <table className="announce-tb" style={{
                        tableLayout: "fixed",
                        width: "100%",
                    }}>
                        <thead style={{
                            borderBottom: "1px solid black"
                        }}>
                            <tr>
                                <th style={{
                                    width: "10%"
                                }}>#</th>
                                <th style={{
                                    width: "50%",
                                }}>제목</th>
                                <th style={{
                                    width: "20%"
                                }}>작성일</th>
                                <th style={{
                                    width: "20%"
                                }}>수정일</th>
                                <th style={{
                                    width: "10%"
                                }}>작성자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.pageAnnounceList.map(function (a, i) {
                                    return (
                                        <tr style={{
                                            borderBottom: "1px solid black",
                                            height: "40px"
                                        }} key={i}>
                                            <td>{props.pageAnnounceList[i].AN_ID}</td>
                                            <td style={{ 
                                                textAlign: "left",
                                                cursor : "pointer"
                                                }}
                                                className="announce-title"
                                                onClick={function() {
                                                    props.setShowModal(true)
                                                    props.setAnModalNum(i)
                                                }}
                                                >{props.pageAnnounceList[i].AN_TITLE}</td>
                                            <td>{props.pageAnnounceList[i].REGR_DTTM}</td>
                                            <td>{props.pageAnnounceList[i].CHGR_DTTM}</td>
                                            <td>{props.pageAnnounceList[i].REGR_ID}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </>
        )
}

export default AnnounceTable;