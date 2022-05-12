import "./Slot.css";
import { useEffect, useReducer } from 'react';
let reducer = (state, action) => {
    let result = { ...state };
    let temp;
    switch (action.type) {
        case "backward":
            break;
        case 'backward2':
            break;
        case "forward":
            break;
        case 'forward2':

            break;
        case "resume":

            break;
        default:
            break;
    }
    return result;
};
export default function Slot({ action, className, hinge, newValue, oldValue }) {
    let fullCard = "",lowerHalfCard="",upperHalfCard="";
    if (hinge === undefined) {
        fullCard = "fullCard-after";
        lowerHalfCard="lowerHalfCard-after";
        upperHalfCard="upperHalfCard-after";
    } else {
        if (hinge === true) {
            fullCard = "fullCard-after";
            lowerHalfCard="lowerHalfCard-after";
            upperHalfCard="upperHalfCard-after";
        } else {
            fullCard = "fullCard";
            lowerHalfCard="lowerHalfCard";
            upperHalfCard="upperHalfCard";
        }
    }
    const [objList, updateObjList] = useReducer(reducer, {
        oldValue: oldValue,
        newValue: newValue,
        action: "forward" || action,
        lowerDivClass:lowerHalfCard+" zIndex2",
        middleDivClass:"hide",
        upperDivClass:upperHalfCard+" zIndex4",
        "fullCard": fullCard,
        "lowerHalftCard": lowerHalfCard,
        "upperHalfCard":upperHalfCard
    });
    useEffect(() => {
        updateObjList({ type: action, oldValue, newValue });
    }, [action, oldValue, newValue]);

    let upperHandler = () => {
        
    }
    let middleHandler = () => {
        
    }
    let lowerHandler = () => {
        
    }
    return (
        <div className={className} style={{
            "position": "relative",
            "boxSizing": "border-box",
            "transformStyle": "preserve-3d"
        }}>
            <div
                id="base"
                className="fullCard-after zIndex2">
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