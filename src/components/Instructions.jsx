import React from 'react';
import { useNavigate } from 'react-router-dom';
import SoundButton from './SoundButton';

const Instructions = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  function handleInstructionsNext() {
    navigate('/layouts')
  }
  return (
    <div className="home-container">
      <StyleSheet />
      <header className="cloud-header">Cloud Cottage</header>
      <main className="main-box">
        <div className="instructions">
          <ol>
            <li>
              Choose a layout from the list and click <strong>Next</strong> to proceed.
            </li>
            <li>
              Set a custom <strong>timer</strong> and click <strong>Capture</strong> to take a photo.
            </li>
            <li>
              After capturing a photo, you can either <strong>Retake</strong> it or <strong>Finalize</strong> it.
            </li>
            <li>
              Once all photos are taken, you can apply a <strong>Filter</strong> to enhance them.
            </li>
            <li>
              Finally, <strong>Download</strong> your creation.
            </li>
          </ol>
        </div>
      </main>


      <SoundButton onClick={handleInstructionsNext} className="next">
        Next
      </SoundButton>
    </div>
  );
};


const StyleSheet = () => {
  return (
    <style>{`
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

      .home-container {
        position: relative;
        width: 100vw;
        height: 97vh;
        overflow: hidden;
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
        /* instructions */
        .instructions{
        color: var(--fontColor);
        font-size: 1.2rem;
        line-height: 1.5;
        text-align: left;
        font-family:ClassicNotes;
        font-size:1.5rem;
        }

      /* Main box */
      .main-box {
        background-color: var(--beigeBox);
        max-width: 600px;
        width: 90%;
        margin: 40px auto 20px;
        border-radius: 20px;
        padding: 20px 40px;
        position: relative;
        z-index: 3;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        box-shadow: 0 0 10px var(--insertBox);
        border:3px solid var(--fontColor);
      }

      /* Left content */
      .left-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 320px;
      }

      .description {
        color: var(--fontColor);
        font-size: 1.2rem;
        line-height: 1.5;
        margin-bottom: 40px;
        text-align: left;
        font-family:ClassicNotes;
        font-size:1.5rem;
      }

      .magic-link {
        color: var(--fontColor);
        text-decoration: underline;
        cursor: pointer;
      }

      /* Coin */
      .coin-container {
        margin-top: 20px;
      }

      .coin-outer {
        width: 60px;
        height: 60px;
        background-color: var(--coinYellow);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px var(--starColor);
      }

      .coin-inner {
        font-size: 28px;
        color: var(--coinShadow);
        font-weight: bold;
        user-select: none;
      }

      /* Insert Coin box */
      .insert-coin {
        background-color: var(--insertBox);
        color: var(--fontColor);
        font-family:ClassicNotes;
        padding: 30px 25px;
        width: 140px;
        height: 140px;
        border-radius: 20px;
        font-size: 1.3rem;
        font-weight: 700;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 0 10px var(--background);
        user-select: none;
        border:3px solid var(--fontColor);
      }

      .coin-slot {
        height: 6px;
        width: 100px;
        background-color: var(--fontColor);
        margin: 20px auto 0;
        border-radius: 4px;
      }
    `}</style>
  );
};

export default Instructions;
