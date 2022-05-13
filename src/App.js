import './App.css';
import "./SplitFlap.css";
import SplitFlap from './components/splitFlap/SplitFlap';
function App() {
  let wordList = [<img alt="" src="img/1_100.png"/>, <img alt="" src="img/2_100.png"/>,<img alt="" src="img/3_100.png"/>,<img alt="" src="img/4_100.png"/>];
  //let wordList = ["Good Game","Oh Yes","No"];
  return (
    <div style={{ "margin": "10px" }}>
      <SplitFlap
        hinge={true}
        splitFlapClassName="splitFlap"
        slotClassName="slot"
        timing={3000}
        wordList={wordList}/>
    </div>
  );
}

export default App;
