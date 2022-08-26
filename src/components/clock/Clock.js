import './Clock.css';
import { useEffect, useReducer } from "react";
import Slot from './Slot';
let reducer = (state, action) => {
    let result = { ...state };
    result.oldTime = result.currentTime;
    result.currentTime = action;
    let newTimeArray = result.currentTime.split(":")
    let oldTimeArray = result.oldTime.split(":");
    let temp = [];
    let wordList = [
        <img alt="" src="img/0.png" />, <img alt="" src="img/1.png" />,
        <img alt="" src="img/2.png" />, <img alt="" src="img/3.png" />,
        <img alt="" src="img/4.png" />, <img alt="" src="img/5.png" />,
        <img alt="" src="img/6.png" />, <img alt="" src="img/7.png" />,
        <img alt="" src="img/8.png" />, <img alt="" src="img/9.png" />
    ];
    let digitAction,i=2;
    //for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            console.log(newTimeArray[i][j], oldTimeArray[i][j]);
            if (document.hasFocus()) {
                digitAction = "forward";
            } else {
                digitAction = "init";
            }
            temp.push(
                <Slot
                    action={digitAction}
                    className="splitFlap"
                    key={i + "_" + j}
                    newValue={newTimeArray[i][j]}
                    oldValue={oldTimeArray[i][j]} />
            );
        }
    //}
    result.digitList = temp;

    //console.log(oldTimeArray);
    return result;
}
export default function Clock() {
    const [itemList, updateItemList] = useReducer(reducer, {
        currentTime: '00:00:00',
        digitList: [],
        oldTime: '00:00:00'
    });
    let trigger = () => {
        console.log('======================================================');
        console.log('Kicked by interval,Has focus:' + document.hasFocus());
        let now = new Date();
        let options = {
            hourCycle: 'h24',
            hour: "2-digit",
            minute: "numeric",
            second: "numeric",
        }
        updateItemList(now.toLocaleTimeString([], options));
    }
    useEffect(() => {
        let intervalId = setInterval(trigger, 1000);
        return () => {
            clearInterval(intervalId);
        };
    });
    return (
        <div className="clock">{itemList.digitList}</div>
    )
}