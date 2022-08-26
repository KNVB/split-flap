import './App.css';
import "./SplitFlap.css";
import QQ from "./components/qq/QQ";
import SplitFlap from './components/splitFlap/SplitFlap';
export default function App() {
  let wordList = [<img alt="" src="img/1_100.png" />, <img alt="" src="img/2_100.png" />, <img alt="" src="img/3_100.png" />, <img alt="" src="img/4_100.png" />];
  //let wordList = ["Good Game","Oh Yes","No"];
  return (
    <div style={{ "margin": "10px" }}>
      {/*
      <SplitFlap
        hinge={true}
        splitFlapClassName="splitFlap"
        slotClassName="slot"
        timing={3000}
        wordList={wordList}/>
      */}
      {
        <QQ
          timing={1000}
          wordList={wordList}/>
      }
    </div>
  );
}