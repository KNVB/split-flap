import { useState } from "react";
import { useInterval } from "../../useInterval";
import "./CountDown.css";
import SplitFlap from "../../splitFlap/SplitFlap";
export default function CountDown() {
    const [itemList, updateItemList] = useState(
        {
            digitList: [],
            year: "00", month: "00", day: "00",
            hour: "00", minute: "00", second: "00"
        });
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
                action = "backward";
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
    let getDiff = (startDate, endDate) => {
        let result = new Date(endDate - startDate);
        let twoDigitOption = {
            minimumIntegerDigits: 2,
            useGrouping: false
        };
        return {
            year: (result.getUTCFullYear() - 1970).toLocaleString('en-US', twoDigitOption),
            month: (result.getUTCMonth() - 1).toLocaleString('en-US', twoDigitOption),
            day: (result.getUTCDate() - 1).toLocaleString('en-US', twoDigitOption),
            hour: result.getUTCHours().toLocaleString('en-US', twoDigitOption),
            minute: result.getUTCMinutes().toLocaleString('en-US', twoDigitOption),
            second: result.getUTCSeconds().toLocaleString('en-US', twoDigitOption),
        }
    }

    let target = new Date(2023, 0, 1); //Must be a future date

    useInterval(() => {
        let digitList = [];
        let now = new Date();
        let result = getDiff(now, target);
        digitList.push(makeDigitList("year", result.year, itemList.year));
        digitList.push(<div className="seperator" key="seperator0"></div>);
        digitList.push(makeDigitList("month", result.month, itemList.month));
        digitList.push(<div className="seperator" key="seperator1"></div>);
        digitList.push(makeDigitList("day", result.day, itemList.day));
        digitList.push(<div className="seperator" key="seperator2"></div>);
        digitList.push(makeDigitList("hour", result.hour, itemList.hour));
        digitList.push(<div className="seperator" key="seperator3">:</div>);
        digitList.push(makeDigitList("minute", result.minute, itemList.minute));
        digitList.push(<div className="seperator" key="seperator4">:</div>);
        digitList.push(makeDigitList("second", result.second, itemList.second));        
        let temp = { ...result };
        temp.digitList = digitList;
        updateItemList(temp);
    }, 1000);
    
    return (
        <div className="countDown">
            {itemList.digitList}
        </div>
    )
}