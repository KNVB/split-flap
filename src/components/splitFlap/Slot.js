import "./Slot.css";
import { useEffect,useReducer } from 'react';
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
export default function Slot({action,className,hinge,newValue,oldValue}){
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
        <div className={className}>
            <div
                className={objList.firstDivClass}
                onAnimationEndCapture={firstDivHandle}>
                {objList.newValue}
            </div>
            <div
                className={objList.secondDivClass}                
                onAnimationEndCapture={secondDivHandle}>
                {objList.oldValue}
            </div>
            <div
                className={objList.thirdDivClass}                
                onAnimationEndCapture={thirdDivHandle}>
                {objList.newValue}
            </div>
            <div
                className={objList.fourthDivClass}                
                onAnimationEndCapture={fourthDivHandle}>
                {objList.oldValue}
            </div>
        </div>
    )
}