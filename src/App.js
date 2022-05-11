import './App.css';
import SplitFlap from './components/splitFlap/SplitFlap';
function App() {
  let wordList = ['大雨殺到', '粵澳停課香港如常', '梁榮武'];
  let props = {
    bgColor: "black",
    borderRadius: "",
    color: "green",
    fontFamily: "標楷體",
    fontSize: "5.5em",
    fontWeight:"bolder",
    height: "150px",        
    timing: 1000,
    width: "100px",
    wordList
  }
  return (
    <div style={{ "margin": "10px" }}>
      <SplitFlap
        {...props}/>
    </div>
  );
}

export default App;
