import { useReducer } from "react";
import Slot from "./Slot";
let reducer = (state, action) => {
    let result = { ...state };
    let temp;
    switch (action.type) {
        case "forward":
            temp = result.newIndex + 1;
            if (temp === action.length) {
                temp = 0;
            }
            result.newIndex = temp;
            temp=result.oldIndex+1;
            if (temp === action.length) {
                temp = 0;
            }
            result.oldIndex = temp;
            result.action=action.type;
            //result.action="init";
            break;
        case "start":
            result.intervalId=action.intervalId;
            break
        case "stop":
            clearInterval(result.intervalId);
            result.intervalId=null;
            break    
        default:
            break;
    }
    return result;
}
export default function GG() {
    const [itemList, updateItemList] = useReducer(reducer, {action:"init", intervalId:null,newIndex: 1, oldIndex: 0 });
    let wordList = [
        <img alt="" src="img/0.png" />, <img alt="" src="img/1.png" />,
        <img alt="" src="img/2.png" />, <img alt="" src="img/3.png" />,
        <img alt="" src="img/4.png" />, <img alt="" src="img/5.png" />,
        <img alt="" src="img/6.png" />, <img alt="" src="img/7.png" />,
        <img alt="" src="img/8.png" />, <img alt="" src="img/9.png" />
    ];
    let backward = () => {
        updateItemList({ type: "backward", length: wordList.length });
    }
    let forward = () => {
        //setTimeout(() => {
            updateItemList({ type: "forward", length: wordList.length });
        //}, 5000)
    }
    let start=()=>{
        let intervalId=setInterval(forward,1000);
        updateItemList({ type:"start",intervalId:intervalId });
    }
    let stop=()=>{
        updateItemList({ type:"stop" });
    }
    return (
        <div>
            <Slot
                action={itemList.action}
                className="splitFlap"
                newIndex={itemList.newIndex}
                oldIndex={itemList.oldIndex}
                wordList={wordList} />
            <p>
                <button onClick={forward}>
                    +
                </button>
                <button onClick={backward}>
                    -
                </button>
                <button onClick={start}>
                    Start
                </button>
                <button onClick={stop}>
                    Stop
                </button>
            </p>
        </div>
    )
}