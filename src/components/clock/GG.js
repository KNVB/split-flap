import "./Slot.css";
import { useEffect,useRef,useState } from "react";
import { useInterval } from "./useInterval";
export default function GG() {
    let className = "splitFlap", hinge;
    let baseDiv = useRef(), lowerDiv = useRef(), middleDiv = useRef(), upperDiv = useRef();
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
    let wordList = [
        <img alt="" src="img/0.png" />, <img alt="" src="img/1.png" />,
        <img alt="" src="img/2.png" />, <img alt="" src="img/3.png" />,
        <img alt="" src="img/4.png" />, <img alt="" src="img/5.png" />,
        <img alt="" src="img/6.png" />, <img alt="" src="img/7.png" />,
        <img alt="" src="img/8.png" />, <img alt="" src="img/9.png" />
    ];
    let handler=id=>{
        console.log("id="+id);
        switch(id){
            case "middle":
                upperDiv.current.innerHTML=baseDiv.current.innerHTML;
                lowerDiv.current.innerHTML=baseDiv.current.innerHTML;
                middleDiv.current.className="hide";
                upperDiv.current.className=itemList.upperHalfCard+" zIndex4";
                lowerDiv.current.className=itemList.lowerHalfCard+" zIndex2";
                break;
            case "upper":
                middleDiv.current.classList.add("rotate90to0");
				upperDiv.current.classList.replace("zIndex4","zIndex2");
                break;
            default:
                break;
        }        
    }
    
    useInterval(()=>{
        let temp = { ...itemList };
        temp.newIndex++;
        if (temp.newIndex === wordList.length) {
            temp.newIndex = 0;
        }
        temp.oldIndex++;
        if (temp.oldIndex === wordList.length) {
            temp.oldIndex = 0;
        }
        console.log("Triggered by interval. hasFocus()="+document.hasFocus());
        updateItemList(temp);        
    },1000);
    
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
        if (document.hasFocus() && (itemList.oldIndex !== itemList.newIndex)){
            middleDiv.current.innerHTML=baseDiv.current.innerHTML;
            upperDiv.current.classList.add("rotate0to_90");
            middleDiv.current.className=itemList.lowerHalfCard+" transform0to90 zIndex4";
        }
    },[itemList.oldIndex,itemList.newIndex]);
    
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
                    {wordList[itemList.newIndex]}
            </div>
            <div
                className={itemList.upperDivClass}
                id="upper"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={upperDiv}>
                    {wordList[itemList.oldIndex]}
            </div>
            <div
                className={itemList.middleDivClass}
                id="middle"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={middleDiv}>
            </div>
            <div
                className={itemList.lowerDivClass}
                id="lower"
                onAnimationEnd={(e) => handler(e.target.id)}
                ref={lowerDiv}>
                    {wordList[itemList.oldIndex]}
            </div>
        </div>
    );
}