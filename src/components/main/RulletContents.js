import { useEffect, useState } from 'react';
import '../../css/main/Rullet.css'
import '../../css/main/RulletBoard.css'
import Rullet from './components/Rullet';


function RulletContents() {
    useEffect(() => {
        //1 - 10, 3 - 5. 5 - 3. 10 - 2, 20 - 1
        // "1" idx = 0, 3, 5, 7, 9, 11, 13, 15, 17, 19
        // "3" idx = 1, 4, 10, 14, 18
        // "5" idx = 2, 8, 12
        // "10" idx = 6, 16
        // "20" idx = 21
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
        const wheel = document.querySelector(".deal-wheel");
        const spinner = wheel.querySelector(".spinner");
        const trigger = wheel.querySelector(".btn-spin");
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

        const selectPrize = () => {
            const selected = Math.floor(rotation / prizeSlice);
            prizeNodes[selected].classList.add(selectedClass);
            reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;
            console.log(selected);
        };


        //휠 버튼 클릭시 이벤트
        trigger.addEventListener("click", () => {
            if (reaper.dataset.reaction !== "resting") {
                reaper.dataset.reaction = "resting";
            }

            trigger.disabled = true;
            rotation = Math.floor(Math.random() * 360 + spinertia(1000, 500));
            prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
            wheel.classList.add(spinClass);
            spinner.style.setProperty("--rotate", rotation);
            ticker.style.animation = "none";
            runTickerAnimation();
        });

        //휠 멤췄을때 
        spinner.addEventListener("transitionend", () => {
            cancelAnimationFrame(tickerAnim);
            trigger.disabled = false;
            trigger.focus();
            rotation %= 360;
            selectPrize();
            wheel.classList.remove(spinClass);
            spinner.style.setProperty("--rotate", rotation);
        });

        setupWheel();
    })
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
                        <button className="btn-spin">배팅~</button>
                    </div>
                </div>
                <div className="rullet-box"></div>
            </div>
        </div>

    )
}

export default RulletContents;