import React from 'react';
import resultModalStyle from './ResultModal.module.css';

function ResultModal({ restartGame, resultText }) {
  return (
    <div className={resultModalStyle['popup_overlay']}>
      <div className={resultModalStyle['popup_box']}>
        <h1>Game Result</h1>
        <h2>{resultText}</h2>
        <button
          onClick={restartGame}
          className={resultModalStyle['restart_btn']}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
