import Recorder from "./components/Recorder";
import './App.css';  // Import the main CSS
import AudioUploader from "./components/Recorder";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">🎙️ Audio Transcriber</h1>
      {/* <Recorder /> */}
      <AudioUploader />
    </div>
  );
}

export default App;
