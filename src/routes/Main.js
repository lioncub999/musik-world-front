import '../css/main/Main.css'
import axios from "axios"
import { useState } from "react";
import Sidenavbar from '../components/main/Sidenavbar';
import Homecontents from '../components/main/home/Homecontents';


function Main() {
    const [userinfo, setuserinfo] = useState([])

    axios.get('/userinfo')
        .then((res) =>
            setuserinfo(res.data)
        )
        .catch((err) => {
            console.log(err)
        })

    return (
        <div className='main-page'>
            <Sidenavbar></Sidenavbar>
            <Homecontents userinfo={userinfo}></Homecontents>
        </div>

    )
}




export default Main