import { useEffect, useState } from 'react';
import '../../css/main/Rullet.css'
import '../../css/main/RulletBoard.css'
import Rullet from './components/Rullet';
import axios from 'axios';
import $ from 'jquery';

function RulletContents(props) {
    const [UserBatNum, setUserBatNum] = useState(null);
    const [UserBalance, setUserBalance] = useState(props.UserInfo.userbalance)
    useEffect(() => {
        //1 - 10, 3 - 5. 5 - 3. 10 - 2, 20 - 1
        // "1" idx = 0, 3, 5, 7, 9, 11, 13, 15, 17, 19
        // "3" idx = 1, 4, 10, 14, 18
        // "5" idx = 2, 8, 12
        // "10" idx = 6, 16
        // "20" idx = 21
        // 돌림판 구성
        const prizes = [
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "3",
                color: "#31B404",
                reaction: "dancing"
            },
            {
                text: "5",
                color: "#2E2EFE",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "3",
                color: "#31B404",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "10",
                color: "#5F04B4",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "5",
                color: "#2E2EFE",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "3",
                color: "#31B404",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "5",
                color: "#2E2EFE",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "3",
                color: "#31B404",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "10",
                color: "#5F04B4",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "3",
                color: "#31B404",
                reaction: "dancing"
            },
            {
                text: "1",
                color: "#AEB404",
                reaction: "dancing"
            },
            {
                text: "20",
                color: "#B404AE",
                reaction: "dancing"
            }
        ]
        var SelectedNum;
        var userBattingNum;
        const wheel = document.querySelector(".deal-wheel");
        const spinner = wheel.querySelector(".spinner");
        const trigger = document.querySelector(".btn-spin");
        const ticker = wheel.querySelector(".ticker");
        const reaper = wheel.querySelector(".grim-reaper");
        const prizeSlice = 360 / prizes.length;
        const prizeOffset = Math.floor(180 / prizes.length);
        const spinClass = "is-spinning";
        const selectedClass = "selected";
        const spinnerStyles = window.getComputedStyle(spinner);
        let tickerAnim;
        let rotation = 0;
        let currentSlice = 0;
        let prizeNodes;

        const createPrizeNodes = () => {
            prizes.forEach(({ text, color, reaction }, i) => {
                const rotation = ((prizeSlice * i) * -1) - prizeOffset;

                spinner.insertAdjacentHTML(
                    "beforeend",
                    `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
                        <span class="text">${text}</span>
                    </li>`
                );
            });
        };

        const createConicGradient = () => {
            spinner.setAttribute(
                "style",
                `background: conic-gradient(
            from -90deg,
          ${prizes
                    .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
                    .reverse()
                }
        );`
            );
        };

        //휠 세팅
        const setupWheel = () => {
            createConicGradient();
            createPrizeNodes();
            prizeNodes = wheel.querySelectorAll(".prize");
        };

        const spinertia = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const runTickerAnimation = () => {
            const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
            const a = values[0];
            const b = values[1];
            let rad = Math.atan2(b, a);

            if (rad < 0) rad += (2 * Math.PI);

            const angle = Math.round(rad * (180 / Math.PI));
            const slice = Math.floor(angle / prizeSlice);

            if (currentSlice !== slice) {
                ticker.style.animation = "none";
                setTimeout(() => ticker.style.animation = null, 10);
                currentSlice = slice;
            }

            tickerAnim = requestAnimationFrame(runTickerAnimation);
        };

        //휠 멈출때 셀렉트된 idx값 출력
        const selectPrize = () => {
            const selected = Math.floor(rotation / prizeSlice);
            prizeNodes[selected].classList.add(selectedClass);
            reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;

            if (selected === 0 || selected === 3 || selected === 5 || selected === 7 || selected === 9 || selected === 11 || selected === 13 || selected === 15 || selected === 17) {
                SelectedNum = 1;
            } else if (selected === 1 || selected === 4 || selected === 10 || selected === 14 || selected === 18) {
                SelectedNum = 3;
            } else if (selected === 2 || selected === 8 || selected === 12) {
                SelectedNum = 5;
            } else if (selected === 6 || selected === 16) {
                SelectedNum = 10;
            } else if (selected === 21) {
                SelectedNum = 20;
            }
        };

        //휠 버튼 클릭시 이벤트
        trigger.addEventListener("click", () => {
            if (reaper.dataset.reaction !== "resting") {
                reaper.dataset.reaction = "resting";
            }
            trigger.disabled = true;
            rotation = Math.floor(Math.random() * 360 + spinertia(2000, 1000));
            prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
            wheel.classList.add(spinClass);
            spinner.style.setProperty("--rotate", rotation);
            ticker.style.animation = "none";
            runTickerAnimation();

            var userBattingPoint = $(".batting-point").val();
            userBattingNum = $('.userBatting').text();

            //배팅값 숫자인지 확인
            const regex = /^[0-9]+$/;
            if (regex.test(userBattingPoint)) {
                //숫자면 배팅값 >= 잔액 인지 확인
                axios.post("/rullet/rullet-check", {
                    username: props.UserInfo.username,
                    userbatting: userBattingPoint
                })
                    .then(function (result) {
                        if (result.data === "잔액부족") {
                            alert("잔여 포인트가 부족합니다.");
                        } else {
                            $(".userbalance").html(parseInt(props.UserInfo.userbalance) - parseInt(userBattingPoint));

                            //프론트 출력값 깎고 db에서도 값 깎음
                            axios.post("/rullet/rullet-roll", {
                                username: props.UserInfo.username,
                                userbatting: userBattingPoint
                            })
                                .then(function (result) {
                                    setUserBalance(result.data[0].userbalance);
                                })
                        }
                    })
            } else {
                alert("배팅 금액을 다시 확인하세요.");
            }
        });

        //휠 멤췄을때 
        spinner.addEventListener("transitionend", () => {
            cancelAnimationFrame(tickerAnim);
            trigger.disabled = false;
            trigger.focus();
            rotation %= 360;
            selectPrize();
            if (SelectedNum == userBattingNum) {
            }
            console.log(SelectedNum);
            wheel.classList.remove(spinClass);
            spinner.style.setProperty("--rotate", rotation);
        });


        setupWheel();
    }, [])
    return (
        <div className="contents">
            <div className="title-box">
                <div className="title">
                    RULLET
                </div>
            </div>
            <div className="title-line-box">
                <div className="title-line"></div>
            </div>

            <div className="contents-content">
                <div className="rullet-box">
                    <div className="deal-wheel">
                        <ul className="spinner"></ul>
                        <figure className="cap">
                            <Rullet></Rullet>
                        </figure>
                        <div className="ticker"></div>

                    </div>
                </div>
                <div className="rullet-box" style={{
                    marginLeft: "40px",
                }}>
                    <div className="rullet-userinfo" style={{
                        width: "100%",
                        textAlign: "left"
                    }}>
                        <p>내 잔여 포인트 : <span className='userbalance'>{UserBalance}</span></p>
                        <p>배팅 금액 : <span><input type='number' className="batting-point" /></span></p>
                        <span className="batNum">
                            <button className="bat-1" onClick={() => setUserBatNum(1)}>1</button>
                            <button className="bat-3" onClick={() => setUserBatNum(3)}>3</button>
                            <button className="bat-5" onClick={() => setUserBatNum(5)}>5</button>
                            <button className="bat-10" onClick={() => setUserBatNum(10)}>10</button>
                            <button className="bat-20" onClick={() => setUserBatNum(20)}>20</button>
                        </span>
                        <p>배팅 확인 : <span className="userBatting">{UserBatNum}</span></p>
                        <button className="btn-spin">배팅~</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RulletContents;