import './Character.css';
import { useEffect, useReducer } from 'react';
let reducer = (state, action) => {
    let result = { ...state };
    let temp;
    switch (action.type) {
        case "backward":
            result.oldValue = action.oldValue;
            result.newValue = action.newValue;
            temp = result.thirdDivClass + " transform0to_90";
            result.thirdDivClass = temp;
            temp = result.secondDivClass + " rotate0to90";
            result.secondDivClass = temp;
            break;
        case 'backward2':
            temp = result.thirdDivClass.replace("zIndex2", "zIndex4");
            temp += " rotate_90to0";
            result.thirdDivClass = temp;
            temp = result.fourthDivClass.replace("zIndex4", "zIndex2");
            result.fourthDivClass = temp;
            break;
        case "forward":
            result.oldValue = action.oldValue;
            result.newValue = action.newValue;
            temp = result.firstDivClass + " transform0to90";
            result.firstDivClass = temp
            temp = result.fourthDivClass + " rotate0to_90";
            result.fourthDivClass = temp;
            break;
        case 'forward2':
            temp = result.firstDivClass.replace("zIndex2", "zIndex4");
            temp += " rotate90to0";
            result.firstDivClass = temp;
            break;
        case "resume":
            result.oldValue = result.newValue;
            result.fourthDivClass = 'halfCard zIndex4';
            result.firstDivClass = result.fullCard + ' zIndex2';
            result.secondDivClass = result.fullCard + ' zIndex2';
            result.thirdDivClass = 'halfCard zIndex2';
            break;
        default:
            break;
    }
    return result;
};
export default function Character({ action, bgColor, borderRadius, className, color, fontFamily,fontWeight, fontSize, height, hinge, newValue, oldValue, timing, width }) {
    let style = {
        "backgroundColor": bgColor || 'black',
        "boxSizing": "border-box",
        "borderRadius": borderRadius || "10px",
        "color": color || "white",        
        "fontFamily": fontFamily || 'arial',
        "fontSize": fontSize || "5.5em",
        "fontWeight":fontWeight|| "normal",
        "height": height || "150px",
        "lineHeight": height || "150px",
        "position": "relative",
        "textAlign": "center",
        "transformStyle": "preserve-3d",
        "width": width || "100px"
    };   
    let cardStyle = { "animationDuration": (timing || 0.3) + "s", "backgroundColor": style['backgroundColor'] }
    let fullCard = "";
    if (hinge === undefined) {
        fullCard = "fullCard-after";
    } else {
        if (hinge === true) {
            fullCard = "fullCard-after";
        } else {
            fullCard = "fullCard";
        }
    }
    const [objList, updateObjList] = useReducer(reducer, {
        oldValue: oldValue,
        newValue: newValue,
        action: "forward" || action,
        firstDivClass: fullCard + ' zIndex2',
        secondDivClass: fullCard + ' zIndex2',
        thirdDivClass: 'halfCard zIndex2',
        fourthDivClass: 'halfCard zIndex4',
        "fullCard": fullCard
    });
    useEffect(() => {
        updateObjList({ type: action, oldValue, newValue });
    }, [action, oldValue, newValue]);
    let firstDivHandle = () => {
        updateObjList({ type: 'resume' });
    }
    let secondDivHandle = () => {
        updateObjList({ type: 'backward2' });
    }
    let thirdDivHandle = () => {
        updateObjList({ type: 'resume' });
    }
    let fourthDivHandle = () => {
        updateObjList({ type: 'forward2' });
    }
    return (
        <div style={style} className={className}>
            <div
                className={objList.firstDivClass}
                id="first"
                onAnimationEndCapture={firstDivHandle}
                style={cardStyle} >
                {objList.newValue}
            </div>
            <div
                className={objList.secondDivClass}
                id="second"
                onAnimationEndCapture={secondDivHandle}
                style={cardStyle} >
                {objList.oldValue}
            </div>
            <div
                className={objList.thirdDivClass}
                id="third"
                onAnimationEndCapture={thirdDivHandle}
                style={cardStyle}>
                {objList.newValue}
            </div>
            <div
                className={objList.fourthDivClass}
                id="fourth"
                onAnimationEndCapture={fourthDivHandle}
                style={cardStyle}>
                {objList.oldValue}
            </div>
        </div>
    )
}