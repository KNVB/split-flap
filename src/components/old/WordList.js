import { useReducer } from 'react';
import Character from './splitFlap/Character';
import "./WordList.css";
let reducer = (state, action) => {
    let result = { ...state };
    result.oldIndex = result.newIndex;
    result.newIndex = action.value;
    result.action = action.type;
    return result;
};
export default function WordList() {
    let wordList = ['一二三', '四五六', '七八九'];
    const [objList, updateObjList] = useReducer(reducer, {
        oldIndex: 0,
        newIndex: 0,
        action: 'init',
    });
    let forward = () => {
        let temp;
        if (objList.newIndex === 2) {
            temp = 0;
        } else {
            temp = objList.newIndex + 1;
        }
        updateObjList({
            type: "forward",
            value: temp,
        });
    };
    let backward = () => {
        let temp;
        if (objList.newIndex === 0) {
            temp = 2;
        } else {
            temp = objList.newIndex - 1
        }
        updateObjList({
            type: "backward",
            value: temp,
        });
    };
    let base = {
        action: objList.action,
        bgColor: "",
        borderRadius: "",
        color: "white",
        fontFamily: "標楷體",
        fontSize: "5.5em",
        height: "150px",        
        timing: 0.4,
        width: "100px"
    }
    let firstProps = {
        ...base, 
        newValue: wordList[objList.newIndex][0],
        oldValue: wordList[objList.oldIndex][0]
    }
    let secondProps = {
        ...base, 
        newValue: wordList[objList.newIndex][1],
        oldValue: wordList[objList.oldIndex][1]
    }
    let thirdProps = {
        ...base, 
        newValue: wordList[objList.newIndex][2],
        oldValue: wordList[objList.oldIndex][2]
    }
    return (
        <>
            <div className="wordList">
                <Character
                    {...firstProps} />
                &nbsp;
                <Character
                    {...secondProps} />
                &nbsp;
                <Character
                    {...thirdProps}/>
            </div>
            <br />
            <div>
                <button onClick={forward}>+</button>
                <button onClick={backward}>-</button>
            </div>
        </>
    );
}