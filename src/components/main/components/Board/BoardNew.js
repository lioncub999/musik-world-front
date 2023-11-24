import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";

function BoardNew(props) {

    const [boardTitle, setBoardTitle] = useState()
    const [boardContent, setBoardContent] = useState()
    const [regrId, setregrId] = useState(props.userInfo.USER_NM)
    return (
        <div>
            <div>
                <div style={{
                    width: "80%",
                    margin: "auto",
                    textAlign: "left",
                    marginBottom: "20px",
                    fontSize: "26px",

                }}>글 제목 : <input type="text" name="boardTitle" style={{ width: "50%", borderRadius: "10px" }} onChange={function (e) { setBoardTitle(e.target.value) }} /></div>
                <div style={{ width: "80%", margin: "auto" }}>
                    <div style={{ textAlign: "left", fontSize: "20px" }}>글내용</div>
                    <div><textarea type="text" onChange={function (e) { setBoardContent(e.target.value) }} name="boardContent" style={{
                        width: "100%",
                        height: "400px",
                        borderRadius: "15px",
                        resize: "none",
                        padding: "20px"
                    }} /></div>
                </div>
                <div style={{
                    width: "80%",
                    margin: "auto",
                    textAlign: "right"
                }}>
                    <Button onClick={function () {
                        axios.post("/api/board/new", {
                            boardTitle: boardTitle,
                            boardContent: boardContent,
                            regrId: regrId
                        })
                            .then(function (result) {
                                props.setBoNewPage(false)
                                props.setShowSucsessToast(true)
                            })
                    }}>글작성</Button>
                </div>
            </div>
        </div>
    )
}

export default BoardNew;