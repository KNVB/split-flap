import { useEffect,useReducer } from 'react';
import Character from './Character';
let reducer = (state, action) => {
    let result = { ...state };
    result.oldIndex = result.newIndex;
    result.newIndex = action.value;
    result.action = action.type;
    console.log(result);
    return result;
};
export default function SplitFlap({bgColor, borderRadius, className, color, fontFamily, fontSize,fontWeight, height, hinge, timing, width,wordList}){
    const [objList, updateObjList] = useReducer(reducer, {
        oldIndex: 0,
        newIndex: 0,
        action: 'init',
    });
    let maxWordLength=0;
    let style = {
        action: objList.action,
        "bgColor": bgColor || 'black',
        "borderRadius": borderRadius || "10px",
        "color": color || "white",        
        "fontFamily": fontFamily || 'arial',
        "fontSize": fontSize || "5.5em",
        "fontWeight":fontWeight||"normal",
        "height": height || "150px",
        "lineHeight": height || "150px",       
        "width": width || "100px"
    };   
    wordList.forEach(word=>{
        if (word.length>maxWordLength){
            maxWordLength=word.length;
        }
    });
    let characterList=[];
    let splitStyle={
        "display":"flex",
        "flexDirection":"row",
    };
    for (let i=0;i<maxWordLength;i++){
        characterList.push(
            <div key={"c_"+i} style={{"marginRight":"3px"}}>
                <Character {...style} 
                    action={objList.action}
                    oldValue={wordList[objList.oldIndex][i]} 
                    newValue={wordList[objList.newIndex][i]}/>                
            </div>
        )
    }
    const forward = () => {
        let temp = objList.newIndex + 1;
        if (temp === wordList.length){
            temp=0;
        }
        updateObjList({
            type: "forward",
            value: temp,
        });
    };
    useEffect(()=>{
        const intervalId = setInterval(() => {
            forward();
        },timing);
        return () => clearInterval(intervalId);
    })
    return (
        <div style={splitStyle} className={className}>
            {characterList}
        </div>
    )
}