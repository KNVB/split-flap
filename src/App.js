import './App.css';
import "./SplitFlap.css";
import SplitFlap from './components/splitFlap/SplitFlap';
function App() {
  let wordList = ['Good Game.', 'Oh Shit', 'Oh No','Oh Yes'];
  
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
