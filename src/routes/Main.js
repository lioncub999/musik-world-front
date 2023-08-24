import '../css/main/Main.css'
import axios from "axios"
import { useState } from "react";
import SideNavbar from '../components/main/SideNavbar';
import HomeContents from '../components/main/HomeContents';
import AnnounceContents from '../components/main/AnnounceContents';
import BoardContents from '../components/main/BoardContents';
import RulletContents from '../components/main/RulletContents';
import MypageContents from '../components/main/MypageContents';


function Main() {
    const [Userinfo, setUserinfo] = useState([])
    const [ContentsNum, setContentsNum] = useState(0)

    axios.get('/userinfo')
        .then((res) =>
            setUserinfo(res.data)
        )
        .catch((err) => {
            console.log(err)
        })

    return (
        <div className='main-page'>
            <SideNavbar  setContentsNum={setContentsNum}></SideNavbar>
            {
                ContentsNum === 0 ? <HomeContents Userinfo={Userinfo}></HomeContents> :
                ContentsNum === 1?  <AnnounceContents></AnnounceContents> : 
                ContentsNum === 2 ? <BoardContents></BoardContents> :
                ContentsNum === 3 ? <RulletContents></RulletContents> :
                ContentsNum === 4 ? <MypageContents></MypageContents> :
                <HomeContents Userinfo={Userinfo}></HomeContents>
            }
        </div>

    )
}




export default Main