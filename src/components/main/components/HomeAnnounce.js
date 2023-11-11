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
                    props.homeAnnounceList.map(function (a, i) {
                        return (
                            <tr style={{
                                borderBottom: "1px solid black",
                                height: "40px"
                            }} key={i}>
                                <td>{props.homeAnnounceList[i].AN_ID}</td>
                                <td
                                    className="announce-title"
                                    style={{
                                        textAlign: "left",
                                        cursor : "pointer"
                                    }}
                                    onClick={function () {
                                        props.setAnModalNum(i)
                                        props.setShowModal(true)
                                    }}
                                >{props.homeAnnounceList[i].AN_TITLE}</td>
                                <td>{props.homeAnnounceList[i].REGR_ID}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default HomeAnnounce;