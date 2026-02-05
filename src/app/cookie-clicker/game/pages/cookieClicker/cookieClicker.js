import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from './components/Navbar.js';
import styles from '@/styles/cookieClicker.module.scss'
import Store from './components/Store.js';
import Image from 'next/image';

const SAVE_KEY = "cookieClickerGameState";

export default function CookieClicker() {
  let [cookies, setCookies] = useState(0);
  let [clickValue, setClickValue] = useState(1);
  let [timeProgressing, setTimeProgressing] = useState(true);
  let [cpsFromStoreItems, setCPSFromStoreItems] = useState(0);
  const cookieAccumulator = useRef(0); // Accumulates fractional cookies
  const [storeItems, setStoreItems] = useState({
    bakersOwned: 0,
    restaurantsOwned: 0,
    bakingClubsOwned: 0,
    girlScoutsOwned: 0,
    factoriesOwned: 0,
    companiesOwned: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load game state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(SAVE_KEY);
      if (savedState) {
        try {
          const gameState = JSON.parse(savedState);
          setCookies(gameState.cookies || 0);
          setClickValue(gameState.clickValue || 1);
          setTimeProgressing(gameState.timeProgressing !== undefined ? gameState.timeProgressing : true);
          if (gameState.storeItems) {
            setStoreItems(gameState.storeItems);
          }
          setIsLoaded(true);
        } catch (error) {
          console.error("Error loading game state:", error);
          setIsLoaded(true);
        }
      } else {
        setIsLoaded(true);
      }
    }
  }, []);

  // Save game state to localStorage
  const saveGameState = useCallback(() => {
    if (typeof window !== "undefined") {
      const gameState = {
        cookies: cookies,
        clickValue: clickValue,
        timeProgressing: timeProgressing,
        storeItems: storeItems,
        lastSaved: new Date().toISOString()
      };
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
      } catch (error) {
        console.error("Error saving game state:", error);
      }
    }
  }, [cookies, clickValue, timeProgressing, storeItems]);

  // Auto-save whenever important state changes
  useEffect(() => {
    if (isLoaded) {
      saveGameState();
    }
  }, [isLoaded, saveGameState]);

  // Also save periodically (every 30 seconds) as a backup
  useEffect(() => {
    if (!isLoaded) return;
    
    const autoSaveInterval = setInterval(() => {
      saveGameState();
    }, 30000); // Save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [isLoaded, saveGameState]);

  useEffect(() => {
    // Increases player's cookies owned, based on cookies per second from owned store items
    //  speedOfTime sets how often the visible cookie value is updated
    let interval;
    var speedOfTime = 20; // ms

    if (timeProgressing) {
      interval = setInterval(()=>{
        // Calculate fractional cookies gained this interval
        const fractionalGain = passiveCookieGain(speedOfTime, cpsFromStoreItems);
        
        // Add to accumulator
        cookieAccumulator.current += fractionalGain;
        
        // Extract whole cookies from accumulator
        const wholeCookies = Math.floor(cookieAccumulator.current);
        cookieAccumulator.current -= wholeCookies;
        
        // Add whole cookies to total
        if (wholeCookies > 0) {
          setCookies(prevCookies => parseInt(prevCookies) + wholeCookies);
        }
      },speedOfTime);
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeProgressing, cpsFromStoreItems]);

  function click(currentClickValue) {
    setCookies(parseInt(cookies) + currentClickValue);
  }

  function updateStoreItems(updates) {
    setStoreItems(prev => ({ ...prev, ...updates }));
  }

  function updateClickValue(event) {
    console.log("updateClickValue: ", event.target.value);
    setClickValue(parseInt(event.target.value));
  }

  function toggleTimeProgressing(timeProgressing) {
    setTimeProgressing(!timeProgressing);
  }

  function resetGame() {
    const confirmed = window.confirm("Are you sure you want to reset the game? This will clear all save data and start over at 0 cookies and 0 store items. This action cannot be undone.");
    
    if (confirmed) {
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem(SAVE_KEY);
      }
      
      // Reset all state to initial values
      setCookies(0);
      setClickValue(1);
      setTimeProgressing(true);
      setCPSFromStoreItems(0);
      cookieAccumulator.current = 0;
      setStoreItems({
        bakersOwned: 0,
        restaurantsOwned: 0,
        bakingClubsOwned: 0,
        girlScoutsOwned: 0,
        factoriesOwned: 0,
        companiesOwned: 0
      });
    }
  }

  function passiveCookieGain(speedOfTime, cpsFromStoreItems) {
    const cookiesPerSecond = 0;
    const cookiesPerMillisecond = (cookiesPerSecond + cpsFromStoreItems) / 1000;
    const cookiesGained = cookiesPerMillisecond * speedOfTime;
  
    // Return the exact fractional value (don't round) - accumulation handles rounding
    return cookiesGained;
  }

  function abbreviateNumber(longNum){
    // Gives an abbreviated format of the number given
    // 1,000 -> 1K
    // 1,000,000 -> 1M
    // 1,000,000,000 -> 1B
    // 1,000,000,000,000 -> 1T (max abbreviation)
    // 1,000,000,000,000,000 -> 1,000T
    return Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 3 // # of values after decimal point
    }).format(longNum);
  }

  return (
      <>
          <div className={`${styles.gameContent}`}>
            <Navbar />
            <div>
              <section id="clickerSection" className={`${styles.mainSection}`}>
                  <Image
                   className={`${styles.cookieImg}`}
                   onClick={() => click(clickValue)}
                   width={200}
                   height={200}
                   src="/cookie.png"
                   alt="Click"
                   priority={true}
                   draggable={false}
                  />
                  <div>
                      <label htmlFor="clickValue">Click Value</label>
                      <input
                          id="clickValue"
                          type="number"
                          value={clickValue}
                          onChange={(event) => updateClickValue(event)}
                      />
                  </div>
                  <p>Cookies per Second: {abbreviateNumber(cpsFromStoreItems)}/s</p>
                  <button
                      onClick={() => toggleTimeProgressing(timeProgressing)}
                  >
                      {timeProgressing ? "Pause" : "Start"} Time
                  </button>
                  <button onClick={() => saveGameState()}>
                      Save Game
                  </button>
                  <button onClick={() => resetGame()}>
                      Reset Game
                  </button>
                  <p>Cookies: {abbreviateNumber(cookies)}</p>
                  <p>Time is {timeProgressing ? "Progressing" : "Paused"}</p>
              </section>
              <Store
                  cookies={cookies}
                  changeCookies={(value) => {
                      setCookies(cookies + value);
                  }}
                  updateCPSFromStore={(value) => {
                    setCPSFromStoreItems(value);
                  }}
                  storeItems={storeItems}
                  updateStoreItems={updateStoreItems}
              ></Store>
            </div>
          </div>
      </>
  );
}
