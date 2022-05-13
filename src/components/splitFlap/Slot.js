import "./Slot.css";
import { useEffect, useReducer } from 'react';
let reducer = (state, action) => {
    let result = { ...state };
    let temp;

    switch (action.type) {
        case "backward":
            result.oldValue = action.oldValue;
            result.newValue = action.newValue;
            temp = result.lowerDivClass + " rotate0to90";
            result.lowerDivClass = temp;
            result.middleDivClass = result.upperHalfCard + " transform0to_90 zIndex4";
            break;
        case 'backward2':
            temp = result.middleDivClass + " rotate_90to0";
            result.middleDivClass = temp;
            break;
        case "forward":
            result.oldValue = action.oldValue;
            result.newValue = action.newValue;
            temp = result.upperDivClass + " rotate0to_90";
            result.upperDivClass = temp;
            result.middleDivClass = result.lowerHalfCard + " transform0to90 zIndex4";
            break;
        case 'forward2':
            temp = result.middleDivClass + " rotate90to0";
            result.middleDivClass = temp;
            break;
        case "resume":
            result.oldValue = result.newValue;
            result.middleDivClass = "hide";
            result.upperDivClass = result.upperHalfCard + " zIndex4";
            result.lowerDivClass = result.lowerHalfCard + " zIndex2";
            break;
        default:
            break;
    }
    return result;
};
export default function Slot({ action, className, hinge, newValue, oldValue }) {
    let fullCard = "", lowerHalfCard = "", upperHalfCard = "";
    if ((hinge === undefined)|| (hinge === true)) {
        fullCard = "fullCard-after";
        lowerHalfCard = "lowerHalfCard-after";
        upperHalfCard = "upperHalfCard-after";
    } else {
        fullCard = "fullCard";
        lowerHalfCard = "lowerHalfCard";
        upperHalfCard = "upperHalfCard";
    }
    const [objList, updateObjList] = useReducer(reducer, {
        oldValue: oldValue,
        newValue: newValue,
        action: "forward" || action,
        lowerDivClass: lowerHalfCard + " zIndex2",
        middleDivClass: "hide",
        upperDivClass: upperHalfCard + " zIndex4",
        "fullCard": fullCard,
        "lowerHalfCard": lowerHalfCard,
        "upperHalfCard": upperHalfCard
    });
    useEffect(() => {
        updateObjList({ type: action, oldValue, newValue });
    }, [action, oldValue, newValue]);

    let upperHandler = () => {
        updateObjList({ type: "forward2" });
    }
    let middleHandler = () => {
        updateObjList({ type: "resume" });
    }
    let lowerHandler = () => {
        updateObjList({ type: "backward2" });
    }
    return (
        <div className={className} style={{
            "position": "relative",
            "boxSizing": "border-box",
            "transformStyle": "preserve-3d"
        }}>
            <div
                id="base"
                className={objList.fullCard+" zIndex2"}>
                {objList.newValue}
            </div>
            <div
                className={objList.upperDivClass}
                id="upper"
                onAnimationEndCapture={upperHandler}>
                {objList.oldValue}
            </div>
            <div
                id="middle"
                className={objList.middleDivClass}
                onAnimationEndCapture={middleHandler}>
                {objList.newValue}
            </div>
            <div
                className={objList.lowerDivClass}
                id="lower"
                onAnimationEndCapture={lowerHandler}>
                {objList.oldValue}
            </div>
        </div>
    )
}