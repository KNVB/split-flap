import { useState } from "react";
import { useInterval } from "../../useInterval";
import "./CountDown.css";
import SplitFlap from "../../splitFlap/SplitFlap";
export default function CountDown() {
    const [itemList, updateItemList] = useState({ digitList: [], oldMonthString: "00", oldDateString: "00", oldTime: '00:00:00' });
    let wordList = [
        <img alt="" src="img/0_100.png" />, <img alt="" src="img/1_100.png" />,
        <img alt="" src="img/2_100.png" />, <img alt="" src="img/3_100.png" />,
        <img alt="" src="img/4_100.png" />, <img alt="" src="img/5_100.png" />,
        <img alt="" src="img/6_100.png" />, <img alt="" src="img/7_100.png" />,
        <img alt="" src="img/8_100.png" />, <img alt="" src="img/9_100.png" />
    ];
    let makeDigitList = (key, oldDigit, newDigit) => {
        let action, digitList = [];
        for (let j = 0; j < 2; j++) {
            let oldValue = oldDigit.charAt(j);
            let newValue = newDigit.charAt(j);

            /***************************************************************************/
            /*When the browser is not in focus, the animation may not working properly,*/
            /*so just replace the digit only.                                          */
            /***************************************************************************/
            if (document.hasFocus()) {
                action = "forward";
            } else {
                action = "init";
            }
            digitList.push(
                <SplitFlap
                    action={action}
                    className="countDownDigit"
                    hinge={false}
                    key={key + "_" + j}
                    newIndex={newValue}
                    oldIndex={oldValue} />
            );
        }
        return digitList;
    }
    useInterval(() => {
        let digitList = [];
        let now = new Date(Date.now());
        let nextYear = new Date((1 + now.getFullYear()) + "-1-1");
        let diff = new Date(nextYear - now);
        let options = {
            hourCycle: 'h23',
            hour: "2-digit",
            minute: "numeric",
            second: "numeric",
        }
        let monthString = '', dateString = '';
        if ((diff.getMonth() + 1) < 10) {
            monthString = "0";
        }
        monthString += (diff.getMonth() + 1);
        if (diff.getDate() < 10) {
            dateString = "0";
        }
        dateString += diff.getDate();
        console.log(monthString, dateString);
        let diffString = diff.toLocaleTimeString([], options);
        //console.log(diffString);
        digitList.push(makeDigitList("month", monthString, itemList.oldMonthString));
        digitList.push(<div className="seperator" key="seperator0"></div>)
        digitList.push(makeDigitList("date", dateString, itemList.oldDateString));
        digitList.push(<div className="seperator" key="seperator1"></div>)
        let newTimeArray = diffString.split(":");
        let oldTimeArray = itemList.oldTime.split(":");
        for (let i = 0; i < newTimeArray.length; i++) {
            digitList.push(makeDigitList("time_" + i, oldTimeArray[i], newTimeArray[i]));
            if ((newTimeArray.length - i)>1){
                digitList.push(<div className="seperator" key={"seperator"+(i+2)}></div>)
            }
        }
        let temp = {};
        temp.digitList = digitList;
        temp.oldDateString = dateString;
        temp.oldMonthString = monthString;
        temp.oldTime = diffString;
        updateItemList(temp);
    }, 1000)
    return (
        <div className="countDown">
            {itemList.digitList}
        </div>
    )
}