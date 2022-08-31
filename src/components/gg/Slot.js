import { useEffect, useRef, useState } from "react";
import "./Slot.css";
export default function Slot({ action, className, hinge, newIndex, oldIndex, wordList }) {
    const [itemList, updateItemList] = useState({
        action: "init",
        baseDivClass:'',
        fullCard: '',
        lowerDivClass:'',
        lowerHalfCard: "",
        middleDivClass:'', 
        newIndex: 1,
        oldIndex: 0,
        upperDivClass:'',
        upperHalfCard: ""
    });
    useEffect(()=>{
        let temp = { ...itemList };
        if ((hinge === undefined) || (hinge === true)) {
            temp.fullCard = "fullCard-after";
            temp.lowerHalfCard = "lowerHalfCard-after";
            temp.upperHalfCard = "upperHalfCard-after";
        } else {
            temp.fullCard = "fullCard";
            temp.lowerHalfCard = "lowerHalfCard";
            temp.upperHalfCard = "upperHalfCard";
        }
        temp.baseDivClass=temp.fullCard+" zIndex2";
        temp.lowerDivClass=temp.lowerHalfCard+" zIndex2";
        temp.middleDivClass="hide";
        temp.upperDivClass=temp.upperHalfCard+" zIndex4";        
        console.log("Triggered by useEffect")
        updateItemList(temp); 
    },[])
    useEffect(()=>{
        console.log("hi from slot");
    },[action,newIndex,oldIndex])
    return (
        <div className={className}
           style={{
               "position": "relative",
               "boxSizing": "border-box",
               "transformStyle": "preserve-3d"
           }}>            
       </div>
   );
}