import Slot from "./Slot";
import "./Clock.css";
import { useState } from "react";
import { useInterval } from "./useInterval";
export default function Clock() {
    const [itemList, updateItemList] = useState({ digitList: [], oldTime: '00:00:00' });
    let wordList = [
        <img alt="" src="img/0.png" />, <img alt="" src="img/1.png" />,
        <img alt="" src="img/2.png" />, <img alt="" src="img/3.png" />,
        <img alt="" src="img/4.png" />, <img alt="" src="img/5.png" />,
        <img alt="" src="img/6.png" />, <img alt="" src="img/7.png" />,
        <img alt="" src="img/8.png" />, <img alt="" src="img/9.png" />
    ];
    useInterval(() => {
        console.log('======================================================');
        console.log('Kicked by interval,Has focus:' + document.hasFocus());
        let now = new Date();
        let options = {
            hourCycle: 'h24',
            hour: "2-digit",
            minute: "numeric",
            second: "numeric",
        }
        let action, dateString = now.toLocaleTimeString([], options);
        let digitList = [];
        let newTimeArray = dateString.split(":");
        let oldTimeArray = itemList.oldTime.split(":");

        let temp = { ...itemList };
        //let i=2,j=0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                let oldValue = oldTimeArray[i].charAt(j);
                let newValue = newTimeArray[i].charAt(j);
                
                if (document.hasFocus()) {
                    action = "forward";
                } else {
                    action = "init";
                }                
                digitList.push(
                    <Slot
                        action={action}
                        className="splitFlap"
                        key={"slot_" + i + "_" + j}
                        newIndex={newValue}
                        oldIndex={oldValue}
                        wordList={wordList} />
                );
            }
            
            if (i < 2) {
                digitList.push(
                    <div className="seperator" key={"seperator_" + i}>:</div>
                );
            }
        }
        temp.oldTime = dateString;
        temp.digitList = digitList;
        updateItemList(temp);

    }, 1000)
    return (
        <div>
            <div className="clock">
                {itemList.digitList}
            </div>
            {itemList.oldTime}
        </div>
    )
}