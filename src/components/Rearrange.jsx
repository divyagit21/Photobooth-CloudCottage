import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SoundButton from './SoundButton'
import { useRef } from "react";
import domtoimage from 'dom-to-image-more';
import { COIN_INSERTED } from '../redux/action/coin.js';
import { CLEAR_IMAGE } from '../redux/action/images';
import { LAYOUTS } from '../redux/action/layouts.js';

const Rearrange = () => {
  const [color, setColor] = useState('#fef5de');
  const [selectedFilter, setSelectedFilter] = useState('');
  const images = useSelector((state) => state.images.images);
  const layout = useSelector((state) => state.layouts.layouts);
  const [handleNote, setHandleNote] = useState(false);
  const [Note, setNote] = useState('')
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const layoutRef = useRef();


  if (!images || images.length === 0) {
    return <p>No images selected. Please go back and add images.</p>;
  }

  const handleAddNote = () => {
    setHandleNote(true);
  }
  const filterStyles = {
    none: {
      filter: '',
      backgroundImage: '',
      backgroundSize: '',
      backgroundColor: '',
      transform: '',
      animation: '',
    },
    instaBlueSky: {
      filter: "saturate(1.3) brightness(1.15) hue-rotate(-10deg)",
    },
    blackWhite: {
      filter: "grayscale(1) contrast(1.1)",
    },
    sunlight: {
      filter: "sepia(0.2) brightness(1.2) saturate(1.4) hue-rotate(-5deg)",
    },
    ashBlue: {
      filter: "brightness(1.1) contrast(1.05) saturate(0.75) hue-rotate(190deg)",
    },
    bubblePop: {
      filter: "saturate(2) hue-rotate(25deg) brightness(1.1) contrast(1.2)",
    },
    rainbowRush: {
      filter: "hue-rotate(360deg) saturate(2) contrast(1.2)",
    },
    candyTint: {
      filter: "brightness(1.15) saturate(1.6) hue-rotate(15deg) sepia(0.1)",
    },
    partyGlitch: {
      filter: "hue-rotate(180deg) saturate(3) brightness(1.2) contrast(1.5)",
    },
    dustyMood: {
      filter: "sepia(0.3) saturate(0.85) contrast(0.9) brightness(1.05)",
    },
    paris: {
      filter: 'brightness(110%) contrast(95%) sepia(15%) hue-rotate(-10deg)',
    },
    bw: {
      filter: 'grayscale(100%)',
    },
    grainy: {
      filter: 'contrast(90%) brightness(95%)',
    },
    mood: {
      filter: 'brightness(80%) contrast(120%) grayscale(20%) sepia(20%)',
    },
    barbie: {
      filter: 'hue-rotate(-20deg) saturate(200%) brightness(110%)',
    },
    sepiaFade: {
      filter: 'sepia(0.8) brightness(1.1) contrast(1.2)',
    },
    pixelPortal: {
      filter: 'contrast(2) brightness(0.8)',
      imageRendering: 'pixelated',
    },
    starryNight: {
      filter: 'brightness(1.1) hue-rotate(-15deg) contrast(1.4) saturate(1.6)',
      backgroundImage: 'repeating-radial-gradient(circle, #444 1px, transparent 2px)',
      backgroundSize: '5px 5px',
    },
    glitch: {
      filter: 'contrast(1.4) brightness(0.9)',
      animation: 'glitch 1s infinite',
    },
    mythic: {
      filter: 'grayscale(0.6) brightness(0.7) contrast(1.3) blur(1px)',
      backgroundColor: '#1a1a1a',
    },
    mirror: {
      transform: 'scaleX(-1)',
    },
    origami: {
      background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
      boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.1), inset 5px 5px 10px rgba(255,255,255,0.4)',
      clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
    },
    gameboy: {
      filter: 'grayscale(1) contrast(2) brightness(1.2)',
      backgroundColor: '#c5d99d',
    },
    halftone: {
      filter: 'saturate(2) contrast(1.5)',
      backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
      backgroundSize: '6px 6px',
    },
    cinematic: {
      filter: 'contrast(1.3) saturate(1.2) hue-rotate(30deg)',
    },
    polaroid: {
      filter: 'brightness(1.1) contrast(0.95) saturate(0.9) sepia(0.2)',
      border: '3px solid white',
      backgroundColor: 'white',
      borderRadius: '8px',
    }
  };

  const getFilterStyle = () => {
    const styleDef = filterStyles[selectedFilter] || {};
    const style = {
      filter: styleDef.filter || '',
      border: styleDef.border || '',
      backgroundColor: styleDef.backgroundColor || '',
      borderRadius: styleDef.borderRadius || '',
      backgroundImage: styleDef.backgroundImage || '',
      backgroundSize: styleDef.backgroundSize || '',
      transform: styleDef.transform || '',
      imageRendering: styleDef.imageRendering || '',
      animation: styleDef.animation || '',
      boxShadow: styleDef.boxShadow || '',
      clipPath: styleDef.clipPath || '',
      background: styleDef.background || '',
    };
    return style;
  };

  const handleDownload = () => {
    const layoutContainer = document.getElementById('preview-wrapper');
    if (!layoutContainer) return;

    domtoimage.toPng(layoutContainer)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'filtered-layout.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Image download failed:', err);
      });
  };

  const handleHome=()=>{
    dispatch({type:COIN_INSERTED,payload:{coin:false}})
    dispatch({type:CLEAR_IMAGE})
    dispatch({type:LAYOUTS,payload:{layouts:0,images:0}})
    navigate('/')
  }

  const renderLayout = () => {
    const imgStyle = getFilterStyle();
    switch (layout) {
      case 1:
        return (
          <div className="layout layout1">
            {images.slice(0, 2).map((image, idx) => (
              <img key={idx} src={image.src} alt={`Image ${idx}`} style={imgStyle} />
            ))}
          </div>
        );
      case 2:
        return (
          <div className="layout layout2">
            {images.slice(0, 3).map((image, idx) => (
              <img key={idx} src={image.src} alt={`Image ${idx}`} style={imgStyle} />
            ))}
          </div>
        );
      case 3:
        return (
          <div className="layout layout3">
            {[0, 1, 2].map(row => (
              <div key={row} className="row">
                {images.slice(row * 2, row * 2 + 2).map((image, idx) => (
                  <img key={idx} src={image.src} alt={`Image ${row * 2 + idx}`} style={imgStyle} />
                ))}
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="layout layout4">
            <img src={images[0]?.src} alt="Wide" className="wide" style={imgStyle} />
            <div className="row">
              {images.slice(1, 4).map((image, idx) => (
                <img key={idx} src={image.src} alt={`Image ${idx + 1}`} className="small" style={imgStyle} />
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="layout layout5">
            <div className="top-row">
              <img src={images[0]?.src} alt="WideTall" className="wideTall" style={imgStyle} />
              <div className="column">
                {images.slice(1, 3).map((image, idx) => (
                  <img key={idx} src={image.src} alt={`Image ${idx + 1}`} className="small" style={imgStyle} />
                ))}
              </div>
            </div>
            <div className="row">
              {images.slice(3, 6).map((image, idx) => (
                <img key={idx} src={image.src} alt={`Image ${idx + 3}`} className="small" style={imgStyle} />
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="layout layout6">
            <div className="top-row">
              <img src={images[0]?.src} alt="Wideheight" className="wideheight" style={imgStyle} />
              <div className="column">
                {images.slice(1, 4).map((image, idx) => (
                  <img key={idx} src={image.src} alt={`Image ${idx + 1}`} className="small" style={imgStyle} />
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <p>Please select a layout first.</p>;
    }
  };

  const stripColors = [
    { name: 'white', hex: '#ffffff' },
    { name: 'black', hex: '#000000' },
    { name: 'gray', hex: '#808080' },
    { name: 'red', hex: '#e63946' },
    { name: 'navy', hex: '#1d3557' },
    { name: 'gold', hex: '#f1c40f' },
    { name: 'pastelPink', hex: '#f7c6c7' },
    { name: 'teal', hex: '#008080' },
  ];

  return (
    <div className="home-container">
      <header className="cloud-header">Preview Images</header>
      <div className="main-content">
        <div
          id="preview-wrapper"
          ref={layoutRef}
          style={{
            borderRadius: "5px",
            overflow: "hidden",
            display: "inline-block",
            backgroundColor: color,
          }} className='page-container'
        >
          <div id="preview-layout">
            {renderLayout()}
          </div>
        </div>

        {handleNote ? '' : <div className="decoration">
          <div className="side-container">
            <div className="side-heading">Photo Strip</div>
            <div className="side-box strip-color-options">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              {stripColors.map(({ name, hex }) => (
                <button
                  key={name}
                  className="color-button"
                  style={{ backgroundColor: hex }}
                  onClick={() => setColor(hex)}
                  title={name}
                />
              ))}
            </div>
          </div>
          <div className="side-container">
            <div className="side-heading">Apply Filters ↓
            </div>
            <div className="side-box filter-options">
              {Object.entries(filterStyles).map(([key, _]) => (
                <button
                  key={key}
                  onClick={() => setSelectedFilter(key)}
                  style={{ backgroundColor: `${selectedFilter === key ? 'var(--background)' : ' var(--fontColor)'}`, color: `${selectedFilter !== key ? 'var(--beigeBox)' : ' var(--beigeBox)'}` }}
                  className={`${key} ${selectedFilter === key ? 'filter-selected' : ''} `}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>}
      </div>
      <div className="button-row">
        <SoundButton className="round-btn" onClick={handleDownload}>Download</SoundButton>
        <SoundButton className="round-btn" onClick={handleHome}>Home</SoundButton>
      </div>
      <StyleSheet />
    </div>

  );
};


const StyleSheet = () => {
  return <style>{`
    
    
    #preview-wrapper {
  scrollbar-width: none;       
  -ms-overflow-style: none;    
}

#preview-wrapper::-webkit-scrollbar {
  display: none;              
}

.filter-selected {
  font-family:ClassicNotes;
  border: 2px solid var(--fontColor);
}

  .decoration {
display: flex;
flex-direction: column;
gap: 4%;
// margin-left: 40px;
justify-content: center;
}

.side-container {
background-color: var(--beigeBox);
border: 2px solid var(--fontColor);
border-radius: 12px;
padding: 7px 7px;
width: 200px;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
gap:10px;
}

.side-box {
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: center;
}

/* Color Circles */
.color-button{
width: 24px;
height: 24px;
border-radius: 50%;
border: 1px solid #000;
}
input{
width: 24px;
height: 24px;
border-radius: 50%;
border: 1px solid #000;
}

.color-button.white { background-color: #ffffff; }
.color-button.black { background-color: #000000; }
.color-button.gray { background-color: #808080; }
.color-button.red { background-color: #e63946; }
.color-button.navy { background-color: #1d3557; }
.color-button.gold { background-color: #f1c40f; }
.color-button.pastelpink { background-color: #f7c6c7; }
.color-button.teal { background-color: #008080; }

.sepia { background-color: #704214; }
.grayscale { background-color: #aaa; }
.invert { background-color: #000; }

.filter-options {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 10px 0;
  height:127px;
  overflow-y:auto;
   scroll-behavior: smooth;
  scrollbar-width: thin;
   scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.filter-options::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
.filter-options button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family:ClassicNotes;
}

.filter-options button:hover {
  background-color: #e0e0e0;
}


  .main-content{
      display:flex;
      gap:5%;
       display: flex;
 align-items: center;
 justify-content: center;
margin: 40px auto 20px;
  }

.home-container {
 position: relative;
width: 90vw;
height: 90vh;
}

p{
font-family: 'MagnoliaScript';
}

.cloud-header {
font-family: 'MagnoliaScript';
background-color: var(--beigeBox);
color: var(--fontColor);
padding: 10px 40px;
border-radius: 40px;
font-size: 2rem;
font-weight: 600;
width: fit-content;
margin: 30px auto 20px;
text-align: center;
border: 3px solid var(--fontColor);
// position: relative;
margin-top: 30px;
z-index: 10;
}

.page-container {
padding: 5px;
border-radius: 20px;
max-width: 1000px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.side-heading{
font-family: 'ClassicNotes';
background-color: var(--beigeBox);
color: var(--fontColor);
font-size: 1.2rem;
font-weight:bold;
width: fit-content;
margin: 10px 10px;
text-align: center;
}
img {
object-fit: cover;
}

.layout1,
.layout2 {
display: flex;
flex-direction: column;
gap: 10px;
align-items: center;
}

.layout1 img {
width: 120px;
height: 120px;
}

.layout2 img {
width: 100px;
height: 100px;
}

.layout3 {
display: flex;
flex-direction: column;
gap: 10px;
}

.layout3 .row {
display: flex;
gap: 10px;
justify-content: center;
}

.layout3 img {
width: 120px;
height: 120px;
}

.layout4 {
display: flex;
flex-direction: column;
gap: 10px;
align-items: center;
}

.layout4 .wide {
width: 396px;
height: 250px;
border-radius: 16px;
}

.layout4 .row {
display: flex;
gap: 10px;
}

.layout4 .small {
width: 120px;
height: 120px;
}

.layout5 .top-row {
display: flex;
gap: 10px;
margin-bottom: 15px;
align-items: center;
}

.layout5 .wideTall {
width: 270px;
height: 260px;
}

.layout5 .column {
display: flex;
flex-direction: column;
gap: 12px;
}

.layout5 .small {
width: 127px;
height: 123px;
}

.layout5 .row {
display: flex;
gap: 12px;
justify-content: center;
}

.layout6 .top-row {
display: flex;
gap: 10px;
align-items: center;
}

.layout6 .wideheight {
width: 320px;
height: 390px;
border-radius: 16px;
}

.layout6 .column {
display: flex;
flex-direction: column;
gap: 10px;
}

.layout6 .small {
width: 120px;
height: 120px;
}

.button-row {
width: 100%;
margin-left: 20px;
margin-top: 50px;
display: flex;
align-items: center;
justify-content: center;
gap: 2%;
flex-wrap:wrap;
}

.round-btn {
background-color: #decdf9;
border: 2px solid #9b8bc7;
color: #9b8bc7;
padding: 10px 20px;
border-radius: 20px;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
min-width: 100px;
}

/* ----------------- Responsive Scaling Only ------------------ */

@media (max-width: 768px) {
.layout1 img,
.layout2 img,
.layout3 img,
.layout4 .small,
.layout5 .small,
.layout6 .small {
width: 95px;
height: 95px;
}

.layout4 .wide {
width: 320px;
height: 180px;
}

.layout5 .wideTall {
width: 220px;
height: 210px;
}

.layout6 .wideheight {
width: 260px;
height: 320px;
}

.main-content{
flex-direction:column;
gap:3%;
}
.side-container{
    width:150px;
}

.decoration{
  flex-direction:row;
}
  .button-row{
margin-left: 5px;
}
}

@media (max-width: 480px) {
.button-row{
margin-left: 5px;
}
.layout1 img,
.layout2 img,
.layout3 img,
.layout4 .small,
.layout6 .small {
width: 70px;
height: 70px;
}
.layout5 .small {
width: 85px;
height: 85px;
}

.layout6 .small {
width: 80px;
height: 78px;
}

.layout4 .wide {
width: 240px;
height: 150px;
}

.layout5 .wideTall {
width: 190px;
height: 190px;
}

.layout6 .wideheight {
width: 200px;
height: 270px;
}

.cloud-header {
font-size: 1.5rem;
padding: 8px 20px;
}

.round-btn {
font-size: 0.9rem;
padding: 8px 16px;
}

.side-container{
width:100px;
}
}


`}</style>
}


export default Rearrange;
