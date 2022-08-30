import { useEffect, useRef, useState } from "react";
let useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export default function GG() {
    const [itemList, updateItemList] = useState({ action: "init", intervalId: null, newIndex: 1, oldIndex: 0 });
    useInterval(() => {
        console.log("document.hasFocus()=" + document.hasFocus())
        let temp={...itemList};
        temp.newIndex++;
        temp.oldIndex++;
        updateItemList(temp);
    }, 1000);

    return <p>{itemList.oldIndex},{itemList.newIndex}</p>;
}