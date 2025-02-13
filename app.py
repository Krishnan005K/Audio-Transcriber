from flask import Flask, request, jsonify
import whisper

app = Flask(__name__)

# Load Whisper model (use 'tiny', 'base', 'small', etc.)
model = whisper.load_model("large")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = "temp_audio.mp3"
    file.save(file_path)

    # Transcribe audio
    result = model.transcribe(file_path)
    return jsonify({"text": result["text"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
