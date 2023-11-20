import '../css/main/Main.css'
import axios from "axios"
import { useEffect, useState } from "react";
import SideNavbar from '../components/main/SideNavbar';
import HomeContents from '../components/main/HomeContents';
import AnnounceContents from '../components/main/AnnounceContents';
import BoardContents from '../components/main/BoardContents';
import RulletContents from '../components/main/RulletContents';
import MypageContents from '../components/main/MypageContents';



function Main() {
    const [userInfo, setUserInfo] = useState([]);
    const [contentsNum, setContentsNum] = useState(0);

    useEffect(() => {
        axios.post('/api/userinfo')
            .then((res) =>
                setUserInfo(res.data[0])
            )
            .catch((err) => {
                console.log(err)
            })
    }, [contentsNum])

    return (
        <>
            <div className='main-page' style={{display:"flex"}}>
                <div className="sidebar" style={{flexBasis:"306px"}}>
                    <SideNavbar setContentsNum={setContentsNum}></SideNavbar>
                </div>
                {
                    contentsNum === 0 ? 
                    <div style={{flexBasis:"1200px"}}><HomeContents userInfo={userInfo} setContentsNum={setContentsNum}></HomeContents></div> :
                        contentsNum === 1 ? <AnnounceContents userInfo={userInfo}></AnnounceContents> :
                            contentsNum === 2 ? <BoardContents></BoardContents> :
                                contentsNum === 3 ? <RulletContents userInfo={userInfo}></RulletContents> :
                                    contentsNum === 4 ? <MypageContents></MypageContents> :
                                        <HomeContents userInfo={userInfo}></HomeContents>
                }
            </div>
        </>
    )
}




export default Main