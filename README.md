# 🛡️ CIPHER AI: Real-Time AI Voice Cloning & Deepfake Fraud Detection

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite%20%2B%20TailwindCSS-61DAFB)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python%203.10%2B-009688)](https://fastapi.tiangolo.com/)
[![Model](https://img.shields.io/badge/Architecture-Hybrid%20CNN--BiLSTM%20%2B%20WavLM-FF6F00)](https://pytorch.org/)

**CIPHER AI** is an enterprise-grade multi-signal acoustic forensics platform designed to detect synthetic voice cloning, deepfake vishing attacks, and telephony spoofing in real-time. Built specifically for banking call centers, fintech platforms, and telecom identity verification.

---

## 🚀 Key Features

- **🎙️ Real-Time Voice Activity & Biometrics**: Zero-score standby baseline with dynamic acoustic parameter updates (pitch jitter, spectral flux, shimmer, vocoder artifact analysis) whenever authentic or synthetic speech is detected.
- **🧠 Hybrid CNN-BiLSTM Deep Learning Pipeline**: Multi-layer neural network trained on MFCCs, Chroma, Spectral Contrast, and Mel-Spectrogram features to catch synthetic audio artifacts with strict low false-negative calibration.
- **💬 Live Call Chat & Speech Transcript**: Interactive real-time transcript viewer supporting live microphone input via Web Speech API, quick scenario dialogue simulation, and instant speech synthesis audio playback.
- **📊 Dynamic Visual Analytics**: Real-time oscilloscope, FFT spectrum visualizer, biometric radar chart comparing against authentic human baselines, and temporal fraud score tracking.
- **📞 Multi-Signal Telephony Forensics**: Validates STIR/SHAKEN attestations, SS7/VoIP gateway hops, packet loss jitter, and carrier reputation scores to detect spoofed caller IDs.
- **⚡ Banking Action Enforcement**: Instant automated mitigation triggers — `FREEZE_TRANSFER`, `REQUIRE_STEP_UP_MFA`, or `DISCONNECT_CALL` upon elevated clone probability.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts, HTML5 Web Audio API, Web Speech API
- **Backend / Engine**: Python FastAPI, PyTorch / Librosa / NumPy, Scikit-learn
- **Acoustic Metrics**: Autocorrelation F0 pitch tracking, RMS energy estimation, FFT spectral flux, Jitter & Shimmer modeling

---

## ⚙️ Quick Start

### 1. Frontend Setup
```bash
# Clone the repository
git clone https://github.com/your-username/cipher-voice-fraud-detection.git
cd cipher-voice-fraud-detection

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 2. Python Backend (Optional for ML Service)
```bash
cd python_backend
pip install -r requirements.txt # fastapi uvicorn torch librosa numpy
python fastapi_app.py
```

---

## 🔒 Security & Threshold Calibration

The classification threshold prioritizes the elimination of false negatives for zero-trust voice authentication:
- **0.0 - 25.0**: Verified Authentic Human Speech
- **25.0 - 55.0**: Low / Inconclusive Anomaly
- **55.0 - 75.0**: Medium Threat (Step-Up Biometric Required)
- **75.0 - 100.0**: High Critical Deepfake Detected (Immediate Banking Freeze)

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

web link = https://sparkling-gnome-129718.netlify.app/


<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/1e7a1c66-9e65-4a26-ba53-b9d7bad90de9" />
<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/512a300f-c9cc-4f11-b6f0-d2afce9cda4c" />
<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/cc3f182f-ddb2-4df6-8328-8dd1430117bb" />
<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/6a3516ef-f68a-4542-b7d2-388f688d07d8" />
<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/68dc119d-9a3d-4ae8-b7ff-1775f0a18df4" />
<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/71e97523-d20f-486a-9420-7a260067e1e1" />
<img width="1408" height="768" alt="image" src="https://github.com/user-attachments/assets/700a0fa3-dfac-4233-a7d5-f4fdec12e88d" />
<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/06649bd1-b1d5-44de-9a0d-1c47c52c25df" />
<img width="1376" height="768" alt="image" src="https://github.com/user-attachments/assets/a467fe5d-5009-4213-9bcd-1cda06d114ca" />
<img width="1408" height="768" alt="image" src="https://github.com/user-attachments/assets/d9928cbc-0bc2-4f6d-a3d3-cbcafb23a017" />








