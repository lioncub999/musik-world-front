import { Button } from "react-bootstrap";

function AnnounceNew(props) {

    return (
        <div>
            <form action="/api/announce/new" method="POST">
                <input type="text" name="regrId" defaultValue={props.userInfo.USER_NM} style={{
                    display: "none"
                }} />
                <div style={{
                    width: "80%",
                    margin: "auto",
                    textAlign: "left",
                    marginBottom: "20px"
                }}>글제목 : <input type="text" name="announceTitle" style={{ width: "50%" }} /></div>
                <div style={{ width: "80%", margin: "auto" }}>
                    <div style={{ textAlign: "left" }}>글내용</div>
                    <div><textarea type="text" name="announceContent" style={{
                        width: "100%",
                        height: "400px",
                        borderRadius: "15px",
                        resize: "none",
                        padding: "20px"
                    }} /></div>
                </div>
                <div style={{
                    width : "80%",
                    margin : "auto",
                    textAlign: "right"
                }}>
                    <Button type="submit">글작성</Button>
                </div>
            </form>
        </div>
    )
}

export default AnnounceNew;