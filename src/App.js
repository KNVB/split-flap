import './App.css';
import "./SplitFlap.css";
import SplitFlap from './components/splitFlap/SplitFlap';
function App() {
  let wordList = ['大雨殺到', '粵澳停課香港如常', '梁榮武'];
  
  return (
    <div style={{ "margin": "10px" }}>
      <SplitFlap
        hinge={true}
        splitFlapClassName="splitFlap"
        slotClassName="slot"
        timing={1000}
        wordList={wordList}/>
    </div>
  );
}

export default App;
