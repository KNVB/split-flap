import { useEffect, useRef, useState } from "react";
import "./Slot.css";
export default function Slot({ action, className, hinge, newIndex, oldIndex, wordList }) {
    let baseDiv = useRef(), lowerDiv = useRef(), middleDiv = useRef(), upperDiv = useRef();
    let fullCard,lowerHalfCard,upperHalfCard;
    if ((hinge === undefined) || (hinge === true)) {
        fullCard = "fullCard-after";
        lowerHalfCard = "lowerHalfCard-after";
        upperHalfCard = "upperHalfCard-after";
    } else {
        fullCard = "fullCard";
        lowerHalfCard = "lowerHalfCard";
        upperHalfCard = "upperHalfCard";
    }
    let baseDivClass=fullCard+" zIndex2";
    let lowerDivClass=lowerHalfCard+" zIndex2";
    let middleDivClass="hide";
    let upperDivClass=upperHalfCard+" zIndex4";
    let handler=id=>{
        console.log("id="+id);
    }  
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
                {wordList[newIndex]}
            </div>
            <div
                className={upperDivClass}
                id="upper"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={upperDiv}>
                {wordList[oldIndex]}
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
                {wordList[oldIndex]}
            </div>
        </div>
    )
}