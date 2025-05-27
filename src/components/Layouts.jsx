import React, { useState } from 'react';
import SoundButton from './SoundButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LAYOUTS } from '../redux/action/layouts';

const Layouts = () => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.layouts);
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(selector.layouts || null);
  const handleLogout = () => {
    navigate('/logout');
  };
  function handleLayoutsNext() {
    if (!layout) {
      alert('Please select one layout')
      return;
    }
    navigate('/camera')
  }
  function handleLayoutsBack() {
    navigate('/instructions')
  }
  function handleLayoutClick(id) {
    setLayout(id)
    let images = 0;
    switch (id) {
      case 1:
        images = 2;
        break;
      case 2:
        images = 3;
        break;
      case 3:
        images = 6;
        break;
      case 4:
        images = 4;
        break;
      case 5:
        images = 6;
        break;
      case 6:
        images = 4;
        break;
      default:
        break;

    }
    dispatch({ type: LAYOUTS, payload: { layouts: id, images: images } })
  }
  return (
    <>
      <div className="home-container">
        <SoundButton className='back' onClick={handleLayoutsBack}>Back</SoundButton>
        <header className="cloud-header">Cloud Cottage</header>
        <div className="layout-grid">

          {/* Layout 1 */}
          <button className={`layout-box ${layout === 1 ? 'selected' : ''}`} onClick={() => handleLayoutClick(1)}>
            <div className="box small"></div>
            <div className="box small"></div>
          </button>

          {/* Layout 2 */}
          <button className={`layout-box ${layout === 2 ? 'selected' : ''}`} onClick={() => handleLayoutClick(2)}>
            <div className="box small"></div>
            <div className="box small"></div>
            <div className="box small"></div>
          </button>

          {/* Layout 3 */}
          <button className={`layout-box ${layout === 3 ? 'selected' : ''}`} onClick={() => handleLayoutClick(3)}>
            <div className="row">
              <div className="box small"></div>
              <div className="box small"></div>
            </div>
            <div className="row">
              <div className="box small"></div>
              <div className="box small"></div>
            </div>
            <div className="row">
              <div className="box small"></div>
              <div className="box small"></div>
            </div>
          </button>

          {/* Layout 4 */}
          <button className={`layout-box ${layout === 4 ? 'selected' : ''}`} onClick={() => handleLayoutClick(4)}>
            <div className="box wide"></div>
            <div className="row">
              <div className="box small"></div>
              <div className="box small"></div>
              <div className="box small"></div>
            </div>
          </button>

          {/* Layout 5 */}
          <button className={`layout-box wide-layout ${layout === 5 ? 'selected' : ''}`} onClick={() => handleLayoutClick(5)}>
            <div className="row top">
              <div className="box wideTall"></div>
              <div className="column">
                <div className="box small"></div>
                <div className="box small"></div>
              </div>
            </div>
            <div className="row">
              <div className="box small"></div>
              <div className="box small"></div>
              <div className="box small"></div>
            </div>
          </button>

          {/* Layout 6 */}
          <button className={`layout-box wide-layout ${layout === 6 ? 'selected' : ''}`} onClick={() => handleLayoutClick(6)}>
            <div className="row top">
              <div className="box wideheight"></div>
              <div className="column">
                <div className="box small"></div>
                <div className="box small"></div>
                <div className="box small"></div>
              </div>
            </div>
          </button>
        </div>


        <SoundButton onClick={handleLayoutsNext} className="next">
          Next
        </SoundButton>

        <StyleSheet />
      </div>
    </>
  );
};

const StyleSheet = () => (
  <style>{`

    .layout-box.selected {
  border: 3px solid var(--cloudDark);
  background-color: #d6cfff;
  box-shadow: 0 0 10px var(--cloudDark);
}
  .layout-box {
  transition: background-color 0.3s, border 0.3s, box-shadow 0.3s;
}


    
    button{
    border:2px solid var(--fontColor);
    }
  /* Header */
      .cloud-header {
        font-family: 'MagnoliaScript';
        background-color: var(--beigeBox);
        color: var(--fontColor);
        padding: 10px 40px;
        border-radius: 40px;
        font-size: 2rem;
        font-weight: 600;
        width: fit-content;
        margin: 30px auto 0;
        position: relative;
        z-index: 3;
        text-align: center;
        border:3px solid var(--fontColor);
      }

      .box.small {
      width: 40px;
      height: 40px;
    }

    .box.wideTall {
      width: 85px;
      height: 85px;
    }

    .box.wideheight {
      width: 85px;
      height: 135px;
    }

      .column {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
      .home-container {
        position: relative;
        width: 100vw;
        height: 97vh;
        overflow: hidden;
      }

    .page-container {
      background-color: var(--beigeBox);
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 1000px;
      width: 100%;
      border: 2px solid var(--cloudDark);
      position: relative;
    }

    .title {
      font-size: 2rem;
      color: var(--fontColor);
      background-color: var(--beigeBox);
      padding: 10px 30px;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 20px;
      border: 2px solid var(--fontColor);
    }

    .layout-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      justify-items: center;
  
        background-color: var(--beigeBox);
        max-width: 600px;
        width: 90%;
        margin: 40px auto 20px;
        border-radius: 20px;
        padding: 40px 40px;
        position: relative;
        box-shadow: 0 0 10px var(--insertBox);
        border:3px solid var(--fontColor);
    }

    .layout-box {
      background-color: var(--background);
      border-radius: 16px;
      padding: 10px;
      width: 150px;
      min-height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .row {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .box {
      background-color: #9b8bc7;
      border-radius: 4px;
    }

    .box.small {
      width: 40px;
      height: 40px;
    }

    .box.wide {
      width: 140px;
      height: 60px;
    }

    .button-row {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .nav-button {
      background-color: var(--cloudLight);
      color: var(--fontColor);
      padding: 10px 25px;
      font-size: 1rem;
      border-radius: 20px;
      border: 2px solid var(--cloudDark);
      cursor: pointer;
      font-weight: bold;
    }

    .nav-button:hover {
      background-color: var(--cloudDark);
    }

         /* back button */
      .back {
        background-color: var(--insertBox);
        color: var(--fontColor);
        position: absolute;
        top: 20px;
        left: 20px;
        padding: 10px 25px;
        border-radius: 40px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 0 10px var(--background);
        user-select: none;
        border:3px solid var(--fontColor);
      }

      .back:hover {
        background-color: var(--beigeBox);
      }
      
           /* next button */
      .next {
         background-color: var(--insertBox);
    color: var(--fontColor);
    position: absolute;
        bottom: 25px;
        right: 25px;
    padding: 10px 25px;
    border-radius: 40px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 0 10px var(--background);
    user-select: none;
    border: 3px solid var(--fontColor);
      }

      .next:hover {
        background-color: var(--beigeBox);
      }
  `}</style>
);

export default Layouts;

