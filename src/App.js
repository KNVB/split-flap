import './App.css';
import Clock from "./examples/clock/Clock";
import CountDown from './examples/countDown/CountDown';
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
      <Clock/>
      <br/>
      Count Down to the next year
      <CountDown/>
    </div>
  );
}