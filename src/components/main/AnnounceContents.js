function AnnounceContents() {
    return (
        <div className="contents">
            <div className="title-box">
                <div className="title">
                    ANNOUNCE
                </div>
            </div>
            <div className="title-line-box">
                <div className="title-line"></div>
            </div>
            <div className="announce-box">
                <table className="announce-tb" style={{
                    tableLayout: "fixed",
                    width: "100%",
                }}>
                    <thead style={{
                        borderBottom: "1px solid black"
                    }}>
                        <tr>
                            <th style={{
                                width : "10%"
                            }}>#</th>
                            <th style={{
                                width : "50%"
                            }}>제목</th>
                            <th style={{
                                width : "20%"
                            }}>작성일</th>
                            <th style={{
                                width : "20%"
                            }}>수정일</th>
                            <th style={{
                                width : "10%"
                            }}>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{
                            borderBottom: "1px solid black",
                            height : "40px"
                        }}>
                            <td>1</td>
                            <td>제목 TEST</td>
                            <td>작성일 TEST</td>
                            <td>수정일 TEST</td>
                            <td>작성자 TEST</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AnnounceContents;