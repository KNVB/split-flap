import { useEffect, useReducer } from 'react';
import Slot from './Slot';
let reducer = (state, action) => {
    let result = { ...state };
    result.oldIndex = result.newIndex;
    result.newIndex = action.value;
    result.action = action.type;
    return result;
};
export default function SplitFlap({ hinge, splitFlapClassName, slotClassName, timing, wordList }) {
    let maxWordLength = 0;
    const [objList, updateObjList] = useReducer(reducer, {
        oldIndex: 0,
        newIndex: 0,
        action: 'init',
    });
    wordList.forEach(word => {
        if (word.length > maxWordLength) {
            maxWordLength = word.length;
        }
    });
    let characterList = [];
    for (let i = 0; i < maxWordLength; i++) {
        characterList.push(
            <div key={"c_" + i} style={{ "marginRight": "3px" }}>
                <Slot
                    action={objList.action}
                    className={slotClassName}
                    hinge={hinge}
                    oldValue={wordList[objList.oldIndex][i]}
                    newValue={wordList[objList.newIndex][i]} />
            </div>
        )
    }
    useEffect(() => {
        const id = setInterval(() => {
            let temp=objList.newIndex+1;
            if (temp === wordList.length){
                temp=0;
            }
            updateObjList({type:"forward",value:temp})
        }, timing);
        return () => { clearInterval(id) }
    })
    return (
        <div className={splitFlapClassName}>
            {characterList}
        </div>
    )
}