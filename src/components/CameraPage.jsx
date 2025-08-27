
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import SoundButton from './SoundButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_IMAGE, CLEAR_IMAGE } from '../redux/action/images';

const CameraPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const savedImages = useSelector((state) => state.images.images);
  const [cameraError, setCameraError] = useState(false);
  const layoutImageLimit = useSelector((state) => state.layouts.images);
  const [currentPreview, setCurrentPreview] = useState(null); 
  const [capturedImages, setCapturedImages] = useState(savedImages || []);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [count, setCount] = useState(savedImages.length || 0);
  const [countdown, setCountdown] = useState(null);
  const [timerDuration, setTimerDuration] = useState(3);
  const [showCamera, setShowCamera] = useState(true);
  const [pendingCapture, setPendingCapture] = useState(false);

  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (pendingCapture) {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setCurrentPreview(imageSrc);
        setShowCamera(false);
      }
      setCountdown(null);
      setPendingCapture(false);
    }
  }, [countdown, pendingCapture]);
  useEffect(() => {
    if (savedImages.length >= layoutImageLimit) {
      setShowCamera(false);
    }
  }, [savedImages, layoutImageLimit]);

  const triggerTimerCapture = () => {
    if (count >= layoutImageLimit || countdown !== null) return;
    setCountdown(timerDuration);
    setPendingCapture(true);
  };

  const handleRetry = () => {
    setCurrentPreview(null);
    setShowCamera(true);
  };

  const handleFinalize = () => {
    if (!currentPreview || count >= layoutImageLimit) return;
    const newImage = { src: currentPreview, filter: selectedFilter };
    dispatch({ type: ADD_IMAGE, payload: newImage });
    const updatedImages = [...capturedImages, newImage];
    setCapturedImages(updatedImages);
    setCount(updatedImages.length);
    setCurrentPreview(null);
    if (updatedImages.length < layoutImageLimit) setShowCamera(true);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setPreviewImage({ src, name: file.name });
    }
  };

  const handleCameraNext = () => {
    navigate('/preview');
  }

  const handleBack = () => navigate('/layouts');

  return (
    <div className="home-container">
      <StyleSheet />
      {layoutImageLimit < count ? (<SoundButton onClick={handleBack} className="back">Back</SoundButton>) : (<></>)}
      <header className="cloud-header">Cloud Cottage</header>
      <main className="main-box">
        <div className="content-box">
          <div className="screen">
            {cameraError ? (
              <div className="camInformation">
                <h2>Camera access denied</h2>
                <p>Please allow access to use the camera.</p>
              </div>
            ) : showCamera ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className={`camera-preview ${selectedFilter}`}
                videoConstraints={{ facingMode: 'user' }}
                onUserMediaError={() => setCameraError(true)}
              />
            ) : currentPreview ? (
              <img
                src={currentPreview}
                className={`camera-preview ${selectedFilter}`}
                alt="Preview"
              />
            ) : (
              <div className="camInformation">
                <h2>Pictures limit is completed</h2>
                <h2>Click Next</h2>
              </div>
            )}


            {countdown !== null && <div className="timer-overlay">{countdown}</div>}
          </div>

          {layoutImageLimit !== capturedImages.length ?
            <div className="button-panel">
              <SoundButton
                disabled={count >= layoutImageLimit || countdown !== null}
                className="round-btn"
                onClick={triggerTimerCapture}
              >
                Capture
              </SoundButton>

              <SoundButton
                className="round-btn"
                onClick={handleFinalize}
                disabled={!currentPreview}
              >
                Finalize
              </SoundButton>

              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <SoundButton className="round-btn" onClick={() => setTimerDuration(t => Math.max(1, t - 1))}>−</SoundButton>
                <div className="round-btn">{timerDuration}s</div>
                <button className="round-btn" onClick={() => setTimerDuration(t => t + 1)}>+</button>
              </div>

              <SoundButton className="round-btn" disabled={!currentPreview} onClick={handleRetry}>Retake</SoundButton>
              <SoundButton className="round-btn">Images: {count}/{layoutImageLimit}</SoundButton>
            </div>
            : <div>
              <SoundButton className="round-btn" disabled={layoutImageLimit !== count} onClick={handleCameraNext}>Next</SoundButton>
            </div>
          }
        </div>
      </main>
    </div>
  );
};

const StyleSheet = () => (
  <style>{`

    .camInformation {
  text-align: center;
  font-family: ClassicNotes;
  color: var(--fontColor);
}


    .circle.none { background-color: #9b8bc7; }
    .circle.grayscale { filter: grayscale(100%); background-color: #aaa; }
    .circle.sepia { filter: sepia(100%); background-color: #cc9966; }
    .circle.contrast { filter: contrast(150%); background-color: #888; }
    .circle.brightness { filter: brightness(120%); background-color: #eee; }

    .circle.selected {
      outline: 3px solid var(--fontColor);
      transform: scale(1.2);
    }

    .timer-overlay {
      position: absolute;
      top: 40%;
      left: 45%;
      font-size: 2rem;
      font-weight: bold;
      color: white;
      background-color: rgba(0,0,0,0.6);
      padding: 10px 20px;
      border-radius: 20px;
    }

    .home-container {
      position: relative;
    width: 100vw;
    height: 97vh;
    overflow: hidden;
    }

    .cloud-header {
      background-color: var(--beigeBox);
      color: var(--fontColor);
      padding: 10px 40px;
      font-family: 'MagnoliaScript';
      border-radius: 40px;
      font-size: 2rem;
      font-weight: 600;
      width: fit-content;
      margin: 30px auto 0;
      text-align: center;
      border: 3px solid var(--fontColor);
    }

    .main-box {
      background-color: var(--beigeBox);
      max-width: 600px;
      min-width: 600px;
      width: 100%;
      margin: 40px auto 20px;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 0 10px var(--insertBox);
      border: 3px solid var(--fontColor);
    }

    .content-box {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
    }

    .screen {
      background-color: #cbb3ec;
      width: 100%;
      aspect-ratio: 6 / 3;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .camera-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 8px;
    }

    .button-panel {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      width: 100%;
    }

    .round-btn {
      background-color: #decdf9;
      border: 2px solid #9b8bc7;
      color: #9b8bc7;
      padding: 10px 15px;
      border-radius: 20px;
      font-size: 1rem;
      font-weight: bold;
      min-width: 90px;
      cursor: pointer;
    }

    .bottom-circles {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }

    .circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid #888;
    }

    .back {
      position: fixed;
      top: 20px;
      left: 20px;
      padding: 10px 20px;
      border-radius: 40px;
      font-size: 1rem;
      font-weight: 700;
      background-color: var(--insertBox);
      color: var(--fontColor);
      border: 3px solid var(--fontColor);
      z-index: 100;
    }
  `}</style>
);

export default CameraPage;


