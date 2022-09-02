import { useEffect, useRef, useState } from "react";
import "./SplitFlap.css";
export default function Slot({ action, className, hinge, newIndex, oldIndex, wordList }) {
    let baseDiv = useRef(), lowerDiv = useRef(), middleDiv = useRef(), upperDiv = useRef();
    const [itemList, updateItemList] = useState({
        action: "init",
        baseDivClass: '',
        fullCard: '',
        lowerDivClass: '',
        lowerHalfCard: "",
        middleDivClass: '',
        newValue: '',
        oldValue: '',
        upperDivClass: '',
        upperHalfCard: ""
    });
    let handler = id => {
        console.log("id=" + id);
        let temp = { ...itemList };

        switch (id) {
            case "lower":
                temp.lowerDivClass = itemList.lowerDivClass.replace("zIndex4", "zIndex2");
                temp.middleDivClass += " rotate_90to0";
                break;
            case "middle":
                upperDiv.current.innerHTML = baseDiv.current.innerHTML;
                lowerDiv.current.innerHTML = baseDiv.current.innerHTML;
                temp.middleDivClass = "hide";
                temp.upperDivClass = itemList.upperHalfCard + " zIndex4";
                temp.lowerDivClass = itemList.lowerHalfCard + " zIndex2";
                break;
            case "upper":
                temp.middleDivClass += " rotate90to0";
                temp.upperDivClass = itemList.upperDivClass.replace("zIndex4", "zIndex2");
                break;
            default:
                break;
        }
        updateItemList(temp);
    }
    
    useEffect(() => {
        let temp = {};
        if ((hinge === undefined) || (hinge === true)) {
            temp.fullCard = "fullCard-after";
            temp.lowerHalfCard = "lowerHalfCard-after";
            temp.upperHalfCard = "upperHalfCard-after";
        } else {
            temp.fullCard = "fullCard";
            temp.lowerHalfCard = "lowerHalfCard";
            temp.upperHalfCard = "upperHalfCard";
        }
        temp.baseDivClass = temp.fullCard + " zIndex2";
        temp.lowerDivClass = temp.lowerHalfCard + " zIndex2";
        temp.middleDivClass = "hide";
        temp.upperDivClass = temp.upperHalfCard + " zIndex4";
        if (wordList){
            temp.oldValue = wordList[oldIndex];
            temp.newValue = wordList[newIndex];
        }else {
            temp.oldValue = oldIndex;
            temp.newValue = newIndex;
        }
        switch (action) {
            case "backward":
                temp.lowerDivClass += " rotate0to90";
                temp.middleDivClass = temp.upperHalfCard + " transform0to_90 zIndex4";
                break;
            case "forward":
                temp.upperDivClass += " rotate0to_90";
                temp.middleDivClass = temp.lowerHalfCard + " transform0to90 zIndex4";
                break;
            default:
                break;
        }
        /*
        console.log("=========================");
        console.log("Triggered by useEffect:");
        console.log(" action=" + action);
        console.log(" hasfocus=" + document.hasFocus());
        console.log(" oldIndex=" + oldIndex);
        console.log(" newIndex=" + newIndex);
        console.log("=========================");
        */
        updateItemList(temp);
    }, [action, hinge, oldIndex, newIndex]);

    return (
        <div className={className}
            style={{
                "position": "relative",
                "boxSizing": "border-box",
                "transformStyle": "preserve-3d"
            }}>
            <div
                className={itemList.baseDivClass}
                id="base"
                ref={baseDiv}>
                {itemList.newValue}
            </div>
            <div
                className={itemList.upperDivClass}
                id="upper"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={upperDiv}>
                {itemList.oldValue}
            </div>
            <div
                className={itemList.middleDivClass}
                id="middle"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={middleDiv}>
                {itemList.newValue}
            </div>
            <div
                className={itemList.lowerDivClass}
                id="lower"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={lowerDiv}>
                {itemList.oldValue}
            </div>
        </div>
    );
}