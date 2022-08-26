import "./QQ.css";
import { useEffect, useRef } from 'react';
export default function Slot({ action, className, hinge, newValue, oldValue }) {
    let baseDiv = useRef(), lowerDiv = useRef(), middleDiv = useRef(), upperDiv = useRef();
    let baseDivClass, lowerDivClass, middleDivClass, upperDivClass;
    let fullCard = "", lowerHalfCard = "", upperHalfCard = "";
    if ((hinge === undefined) || (hinge === true)) {
        fullCard = "fullCard-after";
        lowerHalfCard = "lowerHalfCard-after";
        upperHalfCard = "upperHalfCard-after";
    } else {
        fullCard = "fullCard";
        lowerHalfCard = "lowerHalfCard";
        upperHalfCard = "upperHalfCard";
    }
    baseDivClass = fullCard + " zIndex2";
    lowerDivClass = lowerHalfCard + " zIndex2";
    middleDivClass = "hide";
    upperDivClass = upperHalfCard + " zIndex4";
    let handler = (id) => {
        //console.log(id);
        switch (id) {
            case "lower":
                lowerDiv.current.classList.replace("zIndex4", "zIndex2");
                middleDiv.current.classList.add("rotate_90to0");
                break;
            case "middle":
                upperDiv.current.innerHTML = baseDiv.current.innerHTML;
                lowerDiv.current.innerHTML = baseDiv.current.innerHTML;
                middleDiv.current.className = "hide";
                upperDiv.current.className = upperHalfCard + " zIndex4";
                lowerDiv.current.className = lowerHalfCard + " zIndex2";
                break;
            case "upper":
                middleDiv.current.classList.add("rotate90to0");
                upperDiv.current.classList.replace("zIndex4", "zIndex2");
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        switch (action) {
            case "backward":
                middleDiv.current.innerHTML=baseDiv.current.innerHTML;
                lowerDiv.current.classList.add("rotate0to90");
                middleDiv.current.className = upperHalfCard + " transform0to_90 zIndex4";
                break;
            case "forward":
                middleDiv.current.innerHTML=baseDiv.current.innerHTML;
                upperDiv.current.classList.add("rotate0to_90");
                middleDiv.current.className = lowerHalfCard + " transform0to90 zIndex4";
                break;
            default:
                break;
        }
    }, [action, newValue, oldValue])
    return (
        <div className={className}
            style={{
                "position": "relative",
                "boxSizing": "border-box",
                "transformStyle": "preserve-3d"
            }}>
            <div
                className={baseDivClass}
                id="base"
                ref={baseDiv}>
                {newValue}
            </div>
            <div
                className={upperDivClass}
                id="upper"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={upperDiv}>
                {oldValue}
            </div>
            <div
                className={middleDivClass}
                id="middle"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={middleDiv}>               
            </div>
            <div
                className={lowerDivClass}
                id="lower"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={lowerDiv}>
                {oldValue}
            </div>
        </div>
    );
}