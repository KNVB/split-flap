import './App.css';
import SplitFlap from './components/splitFlap/SplitFlap';
function App() {
  return (
    <div style={{ "margin": "10px" }}>
      <SplitFlap 
        bgColor="orange" 
        borderRadius="20px" 
        color="green" 
        fontFamily="標楷體" 
        fontSize="5.5em" 
        height="150px" 
        width="100px" />
    </div>
  );
}

export default App;
