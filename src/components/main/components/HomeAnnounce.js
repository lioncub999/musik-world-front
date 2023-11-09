function HomeAnnounce(props) {
    return (
        <table className="announce-tb" style={{
            tableLayout: "fixed",
            textAlign: "center",
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
                    }}>작성자</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.announceList.map(function (a, i) {
                        if (i < 5) {
                            return (
                                <tr style={{
                                    borderBottom: "1px solid black",
                                    height: "40px"
                                }} key={i}>
                                    <td>{props.announceList[i].AN_ID}</td>
                                    <td
                                        style={{ textAlign: "left" }}
                                        onClick={function() {
                                            props.setContentsNum(1)
                                        }}
                                    >{props.announceList[i].AN_TITLE}</td>
                                    <td>{props.announceList[i].REGR_ID}</td>
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </table>
    )
}

export default HomeAnnounce;