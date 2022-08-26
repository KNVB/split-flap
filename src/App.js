import './App.css';
import "./SplitFlap.css";
import QQ from "./components/qq/QQ";
import SplitFlap from './components/splitFlap/SplitFlap';
export default function App() {
  let wordList = [
    <img alt="" src="img/0_100.png" />, <img alt="" src="img/1_100.png" />, 
    <img alt="" src="img/2_100.png" />, <img alt="" src="img/3_100.png" />,
    <img alt="" src="img/4_100.png" />, <img alt="" src="img/5_100.png" />, 
    <img alt="" src="img/6_100.png" />, <img alt="" src="img/7_100.png" />, 
    <img alt="" src="img/8_100.png" />, <img alt="" src="img/9_100.png" />
  ];
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
          hinge={false}
          timing={1000}
          wordList={wordList}/>
      }
    </div>
  );
}