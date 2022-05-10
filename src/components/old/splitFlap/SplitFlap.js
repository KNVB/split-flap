import React, { useEffect, useReducer } from 'react';
import './SplitFlap.css';
let reducer = (state, action) => {
  let result = { ...state };
  let temp;
  switch (action.type) {
    case 'backward':
      result.oldValue = action.oldValue;
      result.newValue = action.newValue;
      temp=result.firstDivClass+" transform0to_90 flapBackGroundColor";
      result.firstDivClass=temp;
      temp=result.groundDivClass+" lowerHalfCard";
      temp=temp.replace("hide","zIndex2");
      result.groundDivClass=temp;
      temp=result.thirdDivClass+" rotate0to90";
      result.thirdDivClass=temp;    
      break;
    case 'backward2':
      temp = result.secondDivClass.replace('zIndex4', 'zIndex2');
      result.secondDivClass = temp;
      temp = result.firstDivClass.replace('hide', 'zIndex4');
      temp += ' upperHalfCard rotate_90to0';
      result.firstDivClass = temp;
      break;
    case 'forward':
      result.oldValue = action.oldValue;
      result.newValue = action.newValue;
      temp = result.firstDivClass + ' transform0to90 flapBackGroundColor';
      result.firstDivClass = temp;
      temp = result.groundDivClass + ' upperHalfCard';
      temp = temp.replace('hide', 'zIndex2');
      result.groundDivClass = temp;
      temp = result.secondDivClass + ' rotate0to_90';
      result.secondDivClass = temp;
      break;
    case 'forward2':
      temp = result.thirdDivClass.replace('zIndex4', 'zIndex2');
      result.thirdDivClass = temp;
      temp = result.firstDivClass.replace('hide', 'zIndex4');
      temp += ' lowerHalfCard rotate90to0';
      result.firstDivClass = temp;
      break;
    case 'resume':
      result.oldValue = result.newValue;
      result.groundDivClass = 'hide flapBackGroundColor';
      result.firstDivClass = 'hide';
      result.secondDivClass = 'flapBackGroundColor upperHalfCard zIndex4';
      result.thirdDivClass = 'flapBackGroundColor lowerHalfCard zIndex4';
      break;
    default:
      break;
  }
  return result;
};
export default function Flap({ action, oldValue, newValue }) {
  const [objList, updateObjList] = useReducer(reducer, {
    oldValue: oldValue,
    newValue: newValue,
    action: action,
    groundDivClass: 'hide flapBackGroundColor',
    firstDivClass: 'hide',
    secondDivClass: 'flapBackGroundColor upperHalfCard zIndex4',
    thirdDivClass: 'flapBackGroundColor lowerHalfCard zIndex4',
  });
  let firstDivHandler = () => {
    updateObjList({ type: 'resume' });
  };
  let secondDivHandler = () => {
    updateObjList({ type: 'forward2' });
  };
  let thirdDivHandler = () => {
    updateObjList({ type: 'backward2' });
  };
  useEffect(() => {
    updateObjList({ type: action, oldValue, newValue });
  }, [newValue]);
  return (
    <div className="splitFlap">
      <div className={objList.groundDivClass}>{objList.newValue}</div>
      <div
        className={objList.firstDivClass}
        onAnimationEndCapture={firstDivHandler}
      >
        {objList.newValue}
      </div>
      <div
        className={objList.secondDivClass}
        onAnimationEndCapture={secondDivHandler}
      >
        {objList.oldValue}
      </div>
      <div
        className={objList.thirdDivClass}
        onAnimationEndCapture={thirdDivHandler}
      >
        {objList.oldValue}
      </div>
      <div className="middle zIndex10"></div>
    </div>
  );
}