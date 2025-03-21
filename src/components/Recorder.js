// import { useState, useRef } from "react";
// import { FaMicrophone, FaStop } from "react-icons/fa";
// import axios from "axios";
// import "./Recorder.css";

// const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const [transcription, setTranscription] = useState("");
//   const [isTranscribing, setIsTranscribing] = useState(false);
//   const mediaRecorder = useRef(null);
//   const audioChunks = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder.current = new MediaRecorder(stream, { mimeType: "audio/webm" });

//       mediaRecorder.current.ondataavailable = (event) => {
//         audioChunks.current.push(event.data);
//       };

//       mediaRecorder.current.onstop = async () => {
//         const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
//         const audioFile = new File([audioBlob], "recorded_audio.webm", { type: "audio/webm" });

//         setAudioURL(URL.createObjectURL(audioBlob));
//         await sendAudioToBackend(audioFile);
//       };

//       audioChunks.current = [];
//       mediaRecorder.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current) {
//       mediaRecorder.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const sendAudioToBackend = async (audioFile) => {
//     const formData = new FormData();
//     formData.append("file", audioFile);

//     setIsTranscribing(true);

//     try {
//       const response = await axios.post(`${API_BASE_URL}/transcribe`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setTranscription(response.data.text);
//     } catch (error) {
//       console.error("Error sending audio:", error);
//       setTranscription("Failed to transcribe audio.");
//     } finally {
//       setIsTranscribing(false);
//     }
//   };

//   return (
//     <div className="recorder-container">
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className={`record-btn ${isRecording ? "stop" : "start"}`}
//       >
//         {isRecording ? <FaStop size={30} color="white" /> : <FaMicrophone size={30} color="white" />}
//       </button>

//       {audioURL && (
//         <audio controls className="audio-player">
//           <source src={audioURL} type="audio/webm" />
//           Your browser does not support the audio tag.
//         </audio>
//       )}

//       {isTranscribing && <p className="loading">Transcribing...</p>}

//       {transcription && (
//         <div className="transcription-container">
//           <h2 className="transcription-heading">Transcription:</h2>
//           <p>{transcription}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;




// import { useState, useRef } from "react";
// import { FaMicrophone, FaStop } from "react-icons/fa";
// import axios from "axios";
// import './Recorder.css';

// const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const [message, setMessage] = useState("");
//   const mediaRecorder = useRef(null);
//   const audioChunks = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder.current = new MediaRecorder(stream, { mimeType: "audio/webm" });

//       mediaRecorder.current.ondataavailable = (event) => {
//         audioChunks.current.push(event.data);
//       };

//       mediaRecorder.current.onstop = async () => {
//         const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
//         const audioFile = new File([audioBlob], "recorded_audio.webm", { type: "audio/webm" });

//         setAudioURL(URL.createObjectURL(audioBlob));
//         await sendAudioToBackend(audioFile);
//       };

//       audioChunks.current = [];
//       mediaRecorder.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current) {
//       mediaRecorder.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const sendAudioToBackend = async (audioFile) => {
//     const formData = new FormData();
//     formData.append("file", audioFile);

//     try {
//       const response = await axios.post(`${API_BASE_URL}/upload-audio/`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       console.error("Error uploading audio:", error);
//       setMessage("Failed to upload audio.");
//     }
//   };

//   return (
//     <div className="recorder-container">
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className={`record-btn ${isRecording ? "stop" : "start"}`}
//       >
//         {isRecording ? <FaStop size={30} color="white" /> : <FaMicrophone size={30} color="white" />}
//       </button>

//       {audioURL && (
//         <audio controls className="audio-player">
//           <source src={audioURL} type="audio/webm" />
//           Your browser does not support the audio tag.
//         </audio>
//       )}

//       {message && <p className="upload-message">{message}</p>}
//     </div>
//   );
// };

// export default AudioRecorder;


import React, { useState, useRef } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend

const AudioUploader = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [transcription, setTranscription] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: "audio/webm" });

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "recorded_audio.webm", { type: "audio/webm" });

        setAudioURL(URL.createObjectURL(audioBlob));
        await sendAudioToBackend(audioFile);
      };

      audioChunks.current = [];
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/transcribe/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTranscription(response.data.text);
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <div>
      <h2>Record & Transcribe Audio</h2>

      <button onClick={isRecording ? stopRecording : startRecording} style={{ margin: "10px", padding: "10px" }}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioURL && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio controls>
            <source src={audioURL} type="audio/webm" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}

      {transcription && (
        <div>
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
