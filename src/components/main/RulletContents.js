import { useEffect } from 'react';
import '../../css/main/Rullet.css'
import '../../css/main/RulletBoard.css'
import Rullet from './components/Rullet';


function RulletContents() {
    useEffect(() => {
        const prizes = [
            {
                text: "1",
                color: "hsl(197 30% 43%)",
                reaction: "dancing"
            },
            {
                text: "2",
                color: "hsl(173 58% 39%)",
                reaction: "shocked"
            },
            {
                text: "3",
                color: "hsl(43 74% 66%)",
                reaction: "shocked"
            },
            {
                text: "4",
                color: "hsl(27 87% 67%)",
                reaction: "shocked"
            },
            {
                text: "5",
                color: "hsl(12 76% 61%)",
                reaction: "dancing"
            },
            {
                text: "6",
                color: "hsl(350 60% 52%)",
                reaction: "laughing"
            }
        ];

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


                    <div class="deal-wheel">
                        <ul class="spinner"></ul>
                        <figure class="cap">
                            <Rullet></Rullet>
                        </figure>
                        <div class="ticker"></div>
                        <button class="btn-spin">배팅</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RulletContents;