import React, { useState } from 'react';
import appStyles from './App.module.css';
import { Game } from './components/Game';

const App = () => {
  const [start, setStart] = useState(false);
  function handleStartGame() {
    setStart(!false);
  }

  return (
    <div className={appStyles['container']}>
      {start ? (
        <Game />
      ) : (
        <button className={appStyles['start_btn']} onClick={handleStartGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default App;
