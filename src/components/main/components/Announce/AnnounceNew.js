import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";

function AnnounceNew(props) {

    const [announceTitle, setAnnounceTitle] = useState()
    const [announceContent, setAnnounceContent] = useState()
    const [regrId, setregrId] = useState(props.userInfo.USER_NM)
    return (
        <div>
            <div>
                <div style={{
                    width: "80%",
                    margin: "auto",
                    textAlign: "left",
                    marginBottom: "20px"
                }}>글제목 : <input type="text" name="announceTitle" style={{ width: "50%" }} onChange={function(e) {setAnnounceTitle(e.target.value)}}/></div>
                <div style={{ width: "80%", margin: "auto" }}>
                    <div style={{ textAlign: "left" }}>글내용</div>
                    <div><textarea type="text" onChange={function(e) {setAnnounceContent(e.target.value)}} name="announceContent" style={{
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
                    <Button onClick={function() {
                        axios.post("/api/announce/new", {
                            announceTitle: announceTitle,
                            announceContent: announceContent,
                            regrId: regrId
                        })
                        .then(function(result) {
                            props.setAnNewPage(false)
                            props.setShowSucsessToast(true)
                        })
                    }}>글작성</Button>
                </div>
            </div>
        </div>
    )
}

export default AnnounceNew;