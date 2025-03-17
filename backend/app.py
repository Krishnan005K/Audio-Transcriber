# from flask import Flask, request, jsonify 
# from flask_cors import CORS
# import whisper

# app = Flask(__name__)
# CORS(app)  
# # Enable CORS for all routes

# # Load Whisper model
# model = whisper.load_model("large")

# @app.route("/transcribe", methods=["POST"])
# def transcribe():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400 

#     file = request.files["file"]
#     file_path = "temp_audio.mp3"
#     file.save(file_path)

#     # Transcribe audio
#     result = model.transcribe(file_path)
#     return jsonify({"text": result["text"]})

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)


# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# import shutil
# import os

# app = FastAPI()

# # Enable CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to your frontend URL in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# UPLOAD_DIR = "uploaded_audio"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# @app.post("/upload-audio/")
# async def upload_audio(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)

#     # Save the file
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     return {"message": "Audio file received successfully!", "filename": file.filename}



from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import whisper
import shutil
import os
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model
logger.info("Loading Whisper model...")
model = whisper.load_model("base")
logger.info("Model loaded successfully!")

UPLOAD_DIR = "uploaded_audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        logger.info(f"Received file: {file.filename}")

        # Save the uploaded audio file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"File saved at: {file_path}")

        # Transcribe audio
        result = model.transcribe(file_path,language='en')
        logger.info(f"Transcription result: {result['text']}")

        return {"text": result["text"]}

    except Exception as e:
        logger.error(f"Error during transcription: {str(e)}")
        return {"error": "Failed to transcribe audio", "details": str(e)}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
    logger.info("FastAPI server started successfully!")