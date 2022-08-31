import Slot from "./Slot";
import { useEffect,useState } from "react";
import { useInterval } from "./useInterval";
export default function Clock() {
    const [itemList, updateItemList] = useState({ 
        action:'forward',
        newIndex: 1,
        oldIndex: 0,});
    let wordList = [
        <img alt="" src="img/0.png" />, <img alt="" src="img/1.png" />,
        <img alt="" src="img/2.png" />, <img alt="" src="img/3.png" />,
        <img alt="" src="img/4.png" />, <img alt="" src="img/5.png" />,
        <img alt="" src="img/6.png" />, <img alt="" src="img/7.png" />,
        <img alt="" src="img/8.png" />, <img alt="" src="img/9.png" />
    ];
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
    return(
        <Slot 
            action="forward"
            className="splitFlap"            
            newIndex={itemList.newIndex}
            oldIndex={itemList.oldIndex}
            wordList={wordList}/>
    ) 
}