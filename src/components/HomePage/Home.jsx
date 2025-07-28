import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SoundButton from '../SoundButton';
import { COIN_INSERTED } from '../../redux/action/coin.js'

const Home = () => {
  const clickSound = useRef(null);
  const insertSound = useRef(null);
  const notifySound = useRef(null);

  const user = useSelector((state) => state.user);
  const coin = useSelector((state) => state.coin)
  const navigate = useNavigate();
  const [coinDragging, setCoinDragging] = useState(false);
  const [coinInserted, setCoinInserted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [coinVisible, setCoinVisible] = useState(true);
  const [coinPos, setCoinPos] = useState({ x: 0, y: 0 });
  const coinRef = useRef(null);
  const dispatch = useDispatch();

  const handleCoinMouseDown = (e) => {
    setCoinDragging(true);
    const rect = coinRef.current.getBoundingClientRect();
    setCoinPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleTransitionEnd = () => {
    if (coinInserted) {
      setCoinVisible(false);

    }
  };

  useEffect(() => {
    clickSound.current = new Audio('/click.mp3');
    clickSound.current.preload = 'auto';

    insertSound.current = new Audio('/insert.mp3');
    insertSound.current.preload = 'auto';

    notifySound.current = new Audio('/notify.mp3');
    notifySound.current.preload = 'auto';
  }, []);

  useEffect(() => {
    const unlockAudio = () => {
      const sounds = [clickSound, insertSound, notifySound];

      sounds.forEach((soundRef) => {
        if (soundRef.current) {
          soundRef.current.volume = 0.01;
          soundRef.current.play()
            .then(() => {
              soundRef.current.pause();
              soundRef.current.currentTime = 0;
              soundRef.current.volume = 1;
            })
            .catch((err) => {
              
            });
        }
      });

      document.removeEventListener('click', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    return () => document.removeEventListener('click', unlockAudio);
  }, []);

  const handleMouseMove = (e) => {
    if (coinDragging && coinRef.current) {
      coinRef.current.style.position = 'fixed';
      coinRef.current.style.left = `${e.clientX - coinPos.x}px`;
      coinRef.current.style.top = `${e.clientY - coinPos.y}px`;
      setShowTooltip(false)
    }
  };

  const handleMouseUp = () => {
    if (coinDragging) setCoinDragging(false);
    setShowTooltip(false)
  };

  const handleInsertCoinClick = () => {
    if (coinDragging || coinInserted) return;
    if (coinRef.current) {
      const coin = coinRef.current;
      const slot = document.querySelector('.insert-coin');
      const slotRect = slot.getBoundingClientRect();
      const coinRect = coin.getBoundingClientRect();

      const dx = coinRect.left - slotRect.left;
      const dy = coinRect.top - slotRect.top;

      if (Math.abs(dx) < 100 && Math.abs(dy) < 100) {
        coin.classList.add('coin-throw');
        insertSound.current.play();
        setTimeout(() => {
          dispatch({ type: COIN_INSERTED, payload: { coin: true } });
          setCoinInserted(true);
        }, 1300);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [coinDragging, coinPos]);

  const handleMouseMoveEnter = () => {
    setShowTooltip(true);
    if (notifySound.current) {
      notifySound.current.currentTime = 0;
      notifySound.current.play().then(() => {
        
      }).catch((err) => {
        
      });
    }
  };

  function handleHomeNext() {
    navigate('/instructions')
  }
  return (
    <>
      <div className="home-container">
        <StyleSheet />
        <header className="cloud-header">Cloud Cottage</header>
        <main className="main-box">
          <div className="left-content">
            <p className="description">
              A dreamy little space where <u>magic meets memory.</u>
              <br />
              Create moments, capture memories and let your story sparkles in pixels
            </p>

            {!coinInserted && (
              <div
                className="coin-container"
                ref={coinRef}
                onMouseDown={handleCoinMouseDown}
                onClick={handleInsertCoinClick}
                onAnimationEnd={handleTransitionEnd}
                onMouseEnter={handleMouseMoveEnter}
                onMouseLeave={() => setShowTooltip(false)}
                style={{ cursor: 'grab', position: 'relative' }}
              >
                {showTooltip && (
                  <div className="coin-tooltip">
                    Drag and drop the coin into the slot
                  </div>
                )}
                {!coin.coin && <div className="coin-outer">
                  <div className="coin-inner">$</div>
                </div>}
              </div>

            )}

            {coin.coin &&
              <SoundButton onClick={handleHomeNext} className="coin-processing">
                Next
              </SoundButton>
            }
          </div>

          <div className="insert-coin">
            INSERT<br />COIN
            <div className="coin-slot"></div>
          </div>
        </main>
      </div>
    </>
  );
};


const StyleSheet = () => {
  return (
    <style>{`

      @keyframes throwCoin {
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(80px, 50px) scale(0.3) rotate(720deg);
    opacity: 0;
  }
}

.coin-throw {
  animation: throwCoin 0.8s ease-in-out forwards;
  pointer-events: none;
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

      /* Main box */
      .main-box {
        background-color: var(--beigeBox);
        max-width: 600px;
        width: 90%;
        min-height:310px;
        height:auto;
        margin: 40px auto 20px;
        border-radius: 20px;
        padding: 40px 40px;
        position: relative;
        z-index: 3;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        box-shadow: 0 0 10px var(--insertBox);
        border:3px solid var(--fontColor);
      }

      /* Stars */
      .star {
  position: absolute;
  color: var(--starColor);
  font-size: 48px; /* Bigger stars */
  user-select: none;
  z-index: 1;       /* Keep behind text */
  opacity: 0.8;
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
      }

      .coin-processing {
        font-size: 1rem;
        color: var(--fontColor); 
        margin-top: 20px;
        animation: fadeIn 1s ease-in-out forwards;
        background-color: var(--insertBox);
        color: var(--fontColor);
        padding: 10px 25px;
        border-radius: 40px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 0 10px var(--background);
        user-select: none;
        border:3px solid var(--fontColor);
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

      /* Logout button */
      .logout-btn {
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
        border:3px solid var(--fontColor);
      }

      .logout-btn:hover {
        background-color: var(--beigeBox);
      }
        /* history*/
      .history-btn {
            background-color: var(--insertBox);
    color: var(--fontColor);
    position: absolute;
    bottom: 25px;
    right: 155px;
    padding: 10px 25px;
    border-radius: 40px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 0 10px var(--background);
    user-select: none;
    border: 3px solid var(--fontColor);
      }

      .coin-tooltip {
  position: absolute;
  top: -10px;
  left: 45%;
  width: 100px;
  transform: translateX(-50%);
  background-color: var(--insertBox);
  color: var(--fontColor);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  box-shadow: 0 0 8px var(--background);
  border: 2px solid var(--fontColor);
  z-index: 0; /* Lower than coin */
  pointer-events: none; /* Do not block drag events */
}

      .history-btn:hover {
        background-color: var(--beigeBox);
      }
    `}</style>
  );
};

export default Home;
