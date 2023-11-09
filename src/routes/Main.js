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
        axios.get('/api/userinfo')
        .then((res) =>
            setUserInfo(res.data[0])
        )
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className='main-page'>
            <SideNavbar  setContentsNum={setContentsNum}></SideNavbar>
            {
                contentsNum === 0 ? <HomeContents userInfo={userInfo} setContentsNum={setContentsNum}></HomeContents> :
                contentsNum === 1 ? <AnnounceContents></AnnounceContents> : 
                contentsNum === 2 ? <BoardContents></BoardContents> :
                contentsNum === 3 ? <RulletContents userInfo={userInfo}></RulletContents> :
                contentsNum === 4 ? <MypageContents></MypageContents> :
                <HomeContents userInfo={userInfo}></HomeContents>
            }
        </div>

    )
}




export default Main