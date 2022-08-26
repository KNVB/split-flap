import Slot from './Slot';
import { useEffect, useReducer } from 'react';
let reducer= (state, action) => {
    return action;
}
export default function QQ({hinge, timing, wordList }) {
    const [itemList, updateItemList] = useReducer(reducer,{action:"backward", newIndex: 1, oldIndex: 0 });
    let trigger = () => {
        //console.log('======================================================');
        //console.log('Kicked by interval,Has focus:' + document.hasFocus());

        let temp = {};
        temp.oldIndex = itemList.newIndex;
        temp.newIndex = itemList.newIndex + 1;
        if (temp.newIndex === wordList.length) {
            temp.newIndex = 0;
        }
        //console.log(temp);
        if (document.hasFocus()){
            temp.action="backward";
        } else {
            temp.action="init";
        }
        updateItemList(temp);
    }
    
    useEffect(() => {
        let intervalId = setInterval(trigger, timing);
        return () => {
            clearInterval(intervalId);
        };
    });
    
    return (
        <Slot
            action={itemList.action}
            className="splitFlap"
            hinge={hinge}
            newValue={wordList[itemList.newIndex]}
            oldValue={wordList[itemList.oldIndex]}
        />
    )
}